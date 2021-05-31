import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { LineItemsEntity, Order } from "./model/order";
import TrelloNodeAPI from "trello-node-api";

const Trello = new TrelloNodeAPI();
Trello.setApiKey(process.env.TRELLO_API_KEY ?? "");
Trello.setOauthToken(process.env.TRELLO_OAUTH_TOKEN ?? "");

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
  await Trello.card.create({
    name: createTrelloCardName(shopifyOrder),
    desc: createTrelloCardDesc(shopifyOrder.line_items || []),
    pos: "bottom",
    idList: "60b3aa24124c475b5be6ca9c",
  });

  return {
    statusCode: 200,
  };
};
