import { fetch } from '@whatwg-node/fetch';
import { app as server } from "./server";
import { server as upstream } from "./upstream";

const petQuery = `
query myQuery(
   $petId: String!
 ) {
    v1_pet(
     id: $petId
   ) {
     __typename
     ... on v1_Pet {
        id
        name
        type
     }
     ... on v1_PetNotFoundError {
        error
     }
     ... on v1_ServerError {
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

  it("should return data for 200", async () => {
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
        v1_pet: {
          __typename: "v1_Pet",
          id: "pet200",
          name: "Bob",
          type: "cat",
        },
      },
    });
  });

  it("should return data for 400", async () => {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: petQuery,
        variables: {
          petId: "pet400",
        }
      }),
    });

    const resJson = await response.json();

    expect(resJson).toEqual({
      data: {
        v1_pet: {
          __typename: "v1_PetNotFoundError",
          error: "can not find pet400"
        },
      },
    });
  });

  it("should return data for 500", async () => {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: petQuery,
        variables: {
          petId: "pet500",
        }
      }),
    });

    const resJson = await response.json();

    expect(resJson).toEqual({
      data: {
        v1_pet: {
          __typename: "v1_ServerError",
          error: "this is bad",
          severity: "real bad"
        },
      },
    });
  });
});
