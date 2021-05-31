import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Order } from "./model/order";
import axios from "axios";

const client = axios.create({
  baseURL: "https://api.trello.com/1",
  params: {
    key: process.env.TRELLO_API_KEY ?? "",
    token: process.env.TRELLO_OAUTH_TOKEN ?? "",
  },
});

function createTrelloCardName(order: Order): string {
  return `${order.name}: ${order.customer?.first_name} ${order.customer?.last_name} ($${order.total_price})`;
}

function createTrelloCardDesc(lineItems: LineItemsEntity[]): string {
  const trelloCardBody = lineItems.map((lineItem) => {
    return `- ${lineItem.quantity} x ${lineItem.name}`;
  });

  return trelloCardBody.join("\n");
}

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const shopifyOrder: Order = JSON.parse(event.body ?? "");

  // console.log(shopifyOrder);

  const card = await client.post("/cards", {
    idList: "60b3aa24124c475b5be6ca9c",
    name: createTrelloCardName(shopifyOrder),
    desc: createTrelloCardDesc(shopifyOrder.line_items || []),
    pos: "bottom",
  });

  return {
    statusCode: 200,
  };
};
