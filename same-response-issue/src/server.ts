import fastify from "fastify";
import { envelop, useEngine, useSchema } from "@envelop/core";
import * as GraphQLJS from "graphql";
import { getBuiltMesh } from "./.mesh/index";
import {
  getGraphQLParameters,
  processRequest,
  sendResult,
} from "graphql-helix";

const getServer = async () => {
  const server = fastify();
  const { schema, plugins } = await getBuiltMesh();

  const helixConfig = {
    getEnveloped: envelop({
      plugins: [...plugins, useEngine(GraphQLJS), useSchema(schema)],
    }),
    enhanceResponseErrors: true,
  };

  server.route({
    method: "POST",
    url: "/graphql",
    async handler(request, reply) {
      const { parse, validate, contextFactory, execute, schema } =
        helixConfig.getEnveloped({ request });
      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest({
        operationName,
        query: query,
        variables,
        request,
        schema,
        parse,
        validate,
        execute,
        contextFactory,
      });

      sendResult(result, reply.raw);
    },
  });

  return server;
};

export default getServer;
