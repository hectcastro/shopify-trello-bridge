import * as lambda from "@aws-cdk/aws-lambda";
import * as sst from "@serverless-stack/resources";
import MyStack from "./MyStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    environment: {
      TRELLO_API_KEY: process.env.TRELLO_API_KEY ?? "",
      TRELLO_OAUTH_TOKEN: process.env.TRELLO_OAUTH_TOKEN ?? "",
      TRELLO_LIST_ID: process.env.TRELLO_LIST_ID ?? "",
      SHOPIFY_WEBHOOK_SECRET: process.env.SHOPIFY_WEBHOOK_SECRET ?? "",
    },
    runtime: lambda.Runtime.NODEJS_14_X,
  });

  new MyStack(app, "my-stack");

  // Add more stacks
}
