import {CfnOutput, Duration} from 'aws-cdk-lib';
import {Effect, PolicyStatement} from 'aws-cdk-lib/aws-iam';
import {
  Architecture,
  FunctionUrlAuthType,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import {Construct} from 'constructs';

export class ShopifyTrelloBridge extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const webhookHandler = new NodejsFunction(this, 'webhook', {
      architecture: Architecture.ARM_64,
      runtime: Runtime.NODEJS_16_X,
      timeout: Duration.seconds(10),
    });

    webhookHandler.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['ssm:GetParameters'],
        resources: ['arn:aws:ssm:*:*:parameter/shopify-trello-bridge/*'],
      }),
    );

    const webhookUrl = webhookHandler.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, 'webhookUrl', {
      value: webhookUrl.url,
    });
  }
}
