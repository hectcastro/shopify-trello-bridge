import Shopify from "../../src/services/shopify";

describe("verifyWebhook", () => {
  const webhookPayload = JSON.stringify({});
  const webhookSha256 = "dzJZAsrKgS3CWXM6rNBGtzgXNyx3e42VtAJkdHRRbhM=";
  const webhookSecret = "secret";

  it("should validate a valid webhook", async () => {
    const isValid = await Shopify.verifyWebhook(
      webhookPayload,
      webhookSha256,
      webhookSecret
    );
    expect(isValid).toBe(true);
  });

  it("should fail to validate an invalid webhook", async () => {
    const isValid = await Shopify.verifyWebhook(
      JSON.stringify({ valid: false }),
      webhookSha256,
      webhookSecret
    );
    expect(isValid).toBe(false);
  });
});
