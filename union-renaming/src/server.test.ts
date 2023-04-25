import getServer from "./server";
import getUpstreamServer from "./upstream";

const petQuery = `
query myQuery(
   $petId: String!
 ) {
  pet_by_petId(
     petId: $petId
   ) {
     __typename
     ... on Pet {
        id
        name
        type
     }
     ... on PetNotFoundError {
        error
     }
     ... on EvilError {
       error
       severity
     }
   }
 }
`;

describe("server", () => {
  const upsteamApp = getUpstreamServer();

  beforeAll(async () => {
    await upsteamApp.listen({ port: 8801 });
  });

  afterAll(async () => {
    upsteamApp.close();
  });

  it("should return data for 200", async () => {
    const app = await getServer();

    const response = await app.inject({
      method: "POST",
      url: "/graphql",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      payload: JSON.stringify({
        query: petQuery,
        variables: {
          petId: "pet200",
        },
      }),
    });

    // expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual({
      data: {
        pet: {
          __typename: "Pet",
          id: "pet200",
          name: "Bob",
          type: "cat",
        },
      },
    });
  });

  it("should return data for 400", async () => {
    const app = await getServer();

    const response = await app.inject({
      method: "POST",
      url: "/graphql",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      payload: JSON.stringify({
        query: petQuery,
        variables: {
          petId: "pet400",
        },
      }),
    });

    // expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual({
      data: {
        pet: {
          __typename: "PetNotFoundError",
          error: "can not find pet400"
        },
      },
    });
  });

  it("should return data for 500", async () => {
    const app = await getServer();

    const response = await app.inject({
      method: "POST",
      url: "/graphql",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      payload: JSON.stringify({
        query: petQuery,
        variables: {
          petId: "pet500",
        },
      }),
    });

    // expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual({
      data: {
        pet: {
          __typename: "EvilError",
          error: "this is bad",
          severity: "real bad"
        },
      },
    });
  });
});
