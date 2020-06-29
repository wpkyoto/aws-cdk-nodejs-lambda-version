import * as cdk from '@aws-cdk/core';

export interface NodejsLambdaVersionProps {
  /**
   * The visibility timeout to be configured on the SQS Queue, in seconds.
   *
   * @default Duration.seconds(300)
   */
  visibilityTimeout?: cdk.Duration;
}

export class NodejsLambdaVersion extends cdk.Construct {
  /** @returns the ARN of the SQS queue */
  public readonly queueArn: string;

  constructor(scope: cdk.Construct, id: string, props: NodejsLambdaVersionProps = {}) {
    super(scope, id);
  }
}
