import * as crypto from "crypto";

export class Shopify {
  static verifyWebhook(
    body: string,
    hmacSha: string,
    webhookSecret: string
  ): boolean {
    const computedHmacSha = crypto
      .createHmac("sha256", webhookSecret)
      .update(body, "utf8")
      .digest("base64");

    return computedHmacSha == hmacSha;
  }
}
