# apollo-nexus-prisma-serverless
serverless architecture graphql server with apollo, nexus, prisma

This project is for the minimum size of GraphQuel servers in the serverless architecture.

## How to start
```
npm install -g serverless

serverless config credentials --provider aws --key yourKey --secret yourSecretKey

yarn add
```
And then edit your .env files
```
prisma generate --schema
yarn introspect

yarn offline 
yarn deploy:staging
yarn deploy:production
```


GraphQuel Server in Serverless Architecture Get Started Quickly With This Project. And then customize it to suit you.



