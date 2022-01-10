import * as lambda from "@aws-cdk/aws-lambda";
import * as sst from "@serverless-stack/resources";
import MyStack from "./MyStack";

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    runtime: lambda.Runtime.NODEJS_14_X,
    timeout: 15,
    architecture: lambda.Architecture.ARM_64,
  });

  new MyStack(app, "my-stack");
}
