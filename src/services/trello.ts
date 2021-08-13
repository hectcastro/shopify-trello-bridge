import axios, { AxiosInstance } from "axios";
import bunyan from "bunyan";
import { LineItemsEntity, Order } from "../models/shopify";

const logger = bunyan.createLogger({
  name: "shopify-trello-bridge",
  level: bunyan.INFO,
  stream: process.stdout,
});

export default class Trello {
  private static instance: Trello;
  private static httpClient: AxiosInstance;

  static client(key: string, token: string): Trello {
    if (!Trello.instance) {
      Trello.instance = new Trello();

      Trello.httpClient = axios.create({
        baseURL: "https://api.trello.com/1",
      });

      Trello.httpClient.interceptors.request.use((config) => {
        config.params = config.params || {};
        config.params["key"] = key;
        config.params["token"] = token;

        return config;
      });
    }

    return Trello.instance;
  }

  cardName(order: Omit<Order, "lineItems">): string {
    return `${order.name}: ${order.customer?.first_name} ${order.customer?.last_name} ($${order.total_price})`;
  }

  async createCardChecklist(
    cardId: string,
    lineItems: LineItemsEntity[] | null | undefined
  ): Promise<void> {
    const checklist = await Trello.httpClient.post("/checklists", {
      idCard: cardId,
      name: "Order Items",
      pos: "bottom",
    });

    await Promise.all(
      lineItems?.map(async (lineItem) => {
        await Trello.httpClient.post(
          `/checklists/${checklist.data.id}/checkItems`,
          {
            id: checklist.data.id,
            name: `${lineItem.quantity} x ${lineItem.name}`,
            pos: "bottom",
          }
        );
      }) ?? []
    );
  }

  async createCard(listId: string, order: Order): Promise<void> {
    logger.info(order);

    const card = await Trello.httpClient.post("/cards", {
      idList: listId,
      name: this.cardName(order),
      pos: "bottom",
    });

    await this.createCardChecklist(card.data.id, order.line_items);
  }
}
