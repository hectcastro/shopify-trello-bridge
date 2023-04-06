import {Logger} from '@aws-lambda-powertools/logger';
import type {AxiosInstance, AxiosRequestConfig} from 'axios';
import axios from 'axios';
import type {LineItem, Order} from '../models/shopify';

const logger = new Logger({serviceName: 'shopifyTrelloBridge'});

export class TrelloClient {
  private readonly httpClient: AxiosInstance;

  constructor(key: string, token: string) {
    this.httpClient = axios.create({
      baseURL: 'https://api.trello.com/1',
    });

    this.httpClient.interceptors.request.use((config: AxiosRequestConfig) => {
      config.params = (config.params as unknown) || {};
      config.params.key = key;
      config.params.token = token;

      return config;
    });
  }

  cardName(order: Order): string {
    return `${order.name}: ${order.customer.firstName} ${order.customer.lastName} ($${order.totalPrice})`;
  }

  async createCardChecklist(
    cardId: string,
    lineItems: LineItem[],
  ): Promise<void> {
    const checklist: {data: {id: number}} = await this.httpClient.post(
      '/checklists',
      {
        idCard: cardId,
        name: 'Order Items',
        pos: 'bottom',
      },
    );

    await Promise.all(
      lineItems.map(async (lineItem: LineItem) => {
        logger.info(`Creating checklist item: ${lineItem.name}`);

        await this.httpClient.post(
          `/checklists/${checklist.data.id}/checkItems`,
          {
            id: checklist.data.id,
            name: `${lineItem.quantity} x ${lineItem.name}`,
            pos: 'bottom',
          },
        );
      }),
    );
  }

  async createCard(listId: string, order: Order): Promise<void> {
    const cardName = this.cardName(order);
    const card = await this.httpClient.post('/cards', {
      idList: listId,
      name: cardName,
      pos: 'bottom',
    });

    logger.info(`Created card: ${cardName}`);

    await this.createCardChecklist(card.data.id as string, order.lineItems);
  }
}
