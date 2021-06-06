import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ssmParameter } from "aws-parameter-cache";
import axios from "axios";
import crypto from "crypto";
import bunyan from "bunyan";
import { Order } from "./model/order";

const TRELLO_OAUTH_TOKEN = ssmParameter({
  name: "/shopify-trello-bridge/trello/oauth-token",
  withDecryption: true,
});
const TRELLO_API_KEY = ssmParameter({
  name: "/shopify-trello-bridge/trello/api-key",
  withDecryption: true,
});
const TRELLO_LIST_ID = ssmParameter({
  name: "/shopify-trello-bridge/trello/list-id",
  withDecryption: true,
});
const SHOPIFY_WEBHOOK_SECRET = ssmParameter({
  name: "/shopify-trello-bridge/shopify/webhook-secret",
  withDecryption: true,
});

const CLIENT = axios.create({
  baseURL: "https://api.trello.com/1",
});

const LOGGER = bunyan.createLogger({
  name: "shopify-trello-bridge",
  level: bunyan.INFO,
  stream: process.stdout,
});

async function verifyWebhook(body: string, hmacSha: string): Promise<boolean> {
  const computedHmacSha = crypto
    .createHmac("sha256", (await SHOPIFY_WEBHOOK_SECRET.value) as string)
    .update(body, "utf8")
    .digest("base64");

  return computedHmacSha == hmacSha;
}

function createTrelloCardName(order: Order): string {
  return `${order.name}: ${order.customer?.first_name} ${order.customer?.last_name} ($${order.total_price})`;
}

async function createTrelloCard(shopifyOrder: Order) {
  LOGGER.info(shopifyOrder);

  const params = {
    key: await TRELLO_API_KEY.value,
    token: await TRELLO_OAUTH_TOKEN.value,
  };

  const card = await CLIENT.post("/cards", {
    idList: await TRELLO_LIST_ID.value,
    name: createTrelloCardName(shopifyOrder),
    pos: "bottom",
    ...params,
  });

  const checklist = await CLIENT.post("/checklists", {
    idCard: card.data.id,
    name: "Order Items",
    pos: "bottom",
    ...params,
  });

  await Promise.all(
    shopifyOrder.line_items?.map(async (lineItem) => {
      await CLIENT.post(`/checklists/${checklist.data.id}/checkItems`, {
        id: checklist.data.id,
        name: `${lineItem.quantity} x ${lineItem.name}`,
        pos: "bottom",
        ...params,
      });
    }) ?? []
  );
}

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  if (
    !(await verifyWebhook(
      event.body ?? "",
      event.headers["x-shopify-hmac-sha256"] ?? ""
    ))
  ) {
    return { statusCode: 401 };
  }

  await createTrelloCard(JSON.parse(event.body ?? ""));

  return {
    statusCode: 200,
  };
};
