import getServer from "./server";
import getUpstreamServer from "./upstream";

const petQuery = `
query myQuery(
   $petId: String!
 ) {
    v1_pet(
     id: $petId
   ) {
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
  const upsteamApp = getUpstreamServer();

  beforeAll(async () => {
    await upsteamApp.listen({ port: 8801 });
  });

  afterAll(async () => {
    upsteamApp.close();
  });

  it("should return data", async () => {
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
        v1_pet: {
          id: "pet200",
          name: "Bob",
          type: "cat",
        },
      },
    });
  });
});
