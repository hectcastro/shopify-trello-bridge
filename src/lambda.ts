import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ssmParameter } from "aws-parameter-cache";
import Shopify from "./services/shopify";
import Trello from "./services/trello";

const SHOPIFY_WEBHOOK_SECRET = ssmParameter({
  name: "/shopify-trello-bridge/shopify/webhook-secret",
  withDecryption: true,
});

const TRELLO_API_KEY = ssmParameter({
  name: "/shopify-trello-bridge/trello/api-key",
  withDecryption: true,
});

const TRELLO_OAUTH_TOKEN = ssmParameter({
  name: "/shopify-trello-bridge/trello/oauth-token",
  withDecryption: true,
});

const TRELLO_LIST_ID = ssmParameter({
  name: "/shopify-trello-bridge/trello/list-id",
  withDecryption: true,
});

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  if (
    !(await Shopify.verifyWebhook(
      event.body ?? "",
      event.headers["x-shopify-hmac-sha256"] ?? "",
      (await SHOPIFY_WEBHOOK_SECRET.value) as string
    ))
  ) {
    return { statusCode: 401 };
  }

  const trelloClient = Trello.client(
    (await TRELLO_API_KEY.value) as string,
    (await TRELLO_OAUTH_TOKEN.value) as string
  );

  await trelloClient.createCard(
    (await TRELLO_LIST_ID.value) as string,
    JSON.parse(event.body ?? "")
  );

  return {
    statusCode: 200,
  };
};
