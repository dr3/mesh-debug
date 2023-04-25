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
  dummy?: Maybe<Scalars['String']>;
};

export type Mutation = {
  postPet?: Maybe<PostPetResponse>;
};


export type MutationpostPetArgs = {
  input?: InputMaybe<PetInput>;
};

export type PostPetResponse = Pet | BadRequestError | ServerError;

export type Pet = {
  id: Scalars['String'];
  name: Scalars['String'];
  type: PetType;
  debug?: Maybe<Scalars['String']>;
};

export type PetType =
  | 'FLUFFYBOI'
  | 'EVILCAT'
  | 'DUCK';

export type BadRequestError = {
  error: Scalars['String'];
};

export type ServerError = {
  error: Scalars['String'];
  severity: Scalars['String'];
};

export type PetInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  type: PetType;
  debug?: InputMaybe<Scalars['String']>;
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
  dummy: InContextSdkMethod<Query['dummy'], {}, MeshContext>
  };

  export type MutationSdk = {
      /** undefined **/
  postPet: InContextSdkMethod<Mutation['postPet'], MutationpostPetArgs, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["Pets_V1"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
