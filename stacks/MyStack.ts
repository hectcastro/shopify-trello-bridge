import * as sst from "@serverless-stack/resources";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const fn = new sst.Function(this, "webhook", {
      handler: "src/lambda.handler",
      permissions: [
        new iam.PolicyStatement({
          actions: ["ssm:GetParameter"],
          effect: iam.Effect.ALLOW,
          resources: ["arn:aws:ssm:*:*:parameter/shopify-trello-bridge/*"],
        }),
      ],
    });

    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    this.addOutputs({
      FnUrl: fnUrl.url,
    });
  }
}
