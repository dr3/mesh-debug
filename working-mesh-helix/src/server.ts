import fastify from "fastify";
import { createBuiltMeshHTTPHandler } from "./.mesh/index";

const getServer = async () => { 
  const app = fastify()
  
  const meshHttp = createBuiltMeshHTTPHandler()
  
  app.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    async handler(req, reply) {
      const response = await meshHttp.handleNodeRequest(req, {
        req,
        reply
      })

      response.headers.forEach((value, key) => {
        reply.header(key, value)
      })
  
      reply.status(response.status)

      return reply.send(response.body)
    }
  })

  return app;
};

export default getServer;
