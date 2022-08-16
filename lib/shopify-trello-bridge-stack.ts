import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ShopifyTrelloBridge } from "./shopify-trello-bridge";

export class ShopifyTrelloBridgeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ShopifyTrelloBridge(this, "shopify-trello-bridge");
  }
}
