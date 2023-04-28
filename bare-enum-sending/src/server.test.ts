import { fetch } from '@whatwg-node/fetch';
import { app as server } from "./server";
import { server as upstream } from "./upstream";

const petQuery = `
mutation myMutation(
   $pet: PetInput!
 ) {
    postPet(
     input: $pet
   ) {
     ... on Pet {
        id
        name
        type
        debug
     }
     ... on BadRequestError {
        error
     }
     ... on ServerError {
       error
       severity
     }
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
          pet: {
            id: 'pet200',
            name: 'Bob',
            type: 'FLUFFYBOI'
          },
        }
      }),
    });

    const resJson = await response.json();

    console.log(JSON.stringify(resJson, null, 4))

    expect(JSON.parse(resJson.data.postPet.debug).type).toEqual('FluffyBoi');
  });
});
