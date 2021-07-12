const { ApolloServer } = require('apollo-server-lambda');
import { PrismaClient } from "@prisma/client";

import { Context } from "./graphql"

import { asNexusMethod, makeSchema } from "nexus";
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';

import * as path from 'path';

import { account } from "./graphql/schema/account/type";
import { GraphQLBigInt } from "./graphql/type";

import Query from './graphql/query';

const schema = makeSchema({
  types: [Query, account, asNexusMethod(GraphQLBigInt, 'BigInt')],
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      paginationStrategy: 'prisma',
      prismaClient: (ctx: Context) => ctx.db,
      outputs: {
        typegen: path.join(`${process.env.NODE_ENV === "development" ? __dirname : ""}` + '/tmp/generated/typegen-nexus-plugin-prisma.d.ts'),
      },
    })
  ],
  outputs: {
    schema: path.join(`${process.env.NODE_ENV === "development" ? __dirname : ""}` + '/tmp/generated/schema.graphql'),
    typegen: path.join(`${process.env.NODE_ENV === "development" ? __dirname : ""}` + '/tmp/generated/nexus.ts')
  }
});

const server = new ApolloServer({
  schema: schema,
  context: async ({ req }): Promise<Context> => ({
    db: new PrismaClient()
  }),
  playground: process.env.NODE_ENV === "production"
    ? false
    : {
      endpoint: `/${process.env.NODE_ENV}/graphql`,
    }
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});