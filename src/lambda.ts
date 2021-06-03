import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Order } from "./model/order";
import axios from "axios";
import crypto from "crypto";

const TRELLO_OAUTH_TOKEN = process.env.TRELLO_OAUTH_TOKEN ?? "";
const TRELLO_API_KEY = process.env.TRELLO_API_KEY ?? "";
const TRELLO_LIST_ID = process.env.TRELLO_LIST_ID ?? "";
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET ?? "";

const CLIENT = axios.create({
  baseURL: "https://api.trello.com/1",
  params: {
    key: TRELLO_API_KEY,
    token: TRELLO_OAUTH_TOKEN,
  },
});

function verifyWebhook(body: string, hmacSha: string): boolean {
  const computedHmacSha = crypto
    .createHmac("sha256", SHOPIFY_WEBHOOK_SECRET)
    .update(body, "utf8")
    .digest("base64");

  return computedHmacSha == hmacSha;
}

function createTrelloCardName(order: Order): string {
  return `${order.name}: ${order.customer?.first_name} ${order.customer?.last_name} ($${order.total_price})`;
}

async function createTrelloCard(shopifyOrder: Order) {
  const card = await CLIENT.post("/cards", {
    idList: TRELLO_LIST_ID,
    name: createTrelloCardName(shopifyOrder),
    pos: "bottom",
  });

  const checklist = await CLIENT.post("/checklists", {
    idCard: card.data.id,
    name: "Order Items",
    pos: "bottom",
  });

  await Promise.all(
    shopifyOrder.line_items?.map(async (lineItem) => {
      await CLIENT.post(`/checklists/${checklist.data.id}/checkItems`, {
        id: checklist.data.id,
        name: `${lineItem.quantity} x ${lineItem.name}`,
        pos: "bottom",
      });
    }) ?? []
  );
}

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  if (
    !verifyWebhook(
      event.body ?? "",
      event.headers["x-shopify-hmac-sha256"] ?? ""
    )
  ) {
    return { statusCode: 401 };
  }

  await createTrelloCard(JSON.parse(event.body ?? ""));

  return {
    statusCode: 200,
  };
};
