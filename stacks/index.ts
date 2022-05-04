import * as sst from "@serverless-stack/resources";
import MyStack from "./MyStack";

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
    timeout: 15,
    architecture: "arm_64",
  });

  new MyStack(app, "my-stack");
}
