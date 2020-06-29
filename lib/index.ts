import * as cdk from '@aws-cdk/core';
import { Version } from '@aws-cdk/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from '@aws-cdk/aws-lambda-nodejs';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';


export interface NodejsLambdaVersionProps extends NodejsFunctionProps {
  /**
   * Path to the entry file (JavaScript or TypeScript).
   *
   * If the `NodejsFunction` is defined in `stack.ts` with `my-handler` as id
   * (`new NodejsFunction(this, 'my-handler')`), the construct will look at `stack.my-handler.ts`
   * and `stack.my-handler.js`.
   */
  entry: string;
}

export class NodejsLambdaVersion extends cdk.Construct {
  /**
   * Created Lambda Function
   */
  public readonly function: NodejsFunction

  /**
   * Function version
   */
  public readonly version: Version

  constructor(scope: cdk.Construct, id: string, props: NodejsLambdaVersionProps) {
    super(scope, id);
    this.function = new NodejsFunction(
      this,
      `${id}NodeJSFunction`,
      props
    );

    this.version = this.function.addVersion(
      createHash('sha256')
        .update(readFileSync(props.entry, 'utf-8'))
        .digest('hex')
    );

  }
}
