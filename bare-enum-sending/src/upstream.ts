import fastify from "fastify";

export const server = fastify();

server.route({
  method: ["POST"],
  url: "/pet",
  async handler(request, reply) {
    const body = request.body as any

    if (body.id === "pet200") {
      return reply
        .status(200)
        .send({ ...body, debug: JSON.stringify(body) });
    }

    if (body.id === "pet500") {
      return reply
        .status(500)
        .send({ error: "this is bad", severity: "real bad" });
    }

    return reply.status(500).send({ error: `can not create pet` });
  },
});
