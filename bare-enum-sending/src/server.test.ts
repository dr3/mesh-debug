import getServer from "./server";
import getUpstreamServer from "./upstream";

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
          pet: {
            id: 'pet200',
            name: 'Bob',
            type: 'FLUFFYBOI'
          },
        },
      }),
    });

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(JSON.parse(response.body).data.postPet.debug).type).toEqual('FluffyBoi');
  });
});
