# ⚠️ DEPRECATED - Use AWS CDK v2 Instead

**This library is no longer maintained and should not be used in new projects.**

AWS CDK v2 now provides native support for automatic Lambda versioning through the `currentVersion` property, which offers more comprehensive and reliable version management than this utility.

## Migration Guide

### Before (this library)

```typescript
import { NodejsLambdaVersion } from '@wpkyoto/nodejs-lambda-version';

const lambdaVersion = new NodejsLambdaVersion(this, 'MyFunction', {
  entry: 'lambda/handler.ts',
});

const version = lambdaVersion.version;
```

### After (AWS CDK v2)

```typescript
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

const fn = new NodejsFunction(this, 'MyFunction', {
  entry: 'lambda/handler.ts',
});

// Automatic version management with currentVersion
const version = fn.currentVersion;
```

### Why Migrate?

- ✅ **Better hash calculation**: Detects changes in bundled code, dependencies, and configuration
- ✅ **Layer support**: Automatically detects Lambda layer version changes
- ✅ **Active maintenance**: Official support from AWS CDK team
- ✅ **No additional dependencies**: Built into `aws-cdk-lib`

---

# Original Documentation

You should explore the contents of this project. It demonstrates a CDK Construct Library that includes a construct (`NodejsLambdaVersion`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The construct defines an interface (`NodejsLambdaVersionProps`) to configure the visibility timeout of the queue.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests