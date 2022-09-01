import {Logger} from '@aws-lambda-powertools/logger';
import type {Parameter} from '@aws-sdk/client-ssm';
import {GetParametersCommand, SSMClient} from '@aws-sdk/client-ssm';
import type {APIGatewayEvent} from 'aws-lambda';
import camelcaseKeys from 'camelcase-keys';
import {Shopify} from '../src/services/shopify';
import {TrelloClient} from '../src/services/trello';

const logger = new Logger({serviceName: 'shopifyTrelloBridge'});
const client = new SSMClient({});

const shopifyWebhookSecret = '/shopify-trello-bridge/shopify/webhook-secret';
const trelloApiKey = '/shopify-trello-bridge/trello/api-key';
const trelloOauthToken = '/shopify-trello-bridge/trello/oauth-token';
const trelloListId = '/shopify-trello-bridge/trello/list-id';

async function getParameterValue(
  parameterName: string,
  parameters: Parameter[] | undefined,
): Promise<string> {
  return (
    parameters?.find((parameter) => parameter.Name === parameterName)?.Value ??
    ''
  );
}

export const handler = async (event: APIGatewayEvent) => {
  logger.info(JSON.stringify(event, null, 2));

  const parameters = await client.send(
    new GetParametersCommand({
      Names: [
        shopifyWebhookSecret,
        trelloApiKey,
        trelloOauthToken,
        trelloListId,
      ],
      WithDecryption: true,
    }),
  );

  if (
    !Shopify.verifyWebhook(
      event.body ?? '',
      event.headers['x-shopify-hmac-sha256'] ?? '',
      await getParameterValue(shopifyWebhookSecret, parameters.Parameters),
    )
  ) {
    return {statusCode: 401};
  }

  const trelloClient = new TrelloClient(
    await getParameterValue(trelloApiKey, parameters.Parameters),
    await getParameterValue(trelloOauthToken, parameters.Parameters),
  );

  await trelloClient.createCard(
    await getParameterValue(trelloListId, parameters.Parameters),
    camelcaseKeys(JSON.parse(event.body ?? ''), {deep: true}),
  );

  return {statusCode: 200};
};
