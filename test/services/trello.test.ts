import { Order } from "../../src/models/shopify";
import { TrelloClient } from "../../src/services/trello";

describe("TrelloClient", () => {
  const trelloClient = new TrelloClient("fake-key", "fake-token");
  const order = {
    name: "#1775",
    customer: {
      firstName: "John",
      lastName: "Doe",
    },
    totalPrice: "101.91",
  } as Order;

  it("should create a card name", () => {
    expect(trelloClient.cardName(order)).toBe("#1775: John Doe ($101.91)");
  });
});
