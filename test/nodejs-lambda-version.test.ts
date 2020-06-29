import { expect as expectCDK, haveResource, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsLambdaVersion } from '../lib/index';
import { join } from 'path';

describe('test', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  // WHEN
  new NodejsLambdaVersion(stack, 'MyTestConstruct', {
    entry: join(__dirname, '/index.ts'),
    functionName: `test`,
    handler: 'handler',
    runtime: Runtime.NODEJS_12_X,
  });
  it('should match snapshot', () => {
    console.log(SynthUtils.toCloudFormation(stack));
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});
