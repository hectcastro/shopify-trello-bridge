#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ShopifyTrelloBridgeStack } from "../lib/shopify-trello-bridge-stack";

const app = new cdk.App();
new ShopifyTrelloBridgeStack(app, "ShopifyTrelloBridgeStack", {});
