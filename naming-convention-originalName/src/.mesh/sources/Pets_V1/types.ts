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
  petByPetId?: Maybe<PetByPetIdResponse>;
};


export type QuerypetByPetIdArgs = {
  petId: Scalars['String'];
};

export type PetByPetIdResponse = Pet | PetNotFoundError | ServerError;

export type Pet = {
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type PetNotFoundError = {
  error: Scalars['String'];
};

export type ServerError = {
  error: Scalars['String'];
  severity: Scalars['String'];
};

export type HttpMethod =
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
  petByPetId: InContextSdkMethod<Query['petByPetId'], QuerypetByPetIdArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["Pets_V1"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
