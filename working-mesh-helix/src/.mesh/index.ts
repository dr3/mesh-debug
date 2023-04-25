// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import OpenapiHandler from "@graphql-mesh/openapi"
import RenameTransform from "@graphql-mesh/transform-rename";
import PruneTransform from "@graphql-mesh/transform-prune";
import PrefixTransform from "@graphql-mesh/transform-prefix";
import BareMerger from "@graphql-mesh/merger-bare";
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { PetsV1Types } from './sources/Pets_V1/types';
import type { EmployeesV1Types } from './sources/Employees_V1/types';
import * as importedModule$0 from "./sources/Pets_V1/schemaWithAnnotations";
import * as importedModule$1 from "./sources/Employees_V1/schemaWithAnnotations";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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
  v1_pet?: Maybe<v1_pet_by_petId_response>;
  v1_employee_by_employeeId?: Maybe<v1_employee_by_employeeId_response>;
};


export type Queryv1_petArgs = {
  id: Scalars['String'];
};


export type Queryv1_employee_by_employeeIdArgs = {
  employeeId: Scalars['String'];
};

export type v1_pet_by_petId_response = v1_Pet | v1_PetNotFoundError | v1_ServerError;

export type v1_Pet = {
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type v1_PetNotFoundError = {
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

export type v1_employee_by_employeeId_response = v1_Employee | v1_EmployeeNotFoundError | v1_ServerError;

export type v1_Employee = {
  id: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
};

export type v1_EmployeeNotFoundError = {
  error: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes = ResolversObject<{
  v1_pet_by_petId_response: ( v1_Pet ) | ( v1_PetNotFoundError ) | ( v1_ServerError );
  v1_employee_by_employeeId_response: ( v1_Employee ) | ( v1_EmployeeNotFoundError ) | ( v1_ServerError );
}>;

/** Mapping of union parent types */
export type ResolversUnionParentTypes = ResolversObject<{
  v1_pet_by_petId_response: ( v1_Pet ) | ( v1_PetNotFoundError ) | ( v1_ServerError );
  v1_employee_by_employeeId_response: ( v1_Employee ) | ( v1_EmployeeNotFoundError ) | ( v1_ServerError );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  v1_pet_by_petId_response: ResolverTypeWrapper<ResolversUnionTypes['v1_pet_by_petId_response']>;
  v1_Pet: ResolverTypeWrapper<v1_Pet>;
  v1_PetNotFoundError: ResolverTypeWrapper<v1_PetNotFoundError>;
  v1_ServerError: ResolverTypeWrapper<v1_ServerError>;
  ObjMap: ResolverTypeWrapper<Scalars['ObjMap']>;
  v1_HTTPMethod: v1_HTTPMethod;
  v1_employee_by_employeeId_response: ResolverTypeWrapper<ResolversUnionTypes['v1_employee_by_employeeId_response']>;
  v1_Employee: ResolverTypeWrapper<v1_Employee>;
  v1_EmployeeNotFoundError: ResolverTypeWrapper<v1_EmployeeNotFoundError>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  String: Scalars['String'];
  v1_pet_by_petId_response: ResolversUnionParentTypes['v1_pet_by_petId_response'];
  v1_Pet: v1_Pet;
  v1_PetNotFoundError: v1_PetNotFoundError;
  v1_ServerError: v1_ServerError;
  ObjMap: Scalars['ObjMap'];
  v1_employee_by_employeeId_response: ResolversUnionParentTypes['v1_employee_by_employeeId_response'];
  v1_Employee: v1_Employee;
  v1_EmployeeNotFoundError: v1_EmployeeNotFoundError;
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
}>;

export type oneOfDirectiveArgs = { };

export type oneOfDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = oneOfDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type statusCodeTypeNameDirectiveArgs = {
  typeName?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['ID']>;
};

export type statusCodeTypeNameDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = statusCodeTypeNameDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type globalOptionsDirectiveArgs = {
  sourceName?: Maybe<Scalars['String']>;
  endpoint?: Maybe<Scalars['String']>;
  operationHeaders?: Maybe<Scalars['ObjMap']>;
  queryStringOptions?: Maybe<Scalars['ObjMap']>;
  queryParams?: Maybe<Scalars['ObjMap']>;
};

export type globalOptionsDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = globalOptionsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type httpOperationDirectiveArgs = {
  path?: Maybe<Scalars['String']>;
  operationSpecificHeaders?: Maybe<Scalars['ObjMap']>;
  httpMethod?: Maybe<v1_HTTPMethod>;
  isBinary?: Maybe<Scalars['Boolean']>;
  requestBaseBody?: Maybe<Scalars['ObjMap']>;
  queryParamArgMap?: Maybe<Scalars['ObjMap']>;
  queryStringOptionsByParam?: Maybe<Scalars['ObjMap']>;
};

export type httpOperationDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = httpOperationDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  v1_pet?: Resolver<Maybe<ResolversTypes['v1_pet_by_petId_response']>, ParentType, ContextType, RequireFields<Queryv1_petArgs, 'id'>>;
  v1_employee_by_employeeId?: Resolver<Maybe<ResolversTypes['v1_employee_by_employeeId_response']>, ParentType, ContextType, RequireFields<Queryv1_employee_by_employeeIdArgs, 'employeeId'>>;
}>;

export type v1_pet_by_petId_responseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['v1_pet_by_petId_response'] = ResolversParentTypes['v1_pet_by_petId_response']> = ResolversObject<{
  __resolveType: TypeResolveFn<'v1_Pet' | 'v1_PetNotFoundError' | 'v1_ServerError', ParentType, ContextType>;
}>;

export type v1_PetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['v1_Pet'] = ResolversParentTypes['v1_Pet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type v1_PetNotFoundErrorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['v1_PetNotFoundError'] = ResolversParentTypes['v1_PetNotFoundError']> = ResolversObject<{
  error?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type v1_ServerErrorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['v1_ServerError'] = ResolversParentTypes['v1_ServerError']> = ResolversObject<{
  error?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  severity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface ObjMapScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjMap'], any> {
  name: 'ObjMap';
}

export type v1_employee_by_employeeId_responseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['v1_employee_by_employeeId_response'] = ResolversParentTypes['v1_employee_by_employeeId_response']> = ResolversObject<{
  __resolveType: TypeResolveFn<'v1_Employee' | 'v1_EmployeeNotFoundError' | 'v1_ServerError', ParentType, ContextType>;
}>;

export type v1_EmployeeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['v1_Employee'] = ResolversParentTypes['v1_Employee']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type v1_EmployeeNotFoundErrorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['v1_EmployeeNotFoundError'] = ResolversParentTypes['v1_EmployeeNotFoundError']> = ResolversObject<{
  error?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  v1_pet_by_petId_response?: v1_pet_by_petId_responseResolvers<ContextType>;
  v1_Pet?: v1_PetResolvers<ContextType>;
  v1_PetNotFoundError?: v1_PetNotFoundErrorResolvers<ContextType>;
  v1_ServerError?: v1_ServerErrorResolvers<ContextType>;
  ObjMap?: GraphQLScalarType;
  v1_employee_by_employeeId_response?: v1_employee_by_employeeId_responseResolvers<ContextType>;
  v1_Employee?: v1_EmployeeResolvers<ContextType>;
  v1_EmployeeNotFoundError?: v1_EmployeeNotFoundErrorResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  oneOf?: oneOfDirectiveResolver<any, any, ContextType>;
  statusCodeTypeName?: statusCodeTypeNameDirectiveResolver<any, any, ContextType>;
  globalOptions?: globalOptionsDirectiveResolver<any, any, ContextType>;
  httpOperation?: httpOperationDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = PetsV1Types.Context & EmployeesV1Types.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".mesh/sources/Pets_V1/schemaWithAnnotations":
      return Promise.resolve(importedModule$0) as T;
    
    case ".mesh/sources/Employees_V1/schemaWithAnnotations":
      return Promise.resolve(importedModule$1) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("🕸️  Mesh");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const petsV1Transforms = [];
const employeesV1Transforms = [];
const additionalTypeDefs = [] as any[];
const petsV1Handler = new OpenapiHandler({
              name: "Pets_V1",
              config: {"source":"../swagger/pets.v1.json","endpoint":"http://localhost:8801"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("Pets_V1"),
              logger: logger.child("Pets_V1"),
              importFn,
            });
const employeesV1Handler = new OpenapiHandler({
              name: "Employees_V1",
              config: {"source":"../swagger/employees.v1.json","endpoint":"http://localhost:8801"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("Employees_V1"),
              logger: logger.child("Employees_V1"),
              importFn,
            });
petsV1Transforms[0] = new RenameTransform({
                  apiName: "Pets_V1",
                  config: {"mode":"bare","renames":[{"from":{"type":"Query","field":"pet_by_petId"},"to":{"type":"Query","field":"pet"}},{"from":{"type":"Query","field":"pet_by_petId","argument":"petId"},"to":{"type":"Query","field":"pet_by_petId","argument":"id"}}]},
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
petsV1Transforms[1] = new PruneTransform({
                  apiName: "Pets_V1",
                  config: {"skipPruning":[]},
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
petsV1Transforms[2] = new PrefixTransform({
                  apiName: "Pets_V1",
                  config: {"mode":"bare","value":"v1_","includeRootOperations":true,"ignore":["ObjMap"]},
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
employeesV1Transforms[0] = new PruneTransform({
                  apiName: "Employees_V1",
                  config: {"skipPruning":[]},
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
employeesV1Transforms[1] = new PrefixTransform({
                  apiName: "Employees_V1",
                  config: {"mode":"bare","value":"v1_","includeRootOperations":true,"ignore":["ObjMap"]},
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
sources[0] = {
          name: 'Pets_V1',
          handler: petsV1Handler,
          transforms: petsV1Transforms
        }
sources[1] = {
          name: 'Employees_V1',
          handler: employeesV1Handler,
          transforms: employeesV1Transforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltMesh,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltMesh(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltMesh().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltMesh().then(({ subscribe }) => subscribe(...args));