import { expect as expectCDK, haveResource, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsLambdaVersion } from '../lib/index';
import { join } from 'path';

describe('test', () => {
  const expectedResources = [
    'AWS::Lambda::Function',
    'AWS::Lambda::Version',
    'AWS::IAM::Role',
  ];
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
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
  // THEN
  it.each(expectedResources)('should have resource: %p', name => {
    expectCDK(stack).to(haveResource(name));
  });
  it('should not create another resource', () => {
    const cfn = SynthUtils.toCloudFormation(stack);
    const unexpectedResources = Object.values(cfn.Resources).filter(
      (resource: any) => {
        if (!resource) return false;
        if (expectedResources.includes(resource.Type)) return false;
        return true;
      }
    );
    expect(unexpectedResources.length).toEqual(0);
  });
});
