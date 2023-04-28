import { fetch } from '@whatwg-node/fetch';
import { app as server } from "./server";
import { server as upstream } from "./upstream";

const petQuery = `
query myQuery(
   $petId: String!
 ) {
    pet_by_petId(
     petId: $petId
   ) {
      dob
   }
 }
`;

describe("server", () => {
  beforeAll(async () => {
    await server.listen({
      port: 4000,
    });
    await upstream.listen({
      port: 4001,
    });
  });

  afterAll(async () => {
    await server.close();
    await upstream.close();
  });

  it("should return data", async () => {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: petQuery,
        variables: {
          petId: "pet200",
        }
      }),
    });

    const resJson = await response.json();

    expect(resJson).toEqual({
      data: {
        pet_by_petId: {
          dob: "2016-02-01T00:00:00-11:00",
        },
      },
    });
  });
});
