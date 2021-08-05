# shopify-trello-bridge

[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/5095/badge)](https://bestpractices.coreinfrastructure.org/projects/5095)

This is a [Serverless Stack](https://docs.serverless-stack.com) project to receive verified Shopify order creation webhooks and make Trello cards out of them. The stack consists of:

- An API Gateway endpoint to receive the webhook
- A Lambda function to process the webhook payload
- A set of Systems Manager Parameters to share secrets

## Usage

Start by installing the dependencies:

```bash
$ npm install
```

Then, start the local Lambda development environment:

```bash
$ npm run start
```

## Configuration

The Lambda function is configured via Systems Manager Parameters. Ensure that each of the following exists in the target AWS account parameter store prior to deploying the stack.

- `/shopify-trello-bridge/trello/oauth-token`: Trello API OAuth token.
- `/shopify-trello-bridge/trello/api-key`: Trello API key.
- `/shopify-trello-bridge/trello/list-id`: Target Trello list ID for the card.
- `/shopify-trello-bridge/shopify/webhook-secret`: Shopify webhook verification token.

Using the AWS CLI, you can create these parameters with a command like:

```bash
$ aws ssm put-parameter \
    --name "/shopify-trello-bridge/trello/list-id" \
    --type "SecureString" \
    --value "60b3da24124c475b5be6bg8d"
```
