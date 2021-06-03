import MyStack from "./MyStack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x",
    environment: {
      TRELLO_API_KEY: process.env.TRELLO_API_KEY ?? "",
      TRELLO_OAUTH_TOKEN: process.env.TRELLO_OAUTH_TOKEN ?? "",
      TRELLO_LIST_ID: process.env.TRELLO_LIST_ID ?? "",
      SHOPIFY_WEBHOOK_SECRET: process.env.SHOPIFY_WEBHOOK_SECRET ?? "",
    },
  });

  new MyStack(app, "my-stack");

  // Add more stacks
}
