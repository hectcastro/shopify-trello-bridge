import crypto from "crypto";

export default class Shopify {
  static async verifyWebhook(
    body: string,
    hmacSha: string,
    webhookSecret: string
  ): Promise<boolean> {
    const computedHmacSha = crypto
      .createHmac("sha256", webhookSecret)
      .update(body, "utf8")
      .digest("base64");

    return computedHmacSha == hmacSha;
  }
}
