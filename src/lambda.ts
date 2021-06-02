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

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const shopifyOrder: Order = JSON.parse(event.body ?? "");

  const card = await client.post("/cards", {
    idList: process.env.TRELLO_LIST_ID,
    name: createTrelloCardName(shopifyOrder),
    pos: "bottom",
  });

  const checklist = await client.post("/checklists", {
    idCard: card.data.id,
    name: "Order Items",
    pos: "bottom",
  });

  await Promise.all(
    shopifyOrder.line_items?.map(async (lineItem) => {
      await client.post(`/checklists/${checklist.data.id}/checkItems`, {
        id: checklist.data.id,
        name: `${lineItem.quantity} x ${lineItem.name}`,
        pos: "bottom",
      });
    }) ?? []
  );

  return {
    statusCode: 200,
  };
};
