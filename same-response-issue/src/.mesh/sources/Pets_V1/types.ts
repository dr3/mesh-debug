// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace PetsV1Types {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ObjMap: any;
};

export type Query = {
  v1_pet?: Maybe<v1_PetResponse>;
};


export type Queryv1_petArgs = {
  id: Scalars['String'];
};

export type v1_PetResponse = {
  pet?: Maybe<v1_Pet>;
  error?: Maybe<Scalars['String']>;
};

export type v1_Pet = {
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type v1_HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

  export type QuerySdk = {
      /** undefined **/
  v1_pet: InContextSdkMethod<Query['v1_pet'], Queryv1_petArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["Pets_V1"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
