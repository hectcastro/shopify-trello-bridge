import { Logger } from "@aws-lambda-powertools/logger";
import {
  GetParametersCommand,
  Parameter,
  SSMClient,
} from "@aws-sdk/client-ssm";
import { APIGatewayEvent } from "aws-lambda";
import camelcaseKeys from "camelcase-keys";
import { Shopify } from "../src/services/shopify";
import { TrelloClient } from "../src/services/trello";

const logger = new Logger({ serviceName: "shopifyTrelloBridge" });
const client = new SSMClient({});

const shopifyWebhookSecret = "/shopify-trello-bridge/shopify/webhook-secret";
const trelloApiKey = "/shopify-trello-bridge/trello/api-key";
const trelloOauthToken = "/shopify-trello-bridge/trello/oauth-token";
const trelloListId = "/shopify-trello-bridge/trello/list-id";

async function getParameterValue(
  paramName: string,
  params: Parameter[] | undefined
): Promise<string> {
  return (await params?.find((param) => param.Name === paramName)?.Value) ?? "";
}

export const handler = async (event: APIGatewayEvent) => {
  logger.info(JSON.stringify(event, null, 2));

  const params = await client.send(
    new GetParametersCommand({
      Names: [
        shopifyWebhookSecret,
        trelloApiKey,
        trelloOauthToken,
        trelloListId,
      ],
      WithDecryption: true,
    })
  );

  if (
    !Shopify.verifyWebhook(
      event.body ?? "",
      event.headers["x-shopify-hmac-sha256"] ?? "",
      await getParameterValue(shopifyWebhookSecret, params.Parameters)
    )
  ) {
    return { statusCode: 401 };
  }

  const trelloClient = new TrelloClient(
    await getParameterValue(trelloApiKey, params.Parameters),
    await getParameterValue(trelloOauthToken, params.Parameters)
  );

  await trelloClient.createCard(
    await getParameterValue(trelloListId, params.Parameters),
    camelcaseKeys(JSON.parse(event.body ?? ""), { deep: true })
  );

  return { statusCode: 200 };
};
