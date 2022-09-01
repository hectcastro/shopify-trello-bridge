import * as crypto from 'node:crypto';

export const Shopify = {
  verifyWebhook(body: string, hmacSha: string, webhookSecret: string): boolean {
    const computedHmacSha = crypto
      .createHmac('sha256', webhookSecret)
      .update(body, 'utf8')
      .digest('base64');

    return computedHmacSha === hmacSha;
  },
};
