import { MeshContext } from "@graphql-mesh/runtime"

export default(url: string, init: RequestInit, context: MeshContext) => {
    console.log('CUSTOM FETCH', url);
    return fetch(url, init);
}
