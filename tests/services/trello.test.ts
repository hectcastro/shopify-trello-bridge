import { LineItemsEntity, Order } from "../../src/models/shopify";
import Trello from "../../src/services/trello";

describe("Trello", () => {
  const trelloClient = Trello.client("fake-key", "fake-token");
  const order = {
    name: "#1775",
    customer: {
      first_name: "John",
      last_name: "Doe",
    },
    total_price: "101.91",
  } as Order;
  const lineItems = [
    {
      name: "Blue Chambray Mask - Extra Large Adult",
      quantity: 1,
    },
  ] as LineItemsEntity[];

  it("should create a card name", () => {
    expect(trelloClient.cardName(order)).toBe("#1775: John Doe ($101.91)");
  });
});
