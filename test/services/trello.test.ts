import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Order } from "../../src/models/shopify";
import { TrelloClient } from "../../src/services/trello";

describe("TrelloClient", () => {
  const axiosMock = new MockAdapter(axios);
  const trelloClient = new TrelloClient("fake-key", "fake-token");
  const order = {
    customer: {
      firstName: "John",
      lastName: "Doe",
    },
    lineItems: [{ name: "Cranberry Mask - Adult", quantity: 1 }],
    name: "#1775",
    totalPrice: "101.91",
  } as Order;

  afterEach(() => {
    axiosMock.reset();
  });

  it("should create a card name", () => {
    expect(trelloClient.cardName(order)).toBe("#1775: John Doe ($101.91)");
  });

  it("should create a card", () => {
    axiosMock.onPost("/cards").reply(200, {
      id: 1,
    });
    axiosMock.onPost("/checklists").reply(200, {
      id: 1,
    });
    axiosMock.onPost("/checklists/1/checkItems").reply(200, {});

    trelloClient.createCard("fake-list-id", order);
  });
});
