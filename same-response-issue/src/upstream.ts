import fastify from "fastify";

export const server = fastify();

server.route({
  method: ["GET", "POST"],
  url: "/pet/:petId",
  async handler(request, reply) {
    const { petId } = request.params as { petId: string };

    if (petId === "pet200") {
      return reply
        .status(200)
        .send({ pet: { id: "pet200", name: "Bob", type: "cat" } });
    }

    return reply.status(400).send({ pet: null, error: `can not find ${petId}` });
  },
});
