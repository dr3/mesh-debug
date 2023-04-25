// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace EmployeesV1Types {
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
  v1_employee_by_employeeId?: Maybe<v1_employee_by_employeeId_response>;
};


export type Queryv1_employee_by_employeeIdArgs = {
  employeeId: Scalars['String'];
};

export type v1_employee_by_employeeId_response = v1_Employee | v1_EmployeeNotFoundError | v1_ServerError;

export type v1_Employee = {
  id: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
};

export type v1_EmployeeNotFoundError = {
  error: Scalars['String'];
};

export type v1_ServerError = {
  error: Scalars['String'];
  severity: Scalars['String'];
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
  v1_employee_by_employeeId: InContextSdkMethod<Query['v1_employee_by_employeeId'], Queryv1_employee_by_employeeIdArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["Employees_V1"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
