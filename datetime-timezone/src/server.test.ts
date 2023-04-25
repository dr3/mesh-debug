import getServer from "./server";
import getUpstreamServer from "./upstream";

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

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual({
      data: {
        pet_by_petId: {
          dob: "2016-02-01T00:00:00-11:00",
        },
      },
    });
  });
});
