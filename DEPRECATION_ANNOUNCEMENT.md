# End of Life Announcement for @wpkyoto/nodejs-lambda-version

After careful consideration, we are officially deprecating the `@wpkyoto/nodejs-lambda-version` library. This decision comes as AWS CDK v2 now provides native, superior functionality that makes this utility obsolete.

## Why We're Deprecating

When this library was created in 2020, AWS CDK v1 lacked automatic versioning for Lambda functions. We built this utility to automatically create Lambda versions based on source code hashes. However, the CDK ecosystem has evolved significantly:

**AWS CDK v2 now provides:**
- Native `currentVersion` property on Lambda functions
- Comprehensive hash calculation that detects changes in bundled code, dependencies, and configuration
- Automatic detection of Lambda layer version changes
- Better handling of metadata changes to prevent unnecessary version creation
- Official support and active maintenance from the AWS CDK team

In contrast, our library only hashes the entry file, missing dependency changes and configuration updates. Maintaining a separate utility when the official CDK provides better functionality no longer makes sense.

## Migration Path

Migration is straightforward and requires minimal code changes:

**Before:**
```typescript
import { NodejsLambdaVersion } from '@wpkyoto/nodejs-lambda-version';

const lambdaVersion = new NodejsLambdaVersion(this, 'MyFunction', {
  entry: 'lambda/handler.ts',
});

const version = lambdaVersion.version;
```

**After:**
```typescript
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

const fn = new NodejsFunction(this, 'MyFunction', {
  entry: 'lambda/handler.ts',
});

const version = fn.currentVersion;
```

## Timeline

- **Immediately**: No new features will be added
- **Now**: README updated with deprecation notice and migration guide
- **Going forward**: No bug fixes or security updates will be provided

## Recommendations

We strongly recommend all users:
1. **Migrate to AWS CDK v2** if you haven't already
2. **Use the native `currentVersion` property** instead of this library
3. **Update your dependencies** to remove `@wpkyoto/nodejs-lambda-version`

## Resources

- [AWS CDK v2 Lambda Documentation](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda-readme.html)
- [AWS CDK v2 Migration Guide](https://docs.aws.amazon.com/cdk/v2/guide/migrating-v2.html)
- [NodejsFunction Documentation](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs-readme.html)

## Thank You

Thank you to everyone who used this library over the years. Your support helped fill a gap in the CDK ecosystem. Now that AWS provides native support, it's time to pass the torch to the official implementation.

If you have questions or concerns about this migration, please feel free to open an issue.
