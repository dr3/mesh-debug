import fastify from "fastify";

const getUpstreamServer = () => {
  const server = fastify();

  server.route({
    method: ["GET", "POST"],
    url: "/pet/:petId",
    async handler(request, reply) {
      return reply
          .status(200)
          .send({ id: "pet200", name: "Bob", dob: "2016-02-01T00:00:00-11:00" });
    },
  });

  return server;
};

export default getUpstreamServer;
