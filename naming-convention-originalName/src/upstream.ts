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
        .send({ id: "pet200", name: "Bob", type: "cat" });
    }

    if (petId === "pet500") {
      return reply
        .status(500)
        .send({ error: "this is bad", severity: "real bad" });
    }

    return reply.status(500).send({ error: `can not find ${petId}` });
  },
});

server.route({
  method: ["GET"],
  url: "/employee/:employeeId",
  async handler(request, reply) {
    const { employeeId } = request.params as { employeeId: string };

    if (employeeId === "employee200") {
      return reply
        .status(200)
        .send({ id: "employee200", name: "John Doe", title: "CEO" });
    }

    if (employeeId === "employee500") {
      return reply
        .status(500)
        .send({ error: "this is bad", severity: "real bad" });
    }

    return reply.status(500).send({ error: `can not find ${employeeId}` });
  },
});
