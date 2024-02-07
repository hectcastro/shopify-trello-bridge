import {Stack, type StackProps} from 'aws-cdk-lib';
import type {Construct} from 'constructs';
import {ShopifyTrelloBridge} from './shopify-trello-bridge';

export class ShopifyTrelloBridgeStack extends Stack {
  constructor(scope: Construct, id: string, properties?: StackProps) {
    super(scope, id, properties);

    new ShopifyTrelloBridge(this, 'shopify-trello-bridge');
  }
}
