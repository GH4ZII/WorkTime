
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Shift
 * 
 */
export type Shift = $Result.DefaultSelection<Prisma.$ShiftPayload>
/**
 * Model TimeOffRequest
 * 
 */
export type TimeOffRequest = $Result.DefaultSelection<Prisma.$TimeOffRequestPayload>
/**
 * Model ShiftSwapRequest
 * 
 */
export type ShiftSwapRequest = $Result.DefaultSelection<Prisma.$ShiftSwapRequestPayload>
/**
 * Model WorkLog
 * 
 */
export type WorkLog = $Result.DefaultSelection<Prisma.$WorkLogPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model ChatRoom
 * 
 */
export type ChatRoom = $Result.DefaultSelection<Prisma.$ChatRoomPayload>
/**
 * Model ChatMember
 * 
 */
export type ChatMember = $Result.DefaultSelection<Prisma.$ChatMemberPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ShiftStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ShiftStatus = (typeof ShiftStatus)[keyof typeof ShiftStatus]


export const RequestStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]


export const TimeOffType: {
  VACATION: 'VACATION',
  SICK: 'SICK',
  OTHER: 'OTHER'
};

export type TimeOffType = (typeof TimeOffType)[keyof typeof TimeOffType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ShiftStatus = $Enums.ShiftStatus

export const ShiftStatus: typeof $Enums.ShiftStatus

export type RequestStatus = $Enums.RequestStatus

export const RequestStatus: typeof $Enums.RequestStatus

export type TimeOffType = $Enums.TimeOffType

export const TimeOffType: typeof $Enums.TimeOffType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shift`: Exposes CRUD operations for the **Shift** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shifts
    * const shifts = await prisma.shift.findMany()
    * ```
    */
  get shift(): Prisma.ShiftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timeOffRequest`: Exposes CRUD operations for the **TimeOffRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimeOffRequests
    * const timeOffRequests = await prisma.timeOffRequest.findMany()
    * ```
    */
  get timeOffRequest(): Prisma.TimeOffRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shiftSwapRequest`: Exposes CRUD operations for the **ShiftSwapRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShiftSwapRequests
    * const shiftSwapRequests = await prisma.shiftSwapRequest.findMany()
    * ```
    */
  get shiftSwapRequest(): Prisma.ShiftSwapRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workLog`: Exposes CRUD operations for the **WorkLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkLogs
    * const workLogs = await prisma.workLog.findMany()
    * ```
    */
  get workLog(): Prisma.WorkLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatRoom`: Exposes CRUD operations for the **ChatRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatRooms
    * const chatRooms = await prisma.chatRoom.findMany()
    * ```
    */
  get chatRoom(): Prisma.ChatRoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMember`: Exposes CRUD operations for the **ChatMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMembers
    * const chatMembers = await prisma.chatMember.findMany()
    * ```
    */
  get chatMember(): Prisma.ChatMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Shift: 'Shift',
    TimeOffRequest: 'TimeOffRequest',
    ShiftSwapRequest: 'ShiftSwapRequest',
    WorkLog: 'WorkLog',
    Notification: 'Notification',
    ChatRoom: 'ChatRoom',
    ChatMember: 'ChatMember',
    Message: 'Message'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "shift" | "timeOffRequest" | "shiftSwapRequest" | "workLog" | "notification" | "chatRoom" | "chatMember" | "message"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Shift: {
        payload: Prisma.$ShiftPayload<ExtArgs>
        fields: Prisma.ShiftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShiftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShiftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          findFirst: {
            args: Prisma.ShiftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShiftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          findMany: {
            args: Prisma.ShiftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>[]
          }
          create: {
            args: Prisma.ShiftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          createMany: {
            args: Prisma.ShiftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShiftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>[]
          }
          delete: {
            args: Prisma.ShiftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          update: {
            args: Prisma.ShiftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          deleteMany: {
            args: Prisma.ShiftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShiftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShiftUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>[]
          }
          upsert: {
            args: Prisma.ShiftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          aggregate: {
            args: Prisma.ShiftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShift>
          }
          groupBy: {
            args: Prisma.ShiftGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShiftGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShiftCountArgs<ExtArgs>
            result: $Utils.Optional<ShiftCountAggregateOutputType> | number
          }
        }
      }
      TimeOffRequest: {
        payload: Prisma.$TimeOffRequestPayload<ExtArgs>
        fields: Prisma.TimeOffRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeOffRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeOffRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload>
          }
          findFirst: {
            args: Prisma.TimeOffRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeOffRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload>
          }
          findMany: {
            args: Prisma.TimeOffRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload>[]
          }
          create: {
            args: Prisma.TimeOffRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload>
          }
          createMany: {
            args: Prisma.TimeOffRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimeOffRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload>[]
          }
          delete: {
            args: Prisma.TimeOffRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload>
          }
          update: {
            args: Prisma.TimeOffRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload>
          }
          deleteMany: {
            args: Prisma.TimeOffRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeOffRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimeOffRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload>[]
          }
          upsert: {
            args: Prisma.TimeOffRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeOffRequestPayload>
          }
          aggregate: {
            args: Prisma.TimeOffRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeOffRequest>
          }
          groupBy: {
            args: Prisma.TimeOffRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeOffRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeOffRequestCountArgs<ExtArgs>
            result: $Utils.Optional<TimeOffRequestCountAggregateOutputType> | number
          }
        }
      }
      ShiftSwapRequest: {
        payload: Prisma.$ShiftSwapRequestPayload<ExtArgs>
        fields: Prisma.ShiftSwapRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShiftSwapRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShiftSwapRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload>
          }
          findFirst: {
            args: Prisma.ShiftSwapRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShiftSwapRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload>
          }
          findMany: {
            args: Prisma.ShiftSwapRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload>[]
          }
          create: {
            args: Prisma.ShiftSwapRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload>
          }
          createMany: {
            args: Prisma.ShiftSwapRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShiftSwapRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload>[]
          }
          delete: {
            args: Prisma.ShiftSwapRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload>
          }
          update: {
            args: Prisma.ShiftSwapRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload>
          }
          deleteMany: {
            args: Prisma.ShiftSwapRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShiftSwapRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShiftSwapRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload>[]
          }
          upsert: {
            args: Prisma.ShiftSwapRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftSwapRequestPayload>
          }
          aggregate: {
            args: Prisma.ShiftSwapRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShiftSwapRequest>
          }
          groupBy: {
            args: Prisma.ShiftSwapRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShiftSwapRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShiftSwapRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ShiftSwapRequestCountAggregateOutputType> | number
          }
        }
      }
      WorkLog: {
        payload: Prisma.$WorkLogPayload<ExtArgs>
        fields: Prisma.WorkLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          findFirst: {
            args: Prisma.WorkLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          findMany: {
            args: Prisma.WorkLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>[]
          }
          create: {
            args: Prisma.WorkLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          createMany: {
            args: Prisma.WorkLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>[]
          }
          delete: {
            args: Prisma.WorkLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          update: {
            args: Prisma.WorkLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          deleteMany: {
            args: Prisma.WorkLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>[]
          }
          upsert: {
            args: Prisma.WorkLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          aggregate: {
            args: Prisma.WorkLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkLog>
          }
          groupBy: {
            args: Prisma.WorkLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkLogCountArgs<ExtArgs>
            result: $Utils.Optional<WorkLogCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      ChatRoom: {
        payload: Prisma.$ChatRoomPayload<ExtArgs>
        fields: Prisma.ChatRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload>
          }
          findFirst: {
            args: Prisma.ChatRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload>
          }
          findMany: {
            args: Prisma.ChatRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload>[]
          }
          create: {
            args: Prisma.ChatRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload>
          }
          createMany: {
            args: Prisma.ChatRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload>[]
          }
          delete: {
            args: Prisma.ChatRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload>
          }
          update: {
            args: Prisma.ChatRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload>
          }
          deleteMany: {
            args: Prisma.ChatRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatRoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload>[]
          }
          upsert: {
            args: Prisma.ChatRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatRoomPayload>
          }
          aggregate: {
            args: Prisma.ChatRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatRoom>
          }
          groupBy: {
            args: Prisma.ChatRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatRoomCountArgs<ExtArgs>
            result: $Utils.Optional<ChatRoomCountAggregateOutputType> | number
          }
        }
      }
      ChatMember: {
        payload: Prisma.$ChatMemberPayload<ExtArgs>
        fields: Prisma.ChatMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          findFirst: {
            args: Prisma.ChatMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          findMany: {
            args: Prisma.ChatMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>[]
          }
          create: {
            args: Prisma.ChatMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          createMany: {
            args: Prisma.ChatMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>[]
          }
          delete: {
            args: Prisma.ChatMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          update: {
            args: Prisma.ChatMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          deleteMany: {
            args: Prisma.ChatMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>[]
          }
          upsert: {
            args: Prisma.ChatMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          aggregate: {
            args: Prisma.ChatMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMember>
          }
          groupBy: {
            args: Prisma.ChatMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMemberCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMemberCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    shift?: ShiftOmit
    timeOffRequest?: TimeOffRequestOmit
    shiftSwapRequest?: ShiftSwapRequestOmit
    workLog?: WorkLogOmit
    notification?: NotificationOmit
    chatRoom?: ChatRoomOmit
    chatMember?: ChatMemberOmit
    message?: MessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    shifts: number
    timeOffRequests: number
    shiftSwapRequests: number
    shiftSwapsWith: number
    workLogs: number
    notifications: number
    chatMemberships: number
    messages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shifts?: boolean | UserCountOutputTypeCountShiftsArgs
    timeOffRequests?: boolean | UserCountOutputTypeCountTimeOffRequestsArgs
    shiftSwapRequests?: boolean | UserCountOutputTypeCountShiftSwapRequestsArgs
    shiftSwapsWith?: boolean | UserCountOutputTypeCountShiftSwapsWithArgs
    workLogs?: boolean | UserCountOutputTypeCountWorkLogsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    chatMemberships?: boolean | UserCountOutputTypeCountChatMembershipsArgs
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountShiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTimeOffRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeOffRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountShiftSwapRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftSwapRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountShiftSwapsWithArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftSwapRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChatMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type ShiftCountOutputType
   */

  export type ShiftCountOutputType = {
    swapRequestsFrom: number
    swapRequestsTo: number
    workLogs: number
  }

  export type ShiftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    swapRequestsFrom?: boolean | ShiftCountOutputTypeCountSwapRequestsFromArgs
    swapRequestsTo?: boolean | ShiftCountOutputTypeCountSwapRequestsToArgs
    workLogs?: boolean | ShiftCountOutputTypeCountWorkLogsArgs
  }

  // Custom InputTypes
  /**
   * ShiftCountOutputType without action
   */
  export type ShiftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftCountOutputType
     */
    select?: ShiftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShiftCountOutputType without action
   */
  export type ShiftCountOutputTypeCountSwapRequestsFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftSwapRequestWhereInput
  }

  /**
   * ShiftCountOutputType without action
   */
  export type ShiftCountOutputTypeCountSwapRequestsToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftSwapRequestWhereInput
  }

  /**
   * ShiftCountOutputType without action
   */
  export type ShiftCountOutputTypeCountWorkLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkLogWhereInput
  }


  /**
   * Count Type ChatRoomCountOutputType
   */

  export type ChatRoomCountOutputType = {
    members: number
    messages: number
  }

  export type ChatRoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ChatRoomCountOutputTypeCountMembersArgs
    messages?: boolean | ChatRoomCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ChatRoomCountOutputType without action
   */
  export type ChatRoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoomCountOutputType
     */
    select?: ChatRoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChatRoomCountOutputType without action
   */
  export type ChatRoomCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMemberWhereInput
  }

  /**
   * ChatRoomCountOutputType without action
   */
  export type ChatRoomCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    passwordHash: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    phone: string | null
    passwordHash: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shifts?: boolean | User$shiftsArgs<ExtArgs>
    timeOffRequests?: boolean | User$timeOffRequestsArgs<ExtArgs>
    shiftSwapRequests?: boolean | User$shiftSwapRequestsArgs<ExtArgs>
    shiftSwapsWith?: boolean | User$shiftSwapsWithArgs<ExtArgs>
    workLogs?: boolean | User$workLogsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    chatMemberships?: boolean | User$chatMembershipsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shifts?: boolean | User$shiftsArgs<ExtArgs>
    timeOffRequests?: boolean | User$timeOffRequestsArgs<ExtArgs>
    shiftSwapRequests?: boolean | User$shiftSwapRequestsArgs<ExtArgs>
    shiftSwapsWith?: boolean | User$shiftSwapsWithArgs<ExtArgs>
    workLogs?: boolean | User$workLogsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    chatMemberships?: boolean | User$chatMembershipsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      shifts: Prisma.$ShiftPayload<ExtArgs>[]
      timeOffRequests: Prisma.$TimeOffRequestPayload<ExtArgs>[]
      shiftSwapRequests: Prisma.$ShiftSwapRequestPayload<ExtArgs>[]
      shiftSwapsWith: Prisma.$ShiftSwapRequestPayload<ExtArgs>[]
      workLogs: Prisma.$WorkLogPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      chatMemberships: Prisma.$ChatMemberPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      phone: string | null
      passwordHash: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shifts<T extends User$shiftsArgs<ExtArgs> = {}>(args?: Subset<T, User$shiftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    timeOffRequests<T extends User$timeOffRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$timeOffRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shiftSwapRequests<T extends User$shiftSwapRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$shiftSwapRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shiftSwapsWith<T extends User$shiftSwapsWithArgs<ExtArgs> = {}>(args?: Subset<T, User$shiftSwapsWithArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workLogs<T extends User$workLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$workLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chatMemberships<T extends User$chatMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$chatMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.shifts
   */
  export type User$shiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    where?: ShiftWhereInput
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    cursor?: ShiftWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * User.timeOffRequests
   */
  export type User$timeOffRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
    where?: TimeOffRequestWhereInput
    orderBy?: TimeOffRequestOrderByWithRelationInput | TimeOffRequestOrderByWithRelationInput[]
    cursor?: TimeOffRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeOffRequestScalarFieldEnum | TimeOffRequestScalarFieldEnum[]
  }

  /**
   * User.shiftSwapRequests
   */
  export type User$shiftSwapRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    where?: ShiftSwapRequestWhereInput
    orderBy?: ShiftSwapRequestOrderByWithRelationInput | ShiftSwapRequestOrderByWithRelationInput[]
    cursor?: ShiftSwapRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShiftSwapRequestScalarFieldEnum | ShiftSwapRequestScalarFieldEnum[]
  }

  /**
   * User.shiftSwapsWith
   */
  export type User$shiftSwapsWithArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    where?: ShiftSwapRequestWhereInput
    orderBy?: ShiftSwapRequestOrderByWithRelationInput | ShiftSwapRequestOrderByWithRelationInput[]
    cursor?: ShiftSwapRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShiftSwapRequestScalarFieldEnum | ShiftSwapRequestScalarFieldEnum[]
  }

  /**
   * User.workLogs
   */
  export type User$workLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    where?: WorkLogWhereInput
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    cursor?: WorkLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkLogScalarFieldEnum | WorkLogScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.chatMemberships
   */
  export type User$chatMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    where?: ChatMemberWhereInput
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    cursor?: ChatMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMemberScalarFieldEnum | ChatMemberScalarFieldEnum[]
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Shift
   */

  export type AggregateShift = {
    _count: ShiftCountAggregateOutputType | null
    _min: ShiftMinAggregateOutputType | null
    _max: ShiftMaxAggregateOutputType | null
  }

  export type ShiftMinAggregateOutputType = {
    id: string | null
    userId: string | null
    startTime: Date | null
    endTime: Date | null
    location: string | null
    notes: string | null
    status: $Enums.ShiftStatus | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShiftMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    startTime: Date | null
    endTime: Date | null
    location: string | null
    notes: string | null
    status: $Enums.ShiftStatus | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShiftCountAggregateOutputType = {
    id: number
    userId: number
    startTime: number
    endTime: number
    location: number
    notes: number
    status: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShiftMinAggregateInputType = {
    id?: true
    userId?: true
    startTime?: true
    endTime?: true
    location?: true
    notes?: true
    status?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShiftMaxAggregateInputType = {
    id?: true
    userId?: true
    startTime?: true
    endTime?: true
    location?: true
    notes?: true
    status?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShiftCountAggregateInputType = {
    id?: true
    userId?: true
    startTime?: true
    endTime?: true
    location?: true
    notes?: true
    status?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShiftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shift to aggregate.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shifts
    **/
    _count?: true | ShiftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShiftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShiftMaxAggregateInputType
  }

  export type GetShiftAggregateType<T extends ShiftAggregateArgs> = {
        [P in keyof T & keyof AggregateShift]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShift[P]>
      : GetScalarType<T[P], AggregateShift[P]>
  }




  export type ShiftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftWhereInput
    orderBy?: ShiftOrderByWithAggregationInput | ShiftOrderByWithAggregationInput[]
    by: ShiftScalarFieldEnum[] | ShiftScalarFieldEnum
    having?: ShiftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShiftCountAggregateInputType | true
    _min?: ShiftMinAggregateInputType
    _max?: ShiftMaxAggregateInputType
  }

  export type ShiftGroupByOutputType = {
    id: string
    userId: string
    startTime: Date
    endTime: Date
    location: string | null
    notes: string | null
    status: $Enums.ShiftStatus
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: ShiftCountAggregateOutputType | null
    _min: ShiftMinAggregateOutputType | null
    _max: ShiftMaxAggregateOutputType | null
  }

  type GetShiftGroupByPayload<T extends ShiftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShiftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShiftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShiftGroupByOutputType[P]>
            : GetScalarType<T[P], ShiftGroupByOutputType[P]>
        }
      >
    >


  export type ShiftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    notes?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    swapRequestsFrom?: boolean | Shift$swapRequestsFromArgs<ExtArgs>
    swapRequestsTo?: boolean | Shift$swapRequestsToArgs<ExtArgs>
    workLogs?: boolean | Shift$workLogsArgs<ExtArgs>
    _count?: boolean | ShiftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shift"]>

  export type ShiftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    notes?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shift"]>

  export type ShiftSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    notes?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shift"]>

  export type ShiftSelectScalar = {
    id?: boolean
    userId?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    notes?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShiftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "startTime" | "endTime" | "location" | "notes" | "status" | "createdBy" | "createdAt" | "updatedAt", ExtArgs["result"]["shift"]>
  export type ShiftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    swapRequestsFrom?: boolean | Shift$swapRequestsFromArgs<ExtArgs>
    swapRequestsTo?: boolean | Shift$swapRequestsToArgs<ExtArgs>
    workLogs?: boolean | Shift$workLogsArgs<ExtArgs>
    _count?: boolean | ShiftCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShiftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ShiftIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ShiftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shift"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      swapRequestsFrom: Prisma.$ShiftSwapRequestPayload<ExtArgs>[]
      swapRequestsTo: Prisma.$ShiftSwapRequestPayload<ExtArgs>[]
      workLogs: Prisma.$WorkLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      startTime: Date
      endTime: Date
      location: string | null
      notes: string | null
      status: $Enums.ShiftStatus
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shift"]>
    composites: {}
  }

  type ShiftGetPayload<S extends boolean | null | undefined | ShiftDefaultArgs> = $Result.GetResult<Prisma.$ShiftPayload, S>

  type ShiftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShiftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShiftCountAggregateInputType | true
    }

  export interface ShiftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shift'], meta: { name: 'Shift' } }
    /**
     * Find zero or one Shift that matches the filter.
     * @param {ShiftFindUniqueArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShiftFindUniqueArgs>(args: SelectSubset<T, ShiftFindUniqueArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shift that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShiftFindUniqueOrThrowArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShiftFindUniqueOrThrowArgs>(args: SelectSubset<T, ShiftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shift that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindFirstArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShiftFindFirstArgs>(args?: SelectSubset<T, ShiftFindFirstArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shift that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindFirstOrThrowArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShiftFindFirstOrThrowArgs>(args?: SelectSubset<T, ShiftFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shifts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shifts
     * const shifts = await prisma.shift.findMany()
     * 
     * // Get first 10 Shifts
     * const shifts = await prisma.shift.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shiftWithIdOnly = await prisma.shift.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShiftFindManyArgs>(args?: SelectSubset<T, ShiftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shift.
     * @param {ShiftCreateArgs} args - Arguments to create a Shift.
     * @example
     * // Create one Shift
     * const Shift = await prisma.shift.create({
     *   data: {
     *     // ... data to create a Shift
     *   }
     * })
     * 
     */
    create<T extends ShiftCreateArgs>(args: SelectSubset<T, ShiftCreateArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shifts.
     * @param {ShiftCreateManyArgs} args - Arguments to create many Shifts.
     * @example
     * // Create many Shifts
     * const shift = await prisma.shift.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShiftCreateManyArgs>(args?: SelectSubset<T, ShiftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shifts and returns the data saved in the database.
     * @param {ShiftCreateManyAndReturnArgs} args - Arguments to create many Shifts.
     * @example
     * // Create many Shifts
     * const shift = await prisma.shift.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shifts and only return the `id`
     * const shiftWithIdOnly = await prisma.shift.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShiftCreateManyAndReturnArgs>(args?: SelectSubset<T, ShiftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shift.
     * @param {ShiftDeleteArgs} args - Arguments to delete one Shift.
     * @example
     * // Delete one Shift
     * const Shift = await prisma.shift.delete({
     *   where: {
     *     // ... filter to delete one Shift
     *   }
     * })
     * 
     */
    delete<T extends ShiftDeleteArgs>(args: SelectSubset<T, ShiftDeleteArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shift.
     * @param {ShiftUpdateArgs} args - Arguments to update one Shift.
     * @example
     * // Update one Shift
     * const shift = await prisma.shift.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShiftUpdateArgs>(args: SelectSubset<T, ShiftUpdateArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shifts.
     * @param {ShiftDeleteManyArgs} args - Arguments to filter Shifts to delete.
     * @example
     * // Delete a few Shifts
     * const { count } = await prisma.shift.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShiftDeleteManyArgs>(args?: SelectSubset<T, ShiftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shifts
     * const shift = await prisma.shift.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShiftUpdateManyArgs>(args: SelectSubset<T, ShiftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shifts and returns the data updated in the database.
     * @param {ShiftUpdateManyAndReturnArgs} args - Arguments to update many Shifts.
     * @example
     * // Update many Shifts
     * const shift = await prisma.shift.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shifts and only return the `id`
     * const shiftWithIdOnly = await prisma.shift.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShiftUpdateManyAndReturnArgs>(args: SelectSubset<T, ShiftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shift.
     * @param {ShiftUpsertArgs} args - Arguments to update or create a Shift.
     * @example
     * // Update or create a Shift
     * const shift = await prisma.shift.upsert({
     *   create: {
     *     // ... data to create a Shift
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shift we want to update
     *   }
     * })
     */
    upsert<T extends ShiftUpsertArgs>(args: SelectSubset<T, ShiftUpsertArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftCountArgs} args - Arguments to filter Shifts to count.
     * @example
     * // Count the number of Shifts
     * const count = await prisma.shift.count({
     *   where: {
     *     // ... the filter for the Shifts we want to count
     *   }
     * })
    **/
    count<T extends ShiftCountArgs>(
      args?: Subset<T, ShiftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShiftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShiftAggregateArgs>(args: Subset<T, ShiftAggregateArgs>): Prisma.PrismaPromise<GetShiftAggregateType<T>>

    /**
     * Group by Shift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShiftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShiftGroupByArgs['orderBy'] }
        : { orderBy?: ShiftGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShiftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShiftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shift model
   */
  readonly fields: ShiftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shift.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShiftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    swapRequestsFrom<T extends Shift$swapRequestsFromArgs<ExtArgs> = {}>(args?: Subset<T, Shift$swapRequestsFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    swapRequestsTo<T extends Shift$swapRequestsToArgs<ExtArgs> = {}>(args?: Subset<T, Shift$swapRequestsToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workLogs<T extends Shift$workLogsArgs<ExtArgs> = {}>(args?: Subset<T, Shift$workLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Shift model
   */
  interface ShiftFieldRefs {
    readonly id: FieldRef<"Shift", 'String'>
    readonly userId: FieldRef<"Shift", 'String'>
    readonly startTime: FieldRef<"Shift", 'DateTime'>
    readonly endTime: FieldRef<"Shift", 'DateTime'>
    readonly location: FieldRef<"Shift", 'String'>
    readonly notes: FieldRef<"Shift", 'String'>
    readonly status: FieldRef<"Shift", 'ShiftStatus'>
    readonly createdBy: FieldRef<"Shift", 'String'>
    readonly createdAt: FieldRef<"Shift", 'DateTime'>
    readonly updatedAt: FieldRef<"Shift", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shift findUnique
   */
  export type ShiftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift findUniqueOrThrow
   */
  export type ShiftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift findFirst
   */
  export type ShiftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shifts.
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shifts.
     */
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * Shift findFirstOrThrow
   */
  export type ShiftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shifts.
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shifts.
     */
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * Shift findMany
   */
  export type ShiftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shifts to fetch.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shifts.
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * Shift create
   */
  export type ShiftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * The data needed to create a Shift.
     */
    data: XOR<ShiftCreateInput, ShiftUncheckedCreateInput>
  }

  /**
   * Shift createMany
   */
  export type ShiftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shifts.
     */
    data: ShiftCreateManyInput | ShiftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shift createManyAndReturn
   */
  export type ShiftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * The data used to create many Shifts.
     */
    data: ShiftCreateManyInput | ShiftCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Shift update
   */
  export type ShiftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * The data needed to update a Shift.
     */
    data: XOR<ShiftUpdateInput, ShiftUncheckedUpdateInput>
    /**
     * Choose, which Shift to update.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift updateMany
   */
  export type ShiftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shifts.
     */
    data: XOR<ShiftUpdateManyMutationInput, ShiftUncheckedUpdateManyInput>
    /**
     * Filter which Shifts to update
     */
    where?: ShiftWhereInput
    /**
     * Limit how many Shifts to update.
     */
    limit?: number
  }

  /**
   * Shift updateManyAndReturn
   */
  export type ShiftUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * The data used to update Shifts.
     */
    data: XOR<ShiftUpdateManyMutationInput, ShiftUncheckedUpdateManyInput>
    /**
     * Filter which Shifts to update
     */
    where?: ShiftWhereInput
    /**
     * Limit how many Shifts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Shift upsert
   */
  export type ShiftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * The filter to search for the Shift to update in case it exists.
     */
    where: ShiftWhereUniqueInput
    /**
     * In case the Shift found by the `where` argument doesn't exist, create a new Shift with this data.
     */
    create: XOR<ShiftCreateInput, ShiftUncheckedCreateInput>
    /**
     * In case the Shift was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShiftUpdateInput, ShiftUncheckedUpdateInput>
  }

  /**
   * Shift delete
   */
  export type ShiftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter which Shift to delete.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift deleteMany
   */
  export type ShiftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shifts to delete
     */
    where?: ShiftWhereInput
    /**
     * Limit how many Shifts to delete.
     */
    limit?: number
  }

  /**
   * Shift.swapRequestsFrom
   */
  export type Shift$swapRequestsFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    where?: ShiftSwapRequestWhereInput
    orderBy?: ShiftSwapRequestOrderByWithRelationInput | ShiftSwapRequestOrderByWithRelationInput[]
    cursor?: ShiftSwapRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShiftSwapRequestScalarFieldEnum | ShiftSwapRequestScalarFieldEnum[]
  }

  /**
   * Shift.swapRequestsTo
   */
  export type Shift$swapRequestsToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    where?: ShiftSwapRequestWhereInput
    orderBy?: ShiftSwapRequestOrderByWithRelationInput | ShiftSwapRequestOrderByWithRelationInput[]
    cursor?: ShiftSwapRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShiftSwapRequestScalarFieldEnum | ShiftSwapRequestScalarFieldEnum[]
  }

  /**
   * Shift.workLogs
   */
  export type Shift$workLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    where?: WorkLogWhereInput
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    cursor?: WorkLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkLogScalarFieldEnum | WorkLogScalarFieldEnum[]
  }

  /**
   * Shift without action
   */
  export type ShiftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
  }


  /**
   * Model TimeOffRequest
   */

  export type AggregateTimeOffRequest = {
    _count: TimeOffRequestCountAggregateOutputType | null
    _min: TimeOffRequestMinAggregateOutputType | null
    _max: TimeOffRequestMaxAggregateOutputType | null
  }

  export type TimeOffRequestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fromDate: Date | null
    toDate: Date | null
    type: $Enums.TimeOffType | null
    reason: string | null
    status: $Enums.RequestStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimeOffRequestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fromDate: Date | null
    toDate: Date | null
    type: $Enums.TimeOffType | null
    reason: string | null
    status: $Enums.RequestStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimeOffRequestCountAggregateOutputType = {
    id: number
    userId: number
    fromDate: number
    toDate: number
    type: number
    reason: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TimeOffRequestMinAggregateInputType = {
    id?: true
    userId?: true
    fromDate?: true
    toDate?: true
    type?: true
    reason?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimeOffRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    fromDate?: true
    toDate?: true
    type?: true
    reason?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimeOffRequestCountAggregateInputType = {
    id?: true
    userId?: true
    fromDate?: true
    toDate?: true
    type?: true
    reason?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TimeOffRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeOffRequest to aggregate.
     */
    where?: TimeOffRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeOffRequests to fetch.
     */
    orderBy?: TimeOffRequestOrderByWithRelationInput | TimeOffRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeOffRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeOffRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeOffRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimeOffRequests
    **/
    _count?: true | TimeOffRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeOffRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeOffRequestMaxAggregateInputType
  }

  export type GetTimeOffRequestAggregateType<T extends TimeOffRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeOffRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeOffRequest[P]>
      : GetScalarType<T[P], AggregateTimeOffRequest[P]>
  }




  export type TimeOffRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeOffRequestWhereInput
    orderBy?: TimeOffRequestOrderByWithAggregationInput | TimeOffRequestOrderByWithAggregationInput[]
    by: TimeOffRequestScalarFieldEnum[] | TimeOffRequestScalarFieldEnum
    having?: TimeOffRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeOffRequestCountAggregateInputType | true
    _min?: TimeOffRequestMinAggregateInputType
    _max?: TimeOffRequestMaxAggregateInputType
  }

  export type TimeOffRequestGroupByOutputType = {
    id: string
    userId: string
    fromDate: Date
    toDate: Date
    type: $Enums.TimeOffType
    reason: string | null
    status: $Enums.RequestStatus
    createdAt: Date
    updatedAt: Date
    _count: TimeOffRequestCountAggregateOutputType | null
    _min: TimeOffRequestMinAggregateOutputType | null
    _max: TimeOffRequestMaxAggregateOutputType | null
  }

  type GetTimeOffRequestGroupByPayload<T extends TimeOffRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeOffRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeOffRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeOffRequestGroupByOutputType[P]>
            : GetScalarType<T[P], TimeOffRequestGroupByOutputType[P]>
        }
      >
    >


  export type TimeOffRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fromDate?: boolean
    toDate?: boolean
    type?: boolean
    reason?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeOffRequest"]>

  export type TimeOffRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fromDate?: boolean
    toDate?: boolean
    type?: boolean
    reason?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeOffRequest"]>

  export type TimeOffRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fromDate?: boolean
    toDate?: boolean
    type?: boolean
    reason?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeOffRequest"]>

  export type TimeOffRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    fromDate?: boolean
    toDate?: boolean
    type?: boolean
    reason?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TimeOffRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fromDate" | "toDate" | "type" | "reason" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["timeOffRequest"]>
  export type TimeOffRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TimeOffRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TimeOffRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TimeOffRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimeOffRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fromDate: Date
      toDate: Date
      type: $Enums.TimeOffType
      reason: string | null
      status: $Enums.RequestStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["timeOffRequest"]>
    composites: {}
  }

  type TimeOffRequestGetPayload<S extends boolean | null | undefined | TimeOffRequestDefaultArgs> = $Result.GetResult<Prisma.$TimeOffRequestPayload, S>

  type TimeOffRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimeOffRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimeOffRequestCountAggregateInputType | true
    }

  export interface TimeOffRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimeOffRequest'], meta: { name: 'TimeOffRequest' } }
    /**
     * Find zero or one TimeOffRequest that matches the filter.
     * @param {TimeOffRequestFindUniqueArgs} args - Arguments to find a TimeOffRequest
     * @example
     * // Get one TimeOffRequest
     * const timeOffRequest = await prisma.timeOffRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeOffRequestFindUniqueArgs>(args: SelectSubset<T, TimeOffRequestFindUniqueArgs<ExtArgs>>): Prisma__TimeOffRequestClient<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimeOffRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimeOffRequestFindUniqueOrThrowArgs} args - Arguments to find a TimeOffRequest
     * @example
     * // Get one TimeOffRequest
     * const timeOffRequest = await prisma.timeOffRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeOffRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeOffRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeOffRequestClient<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeOffRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeOffRequestFindFirstArgs} args - Arguments to find a TimeOffRequest
     * @example
     * // Get one TimeOffRequest
     * const timeOffRequest = await prisma.timeOffRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeOffRequestFindFirstArgs>(args?: SelectSubset<T, TimeOffRequestFindFirstArgs<ExtArgs>>): Prisma__TimeOffRequestClient<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeOffRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeOffRequestFindFirstOrThrowArgs} args - Arguments to find a TimeOffRequest
     * @example
     * // Get one TimeOffRequest
     * const timeOffRequest = await prisma.timeOffRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeOffRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeOffRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeOffRequestClient<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimeOffRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeOffRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimeOffRequests
     * const timeOffRequests = await prisma.timeOffRequest.findMany()
     * 
     * // Get first 10 TimeOffRequests
     * const timeOffRequests = await prisma.timeOffRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeOffRequestWithIdOnly = await prisma.timeOffRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeOffRequestFindManyArgs>(args?: SelectSubset<T, TimeOffRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimeOffRequest.
     * @param {TimeOffRequestCreateArgs} args - Arguments to create a TimeOffRequest.
     * @example
     * // Create one TimeOffRequest
     * const TimeOffRequest = await prisma.timeOffRequest.create({
     *   data: {
     *     // ... data to create a TimeOffRequest
     *   }
     * })
     * 
     */
    create<T extends TimeOffRequestCreateArgs>(args: SelectSubset<T, TimeOffRequestCreateArgs<ExtArgs>>): Prisma__TimeOffRequestClient<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimeOffRequests.
     * @param {TimeOffRequestCreateManyArgs} args - Arguments to create many TimeOffRequests.
     * @example
     * // Create many TimeOffRequests
     * const timeOffRequest = await prisma.timeOffRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeOffRequestCreateManyArgs>(args?: SelectSubset<T, TimeOffRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimeOffRequests and returns the data saved in the database.
     * @param {TimeOffRequestCreateManyAndReturnArgs} args - Arguments to create many TimeOffRequests.
     * @example
     * // Create many TimeOffRequests
     * const timeOffRequest = await prisma.timeOffRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimeOffRequests and only return the `id`
     * const timeOffRequestWithIdOnly = await prisma.timeOffRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimeOffRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, TimeOffRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimeOffRequest.
     * @param {TimeOffRequestDeleteArgs} args - Arguments to delete one TimeOffRequest.
     * @example
     * // Delete one TimeOffRequest
     * const TimeOffRequest = await prisma.timeOffRequest.delete({
     *   where: {
     *     // ... filter to delete one TimeOffRequest
     *   }
     * })
     * 
     */
    delete<T extends TimeOffRequestDeleteArgs>(args: SelectSubset<T, TimeOffRequestDeleteArgs<ExtArgs>>): Prisma__TimeOffRequestClient<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimeOffRequest.
     * @param {TimeOffRequestUpdateArgs} args - Arguments to update one TimeOffRequest.
     * @example
     * // Update one TimeOffRequest
     * const timeOffRequest = await prisma.timeOffRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeOffRequestUpdateArgs>(args: SelectSubset<T, TimeOffRequestUpdateArgs<ExtArgs>>): Prisma__TimeOffRequestClient<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimeOffRequests.
     * @param {TimeOffRequestDeleteManyArgs} args - Arguments to filter TimeOffRequests to delete.
     * @example
     * // Delete a few TimeOffRequests
     * const { count } = await prisma.timeOffRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeOffRequestDeleteManyArgs>(args?: SelectSubset<T, TimeOffRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeOffRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeOffRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimeOffRequests
     * const timeOffRequest = await prisma.timeOffRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeOffRequestUpdateManyArgs>(args: SelectSubset<T, TimeOffRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeOffRequests and returns the data updated in the database.
     * @param {TimeOffRequestUpdateManyAndReturnArgs} args - Arguments to update many TimeOffRequests.
     * @example
     * // Update many TimeOffRequests
     * const timeOffRequest = await prisma.timeOffRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimeOffRequests and only return the `id`
     * const timeOffRequestWithIdOnly = await prisma.timeOffRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimeOffRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, TimeOffRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimeOffRequest.
     * @param {TimeOffRequestUpsertArgs} args - Arguments to update or create a TimeOffRequest.
     * @example
     * // Update or create a TimeOffRequest
     * const timeOffRequest = await prisma.timeOffRequest.upsert({
     *   create: {
     *     // ... data to create a TimeOffRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimeOffRequest we want to update
     *   }
     * })
     */
    upsert<T extends TimeOffRequestUpsertArgs>(args: SelectSubset<T, TimeOffRequestUpsertArgs<ExtArgs>>): Prisma__TimeOffRequestClient<$Result.GetResult<Prisma.$TimeOffRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimeOffRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeOffRequestCountArgs} args - Arguments to filter TimeOffRequests to count.
     * @example
     * // Count the number of TimeOffRequests
     * const count = await prisma.timeOffRequest.count({
     *   where: {
     *     // ... the filter for the TimeOffRequests we want to count
     *   }
     * })
    **/
    count<T extends TimeOffRequestCountArgs>(
      args?: Subset<T, TimeOffRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeOffRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimeOffRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeOffRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimeOffRequestAggregateArgs>(args: Subset<T, TimeOffRequestAggregateArgs>): Prisma.PrismaPromise<GetTimeOffRequestAggregateType<T>>

    /**
     * Group by TimeOffRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeOffRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimeOffRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeOffRequestGroupByArgs['orderBy'] }
        : { orderBy?: TimeOffRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimeOffRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeOffRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimeOffRequest model
   */
  readonly fields: TimeOffRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimeOffRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeOffRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimeOffRequest model
   */
  interface TimeOffRequestFieldRefs {
    readonly id: FieldRef<"TimeOffRequest", 'String'>
    readonly userId: FieldRef<"TimeOffRequest", 'String'>
    readonly fromDate: FieldRef<"TimeOffRequest", 'DateTime'>
    readonly toDate: FieldRef<"TimeOffRequest", 'DateTime'>
    readonly type: FieldRef<"TimeOffRequest", 'TimeOffType'>
    readonly reason: FieldRef<"TimeOffRequest", 'String'>
    readonly status: FieldRef<"TimeOffRequest", 'RequestStatus'>
    readonly createdAt: FieldRef<"TimeOffRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"TimeOffRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TimeOffRequest findUnique
   */
  export type TimeOffRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
    /**
     * Filter, which TimeOffRequest to fetch.
     */
    where: TimeOffRequestWhereUniqueInput
  }

  /**
   * TimeOffRequest findUniqueOrThrow
   */
  export type TimeOffRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
    /**
     * Filter, which TimeOffRequest to fetch.
     */
    where: TimeOffRequestWhereUniqueInput
  }

  /**
   * TimeOffRequest findFirst
   */
  export type TimeOffRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
    /**
     * Filter, which TimeOffRequest to fetch.
     */
    where?: TimeOffRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeOffRequests to fetch.
     */
    orderBy?: TimeOffRequestOrderByWithRelationInput | TimeOffRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeOffRequests.
     */
    cursor?: TimeOffRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeOffRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeOffRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeOffRequests.
     */
    distinct?: TimeOffRequestScalarFieldEnum | TimeOffRequestScalarFieldEnum[]
  }

  /**
   * TimeOffRequest findFirstOrThrow
   */
  export type TimeOffRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
    /**
     * Filter, which TimeOffRequest to fetch.
     */
    where?: TimeOffRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeOffRequests to fetch.
     */
    orderBy?: TimeOffRequestOrderByWithRelationInput | TimeOffRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeOffRequests.
     */
    cursor?: TimeOffRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeOffRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeOffRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeOffRequests.
     */
    distinct?: TimeOffRequestScalarFieldEnum | TimeOffRequestScalarFieldEnum[]
  }

  /**
   * TimeOffRequest findMany
   */
  export type TimeOffRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
    /**
     * Filter, which TimeOffRequests to fetch.
     */
    where?: TimeOffRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeOffRequests to fetch.
     */
    orderBy?: TimeOffRequestOrderByWithRelationInput | TimeOffRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimeOffRequests.
     */
    cursor?: TimeOffRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeOffRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeOffRequests.
     */
    skip?: number
    distinct?: TimeOffRequestScalarFieldEnum | TimeOffRequestScalarFieldEnum[]
  }

  /**
   * TimeOffRequest create
   */
  export type TimeOffRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a TimeOffRequest.
     */
    data: XOR<TimeOffRequestCreateInput, TimeOffRequestUncheckedCreateInput>
  }

  /**
   * TimeOffRequest createMany
   */
  export type TimeOffRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimeOffRequests.
     */
    data: TimeOffRequestCreateManyInput | TimeOffRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimeOffRequest createManyAndReturn
   */
  export type TimeOffRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * The data used to create many TimeOffRequests.
     */
    data: TimeOffRequestCreateManyInput | TimeOffRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeOffRequest update
   */
  export type TimeOffRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a TimeOffRequest.
     */
    data: XOR<TimeOffRequestUpdateInput, TimeOffRequestUncheckedUpdateInput>
    /**
     * Choose, which TimeOffRequest to update.
     */
    where: TimeOffRequestWhereUniqueInput
  }

  /**
   * TimeOffRequest updateMany
   */
  export type TimeOffRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimeOffRequests.
     */
    data: XOR<TimeOffRequestUpdateManyMutationInput, TimeOffRequestUncheckedUpdateManyInput>
    /**
     * Filter which TimeOffRequests to update
     */
    where?: TimeOffRequestWhereInput
    /**
     * Limit how many TimeOffRequests to update.
     */
    limit?: number
  }

  /**
   * TimeOffRequest updateManyAndReturn
   */
  export type TimeOffRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * The data used to update TimeOffRequests.
     */
    data: XOR<TimeOffRequestUpdateManyMutationInput, TimeOffRequestUncheckedUpdateManyInput>
    /**
     * Filter which TimeOffRequests to update
     */
    where?: TimeOffRequestWhereInput
    /**
     * Limit how many TimeOffRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeOffRequest upsert
   */
  export type TimeOffRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the TimeOffRequest to update in case it exists.
     */
    where: TimeOffRequestWhereUniqueInput
    /**
     * In case the TimeOffRequest found by the `where` argument doesn't exist, create a new TimeOffRequest with this data.
     */
    create: XOR<TimeOffRequestCreateInput, TimeOffRequestUncheckedCreateInput>
    /**
     * In case the TimeOffRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeOffRequestUpdateInput, TimeOffRequestUncheckedUpdateInput>
  }

  /**
   * TimeOffRequest delete
   */
  export type TimeOffRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
    /**
     * Filter which TimeOffRequest to delete.
     */
    where: TimeOffRequestWhereUniqueInput
  }

  /**
   * TimeOffRequest deleteMany
   */
  export type TimeOffRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeOffRequests to delete
     */
    where?: TimeOffRequestWhereInput
    /**
     * Limit how many TimeOffRequests to delete.
     */
    limit?: number
  }

  /**
   * TimeOffRequest without action
   */
  export type TimeOffRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeOffRequest
     */
    select?: TimeOffRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeOffRequest
     */
    omit?: TimeOffRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeOffRequestInclude<ExtArgs> | null
  }


  /**
   * Model ShiftSwapRequest
   */

  export type AggregateShiftSwapRequest = {
    _count: ShiftSwapRequestCountAggregateOutputType | null
    _min: ShiftSwapRequestMinAggregateOutputType | null
    _max: ShiftSwapRequestMaxAggregateOutputType | null
  }

  export type ShiftSwapRequestMinAggregateOutputType = {
    id: string | null
    requestedById: string | null
    fromShiftId: string | null
    swapWithId: string | null
    toShiftId: string | null
    status: $Enums.RequestStatus | null
    requestedAt: Date | null
    updatedAt: Date | null
  }

  export type ShiftSwapRequestMaxAggregateOutputType = {
    id: string | null
    requestedById: string | null
    fromShiftId: string | null
    swapWithId: string | null
    toShiftId: string | null
    status: $Enums.RequestStatus | null
    requestedAt: Date | null
    updatedAt: Date | null
  }

  export type ShiftSwapRequestCountAggregateOutputType = {
    id: number
    requestedById: number
    fromShiftId: number
    swapWithId: number
    toShiftId: number
    status: number
    requestedAt: number
    updatedAt: number
    _all: number
  }


  export type ShiftSwapRequestMinAggregateInputType = {
    id?: true
    requestedById?: true
    fromShiftId?: true
    swapWithId?: true
    toShiftId?: true
    status?: true
    requestedAt?: true
    updatedAt?: true
  }

  export type ShiftSwapRequestMaxAggregateInputType = {
    id?: true
    requestedById?: true
    fromShiftId?: true
    swapWithId?: true
    toShiftId?: true
    status?: true
    requestedAt?: true
    updatedAt?: true
  }

  export type ShiftSwapRequestCountAggregateInputType = {
    id?: true
    requestedById?: true
    fromShiftId?: true
    swapWithId?: true
    toShiftId?: true
    status?: true
    requestedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShiftSwapRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShiftSwapRequest to aggregate.
     */
    where?: ShiftSwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShiftSwapRequests to fetch.
     */
    orderBy?: ShiftSwapRequestOrderByWithRelationInput | ShiftSwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShiftSwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShiftSwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShiftSwapRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShiftSwapRequests
    **/
    _count?: true | ShiftSwapRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShiftSwapRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShiftSwapRequestMaxAggregateInputType
  }

  export type GetShiftSwapRequestAggregateType<T extends ShiftSwapRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateShiftSwapRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShiftSwapRequest[P]>
      : GetScalarType<T[P], AggregateShiftSwapRequest[P]>
  }




  export type ShiftSwapRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftSwapRequestWhereInput
    orderBy?: ShiftSwapRequestOrderByWithAggregationInput | ShiftSwapRequestOrderByWithAggregationInput[]
    by: ShiftSwapRequestScalarFieldEnum[] | ShiftSwapRequestScalarFieldEnum
    having?: ShiftSwapRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShiftSwapRequestCountAggregateInputType | true
    _min?: ShiftSwapRequestMinAggregateInputType
    _max?: ShiftSwapRequestMaxAggregateInputType
  }

  export type ShiftSwapRequestGroupByOutputType = {
    id: string
    requestedById: string
    fromShiftId: string
    swapWithId: string
    toShiftId: string
    status: $Enums.RequestStatus
    requestedAt: Date
    updatedAt: Date
    _count: ShiftSwapRequestCountAggregateOutputType | null
    _min: ShiftSwapRequestMinAggregateOutputType | null
    _max: ShiftSwapRequestMaxAggregateOutputType | null
  }

  type GetShiftSwapRequestGroupByPayload<T extends ShiftSwapRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShiftSwapRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShiftSwapRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShiftSwapRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ShiftSwapRequestGroupByOutputType[P]>
        }
      >
    >


  export type ShiftSwapRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestedById?: boolean
    fromShiftId?: boolean
    swapWithId?: boolean
    toShiftId?: boolean
    status?: boolean
    requestedAt?: boolean
    updatedAt?: boolean
    requestedBy?: boolean | UserDefaultArgs<ExtArgs>
    fromShift?: boolean | ShiftDefaultArgs<ExtArgs>
    swapWith?: boolean | UserDefaultArgs<ExtArgs>
    toShift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shiftSwapRequest"]>

  export type ShiftSwapRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestedById?: boolean
    fromShiftId?: boolean
    swapWithId?: boolean
    toShiftId?: boolean
    status?: boolean
    requestedAt?: boolean
    updatedAt?: boolean
    requestedBy?: boolean | UserDefaultArgs<ExtArgs>
    fromShift?: boolean | ShiftDefaultArgs<ExtArgs>
    swapWith?: boolean | UserDefaultArgs<ExtArgs>
    toShift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shiftSwapRequest"]>

  export type ShiftSwapRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestedById?: boolean
    fromShiftId?: boolean
    swapWithId?: boolean
    toShiftId?: boolean
    status?: boolean
    requestedAt?: boolean
    updatedAt?: boolean
    requestedBy?: boolean | UserDefaultArgs<ExtArgs>
    fromShift?: boolean | ShiftDefaultArgs<ExtArgs>
    swapWith?: boolean | UserDefaultArgs<ExtArgs>
    toShift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shiftSwapRequest"]>

  export type ShiftSwapRequestSelectScalar = {
    id?: boolean
    requestedById?: boolean
    fromShiftId?: boolean
    swapWithId?: boolean
    toShiftId?: boolean
    status?: boolean
    requestedAt?: boolean
    updatedAt?: boolean
  }

  export type ShiftSwapRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "requestedById" | "fromShiftId" | "swapWithId" | "toShiftId" | "status" | "requestedAt" | "updatedAt", ExtArgs["result"]["shiftSwapRequest"]>
  export type ShiftSwapRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requestedBy?: boolean | UserDefaultArgs<ExtArgs>
    fromShift?: boolean | ShiftDefaultArgs<ExtArgs>
    swapWith?: boolean | UserDefaultArgs<ExtArgs>
    toShift?: boolean | ShiftDefaultArgs<ExtArgs>
  }
  export type ShiftSwapRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requestedBy?: boolean | UserDefaultArgs<ExtArgs>
    fromShift?: boolean | ShiftDefaultArgs<ExtArgs>
    swapWith?: boolean | UserDefaultArgs<ExtArgs>
    toShift?: boolean | ShiftDefaultArgs<ExtArgs>
  }
  export type ShiftSwapRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requestedBy?: boolean | UserDefaultArgs<ExtArgs>
    fromShift?: boolean | ShiftDefaultArgs<ExtArgs>
    swapWith?: boolean | UserDefaultArgs<ExtArgs>
    toShift?: boolean | ShiftDefaultArgs<ExtArgs>
  }

  export type $ShiftSwapRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShiftSwapRequest"
    objects: {
      requestedBy: Prisma.$UserPayload<ExtArgs>
      fromShift: Prisma.$ShiftPayload<ExtArgs>
      swapWith: Prisma.$UserPayload<ExtArgs>
      toShift: Prisma.$ShiftPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requestedById: string
      fromShiftId: string
      swapWithId: string
      toShiftId: string
      status: $Enums.RequestStatus
      requestedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shiftSwapRequest"]>
    composites: {}
  }

  type ShiftSwapRequestGetPayload<S extends boolean | null | undefined | ShiftSwapRequestDefaultArgs> = $Result.GetResult<Prisma.$ShiftSwapRequestPayload, S>

  type ShiftSwapRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShiftSwapRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShiftSwapRequestCountAggregateInputType | true
    }

  export interface ShiftSwapRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShiftSwapRequest'], meta: { name: 'ShiftSwapRequest' } }
    /**
     * Find zero or one ShiftSwapRequest that matches the filter.
     * @param {ShiftSwapRequestFindUniqueArgs} args - Arguments to find a ShiftSwapRequest
     * @example
     * // Get one ShiftSwapRequest
     * const shiftSwapRequest = await prisma.shiftSwapRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShiftSwapRequestFindUniqueArgs>(args: SelectSubset<T, ShiftSwapRequestFindUniqueArgs<ExtArgs>>): Prisma__ShiftSwapRequestClient<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ShiftSwapRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShiftSwapRequestFindUniqueOrThrowArgs} args - Arguments to find a ShiftSwapRequest
     * @example
     * // Get one ShiftSwapRequest
     * const shiftSwapRequest = await prisma.shiftSwapRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShiftSwapRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ShiftSwapRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShiftSwapRequestClient<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShiftSwapRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftSwapRequestFindFirstArgs} args - Arguments to find a ShiftSwapRequest
     * @example
     * // Get one ShiftSwapRequest
     * const shiftSwapRequest = await prisma.shiftSwapRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShiftSwapRequestFindFirstArgs>(args?: SelectSubset<T, ShiftSwapRequestFindFirstArgs<ExtArgs>>): Prisma__ShiftSwapRequestClient<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShiftSwapRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftSwapRequestFindFirstOrThrowArgs} args - Arguments to find a ShiftSwapRequest
     * @example
     * // Get one ShiftSwapRequest
     * const shiftSwapRequest = await prisma.shiftSwapRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShiftSwapRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ShiftSwapRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShiftSwapRequestClient<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ShiftSwapRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftSwapRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShiftSwapRequests
     * const shiftSwapRequests = await prisma.shiftSwapRequest.findMany()
     * 
     * // Get first 10 ShiftSwapRequests
     * const shiftSwapRequests = await prisma.shiftSwapRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shiftSwapRequestWithIdOnly = await prisma.shiftSwapRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShiftSwapRequestFindManyArgs>(args?: SelectSubset<T, ShiftSwapRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ShiftSwapRequest.
     * @param {ShiftSwapRequestCreateArgs} args - Arguments to create a ShiftSwapRequest.
     * @example
     * // Create one ShiftSwapRequest
     * const ShiftSwapRequest = await prisma.shiftSwapRequest.create({
     *   data: {
     *     // ... data to create a ShiftSwapRequest
     *   }
     * })
     * 
     */
    create<T extends ShiftSwapRequestCreateArgs>(args: SelectSubset<T, ShiftSwapRequestCreateArgs<ExtArgs>>): Prisma__ShiftSwapRequestClient<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ShiftSwapRequests.
     * @param {ShiftSwapRequestCreateManyArgs} args - Arguments to create many ShiftSwapRequests.
     * @example
     * // Create many ShiftSwapRequests
     * const shiftSwapRequest = await prisma.shiftSwapRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShiftSwapRequestCreateManyArgs>(args?: SelectSubset<T, ShiftSwapRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShiftSwapRequests and returns the data saved in the database.
     * @param {ShiftSwapRequestCreateManyAndReturnArgs} args - Arguments to create many ShiftSwapRequests.
     * @example
     * // Create many ShiftSwapRequests
     * const shiftSwapRequest = await prisma.shiftSwapRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShiftSwapRequests and only return the `id`
     * const shiftSwapRequestWithIdOnly = await prisma.shiftSwapRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShiftSwapRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ShiftSwapRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ShiftSwapRequest.
     * @param {ShiftSwapRequestDeleteArgs} args - Arguments to delete one ShiftSwapRequest.
     * @example
     * // Delete one ShiftSwapRequest
     * const ShiftSwapRequest = await prisma.shiftSwapRequest.delete({
     *   where: {
     *     // ... filter to delete one ShiftSwapRequest
     *   }
     * })
     * 
     */
    delete<T extends ShiftSwapRequestDeleteArgs>(args: SelectSubset<T, ShiftSwapRequestDeleteArgs<ExtArgs>>): Prisma__ShiftSwapRequestClient<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ShiftSwapRequest.
     * @param {ShiftSwapRequestUpdateArgs} args - Arguments to update one ShiftSwapRequest.
     * @example
     * // Update one ShiftSwapRequest
     * const shiftSwapRequest = await prisma.shiftSwapRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShiftSwapRequestUpdateArgs>(args: SelectSubset<T, ShiftSwapRequestUpdateArgs<ExtArgs>>): Prisma__ShiftSwapRequestClient<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ShiftSwapRequests.
     * @param {ShiftSwapRequestDeleteManyArgs} args - Arguments to filter ShiftSwapRequests to delete.
     * @example
     * // Delete a few ShiftSwapRequests
     * const { count } = await prisma.shiftSwapRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShiftSwapRequestDeleteManyArgs>(args?: SelectSubset<T, ShiftSwapRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShiftSwapRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftSwapRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShiftSwapRequests
     * const shiftSwapRequest = await prisma.shiftSwapRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShiftSwapRequestUpdateManyArgs>(args: SelectSubset<T, ShiftSwapRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShiftSwapRequests and returns the data updated in the database.
     * @param {ShiftSwapRequestUpdateManyAndReturnArgs} args - Arguments to update many ShiftSwapRequests.
     * @example
     * // Update many ShiftSwapRequests
     * const shiftSwapRequest = await prisma.shiftSwapRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ShiftSwapRequests and only return the `id`
     * const shiftSwapRequestWithIdOnly = await prisma.shiftSwapRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShiftSwapRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ShiftSwapRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ShiftSwapRequest.
     * @param {ShiftSwapRequestUpsertArgs} args - Arguments to update or create a ShiftSwapRequest.
     * @example
     * // Update or create a ShiftSwapRequest
     * const shiftSwapRequest = await prisma.shiftSwapRequest.upsert({
     *   create: {
     *     // ... data to create a ShiftSwapRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShiftSwapRequest we want to update
     *   }
     * })
     */
    upsert<T extends ShiftSwapRequestUpsertArgs>(args: SelectSubset<T, ShiftSwapRequestUpsertArgs<ExtArgs>>): Prisma__ShiftSwapRequestClient<$Result.GetResult<Prisma.$ShiftSwapRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ShiftSwapRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftSwapRequestCountArgs} args - Arguments to filter ShiftSwapRequests to count.
     * @example
     * // Count the number of ShiftSwapRequests
     * const count = await prisma.shiftSwapRequest.count({
     *   where: {
     *     // ... the filter for the ShiftSwapRequests we want to count
     *   }
     * })
    **/
    count<T extends ShiftSwapRequestCountArgs>(
      args?: Subset<T, ShiftSwapRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShiftSwapRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShiftSwapRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftSwapRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShiftSwapRequestAggregateArgs>(args: Subset<T, ShiftSwapRequestAggregateArgs>): Prisma.PrismaPromise<GetShiftSwapRequestAggregateType<T>>

    /**
     * Group by ShiftSwapRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftSwapRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShiftSwapRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShiftSwapRequestGroupByArgs['orderBy'] }
        : { orderBy?: ShiftSwapRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShiftSwapRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShiftSwapRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShiftSwapRequest model
   */
  readonly fields: ShiftSwapRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShiftSwapRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShiftSwapRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requestedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fromShift<T extends ShiftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShiftDefaultArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    swapWith<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toShift<T extends ShiftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShiftDefaultArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShiftSwapRequest model
   */
  interface ShiftSwapRequestFieldRefs {
    readonly id: FieldRef<"ShiftSwapRequest", 'String'>
    readonly requestedById: FieldRef<"ShiftSwapRequest", 'String'>
    readonly fromShiftId: FieldRef<"ShiftSwapRequest", 'String'>
    readonly swapWithId: FieldRef<"ShiftSwapRequest", 'String'>
    readonly toShiftId: FieldRef<"ShiftSwapRequest", 'String'>
    readonly status: FieldRef<"ShiftSwapRequest", 'RequestStatus'>
    readonly requestedAt: FieldRef<"ShiftSwapRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"ShiftSwapRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShiftSwapRequest findUnique
   */
  export type ShiftSwapRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which ShiftSwapRequest to fetch.
     */
    where: ShiftSwapRequestWhereUniqueInput
  }

  /**
   * ShiftSwapRequest findUniqueOrThrow
   */
  export type ShiftSwapRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which ShiftSwapRequest to fetch.
     */
    where: ShiftSwapRequestWhereUniqueInput
  }

  /**
   * ShiftSwapRequest findFirst
   */
  export type ShiftSwapRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which ShiftSwapRequest to fetch.
     */
    where?: ShiftSwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShiftSwapRequests to fetch.
     */
    orderBy?: ShiftSwapRequestOrderByWithRelationInput | ShiftSwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShiftSwapRequests.
     */
    cursor?: ShiftSwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShiftSwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShiftSwapRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShiftSwapRequests.
     */
    distinct?: ShiftSwapRequestScalarFieldEnum | ShiftSwapRequestScalarFieldEnum[]
  }

  /**
   * ShiftSwapRequest findFirstOrThrow
   */
  export type ShiftSwapRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which ShiftSwapRequest to fetch.
     */
    where?: ShiftSwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShiftSwapRequests to fetch.
     */
    orderBy?: ShiftSwapRequestOrderByWithRelationInput | ShiftSwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShiftSwapRequests.
     */
    cursor?: ShiftSwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShiftSwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShiftSwapRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShiftSwapRequests.
     */
    distinct?: ShiftSwapRequestScalarFieldEnum | ShiftSwapRequestScalarFieldEnum[]
  }

  /**
   * ShiftSwapRequest findMany
   */
  export type ShiftSwapRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which ShiftSwapRequests to fetch.
     */
    where?: ShiftSwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShiftSwapRequests to fetch.
     */
    orderBy?: ShiftSwapRequestOrderByWithRelationInput | ShiftSwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShiftSwapRequests.
     */
    cursor?: ShiftSwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShiftSwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShiftSwapRequests.
     */
    skip?: number
    distinct?: ShiftSwapRequestScalarFieldEnum | ShiftSwapRequestScalarFieldEnum[]
  }

  /**
   * ShiftSwapRequest create
   */
  export type ShiftSwapRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ShiftSwapRequest.
     */
    data: XOR<ShiftSwapRequestCreateInput, ShiftSwapRequestUncheckedCreateInput>
  }

  /**
   * ShiftSwapRequest createMany
   */
  export type ShiftSwapRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShiftSwapRequests.
     */
    data: ShiftSwapRequestCreateManyInput | ShiftSwapRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShiftSwapRequest createManyAndReturn
   */
  export type ShiftSwapRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ShiftSwapRequests.
     */
    data: ShiftSwapRequestCreateManyInput | ShiftSwapRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShiftSwapRequest update
   */
  export type ShiftSwapRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ShiftSwapRequest.
     */
    data: XOR<ShiftSwapRequestUpdateInput, ShiftSwapRequestUncheckedUpdateInput>
    /**
     * Choose, which ShiftSwapRequest to update.
     */
    where: ShiftSwapRequestWhereUniqueInput
  }

  /**
   * ShiftSwapRequest updateMany
   */
  export type ShiftSwapRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShiftSwapRequests.
     */
    data: XOR<ShiftSwapRequestUpdateManyMutationInput, ShiftSwapRequestUncheckedUpdateManyInput>
    /**
     * Filter which ShiftSwapRequests to update
     */
    where?: ShiftSwapRequestWhereInput
    /**
     * Limit how many ShiftSwapRequests to update.
     */
    limit?: number
  }

  /**
   * ShiftSwapRequest updateManyAndReturn
   */
  export type ShiftSwapRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * The data used to update ShiftSwapRequests.
     */
    data: XOR<ShiftSwapRequestUpdateManyMutationInput, ShiftSwapRequestUncheckedUpdateManyInput>
    /**
     * Filter which ShiftSwapRequests to update
     */
    where?: ShiftSwapRequestWhereInput
    /**
     * Limit how many ShiftSwapRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShiftSwapRequest upsert
   */
  export type ShiftSwapRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ShiftSwapRequest to update in case it exists.
     */
    where: ShiftSwapRequestWhereUniqueInput
    /**
     * In case the ShiftSwapRequest found by the `where` argument doesn't exist, create a new ShiftSwapRequest with this data.
     */
    create: XOR<ShiftSwapRequestCreateInput, ShiftSwapRequestUncheckedCreateInput>
    /**
     * In case the ShiftSwapRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShiftSwapRequestUpdateInput, ShiftSwapRequestUncheckedUpdateInput>
  }

  /**
   * ShiftSwapRequest delete
   */
  export type ShiftSwapRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
    /**
     * Filter which ShiftSwapRequest to delete.
     */
    where: ShiftSwapRequestWhereUniqueInput
  }

  /**
   * ShiftSwapRequest deleteMany
   */
  export type ShiftSwapRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShiftSwapRequests to delete
     */
    where?: ShiftSwapRequestWhereInput
    /**
     * Limit how many ShiftSwapRequests to delete.
     */
    limit?: number
  }

  /**
   * ShiftSwapRequest without action
   */
  export type ShiftSwapRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftSwapRequest
     */
    select?: ShiftSwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShiftSwapRequest
     */
    omit?: ShiftSwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftSwapRequestInclude<ExtArgs> | null
  }


  /**
   * Model WorkLog
   */

  export type AggregateWorkLog = {
    _count: WorkLogCountAggregateOutputType | null
    _avg: WorkLogAvgAggregateOutputType | null
    _sum: WorkLogSumAggregateOutputType | null
    _min: WorkLogMinAggregateOutputType | null
    _max: WorkLogMaxAggregateOutputType | null
  }

  export type WorkLogAvgAggregateOutputType = {
    hours: number | null
  }

  export type WorkLogSumAggregateOutputType = {
    hours: number | null
  }

  export type WorkLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    shiftId: string | null
    hours: number | null
    notes: string | null
    createdAt: Date | null
  }

  export type WorkLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    shiftId: string | null
    hours: number | null
    notes: string | null
    createdAt: Date | null
  }

  export type WorkLogCountAggregateOutputType = {
    id: number
    userId: number
    shiftId: number
    hours: number
    notes: number
    createdAt: number
    _all: number
  }


  export type WorkLogAvgAggregateInputType = {
    hours?: true
  }

  export type WorkLogSumAggregateInputType = {
    hours?: true
  }

  export type WorkLogMinAggregateInputType = {
    id?: true
    userId?: true
    shiftId?: true
    hours?: true
    notes?: true
    createdAt?: true
  }

  export type WorkLogMaxAggregateInputType = {
    id?: true
    userId?: true
    shiftId?: true
    hours?: true
    notes?: true
    createdAt?: true
  }

  export type WorkLogCountAggregateInputType = {
    id?: true
    userId?: true
    shiftId?: true
    hours?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type WorkLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkLog to aggregate.
     */
    where?: WorkLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkLogs to fetch.
     */
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkLogs
    **/
    _count?: true | WorkLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkLogMaxAggregateInputType
  }

  export type GetWorkLogAggregateType<T extends WorkLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkLog[P]>
      : GetScalarType<T[P], AggregateWorkLog[P]>
  }




  export type WorkLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkLogWhereInput
    orderBy?: WorkLogOrderByWithAggregationInput | WorkLogOrderByWithAggregationInput[]
    by: WorkLogScalarFieldEnum[] | WorkLogScalarFieldEnum
    having?: WorkLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkLogCountAggregateInputType | true
    _avg?: WorkLogAvgAggregateInputType
    _sum?: WorkLogSumAggregateInputType
    _min?: WorkLogMinAggregateInputType
    _max?: WorkLogMaxAggregateInputType
  }

  export type WorkLogGroupByOutputType = {
    id: string
    userId: string
    shiftId: string
    hours: number
    notes: string | null
    createdAt: Date
    _count: WorkLogCountAggregateOutputType | null
    _avg: WorkLogAvgAggregateOutputType | null
    _sum: WorkLogSumAggregateOutputType | null
    _min: WorkLogMinAggregateOutputType | null
    _max: WorkLogMaxAggregateOutputType | null
  }

  type GetWorkLogGroupByPayload<T extends WorkLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkLogGroupByOutputType[P]>
            : GetScalarType<T[P], WorkLogGroupByOutputType[P]>
        }
      >
    >


  export type WorkLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    shiftId?: boolean
    hours?: boolean
    notes?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workLog"]>

  export type WorkLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    shiftId?: boolean
    hours?: boolean
    notes?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workLog"]>

  export type WorkLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    shiftId?: boolean
    hours?: boolean
    notes?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workLog"]>

  export type WorkLogSelectScalar = {
    id?: boolean
    userId?: boolean
    shiftId?: boolean
    hours?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type WorkLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "shiftId" | "hours" | "notes" | "createdAt", ExtArgs["result"]["workLog"]>
  export type WorkLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }
  export type WorkLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }
  export type WorkLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }

  export type $WorkLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      shift: Prisma.$ShiftPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      shiftId: string
      hours: number
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["workLog"]>
    composites: {}
  }

  type WorkLogGetPayload<S extends boolean | null | undefined | WorkLogDefaultArgs> = $Result.GetResult<Prisma.$WorkLogPayload, S>

  type WorkLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkLogCountAggregateInputType | true
    }

  export interface WorkLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkLog'], meta: { name: 'WorkLog' } }
    /**
     * Find zero or one WorkLog that matches the filter.
     * @param {WorkLogFindUniqueArgs} args - Arguments to find a WorkLog
     * @example
     * // Get one WorkLog
     * const workLog = await prisma.workLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkLogFindUniqueArgs>(args: SelectSubset<T, WorkLogFindUniqueArgs<ExtArgs>>): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkLogFindUniqueOrThrowArgs} args - Arguments to find a WorkLog
     * @example
     * // Get one WorkLog
     * const workLog = await prisma.workLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogFindFirstArgs} args - Arguments to find a WorkLog
     * @example
     * // Get one WorkLog
     * const workLog = await prisma.workLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkLogFindFirstArgs>(args?: SelectSubset<T, WorkLogFindFirstArgs<ExtArgs>>): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogFindFirstOrThrowArgs} args - Arguments to find a WorkLog
     * @example
     * // Get one WorkLog
     * const workLog = await prisma.workLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkLogs
     * const workLogs = await prisma.workLog.findMany()
     * 
     * // Get first 10 WorkLogs
     * const workLogs = await prisma.workLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workLogWithIdOnly = await prisma.workLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkLogFindManyArgs>(args?: SelectSubset<T, WorkLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkLog.
     * @param {WorkLogCreateArgs} args - Arguments to create a WorkLog.
     * @example
     * // Create one WorkLog
     * const WorkLog = await prisma.workLog.create({
     *   data: {
     *     // ... data to create a WorkLog
     *   }
     * })
     * 
     */
    create<T extends WorkLogCreateArgs>(args: SelectSubset<T, WorkLogCreateArgs<ExtArgs>>): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkLogs.
     * @param {WorkLogCreateManyArgs} args - Arguments to create many WorkLogs.
     * @example
     * // Create many WorkLogs
     * const workLog = await prisma.workLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkLogCreateManyArgs>(args?: SelectSubset<T, WorkLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkLogs and returns the data saved in the database.
     * @param {WorkLogCreateManyAndReturnArgs} args - Arguments to create many WorkLogs.
     * @example
     * // Create many WorkLogs
     * const workLog = await prisma.workLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkLogs and only return the `id`
     * const workLogWithIdOnly = await prisma.workLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkLog.
     * @param {WorkLogDeleteArgs} args - Arguments to delete one WorkLog.
     * @example
     * // Delete one WorkLog
     * const WorkLog = await prisma.workLog.delete({
     *   where: {
     *     // ... filter to delete one WorkLog
     *   }
     * })
     * 
     */
    delete<T extends WorkLogDeleteArgs>(args: SelectSubset<T, WorkLogDeleteArgs<ExtArgs>>): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkLog.
     * @param {WorkLogUpdateArgs} args - Arguments to update one WorkLog.
     * @example
     * // Update one WorkLog
     * const workLog = await prisma.workLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkLogUpdateArgs>(args: SelectSubset<T, WorkLogUpdateArgs<ExtArgs>>): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkLogs.
     * @param {WorkLogDeleteManyArgs} args - Arguments to filter WorkLogs to delete.
     * @example
     * // Delete a few WorkLogs
     * const { count } = await prisma.workLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkLogDeleteManyArgs>(args?: SelectSubset<T, WorkLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkLogs
     * const workLog = await prisma.workLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkLogUpdateManyArgs>(args: SelectSubset<T, WorkLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkLogs and returns the data updated in the database.
     * @param {WorkLogUpdateManyAndReturnArgs} args - Arguments to update many WorkLogs.
     * @example
     * // Update many WorkLogs
     * const workLog = await prisma.workLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkLogs and only return the `id`
     * const workLogWithIdOnly = await prisma.workLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkLogUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkLog.
     * @param {WorkLogUpsertArgs} args - Arguments to update or create a WorkLog.
     * @example
     * // Update or create a WorkLog
     * const workLog = await prisma.workLog.upsert({
     *   create: {
     *     // ... data to create a WorkLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkLog we want to update
     *   }
     * })
     */
    upsert<T extends WorkLogUpsertArgs>(args: SelectSubset<T, WorkLogUpsertArgs<ExtArgs>>): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogCountArgs} args - Arguments to filter WorkLogs to count.
     * @example
     * // Count the number of WorkLogs
     * const count = await prisma.workLog.count({
     *   where: {
     *     // ... the filter for the WorkLogs we want to count
     *   }
     * })
    **/
    count<T extends WorkLogCountArgs>(
      args?: Subset<T, WorkLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkLogAggregateArgs>(args: Subset<T, WorkLogAggregateArgs>): Prisma.PrismaPromise<GetWorkLogAggregateType<T>>

    /**
     * Group by WorkLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkLogGroupByArgs['orderBy'] }
        : { orderBy?: WorkLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkLog model
   */
  readonly fields: WorkLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    shift<T extends ShiftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShiftDefaultArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkLog model
   */
  interface WorkLogFieldRefs {
    readonly id: FieldRef<"WorkLog", 'String'>
    readonly userId: FieldRef<"WorkLog", 'String'>
    readonly shiftId: FieldRef<"WorkLog", 'String'>
    readonly hours: FieldRef<"WorkLog", 'Float'>
    readonly notes: FieldRef<"WorkLog", 'String'>
    readonly createdAt: FieldRef<"WorkLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkLog findUnique
   */
  export type WorkLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter, which WorkLog to fetch.
     */
    where: WorkLogWhereUniqueInput
  }

  /**
   * WorkLog findUniqueOrThrow
   */
  export type WorkLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter, which WorkLog to fetch.
     */
    where: WorkLogWhereUniqueInput
  }

  /**
   * WorkLog findFirst
   */
  export type WorkLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter, which WorkLog to fetch.
     */
    where?: WorkLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkLogs to fetch.
     */
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkLogs.
     */
    cursor?: WorkLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkLogs.
     */
    distinct?: WorkLogScalarFieldEnum | WorkLogScalarFieldEnum[]
  }

  /**
   * WorkLog findFirstOrThrow
   */
  export type WorkLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter, which WorkLog to fetch.
     */
    where?: WorkLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkLogs to fetch.
     */
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkLogs.
     */
    cursor?: WorkLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkLogs.
     */
    distinct?: WorkLogScalarFieldEnum | WorkLogScalarFieldEnum[]
  }

  /**
   * WorkLog findMany
   */
  export type WorkLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter, which WorkLogs to fetch.
     */
    where?: WorkLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkLogs to fetch.
     */
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkLogs.
     */
    cursor?: WorkLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkLogs.
     */
    skip?: number
    distinct?: WorkLogScalarFieldEnum | WorkLogScalarFieldEnum[]
  }

  /**
   * WorkLog create
   */
  export type WorkLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkLog.
     */
    data: XOR<WorkLogCreateInput, WorkLogUncheckedCreateInput>
  }

  /**
   * WorkLog createMany
   */
  export type WorkLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkLogs.
     */
    data: WorkLogCreateManyInput | WorkLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkLog createManyAndReturn
   */
  export type WorkLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * The data used to create many WorkLogs.
     */
    data: WorkLogCreateManyInput | WorkLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkLog update
   */
  export type WorkLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkLog.
     */
    data: XOR<WorkLogUpdateInput, WorkLogUncheckedUpdateInput>
    /**
     * Choose, which WorkLog to update.
     */
    where: WorkLogWhereUniqueInput
  }

  /**
   * WorkLog updateMany
   */
  export type WorkLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkLogs.
     */
    data: XOR<WorkLogUpdateManyMutationInput, WorkLogUncheckedUpdateManyInput>
    /**
     * Filter which WorkLogs to update
     */
    where?: WorkLogWhereInput
    /**
     * Limit how many WorkLogs to update.
     */
    limit?: number
  }

  /**
   * WorkLog updateManyAndReturn
   */
  export type WorkLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * The data used to update WorkLogs.
     */
    data: XOR<WorkLogUpdateManyMutationInput, WorkLogUncheckedUpdateManyInput>
    /**
     * Filter which WorkLogs to update
     */
    where?: WorkLogWhereInput
    /**
     * Limit how many WorkLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkLog upsert
   */
  export type WorkLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkLog to update in case it exists.
     */
    where: WorkLogWhereUniqueInput
    /**
     * In case the WorkLog found by the `where` argument doesn't exist, create a new WorkLog with this data.
     */
    create: XOR<WorkLogCreateInput, WorkLogUncheckedCreateInput>
    /**
     * In case the WorkLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkLogUpdateInput, WorkLogUncheckedUpdateInput>
  }

  /**
   * WorkLog delete
   */
  export type WorkLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter which WorkLog to delete.
     */
    where: WorkLogWhereUniqueInput
  }

  /**
   * WorkLog deleteMany
   */
  export type WorkLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkLogs to delete
     */
    where?: WorkLogWhereInput
    /**
     * Limit how many WorkLogs to delete.
     */
    limit?: number
  }

  /**
   * WorkLog without action
   */
  export type WorkLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkLog
     */
    omit?: WorkLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkLogInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    read: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    read?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    read?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    read?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    message: string
    read: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "message" | "read" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      message: string
      read: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model ChatRoom
   */

  export type AggregateChatRoom = {
    _count: ChatRoomCountAggregateOutputType | null
    _min: ChatRoomMinAggregateOutputType | null
    _max: ChatRoomMaxAggregateOutputType | null
  }

  export type ChatRoomMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ChatRoomMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ChatRoomCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type ChatRoomMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type ChatRoomMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type ChatRoomCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type ChatRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatRoom to aggregate.
     */
    where?: ChatRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatRooms to fetch.
     */
    orderBy?: ChatRoomOrderByWithRelationInput | ChatRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatRooms
    **/
    _count?: true | ChatRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatRoomMaxAggregateInputType
  }

  export type GetChatRoomAggregateType<T extends ChatRoomAggregateArgs> = {
        [P in keyof T & keyof AggregateChatRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatRoom[P]>
      : GetScalarType<T[P], AggregateChatRoom[P]>
  }




  export type ChatRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatRoomWhereInput
    orderBy?: ChatRoomOrderByWithAggregationInput | ChatRoomOrderByWithAggregationInput[]
    by: ChatRoomScalarFieldEnum[] | ChatRoomScalarFieldEnum
    having?: ChatRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatRoomCountAggregateInputType | true
    _min?: ChatRoomMinAggregateInputType
    _max?: ChatRoomMaxAggregateInputType
  }

  export type ChatRoomGroupByOutputType = {
    id: string
    name: string | null
    createdAt: Date
    _count: ChatRoomCountAggregateOutputType | null
    _min: ChatRoomMinAggregateOutputType | null
    _max: ChatRoomMaxAggregateOutputType | null
  }

  type GetChatRoomGroupByPayload<T extends ChatRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatRoomGroupByOutputType[P]>
            : GetScalarType<T[P], ChatRoomGroupByOutputType[P]>
        }
      >
    >


  export type ChatRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    members?: boolean | ChatRoom$membersArgs<ExtArgs>
    messages?: boolean | ChatRoom$messagesArgs<ExtArgs>
    _count?: boolean | ChatRoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatRoom"]>

  export type ChatRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["chatRoom"]>

  export type ChatRoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["chatRoom"]>

  export type ChatRoomSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type ChatRoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["chatRoom"]>
  export type ChatRoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ChatRoom$membersArgs<ExtArgs>
    messages?: boolean | ChatRoom$messagesArgs<ExtArgs>
    _count?: boolean | ChatRoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChatRoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ChatRoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ChatRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatRoom"
    objects: {
      members: Prisma.$ChatMemberPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      createdAt: Date
    }, ExtArgs["result"]["chatRoom"]>
    composites: {}
  }

  type ChatRoomGetPayload<S extends boolean | null | undefined | ChatRoomDefaultArgs> = $Result.GetResult<Prisma.$ChatRoomPayload, S>

  type ChatRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatRoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatRoomCountAggregateInputType | true
    }

  export interface ChatRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatRoom'], meta: { name: 'ChatRoom' } }
    /**
     * Find zero or one ChatRoom that matches the filter.
     * @param {ChatRoomFindUniqueArgs} args - Arguments to find a ChatRoom
     * @example
     * // Get one ChatRoom
     * const chatRoom = await prisma.chatRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatRoomFindUniqueArgs>(args: SelectSubset<T, ChatRoomFindUniqueArgs<ExtArgs>>): Prisma__ChatRoomClient<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatRoom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatRoomFindUniqueOrThrowArgs} args - Arguments to find a ChatRoom
     * @example
     * // Get one ChatRoom
     * const chatRoom = await prisma.chatRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatRoomClient<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatRoomFindFirstArgs} args - Arguments to find a ChatRoom
     * @example
     * // Get one ChatRoom
     * const chatRoom = await prisma.chatRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatRoomFindFirstArgs>(args?: SelectSubset<T, ChatRoomFindFirstArgs<ExtArgs>>): Prisma__ChatRoomClient<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatRoomFindFirstOrThrowArgs} args - Arguments to find a ChatRoom
     * @example
     * // Get one ChatRoom
     * const chatRoom = await prisma.chatRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatRoomClient<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatRooms
     * const chatRooms = await prisma.chatRoom.findMany()
     * 
     * // Get first 10 ChatRooms
     * const chatRooms = await prisma.chatRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatRoomWithIdOnly = await prisma.chatRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatRoomFindManyArgs>(args?: SelectSubset<T, ChatRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatRoom.
     * @param {ChatRoomCreateArgs} args - Arguments to create a ChatRoom.
     * @example
     * // Create one ChatRoom
     * const ChatRoom = await prisma.chatRoom.create({
     *   data: {
     *     // ... data to create a ChatRoom
     *   }
     * })
     * 
     */
    create<T extends ChatRoomCreateArgs>(args: SelectSubset<T, ChatRoomCreateArgs<ExtArgs>>): Prisma__ChatRoomClient<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatRooms.
     * @param {ChatRoomCreateManyArgs} args - Arguments to create many ChatRooms.
     * @example
     * // Create many ChatRooms
     * const chatRoom = await prisma.chatRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatRoomCreateManyArgs>(args?: SelectSubset<T, ChatRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatRooms and returns the data saved in the database.
     * @param {ChatRoomCreateManyAndReturnArgs} args - Arguments to create many ChatRooms.
     * @example
     * // Create many ChatRooms
     * const chatRoom = await prisma.chatRoom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatRooms and only return the `id`
     * const chatRoomWithIdOnly = await prisma.chatRoom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatRoom.
     * @param {ChatRoomDeleteArgs} args - Arguments to delete one ChatRoom.
     * @example
     * // Delete one ChatRoom
     * const ChatRoom = await prisma.chatRoom.delete({
     *   where: {
     *     // ... filter to delete one ChatRoom
     *   }
     * })
     * 
     */
    delete<T extends ChatRoomDeleteArgs>(args: SelectSubset<T, ChatRoomDeleteArgs<ExtArgs>>): Prisma__ChatRoomClient<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatRoom.
     * @param {ChatRoomUpdateArgs} args - Arguments to update one ChatRoom.
     * @example
     * // Update one ChatRoom
     * const chatRoom = await prisma.chatRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatRoomUpdateArgs>(args: SelectSubset<T, ChatRoomUpdateArgs<ExtArgs>>): Prisma__ChatRoomClient<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatRooms.
     * @param {ChatRoomDeleteManyArgs} args - Arguments to filter ChatRooms to delete.
     * @example
     * // Delete a few ChatRooms
     * const { count } = await prisma.chatRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatRoomDeleteManyArgs>(args?: SelectSubset<T, ChatRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatRooms
     * const chatRoom = await prisma.chatRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatRoomUpdateManyArgs>(args: SelectSubset<T, ChatRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatRooms and returns the data updated in the database.
     * @param {ChatRoomUpdateManyAndReturnArgs} args - Arguments to update many ChatRooms.
     * @example
     * // Update many ChatRooms
     * const chatRoom = await prisma.chatRoom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatRooms and only return the `id`
     * const chatRoomWithIdOnly = await prisma.chatRoom.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatRoomUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatRoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatRoom.
     * @param {ChatRoomUpsertArgs} args - Arguments to update or create a ChatRoom.
     * @example
     * // Update or create a ChatRoom
     * const chatRoom = await prisma.chatRoom.upsert({
     *   create: {
     *     // ... data to create a ChatRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatRoom we want to update
     *   }
     * })
     */
    upsert<T extends ChatRoomUpsertArgs>(args: SelectSubset<T, ChatRoomUpsertArgs<ExtArgs>>): Prisma__ChatRoomClient<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatRoomCountArgs} args - Arguments to filter ChatRooms to count.
     * @example
     * // Count the number of ChatRooms
     * const count = await prisma.chatRoom.count({
     *   where: {
     *     // ... the filter for the ChatRooms we want to count
     *   }
     * })
    **/
    count<T extends ChatRoomCountArgs>(
      args?: Subset<T, ChatRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatRoomAggregateArgs>(args: Subset<T, ChatRoomAggregateArgs>): Prisma.PrismaPromise<GetChatRoomAggregateType<T>>

    /**
     * Group by ChatRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatRoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatRoomGroupByArgs['orderBy'] }
        : { orderBy?: ChatRoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatRoom model
   */
  readonly fields: ChatRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends ChatRoom$membersArgs<ExtArgs> = {}>(args?: Subset<T, ChatRoom$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends ChatRoom$messagesArgs<ExtArgs> = {}>(args?: Subset<T, ChatRoom$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatRoom model
   */
  interface ChatRoomFieldRefs {
    readonly id: FieldRef<"ChatRoom", 'String'>
    readonly name: FieldRef<"ChatRoom", 'String'>
    readonly createdAt: FieldRef<"ChatRoom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatRoom findUnique
   */
  export type ChatRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatRoomInclude<ExtArgs> | null
    /**
     * Filter, which ChatRoom to fetch.
     */
    where: ChatRoomWhereUniqueInput
  }

  /**
   * ChatRoom findUniqueOrThrow
   */
  export type ChatRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatRoomInclude<ExtArgs> | null
    /**
     * Filter, which ChatRoom to fetch.
     */
    where: ChatRoomWhereUniqueInput
  }

  /**
   * ChatRoom findFirst
   */
  export type ChatRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatRoomInclude<ExtArgs> | null
    /**
     * Filter, which ChatRoom to fetch.
     */
    where?: ChatRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatRooms to fetch.
     */
    orderBy?: ChatRoomOrderByWithRelationInput | ChatRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatRooms.
     */
    cursor?: ChatRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatRooms.
     */
    distinct?: ChatRoomScalarFieldEnum | ChatRoomScalarFieldEnum[]
  }

  /**
   * ChatRoom findFirstOrThrow
   */
  export type ChatRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatRoomInclude<ExtArgs> | null
    /**
     * Filter, which ChatRoom to fetch.
     */
    where?: ChatRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatRooms to fetch.
     */
    orderBy?: ChatRoomOrderByWithRelationInput | ChatRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatRooms.
     */
    cursor?: ChatRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatRooms.
     */
    distinct?: ChatRoomScalarFieldEnum | ChatRoomScalarFieldEnum[]
  }

  /**
   * ChatRoom findMany
   */
  export type ChatRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatRoomInclude<ExtArgs> | null
    /**
     * Filter, which ChatRooms to fetch.
     */
    where?: ChatRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatRooms to fetch.
     */
    orderBy?: ChatRoomOrderByWithRelationInput | ChatRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatRooms.
     */
    cursor?: ChatRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatRooms.
     */
    skip?: number
    distinct?: ChatRoomScalarFieldEnum | ChatRoomScalarFieldEnum[]
  }

  /**
   * ChatRoom create
   */
  export type ChatRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatRoomInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatRoom.
     */
    data?: XOR<ChatRoomCreateInput, ChatRoomUncheckedCreateInput>
  }

  /**
   * ChatRoom createMany
   */
  export type ChatRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatRooms.
     */
    data: ChatRoomCreateManyInput | ChatRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatRoom createManyAndReturn
   */
  export type ChatRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * The data used to create many ChatRooms.
     */
    data: ChatRoomCreateManyInput | ChatRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatRoom update
   */
  export type ChatRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatRoomInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatRoom.
     */
    data: XOR<ChatRoomUpdateInput, ChatRoomUncheckedUpdateInput>
    /**
     * Choose, which ChatRoom to update.
     */
    where: ChatRoomWhereUniqueInput
  }

  /**
   * ChatRoom updateMany
   */
  export type ChatRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatRooms.
     */
    data: XOR<ChatRoomUpdateManyMutationInput, ChatRoomUncheckedUpdateManyInput>
    /**
     * Filter which ChatRooms to update
     */
    where?: ChatRoomWhereInput
    /**
     * Limit how many ChatRooms to update.
     */
    limit?: number
  }

  /**
   * ChatRoom updateManyAndReturn
   */
  export type ChatRoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * The data used to update ChatRooms.
     */
    data: XOR<ChatRoomUpdateManyMutationInput, ChatRoomUncheckedUpdateManyInput>
    /**
     * Filter which ChatRooms to update
     */
    where?: ChatRoomWhereInput
    /**
     * Limit how many ChatRooms to update.
     */
    limit?: number
  }

  /**
   * ChatRoom upsert
   */
  export type ChatRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatRoomInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatRoom to update in case it exists.
     */
    where: ChatRoomWhereUniqueInput
    /**
     * In case the ChatRoom found by the `where` argument doesn't exist, create a new ChatRoom with this data.
     */
    create: XOR<ChatRoomCreateInput, ChatRoomUncheckedCreateInput>
    /**
     * In case the ChatRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatRoomUpdateInput, ChatRoomUncheckedUpdateInput>
  }

  /**
   * ChatRoom delete
   */
  export type ChatRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatRoomInclude<ExtArgs> | null
    /**
     * Filter which ChatRoom to delete.
     */
    where: ChatRoomWhereUniqueInput
  }

  /**
   * ChatRoom deleteMany
   */
  export type ChatRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatRooms to delete
     */
    where?: ChatRoomWhereInput
    /**
     * Limit how many ChatRooms to delete.
     */
    limit?: number
  }

  /**
   * ChatRoom.members
   */
  export type ChatRoom$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    where?: ChatMemberWhereInput
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    cursor?: ChatMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMemberScalarFieldEnum | ChatMemberScalarFieldEnum[]
  }

  /**
   * ChatRoom.messages
   */
  export type ChatRoom$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * ChatRoom without action
   */
  export type ChatRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatRoom
     */
    select?: ChatRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatRoom
     */
    omit?: ChatRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatRoomInclude<ExtArgs> | null
  }


  /**
   * Model ChatMember
   */

  export type AggregateChatMember = {
    _count: ChatMemberCountAggregateOutputType | null
    _min: ChatMemberMinAggregateOutputType | null
    _max: ChatMemberMaxAggregateOutputType | null
  }

  export type ChatMemberMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    userId: string | null
    joinedAt: Date | null
  }

  export type ChatMemberMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    userId: string | null
    joinedAt: Date | null
  }

  export type ChatMemberCountAggregateOutputType = {
    id: number
    roomId: number
    userId: number
    joinedAt: number
    _all: number
  }


  export type ChatMemberMinAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    joinedAt?: true
  }

  export type ChatMemberMaxAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    joinedAt?: true
  }

  export type ChatMemberCountAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    joinedAt?: true
    _all?: true
  }

  export type ChatMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMember to aggregate.
     */
    where?: ChatMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembers to fetch.
     */
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMembers
    **/
    _count?: true | ChatMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMemberMaxAggregateInputType
  }

  export type GetChatMemberAggregateType<T extends ChatMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMember[P]>
      : GetScalarType<T[P], AggregateChatMember[P]>
  }




  export type ChatMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMemberWhereInput
    orderBy?: ChatMemberOrderByWithAggregationInput | ChatMemberOrderByWithAggregationInput[]
    by: ChatMemberScalarFieldEnum[] | ChatMemberScalarFieldEnum
    having?: ChatMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMemberCountAggregateInputType | true
    _min?: ChatMemberMinAggregateInputType
    _max?: ChatMemberMaxAggregateInputType
  }

  export type ChatMemberGroupByOutputType = {
    id: string
    roomId: string
    userId: string
    joinedAt: Date
    _count: ChatMemberCountAggregateOutputType | null
    _min: ChatMemberMinAggregateOutputType | null
    _max: ChatMemberMaxAggregateOutputType | null
  }

  type GetChatMemberGroupByPayload<T extends ChatMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMemberGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMemberGroupByOutputType[P]>
        }
      >
    >


  export type ChatMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    joinedAt?: boolean
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMember"]>

  export type ChatMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    joinedAt?: boolean
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMember"]>

  export type ChatMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    joinedAt?: boolean
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMember"]>

  export type ChatMemberSelectScalar = {
    id?: boolean
    roomId?: boolean
    userId?: boolean
    joinedAt?: boolean
  }

  export type ChatMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomId" | "userId" | "joinedAt", ExtArgs["result"]["chatMember"]>
  export type ChatMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ChatMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ChatMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ChatMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMember"
    objects: {
      room: Prisma.$ChatRoomPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      userId: string
      joinedAt: Date
    }, ExtArgs["result"]["chatMember"]>
    composites: {}
  }

  type ChatMemberGetPayload<S extends boolean | null | undefined | ChatMemberDefaultArgs> = $Result.GetResult<Prisma.$ChatMemberPayload, S>

  type ChatMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMemberCountAggregateInputType | true
    }

  export interface ChatMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMember'], meta: { name: 'ChatMember' } }
    /**
     * Find zero or one ChatMember that matches the filter.
     * @param {ChatMemberFindUniqueArgs} args - Arguments to find a ChatMember
     * @example
     * // Get one ChatMember
     * const chatMember = await prisma.chatMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMemberFindUniqueArgs>(args: SelectSubset<T, ChatMemberFindUniqueArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMemberFindUniqueOrThrowArgs} args - Arguments to find a ChatMember
     * @example
     * // Get one ChatMember
     * const chatMember = await prisma.chatMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberFindFirstArgs} args - Arguments to find a ChatMember
     * @example
     * // Get one ChatMember
     * const chatMember = await prisma.chatMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMemberFindFirstArgs>(args?: SelectSubset<T, ChatMemberFindFirstArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberFindFirstOrThrowArgs} args - Arguments to find a ChatMember
     * @example
     * // Get one ChatMember
     * const chatMember = await prisma.chatMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMembers
     * const chatMembers = await prisma.chatMember.findMany()
     * 
     * // Get first 10 ChatMembers
     * const chatMembers = await prisma.chatMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatMemberWithIdOnly = await prisma.chatMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatMemberFindManyArgs>(args?: SelectSubset<T, ChatMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMember.
     * @param {ChatMemberCreateArgs} args - Arguments to create a ChatMember.
     * @example
     * // Create one ChatMember
     * const ChatMember = await prisma.chatMember.create({
     *   data: {
     *     // ... data to create a ChatMember
     *   }
     * })
     * 
     */
    create<T extends ChatMemberCreateArgs>(args: SelectSubset<T, ChatMemberCreateArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMembers.
     * @param {ChatMemberCreateManyArgs} args - Arguments to create many ChatMembers.
     * @example
     * // Create many ChatMembers
     * const chatMember = await prisma.chatMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMemberCreateManyArgs>(args?: SelectSubset<T, ChatMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMembers and returns the data saved in the database.
     * @param {ChatMemberCreateManyAndReturnArgs} args - Arguments to create many ChatMembers.
     * @example
     * // Create many ChatMembers
     * const chatMember = await prisma.chatMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMembers and only return the `id`
     * const chatMemberWithIdOnly = await prisma.chatMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMember.
     * @param {ChatMemberDeleteArgs} args - Arguments to delete one ChatMember.
     * @example
     * // Delete one ChatMember
     * const ChatMember = await prisma.chatMember.delete({
     *   where: {
     *     // ... filter to delete one ChatMember
     *   }
     * })
     * 
     */
    delete<T extends ChatMemberDeleteArgs>(args: SelectSubset<T, ChatMemberDeleteArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMember.
     * @param {ChatMemberUpdateArgs} args - Arguments to update one ChatMember.
     * @example
     * // Update one ChatMember
     * const chatMember = await prisma.chatMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMemberUpdateArgs>(args: SelectSubset<T, ChatMemberUpdateArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMembers.
     * @param {ChatMemberDeleteManyArgs} args - Arguments to filter ChatMembers to delete.
     * @example
     * // Delete a few ChatMembers
     * const { count } = await prisma.chatMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMemberDeleteManyArgs>(args?: SelectSubset<T, ChatMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMembers
     * const chatMember = await prisma.chatMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMemberUpdateManyArgs>(args: SelectSubset<T, ChatMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMembers and returns the data updated in the database.
     * @param {ChatMemberUpdateManyAndReturnArgs} args - Arguments to update many ChatMembers.
     * @example
     * // Update many ChatMembers
     * const chatMember = await prisma.chatMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMembers and only return the `id`
     * const chatMemberWithIdOnly = await prisma.chatMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMember.
     * @param {ChatMemberUpsertArgs} args - Arguments to update or create a ChatMember.
     * @example
     * // Update or create a ChatMember
     * const chatMember = await prisma.chatMember.upsert({
     *   create: {
     *     // ... data to create a ChatMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMember we want to update
     *   }
     * })
     */
    upsert<T extends ChatMemberUpsertArgs>(args: SelectSubset<T, ChatMemberUpsertArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberCountArgs} args - Arguments to filter ChatMembers to count.
     * @example
     * // Count the number of ChatMembers
     * const count = await prisma.chatMember.count({
     *   where: {
     *     // ... the filter for the ChatMembers we want to count
     *   }
     * })
    **/
    count<T extends ChatMemberCountArgs>(
      args?: Subset<T, ChatMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatMemberAggregateArgs>(args: Subset<T, ChatMemberAggregateArgs>): Prisma.PrismaPromise<GetChatMemberAggregateType<T>>

    /**
     * Group by ChatMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMemberGroupByArgs['orderBy'] }
        : { orderBy?: ChatMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMember model
   */
  readonly fields: ChatMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends ChatRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatRoomDefaultArgs<ExtArgs>>): Prisma__ChatRoomClient<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatMember model
   */
  interface ChatMemberFieldRefs {
    readonly id: FieldRef<"ChatMember", 'String'>
    readonly roomId: FieldRef<"ChatMember", 'String'>
    readonly userId: FieldRef<"ChatMember", 'String'>
    readonly joinedAt: FieldRef<"ChatMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatMember findUnique
   */
  export type ChatMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatMember to fetch.
     */
    where: ChatMemberWhereUniqueInput
  }

  /**
   * ChatMember findUniqueOrThrow
   */
  export type ChatMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatMember to fetch.
     */
    where: ChatMemberWhereUniqueInput
  }

  /**
   * ChatMember findFirst
   */
  export type ChatMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatMember to fetch.
     */
    where?: ChatMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembers to fetch.
     */
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMembers.
     */
    cursor?: ChatMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMembers.
     */
    distinct?: ChatMemberScalarFieldEnum | ChatMemberScalarFieldEnum[]
  }

  /**
   * ChatMember findFirstOrThrow
   */
  export type ChatMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatMember to fetch.
     */
    where?: ChatMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembers to fetch.
     */
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMembers.
     */
    cursor?: ChatMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMembers.
     */
    distinct?: ChatMemberScalarFieldEnum | ChatMemberScalarFieldEnum[]
  }

  /**
   * ChatMember findMany
   */
  export type ChatMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatMembers to fetch.
     */
    where?: ChatMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembers to fetch.
     */
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMembers.
     */
    cursor?: ChatMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembers.
     */
    skip?: number
    distinct?: ChatMemberScalarFieldEnum | ChatMemberScalarFieldEnum[]
  }

  /**
   * ChatMember create
   */
  export type ChatMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatMember.
     */
    data: XOR<ChatMemberCreateInput, ChatMemberUncheckedCreateInput>
  }

  /**
   * ChatMember createMany
   */
  export type ChatMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMembers.
     */
    data: ChatMemberCreateManyInput | ChatMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMember createManyAndReturn
   */
  export type ChatMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMembers.
     */
    data: ChatMemberCreateManyInput | ChatMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMember update
   */
  export type ChatMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatMember.
     */
    data: XOR<ChatMemberUpdateInput, ChatMemberUncheckedUpdateInput>
    /**
     * Choose, which ChatMember to update.
     */
    where: ChatMemberWhereUniqueInput
  }

  /**
   * ChatMember updateMany
   */
  export type ChatMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMembers.
     */
    data: XOR<ChatMemberUpdateManyMutationInput, ChatMemberUncheckedUpdateManyInput>
    /**
     * Filter which ChatMembers to update
     */
    where?: ChatMemberWhereInput
    /**
     * Limit how many ChatMembers to update.
     */
    limit?: number
  }

  /**
   * ChatMember updateManyAndReturn
   */
  export type ChatMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * The data used to update ChatMembers.
     */
    data: XOR<ChatMemberUpdateManyMutationInput, ChatMemberUncheckedUpdateManyInput>
    /**
     * Filter which ChatMembers to update
     */
    where?: ChatMemberWhereInput
    /**
     * Limit how many ChatMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMember upsert
   */
  export type ChatMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatMember to update in case it exists.
     */
    where: ChatMemberWhereUniqueInput
    /**
     * In case the ChatMember found by the `where` argument doesn't exist, create a new ChatMember with this data.
     */
    create: XOR<ChatMemberCreateInput, ChatMemberUncheckedCreateInput>
    /**
     * In case the ChatMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMemberUpdateInput, ChatMemberUncheckedUpdateInput>
  }

  /**
   * ChatMember delete
   */
  export type ChatMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter which ChatMember to delete.
     */
    where: ChatMemberWhereUniqueInput
  }

  /**
   * ChatMember deleteMany
   */
  export type ChatMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMembers to delete
     */
    where?: ChatMemberWhereInput
    /**
     * Limit how many ChatMembers to delete.
     */
    limit?: number
  }

  /**
   * ChatMember without action
   */
  export type ChatMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    senderId: string | null
    content: string | null
    sentAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    senderId: string | null
    content: string | null
    sentAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    roomId: number
    senderId: number
    content: number
    sentAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    content?: true
    sentAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    content?: true
    sentAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    content?: true
    sentAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    roomId: string
    senderId: string
    content: string
    sentAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    content?: boolean
    sentAt?: boolean
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    content?: boolean
    sentAt?: boolean
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    content?: boolean
    sentAt?: boolean
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    content?: boolean
    sentAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomId" | "senderId" | "content" | "sentAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | ChatRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      room: Prisma.$ChatRoomPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      senderId: string
      content: string
      sentAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends ChatRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatRoomDefaultArgs<ExtArgs>>): Prisma__ChatRoomClient<$Result.GetResult<Prisma.$ChatRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly roomId: FieldRef<"Message", 'String'>
    readonly senderId: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly sentAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ShiftScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    startTime: 'startTime',
    endTime: 'endTime',
    location: 'location',
    notes: 'notes',
    status: 'status',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShiftScalarFieldEnum = (typeof ShiftScalarFieldEnum)[keyof typeof ShiftScalarFieldEnum]


  export const TimeOffRequestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fromDate: 'fromDate',
    toDate: 'toDate',
    type: 'type',
    reason: 'reason',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TimeOffRequestScalarFieldEnum = (typeof TimeOffRequestScalarFieldEnum)[keyof typeof TimeOffRequestScalarFieldEnum]


  export const ShiftSwapRequestScalarFieldEnum: {
    id: 'id',
    requestedById: 'requestedById',
    fromShiftId: 'fromShiftId',
    swapWithId: 'swapWithId',
    toShiftId: 'toShiftId',
    status: 'status',
    requestedAt: 'requestedAt',
    updatedAt: 'updatedAt'
  };

  export type ShiftSwapRequestScalarFieldEnum = (typeof ShiftSwapRequestScalarFieldEnum)[keyof typeof ShiftSwapRequestScalarFieldEnum]


  export const WorkLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    shiftId: 'shiftId',
    hours: 'hours',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type WorkLogScalarFieldEnum = (typeof WorkLogScalarFieldEnum)[keyof typeof WorkLogScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    read: 'read',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const ChatRoomScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type ChatRoomScalarFieldEnum = (typeof ChatRoomScalarFieldEnum)[keyof typeof ChatRoomScalarFieldEnum]


  export const ChatMemberScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    userId: 'userId',
    joinedAt: 'joinedAt'
  };

  export type ChatMemberScalarFieldEnum = (typeof ChatMemberScalarFieldEnum)[keyof typeof ChatMemberScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    senderId: 'senderId',
    content: 'content',
    sentAt: 'sentAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ShiftStatus'
   */
  export type EnumShiftStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShiftStatus'>
    


  /**
   * Reference to a field of type 'ShiftStatus[]'
   */
  export type ListEnumShiftStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShiftStatus[]'>
    


  /**
   * Reference to a field of type 'TimeOffType'
   */
  export type EnumTimeOffTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimeOffType'>
    


  /**
   * Reference to a field of type 'TimeOffType[]'
   */
  export type ListEnumTimeOffTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimeOffType[]'>
    


  /**
   * Reference to a field of type 'RequestStatus'
   */
  export type EnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus'>
    


  /**
   * Reference to a field of type 'RequestStatus[]'
   */
  export type ListEnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    shifts?: ShiftListRelationFilter
    timeOffRequests?: TimeOffRequestListRelationFilter
    shiftSwapRequests?: ShiftSwapRequestListRelationFilter
    shiftSwapsWith?: ShiftSwapRequestListRelationFilter
    workLogs?: WorkLogListRelationFilter
    notifications?: NotificationListRelationFilter
    chatMemberships?: ChatMemberListRelationFilter
    messages?: MessageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shifts?: ShiftOrderByRelationAggregateInput
    timeOffRequests?: TimeOffRequestOrderByRelationAggregateInput
    shiftSwapRequests?: ShiftSwapRequestOrderByRelationAggregateInput
    shiftSwapsWith?: ShiftSwapRequestOrderByRelationAggregateInput
    workLogs?: WorkLogOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    chatMemberships?: ChatMemberOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    shifts?: ShiftListRelationFilter
    timeOffRequests?: TimeOffRequestListRelationFilter
    shiftSwapRequests?: ShiftSwapRequestListRelationFilter
    shiftSwapsWith?: ShiftSwapRequestListRelationFilter
    workLogs?: WorkLogListRelationFilter
    notifications?: NotificationListRelationFilter
    chatMemberships?: ChatMemberListRelationFilter
    messages?: MessageListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ShiftWhereInput = {
    AND?: ShiftWhereInput | ShiftWhereInput[]
    OR?: ShiftWhereInput[]
    NOT?: ShiftWhereInput | ShiftWhereInput[]
    id?: StringFilter<"Shift"> | string
    userId?: StringFilter<"Shift"> | string
    startTime?: DateTimeFilter<"Shift"> | Date | string
    endTime?: DateTimeFilter<"Shift"> | Date | string
    location?: StringNullableFilter<"Shift"> | string | null
    notes?: StringNullableFilter<"Shift"> | string | null
    status?: EnumShiftStatusFilter<"Shift"> | $Enums.ShiftStatus
    createdBy?: StringFilter<"Shift"> | string
    createdAt?: DateTimeFilter<"Shift"> | Date | string
    updatedAt?: DateTimeFilter<"Shift"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    swapRequestsFrom?: ShiftSwapRequestListRelationFilter
    swapRequestsTo?: ShiftSwapRequestListRelationFilter
    workLogs?: WorkLogListRelationFilter
  }

  export type ShiftOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    swapRequestsFrom?: ShiftSwapRequestOrderByRelationAggregateInput
    swapRequestsTo?: ShiftSwapRequestOrderByRelationAggregateInput
    workLogs?: WorkLogOrderByRelationAggregateInput
  }

  export type ShiftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ShiftWhereInput | ShiftWhereInput[]
    OR?: ShiftWhereInput[]
    NOT?: ShiftWhereInput | ShiftWhereInput[]
    userId?: StringFilter<"Shift"> | string
    startTime?: DateTimeFilter<"Shift"> | Date | string
    endTime?: DateTimeFilter<"Shift"> | Date | string
    location?: StringNullableFilter<"Shift"> | string | null
    notes?: StringNullableFilter<"Shift"> | string | null
    status?: EnumShiftStatusFilter<"Shift"> | $Enums.ShiftStatus
    createdBy?: StringFilter<"Shift"> | string
    createdAt?: DateTimeFilter<"Shift"> | Date | string
    updatedAt?: DateTimeFilter<"Shift"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    swapRequestsFrom?: ShiftSwapRequestListRelationFilter
    swapRequestsTo?: ShiftSwapRequestListRelationFilter
    workLogs?: WorkLogListRelationFilter
  }, "id">

  export type ShiftOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShiftCountOrderByAggregateInput
    _max?: ShiftMaxOrderByAggregateInput
    _min?: ShiftMinOrderByAggregateInput
  }

  export type ShiftScalarWhereWithAggregatesInput = {
    AND?: ShiftScalarWhereWithAggregatesInput | ShiftScalarWhereWithAggregatesInput[]
    OR?: ShiftScalarWhereWithAggregatesInput[]
    NOT?: ShiftScalarWhereWithAggregatesInput | ShiftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Shift"> | string
    userId?: StringWithAggregatesFilter<"Shift"> | string
    startTime?: DateTimeWithAggregatesFilter<"Shift"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Shift"> | Date | string
    location?: StringNullableWithAggregatesFilter<"Shift"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Shift"> | string | null
    status?: EnumShiftStatusWithAggregatesFilter<"Shift"> | $Enums.ShiftStatus
    createdBy?: StringWithAggregatesFilter<"Shift"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Shift"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shift"> | Date | string
  }

  export type TimeOffRequestWhereInput = {
    AND?: TimeOffRequestWhereInput | TimeOffRequestWhereInput[]
    OR?: TimeOffRequestWhereInput[]
    NOT?: TimeOffRequestWhereInput | TimeOffRequestWhereInput[]
    id?: StringFilter<"TimeOffRequest"> | string
    userId?: StringFilter<"TimeOffRequest"> | string
    fromDate?: DateTimeFilter<"TimeOffRequest"> | Date | string
    toDate?: DateTimeFilter<"TimeOffRequest"> | Date | string
    type?: EnumTimeOffTypeFilter<"TimeOffRequest"> | $Enums.TimeOffType
    reason?: StringNullableFilter<"TimeOffRequest"> | string | null
    status?: EnumRequestStatusFilter<"TimeOffRequest"> | $Enums.RequestStatus
    createdAt?: DateTimeFilter<"TimeOffRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TimeOffRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TimeOffRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fromDate?: SortOrder
    toDate?: SortOrder
    type?: SortOrder
    reason?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TimeOffRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimeOffRequestWhereInput | TimeOffRequestWhereInput[]
    OR?: TimeOffRequestWhereInput[]
    NOT?: TimeOffRequestWhereInput | TimeOffRequestWhereInput[]
    userId?: StringFilter<"TimeOffRequest"> | string
    fromDate?: DateTimeFilter<"TimeOffRequest"> | Date | string
    toDate?: DateTimeFilter<"TimeOffRequest"> | Date | string
    type?: EnumTimeOffTypeFilter<"TimeOffRequest"> | $Enums.TimeOffType
    reason?: StringNullableFilter<"TimeOffRequest"> | string | null
    status?: EnumRequestStatusFilter<"TimeOffRequest"> | $Enums.RequestStatus
    createdAt?: DateTimeFilter<"TimeOffRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TimeOffRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TimeOffRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fromDate?: SortOrder
    toDate?: SortOrder
    type?: SortOrder
    reason?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TimeOffRequestCountOrderByAggregateInput
    _max?: TimeOffRequestMaxOrderByAggregateInput
    _min?: TimeOffRequestMinOrderByAggregateInput
  }

  export type TimeOffRequestScalarWhereWithAggregatesInput = {
    AND?: TimeOffRequestScalarWhereWithAggregatesInput | TimeOffRequestScalarWhereWithAggregatesInput[]
    OR?: TimeOffRequestScalarWhereWithAggregatesInput[]
    NOT?: TimeOffRequestScalarWhereWithAggregatesInput | TimeOffRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimeOffRequest"> | string
    userId?: StringWithAggregatesFilter<"TimeOffRequest"> | string
    fromDate?: DateTimeWithAggregatesFilter<"TimeOffRequest"> | Date | string
    toDate?: DateTimeWithAggregatesFilter<"TimeOffRequest"> | Date | string
    type?: EnumTimeOffTypeWithAggregatesFilter<"TimeOffRequest"> | $Enums.TimeOffType
    reason?: StringNullableWithAggregatesFilter<"TimeOffRequest"> | string | null
    status?: EnumRequestStatusWithAggregatesFilter<"TimeOffRequest"> | $Enums.RequestStatus
    createdAt?: DateTimeWithAggregatesFilter<"TimeOffRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TimeOffRequest"> | Date | string
  }

  export type ShiftSwapRequestWhereInput = {
    AND?: ShiftSwapRequestWhereInput | ShiftSwapRequestWhereInput[]
    OR?: ShiftSwapRequestWhereInput[]
    NOT?: ShiftSwapRequestWhereInput | ShiftSwapRequestWhereInput[]
    id?: StringFilter<"ShiftSwapRequest"> | string
    requestedById?: StringFilter<"ShiftSwapRequest"> | string
    fromShiftId?: StringFilter<"ShiftSwapRequest"> | string
    swapWithId?: StringFilter<"ShiftSwapRequest"> | string
    toShiftId?: StringFilter<"ShiftSwapRequest"> | string
    status?: EnumRequestStatusFilter<"ShiftSwapRequest"> | $Enums.RequestStatus
    requestedAt?: DateTimeFilter<"ShiftSwapRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ShiftSwapRequest"> | Date | string
    requestedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    fromShift?: XOR<ShiftScalarRelationFilter, ShiftWhereInput>
    swapWith?: XOR<UserScalarRelationFilter, UserWhereInput>
    toShift?: XOR<ShiftScalarRelationFilter, ShiftWhereInput>
  }

  export type ShiftSwapRequestOrderByWithRelationInput = {
    id?: SortOrder
    requestedById?: SortOrder
    fromShiftId?: SortOrder
    swapWithId?: SortOrder
    toShiftId?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    updatedAt?: SortOrder
    requestedBy?: UserOrderByWithRelationInput
    fromShift?: ShiftOrderByWithRelationInput
    swapWith?: UserOrderByWithRelationInput
    toShift?: ShiftOrderByWithRelationInput
  }

  export type ShiftSwapRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ShiftSwapRequestWhereInput | ShiftSwapRequestWhereInput[]
    OR?: ShiftSwapRequestWhereInput[]
    NOT?: ShiftSwapRequestWhereInput | ShiftSwapRequestWhereInput[]
    requestedById?: StringFilter<"ShiftSwapRequest"> | string
    fromShiftId?: StringFilter<"ShiftSwapRequest"> | string
    swapWithId?: StringFilter<"ShiftSwapRequest"> | string
    toShiftId?: StringFilter<"ShiftSwapRequest"> | string
    status?: EnumRequestStatusFilter<"ShiftSwapRequest"> | $Enums.RequestStatus
    requestedAt?: DateTimeFilter<"ShiftSwapRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ShiftSwapRequest"> | Date | string
    requestedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    fromShift?: XOR<ShiftScalarRelationFilter, ShiftWhereInput>
    swapWith?: XOR<UserScalarRelationFilter, UserWhereInput>
    toShift?: XOR<ShiftScalarRelationFilter, ShiftWhereInput>
  }, "id">

  export type ShiftSwapRequestOrderByWithAggregationInput = {
    id?: SortOrder
    requestedById?: SortOrder
    fromShiftId?: SortOrder
    swapWithId?: SortOrder
    toShiftId?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShiftSwapRequestCountOrderByAggregateInput
    _max?: ShiftSwapRequestMaxOrderByAggregateInput
    _min?: ShiftSwapRequestMinOrderByAggregateInput
  }

  export type ShiftSwapRequestScalarWhereWithAggregatesInput = {
    AND?: ShiftSwapRequestScalarWhereWithAggregatesInput | ShiftSwapRequestScalarWhereWithAggregatesInput[]
    OR?: ShiftSwapRequestScalarWhereWithAggregatesInput[]
    NOT?: ShiftSwapRequestScalarWhereWithAggregatesInput | ShiftSwapRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShiftSwapRequest"> | string
    requestedById?: StringWithAggregatesFilter<"ShiftSwapRequest"> | string
    fromShiftId?: StringWithAggregatesFilter<"ShiftSwapRequest"> | string
    swapWithId?: StringWithAggregatesFilter<"ShiftSwapRequest"> | string
    toShiftId?: StringWithAggregatesFilter<"ShiftSwapRequest"> | string
    status?: EnumRequestStatusWithAggregatesFilter<"ShiftSwapRequest"> | $Enums.RequestStatus
    requestedAt?: DateTimeWithAggregatesFilter<"ShiftSwapRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ShiftSwapRequest"> | Date | string
  }

  export type WorkLogWhereInput = {
    AND?: WorkLogWhereInput | WorkLogWhereInput[]
    OR?: WorkLogWhereInput[]
    NOT?: WorkLogWhereInput | WorkLogWhereInput[]
    id?: StringFilter<"WorkLog"> | string
    userId?: StringFilter<"WorkLog"> | string
    shiftId?: StringFilter<"WorkLog"> | string
    hours?: FloatFilter<"WorkLog"> | number
    notes?: StringNullableFilter<"WorkLog"> | string | null
    createdAt?: DateTimeFilter<"WorkLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    shift?: XOR<ShiftScalarRelationFilter, ShiftWhereInput>
  }

  export type WorkLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    shiftId?: SortOrder
    hours?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    shift?: ShiftOrderByWithRelationInput
  }

  export type WorkLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkLogWhereInput | WorkLogWhereInput[]
    OR?: WorkLogWhereInput[]
    NOT?: WorkLogWhereInput | WorkLogWhereInput[]
    userId?: StringFilter<"WorkLog"> | string
    shiftId?: StringFilter<"WorkLog"> | string
    hours?: FloatFilter<"WorkLog"> | number
    notes?: StringNullableFilter<"WorkLog"> | string | null
    createdAt?: DateTimeFilter<"WorkLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    shift?: XOR<ShiftScalarRelationFilter, ShiftWhereInput>
  }, "id">

  export type WorkLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    shiftId?: SortOrder
    hours?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WorkLogCountOrderByAggregateInput
    _avg?: WorkLogAvgOrderByAggregateInput
    _max?: WorkLogMaxOrderByAggregateInput
    _min?: WorkLogMinOrderByAggregateInput
    _sum?: WorkLogSumOrderByAggregateInput
  }

  export type WorkLogScalarWhereWithAggregatesInput = {
    AND?: WorkLogScalarWhereWithAggregatesInput | WorkLogScalarWhereWithAggregatesInput[]
    OR?: WorkLogScalarWhereWithAggregatesInput[]
    NOT?: WorkLogScalarWhereWithAggregatesInput | WorkLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkLog"> | string
    userId?: StringWithAggregatesFilter<"WorkLog"> | string
    shiftId?: StringWithAggregatesFilter<"WorkLog"> | string
    hours?: FloatWithAggregatesFilter<"WorkLog"> | number
    notes?: StringNullableWithAggregatesFilter<"WorkLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WorkLog"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type ChatRoomWhereInput = {
    AND?: ChatRoomWhereInput | ChatRoomWhereInput[]
    OR?: ChatRoomWhereInput[]
    NOT?: ChatRoomWhereInput | ChatRoomWhereInput[]
    id?: StringFilter<"ChatRoom"> | string
    name?: StringNullableFilter<"ChatRoom"> | string | null
    createdAt?: DateTimeFilter<"ChatRoom"> | Date | string
    members?: ChatMemberListRelationFilter
    messages?: MessageListRelationFilter
  }

  export type ChatRoomOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    members?: ChatMemberOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type ChatRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatRoomWhereInput | ChatRoomWhereInput[]
    OR?: ChatRoomWhereInput[]
    NOT?: ChatRoomWhereInput | ChatRoomWhereInput[]
    name?: StringNullableFilter<"ChatRoom"> | string | null
    createdAt?: DateTimeFilter<"ChatRoom"> | Date | string
    members?: ChatMemberListRelationFilter
    messages?: MessageListRelationFilter
  }, "id">

  export type ChatRoomOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ChatRoomCountOrderByAggregateInput
    _max?: ChatRoomMaxOrderByAggregateInput
    _min?: ChatRoomMinOrderByAggregateInput
  }

  export type ChatRoomScalarWhereWithAggregatesInput = {
    AND?: ChatRoomScalarWhereWithAggregatesInput | ChatRoomScalarWhereWithAggregatesInput[]
    OR?: ChatRoomScalarWhereWithAggregatesInput[]
    NOT?: ChatRoomScalarWhereWithAggregatesInput | ChatRoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatRoom"> | string
    name?: StringNullableWithAggregatesFilter<"ChatRoom"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ChatRoom"> | Date | string
  }

  export type ChatMemberWhereInput = {
    AND?: ChatMemberWhereInput | ChatMemberWhereInput[]
    OR?: ChatMemberWhereInput[]
    NOT?: ChatMemberWhereInput | ChatMemberWhereInput[]
    id?: StringFilter<"ChatMember"> | string
    roomId?: StringFilter<"ChatMember"> | string
    userId?: StringFilter<"ChatMember"> | string
    joinedAt?: DateTimeFilter<"ChatMember"> | Date | string
    room?: XOR<ChatRoomScalarRelationFilter, ChatRoomWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ChatMemberOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    room?: ChatRoomOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ChatMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatMemberWhereInput | ChatMemberWhereInput[]
    OR?: ChatMemberWhereInput[]
    NOT?: ChatMemberWhereInput | ChatMemberWhereInput[]
    roomId?: StringFilter<"ChatMember"> | string
    userId?: StringFilter<"ChatMember"> | string
    joinedAt?: DateTimeFilter<"ChatMember"> | Date | string
    room?: XOR<ChatRoomScalarRelationFilter, ChatRoomWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ChatMemberOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    _count?: ChatMemberCountOrderByAggregateInput
    _max?: ChatMemberMaxOrderByAggregateInput
    _min?: ChatMemberMinOrderByAggregateInput
  }

  export type ChatMemberScalarWhereWithAggregatesInput = {
    AND?: ChatMemberScalarWhereWithAggregatesInput | ChatMemberScalarWhereWithAggregatesInput[]
    OR?: ChatMemberScalarWhereWithAggregatesInput[]
    NOT?: ChatMemberScalarWhereWithAggregatesInput | ChatMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatMember"> | string
    roomId?: StringWithAggregatesFilter<"ChatMember"> | string
    userId?: StringWithAggregatesFilter<"ChatMember"> | string
    joinedAt?: DateTimeWithAggregatesFilter<"ChatMember"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    roomId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    sentAt?: DateTimeFilter<"Message"> | Date | string
    room?: XOR<ChatRoomScalarRelationFilter, ChatRoomWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    sentAt?: SortOrder
    room?: ChatRoomOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    roomId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    sentAt?: DateTimeFilter<"Message"> | Date | string
    room?: XOR<ChatRoomScalarRelationFilter, ChatRoomWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    sentAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    roomId?: StringWithAggregatesFilter<"Message"> | string
    senderId?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    sentAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftUncheckedCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestUncheckedCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUncheckedUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUncheckedUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftCreateInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutShiftsInput
    swapRequestsFrom?: ShiftSwapRequestCreateNestedManyWithoutFromShiftInput
    swapRequestsTo?: ShiftSwapRequestCreateNestedManyWithoutToShiftInput
    workLogs?: WorkLogCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateInput = {
    id?: string
    userId: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    swapRequestsFrom?: ShiftSwapRequestUncheckedCreateNestedManyWithoutFromShiftInput
    swapRequestsTo?: ShiftSwapRequestUncheckedCreateNestedManyWithoutToShiftInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutShiftsNestedInput
    swapRequestsFrom?: ShiftSwapRequestUpdateManyWithoutFromShiftNestedInput
    swapRequestsTo?: ShiftSwapRequestUpdateManyWithoutToShiftNestedInput
    workLogs?: WorkLogUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    swapRequestsFrom?: ShiftSwapRequestUncheckedUpdateManyWithoutFromShiftNestedInput
    swapRequestsTo?: ShiftSwapRequestUncheckedUpdateManyWithoutToShiftNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type ShiftCreateManyInput = {
    id?: string
    userId: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeOffRequestCreateInput = {
    id?: string
    fromDate: Date | string
    toDate: Date | string
    type: $Enums.TimeOffType
    reason?: string | null
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTimeOffRequestsInput
  }

  export type TimeOffRequestUncheckedCreateInput = {
    id?: string
    userId: string
    fromDate: Date | string
    toDate: Date | string
    type: $Enums.TimeOffType
    reason?: string | null
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeOffRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeOffTypeFieldUpdateOperationsInput | $Enums.TimeOffType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTimeOffRequestsNestedInput
  }

  export type TimeOffRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeOffTypeFieldUpdateOperationsInput | $Enums.TimeOffType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeOffRequestCreateManyInput = {
    id?: string
    userId: string
    fromDate: Date | string
    toDate: Date | string
    type: $Enums.TimeOffType
    reason?: string | null
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeOffRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeOffTypeFieldUpdateOperationsInput | $Enums.TimeOffType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeOffRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeOffTypeFieldUpdateOperationsInput | $Enums.TimeOffType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestCreateInput = {
    id?: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
    requestedBy: UserCreateNestedOneWithoutShiftSwapRequestsInput
    fromShift: ShiftCreateNestedOneWithoutSwapRequestsFromInput
    swapWith: UserCreateNestedOneWithoutShiftSwapsWithInput
    toShift: ShiftCreateNestedOneWithoutSwapRequestsToInput
  }

  export type ShiftSwapRequestUncheckedCreateInput = {
    id?: string
    requestedById: string
    fromShiftId: string
    swapWithId: string
    toShiftId: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftSwapRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestedBy?: UserUpdateOneRequiredWithoutShiftSwapRequestsNestedInput
    fromShift?: ShiftUpdateOneRequiredWithoutSwapRequestsFromNestedInput
    swapWith?: UserUpdateOneRequiredWithoutShiftSwapsWithNestedInput
    toShift?: ShiftUpdateOneRequiredWithoutSwapRequestsToNestedInput
  }

  export type ShiftSwapRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedById?: StringFieldUpdateOperationsInput | string
    fromShiftId?: StringFieldUpdateOperationsInput | string
    swapWithId?: StringFieldUpdateOperationsInput | string
    toShiftId?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestCreateManyInput = {
    id?: string
    requestedById: string
    fromShiftId: string
    swapWithId: string
    toShiftId: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftSwapRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedById?: StringFieldUpdateOperationsInput | string
    fromShiftId?: StringFieldUpdateOperationsInput | string
    swapWithId?: StringFieldUpdateOperationsInput | string
    toShiftId?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogCreateInput = {
    id?: string
    hours: number
    notes?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWorkLogsInput
    shift: ShiftCreateNestedOneWithoutWorkLogsInput
  }

  export type WorkLogUncheckedCreateInput = {
    id?: string
    userId: string
    shiftId: string
    hours: number
    notes?: string | null
    createdAt?: Date | string
  }

  export type WorkLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkLogsNestedInput
    shift?: ShiftUpdateOneRequiredWithoutWorkLogsNestedInput
  }

  export type WorkLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    shiftId?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogCreateManyInput = {
    id?: string
    userId: string
    shiftId: string
    hours: number
    notes?: string | null
    createdAt?: Date | string
  }

  export type WorkLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    shiftId?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatRoomCreateInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    members?: ChatMemberCreateNestedManyWithoutRoomInput
    messages?: MessageCreateNestedManyWithoutRoomInput
  }

  export type ChatRoomUncheckedCreateInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    members?: ChatMemberUncheckedCreateNestedManyWithoutRoomInput
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type ChatRoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUpdateManyWithoutRoomNestedInput
    messages?: MessageUpdateManyWithoutRoomNestedInput
  }

  export type ChatRoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUncheckedUpdateManyWithoutRoomNestedInput
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type ChatRoomCreateManyInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
  }

  export type ChatRoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatRoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMemberCreateInput = {
    id?: string
    joinedAt?: Date | string
    room: ChatRoomCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutChatMembershipsInput
  }

  export type ChatMemberUncheckedCreateInput = {
    id?: string
    roomId: string
    userId: string
    joinedAt?: Date | string
  }

  export type ChatMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: ChatRoomUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutChatMembershipsNestedInput
  }

  export type ChatMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMemberCreateManyInput = {
    id?: string
    roomId: string
    userId: string
    joinedAt?: Date | string
  }

  export type ChatMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    sentAt?: Date | string
    room: ChatRoomCreateNestedOneWithoutMessagesInput
    sender: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    roomId: string
    senderId: string
    content: string
    sentAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: ChatRoomUpdateOneRequiredWithoutMessagesNestedInput
    sender?: UserUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    roomId: string
    senderId: string
    content: string
    sentAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ShiftListRelationFilter = {
    every?: ShiftWhereInput
    some?: ShiftWhereInput
    none?: ShiftWhereInput
  }

  export type TimeOffRequestListRelationFilter = {
    every?: TimeOffRequestWhereInput
    some?: TimeOffRequestWhereInput
    none?: TimeOffRequestWhereInput
  }

  export type ShiftSwapRequestListRelationFilter = {
    every?: ShiftSwapRequestWhereInput
    some?: ShiftSwapRequestWhereInput
    none?: ShiftSwapRequestWhereInput
  }

  export type WorkLogListRelationFilter = {
    every?: WorkLogWhereInput
    some?: WorkLogWhereInput
    none?: WorkLogWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type ChatMemberListRelationFilter = {
    every?: ChatMemberWhereInput
    some?: ChatMemberWhereInput
    none?: ChatMemberWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ShiftOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TimeOffRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShiftSwapRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumShiftStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftStatus | EnumShiftStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftStatusFilter<$PrismaModel> | $Enums.ShiftStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ShiftCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShiftMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShiftMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumShiftStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftStatus | EnumShiftStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShiftStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShiftStatusFilter<$PrismaModel>
    _max?: NestedEnumShiftStatusFilter<$PrismaModel>
  }

  export type EnumTimeOffTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeOffType | EnumTimeOffTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeOffType[] | ListEnumTimeOffTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeOffType[] | ListEnumTimeOffTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeOffTypeFilter<$PrismaModel> | $Enums.TimeOffType
  }

  export type EnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type TimeOffRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fromDate?: SortOrder
    toDate?: SortOrder
    type?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeOffRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fromDate?: SortOrder
    toDate?: SortOrder
    type?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeOffRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fromDate?: SortOrder
    toDate?: SortOrder
    type?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTimeOffTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeOffType | EnumTimeOffTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeOffType[] | ListEnumTimeOffTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeOffType[] | ListEnumTimeOffTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeOffTypeWithAggregatesFilter<$PrismaModel> | $Enums.TimeOffType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeOffTypeFilter<$PrismaModel>
    _max?: NestedEnumTimeOffTypeFilter<$PrismaModel>
  }

  export type EnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type ShiftScalarRelationFilter = {
    is?: ShiftWhereInput
    isNot?: ShiftWhereInput
  }

  export type ShiftSwapRequestCountOrderByAggregateInput = {
    id?: SortOrder
    requestedById?: SortOrder
    fromShiftId?: SortOrder
    swapWithId?: SortOrder
    toShiftId?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShiftSwapRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    requestedById?: SortOrder
    fromShiftId?: SortOrder
    swapWithId?: SortOrder
    toShiftId?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShiftSwapRequestMinOrderByAggregateInput = {
    id?: SortOrder
    requestedById?: SortOrder
    fromShiftId?: SortOrder
    swapWithId?: SortOrder
    toShiftId?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type WorkLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    shiftId?: SortOrder
    hours?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkLogAvgOrderByAggregateInput = {
    hours?: SortOrder
  }

  export type WorkLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    shiftId?: SortOrder
    hours?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    shiftId?: SortOrder
    hours?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkLogSumOrderByAggregateInput = {
    hours?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ChatRoomCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatRoomMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatRoomScalarRelationFilter = {
    is?: ChatRoomWhereInput
    isNot?: ChatRoomWhereInput
  }

  export type ChatMemberCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
  }

  export type ChatMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
  }

  export type ChatMemberMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    sentAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    sentAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    sentAt?: SortOrder
  }

  export type ShiftCreateNestedManyWithoutUserInput = {
    create?: XOR<ShiftCreateWithoutUserInput, ShiftUncheckedCreateWithoutUserInput> | ShiftCreateWithoutUserInput[] | ShiftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutUserInput | ShiftCreateOrConnectWithoutUserInput[]
    createMany?: ShiftCreateManyUserInputEnvelope
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
  }

  export type TimeOffRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<TimeOffRequestCreateWithoutUserInput, TimeOffRequestUncheckedCreateWithoutUserInput> | TimeOffRequestCreateWithoutUserInput[] | TimeOffRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeOffRequestCreateOrConnectWithoutUserInput | TimeOffRequestCreateOrConnectWithoutUserInput[]
    createMany?: TimeOffRequestCreateManyUserInputEnvelope
    connect?: TimeOffRequestWhereUniqueInput | TimeOffRequestWhereUniqueInput[]
  }

  export type ShiftSwapRequestCreateNestedManyWithoutRequestedByInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutRequestedByInput, ShiftSwapRequestUncheckedCreateWithoutRequestedByInput> | ShiftSwapRequestCreateWithoutRequestedByInput[] | ShiftSwapRequestUncheckedCreateWithoutRequestedByInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutRequestedByInput | ShiftSwapRequestCreateOrConnectWithoutRequestedByInput[]
    createMany?: ShiftSwapRequestCreateManyRequestedByInputEnvelope
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
  }

  export type ShiftSwapRequestCreateNestedManyWithoutSwapWithInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutSwapWithInput, ShiftSwapRequestUncheckedCreateWithoutSwapWithInput> | ShiftSwapRequestCreateWithoutSwapWithInput[] | ShiftSwapRequestUncheckedCreateWithoutSwapWithInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutSwapWithInput | ShiftSwapRequestCreateOrConnectWithoutSwapWithInput[]
    createMany?: ShiftSwapRequestCreateManySwapWithInputEnvelope
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
  }

  export type WorkLogCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkLogCreateWithoutUserInput, WorkLogUncheckedCreateWithoutUserInput> | WorkLogCreateWithoutUserInput[] | WorkLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutUserInput | WorkLogCreateOrConnectWithoutUserInput[]
    createMany?: WorkLogCreateManyUserInputEnvelope
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ChatMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatMemberCreateWithoutUserInput, ChatMemberUncheckedCreateWithoutUserInput> | ChatMemberCreateWithoutUserInput[] | ChatMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutUserInput | ChatMemberCreateOrConnectWithoutUserInput[]
    createMany?: ChatMemberCreateManyUserInputEnvelope
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ShiftUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ShiftCreateWithoutUserInput, ShiftUncheckedCreateWithoutUserInput> | ShiftCreateWithoutUserInput[] | ShiftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutUserInput | ShiftCreateOrConnectWithoutUserInput[]
    createMany?: ShiftCreateManyUserInputEnvelope
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
  }

  export type TimeOffRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TimeOffRequestCreateWithoutUserInput, TimeOffRequestUncheckedCreateWithoutUserInput> | TimeOffRequestCreateWithoutUserInput[] | TimeOffRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeOffRequestCreateOrConnectWithoutUserInput | TimeOffRequestCreateOrConnectWithoutUserInput[]
    createMany?: TimeOffRequestCreateManyUserInputEnvelope
    connect?: TimeOffRequestWhereUniqueInput | TimeOffRequestWhereUniqueInput[]
  }

  export type ShiftSwapRequestUncheckedCreateNestedManyWithoutRequestedByInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutRequestedByInput, ShiftSwapRequestUncheckedCreateWithoutRequestedByInput> | ShiftSwapRequestCreateWithoutRequestedByInput[] | ShiftSwapRequestUncheckedCreateWithoutRequestedByInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutRequestedByInput | ShiftSwapRequestCreateOrConnectWithoutRequestedByInput[]
    createMany?: ShiftSwapRequestCreateManyRequestedByInputEnvelope
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
  }

  export type ShiftSwapRequestUncheckedCreateNestedManyWithoutSwapWithInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutSwapWithInput, ShiftSwapRequestUncheckedCreateWithoutSwapWithInput> | ShiftSwapRequestCreateWithoutSwapWithInput[] | ShiftSwapRequestUncheckedCreateWithoutSwapWithInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutSwapWithInput | ShiftSwapRequestCreateOrConnectWithoutSwapWithInput[]
    createMany?: ShiftSwapRequestCreateManySwapWithInputEnvelope
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
  }

  export type WorkLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkLogCreateWithoutUserInput, WorkLogUncheckedCreateWithoutUserInput> | WorkLogCreateWithoutUserInput[] | WorkLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutUserInput | WorkLogCreateOrConnectWithoutUserInput[]
    createMany?: WorkLogCreateManyUserInputEnvelope
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ChatMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatMemberCreateWithoutUserInput, ChatMemberUncheckedCreateWithoutUserInput> | ChatMemberCreateWithoutUserInput[] | ChatMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutUserInput | ChatMemberCreateOrConnectWithoutUserInput[]
    createMany?: ChatMemberCreateManyUserInputEnvelope
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ShiftUpdateManyWithoutUserNestedInput = {
    create?: XOR<ShiftCreateWithoutUserInput, ShiftUncheckedCreateWithoutUserInput> | ShiftCreateWithoutUserInput[] | ShiftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutUserInput | ShiftCreateOrConnectWithoutUserInput[]
    upsert?: ShiftUpsertWithWhereUniqueWithoutUserInput | ShiftUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ShiftCreateManyUserInputEnvelope
    set?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    disconnect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    delete?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    update?: ShiftUpdateWithWhereUniqueWithoutUserInput | ShiftUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ShiftUpdateManyWithWhereWithoutUserInput | ShiftUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ShiftScalarWhereInput | ShiftScalarWhereInput[]
  }

  export type TimeOffRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<TimeOffRequestCreateWithoutUserInput, TimeOffRequestUncheckedCreateWithoutUserInput> | TimeOffRequestCreateWithoutUserInput[] | TimeOffRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeOffRequestCreateOrConnectWithoutUserInput | TimeOffRequestCreateOrConnectWithoutUserInput[]
    upsert?: TimeOffRequestUpsertWithWhereUniqueWithoutUserInput | TimeOffRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TimeOffRequestCreateManyUserInputEnvelope
    set?: TimeOffRequestWhereUniqueInput | TimeOffRequestWhereUniqueInput[]
    disconnect?: TimeOffRequestWhereUniqueInput | TimeOffRequestWhereUniqueInput[]
    delete?: TimeOffRequestWhereUniqueInput | TimeOffRequestWhereUniqueInput[]
    connect?: TimeOffRequestWhereUniqueInput | TimeOffRequestWhereUniqueInput[]
    update?: TimeOffRequestUpdateWithWhereUniqueWithoutUserInput | TimeOffRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TimeOffRequestUpdateManyWithWhereWithoutUserInput | TimeOffRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TimeOffRequestScalarWhereInput | TimeOffRequestScalarWhereInput[]
  }

  export type ShiftSwapRequestUpdateManyWithoutRequestedByNestedInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutRequestedByInput, ShiftSwapRequestUncheckedCreateWithoutRequestedByInput> | ShiftSwapRequestCreateWithoutRequestedByInput[] | ShiftSwapRequestUncheckedCreateWithoutRequestedByInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutRequestedByInput | ShiftSwapRequestCreateOrConnectWithoutRequestedByInput[]
    upsert?: ShiftSwapRequestUpsertWithWhereUniqueWithoutRequestedByInput | ShiftSwapRequestUpsertWithWhereUniqueWithoutRequestedByInput[]
    createMany?: ShiftSwapRequestCreateManyRequestedByInputEnvelope
    set?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    disconnect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    delete?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    update?: ShiftSwapRequestUpdateWithWhereUniqueWithoutRequestedByInput | ShiftSwapRequestUpdateWithWhereUniqueWithoutRequestedByInput[]
    updateMany?: ShiftSwapRequestUpdateManyWithWhereWithoutRequestedByInput | ShiftSwapRequestUpdateManyWithWhereWithoutRequestedByInput[]
    deleteMany?: ShiftSwapRequestScalarWhereInput | ShiftSwapRequestScalarWhereInput[]
  }

  export type ShiftSwapRequestUpdateManyWithoutSwapWithNestedInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutSwapWithInput, ShiftSwapRequestUncheckedCreateWithoutSwapWithInput> | ShiftSwapRequestCreateWithoutSwapWithInput[] | ShiftSwapRequestUncheckedCreateWithoutSwapWithInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutSwapWithInput | ShiftSwapRequestCreateOrConnectWithoutSwapWithInput[]
    upsert?: ShiftSwapRequestUpsertWithWhereUniqueWithoutSwapWithInput | ShiftSwapRequestUpsertWithWhereUniqueWithoutSwapWithInput[]
    createMany?: ShiftSwapRequestCreateManySwapWithInputEnvelope
    set?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    disconnect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    delete?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    update?: ShiftSwapRequestUpdateWithWhereUniqueWithoutSwapWithInput | ShiftSwapRequestUpdateWithWhereUniqueWithoutSwapWithInput[]
    updateMany?: ShiftSwapRequestUpdateManyWithWhereWithoutSwapWithInput | ShiftSwapRequestUpdateManyWithWhereWithoutSwapWithInput[]
    deleteMany?: ShiftSwapRequestScalarWhereInput | ShiftSwapRequestScalarWhereInput[]
  }

  export type WorkLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkLogCreateWithoutUserInput, WorkLogUncheckedCreateWithoutUserInput> | WorkLogCreateWithoutUserInput[] | WorkLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutUserInput | WorkLogCreateOrConnectWithoutUserInput[]
    upsert?: WorkLogUpsertWithWhereUniqueWithoutUserInput | WorkLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkLogCreateManyUserInputEnvelope
    set?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    disconnect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    delete?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    update?: WorkLogUpdateWithWhereUniqueWithoutUserInput | WorkLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkLogUpdateManyWithWhereWithoutUserInput | WorkLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkLogScalarWhereInput | WorkLogScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ChatMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatMemberCreateWithoutUserInput, ChatMemberUncheckedCreateWithoutUserInput> | ChatMemberCreateWithoutUserInput[] | ChatMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutUserInput | ChatMemberCreateOrConnectWithoutUserInput[]
    upsert?: ChatMemberUpsertWithWhereUniqueWithoutUserInput | ChatMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatMemberCreateManyUserInputEnvelope
    set?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    disconnect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    delete?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    update?: ChatMemberUpdateWithWhereUniqueWithoutUserInput | ChatMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatMemberUpdateManyWithWhereWithoutUserInput | ChatMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatMemberScalarWhereInput | ChatMemberScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ShiftUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ShiftCreateWithoutUserInput, ShiftUncheckedCreateWithoutUserInput> | ShiftCreateWithoutUserInput[] | ShiftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutUserInput | ShiftCreateOrConnectWithoutUserInput[]
    upsert?: ShiftUpsertWithWhereUniqueWithoutUserInput | ShiftUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ShiftCreateManyUserInputEnvelope
    set?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    disconnect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    delete?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    update?: ShiftUpdateWithWhereUniqueWithoutUserInput | ShiftUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ShiftUpdateManyWithWhereWithoutUserInput | ShiftUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ShiftScalarWhereInput | ShiftScalarWhereInput[]
  }

  export type TimeOffRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TimeOffRequestCreateWithoutUserInput, TimeOffRequestUncheckedCreateWithoutUserInput> | TimeOffRequestCreateWithoutUserInput[] | TimeOffRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeOffRequestCreateOrConnectWithoutUserInput | TimeOffRequestCreateOrConnectWithoutUserInput[]
    upsert?: TimeOffRequestUpsertWithWhereUniqueWithoutUserInput | TimeOffRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TimeOffRequestCreateManyUserInputEnvelope
    set?: TimeOffRequestWhereUniqueInput | TimeOffRequestWhereUniqueInput[]
    disconnect?: TimeOffRequestWhereUniqueInput | TimeOffRequestWhereUniqueInput[]
    delete?: TimeOffRequestWhereUniqueInput | TimeOffRequestWhereUniqueInput[]
    connect?: TimeOffRequestWhereUniqueInput | TimeOffRequestWhereUniqueInput[]
    update?: TimeOffRequestUpdateWithWhereUniqueWithoutUserInput | TimeOffRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TimeOffRequestUpdateManyWithWhereWithoutUserInput | TimeOffRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TimeOffRequestScalarWhereInput | TimeOffRequestScalarWhereInput[]
  }

  export type ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByNestedInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutRequestedByInput, ShiftSwapRequestUncheckedCreateWithoutRequestedByInput> | ShiftSwapRequestCreateWithoutRequestedByInput[] | ShiftSwapRequestUncheckedCreateWithoutRequestedByInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutRequestedByInput | ShiftSwapRequestCreateOrConnectWithoutRequestedByInput[]
    upsert?: ShiftSwapRequestUpsertWithWhereUniqueWithoutRequestedByInput | ShiftSwapRequestUpsertWithWhereUniqueWithoutRequestedByInput[]
    createMany?: ShiftSwapRequestCreateManyRequestedByInputEnvelope
    set?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    disconnect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    delete?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    update?: ShiftSwapRequestUpdateWithWhereUniqueWithoutRequestedByInput | ShiftSwapRequestUpdateWithWhereUniqueWithoutRequestedByInput[]
    updateMany?: ShiftSwapRequestUpdateManyWithWhereWithoutRequestedByInput | ShiftSwapRequestUpdateManyWithWhereWithoutRequestedByInput[]
    deleteMany?: ShiftSwapRequestScalarWhereInput | ShiftSwapRequestScalarWhereInput[]
  }

  export type ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithNestedInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutSwapWithInput, ShiftSwapRequestUncheckedCreateWithoutSwapWithInput> | ShiftSwapRequestCreateWithoutSwapWithInput[] | ShiftSwapRequestUncheckedCreateWithoutSwapWithInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutSwapWithInput | ShiftSwapRequestCreateOrConnectWithoutSwapWithInput[]
    upsert?: ShiftSwapRequestUpsertWithWhereUniqueWithoutSwapWithInput | ShiftSwapRequestUpsertWithWhereUniqueWithoutSwapWithInput[]
    createMany?: ShiftSwapRequestCreateManySwapWithInputEnvelope
    set?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    disconnect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    delete?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    update?: ShiftSwapRequestUpdateWithWhereUniqueWithoutSwapWithInput | ShiftSwapRequestUpdateWithWhereUniqueWithoutSwapWithInput[]
    updateMany?: ShiftSwapRequestUpdateManyWithWhereWithoutSwapWithInput | ShiftSwapRequestUpdateManyWithWhereWithoutSwapWithInput[]
    deleteMany?: ShiftSwapRequestScalarWhereInput | ShiftSwapRequestScalarWhereInput[]
  }

  export type WorkLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkLogCreateWithoutUserInput, WorkLogUncheckedCreateWithoutUserInput> | WorkLogCreateWithoutUserInput[] | WorkLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutUserInput | WorkLogCreateOrConnectWithoutUserInput[]
    upsert?: WorkLogUpsertWithWhereUniqueWithoutUserInput | WorkLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkLogCreateManyUserInputEnvelope
    set?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    disconnect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    delete?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    update?: WorkLogUpdateWithWhereUniqueWithoutUserInput | WorkLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkLogUpdateManyWithWhereWithoutUserInput | WorkLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkLogScalarWhereInput | WorkLogScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ChatMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatMemberCreateWithoutUserInput, ChatMemberUncheckedCreateWithoutUserInput> | ChatMemberCreateWithoutUserInput[] | ChatMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutUserInput | ChatMemberCreateOrConnectWithoutUserInput[]
    upsert?: ChatMemberUpsertWithWhereUniqueWithoutUserInput | ChatMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatMemberCreateManyUserInputEnvelope
    set?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    disconnect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    delete?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    update?: ChatMemberUpdateWithWhereUniqueWithoutUserInput | ChatMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatMemberUpdateManyWithWhereWithoutUserInput | ChatMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatMemberScalarWhereInput | ChatMemberScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutShiftsInput = {
    create?: XOR<UserCreateWithoutShiftsInput, UserUncheckedCreateWithoutShiftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutShiftsInput
    connect?: UserWhereUniqueInput
  }

  export type ShiftSwapRequestCreateNestedManyWithoutFromShiftInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutFromShiftInput, ShiftSwapRequestUncheckedCreateWithoutFromShiftInput> | ShiftSwapRequestCreateWithoutFromShiftInput[] | ShiftSwapRequestUncheckedCreateWithoutFromShiftInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutFromShiftInput | ShiftSwapRequestCreateOrConnectWithoutFromShiftInput[]
    createMany?: ShiftSwapRequestCreateManyFromShiftInputEnvelope
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
  }

  export type ShiftSwapRequestCreateNestedManyWithoutToShiftInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutToShiftInput, ShiftSwapRequestUncheckedCreateWithoutToShiftInput> | ShiftSwapRequestCreateWithoutToShiftInput[] | ShiftSwapRequestUncheckedCreateWithoutToShiftInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutToShiftInput | ShiftSwapRequestCreateOrConnectWithoutToShiftInput[]
    createMany?: ShiftSwapRequestCreateManyToShiftInputEnvelope
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
  }

  export type WorkLogCreateNestedManyWithoutShiftInput = {
    create?: XOR<WorkLogCreateWithoutShiftInput, WorkLogUncheckedCreateWithoutShiftInput> | WorkLogCreateWithoutShiftInput[] | WorkLogUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutShiftInput | WorkLogCreateOrConnectWithoutShiftInput[]
    createMany?: WorkLogCreateManyShiftInputEnvelope
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
  }

  export type ShiftSwapRequestUncheckedCreateNestedManyWithoutFromShiftInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutFromShiftInput, ShiftSwapRequestUncheckedCreateWithoutFromShiftInput> | ShiftSwapRequestCreateWithoutFromShiftInput[] | ShiftSwapRequestUncheckedCreateWithoutFromShiftInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutFromShiftInput | ShiftSwapRequestCreateOrConnectWithoutFromShiftInput[]
    createMany?: ShiftSwapRequestCreateManyFromShiftInputEnvelope
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
  }

  export type ShiftSwapRequestUncheckedCreateNestedManyWithoutToShiftInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutToShiftInput, ShiftSwapRequestUncheckedCreateWithoutToShiftInput> | ShiftSwapRequestCreateWithoutToShiftInput[] | ShiftSwapRequestUncheckedCreateWithoutToShiftInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutToShiftInput | ShiftSwapRequestCreateOrConnectWithoutToShiftInput[]
    createMany?: ShiftSwapRequestCreateManyToShiftInputEnvelope
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
  }

  export type WorkLogUncheckedCreateNestedManyWithoutShiftInput = {
    create?: XOR<WorkLogCreateWithoutShiftInput, WorkLogUncheckedCreateWithoutShiftInput> | WorkLogCreateWithoutShiftInput[] | WorkLogUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutShiftInput | WorkLogCreateOrConnectWithoutShiftInput[]
    createMany?: WorkLogCreateManyShiftInputEnvelope
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
  }

  export type EnumShiftStatusFieldUpdateOperationsInput = {
    set?: $Enums.ShiftStatus
  }

  export type UserUpdateOneRequiredWithoutShiftsNestedInput = {
    create?: XOR<UserCreateWithoutShiftsInput, UserUncheckedCreateWithoutShiftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutShiftsInput
    upsert?: UserUpsertWithoutShiftsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutShiftsInput, UserUpdateWithoutShiftsInput>, UserUncheckedUpdateWithoutShiftsInput>
  }

  export type ShiftSwapRequestUpdateManyWithoutFromShiftNestedInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutFromShiftInput, ShiftSwapRequestUncheckedCreateWithoutFromShiftInput> | ShiftSwapRequestCreateWithoutFromShiftInput[] | ShiftSwapRequestUncheckedCreateWithoutFromShiftInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutFromShiftInput | ShiftSwapRequestCreateOrConnectWithoutFromShiftInput[]
    upsert?: ShiftSwapRequestUpsertWithWhereUniqueWithoutFromShiftInput | ShiftSwapRequestUpsertWithWhereUniqueWithoutFromShiftInput[]
    createMany?: ShiftSwapRequestCreateManyFromShiftInputEnvelope
    set?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    disconnect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    delete?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    update?: ShiftSwapRequestUpdateWithWhereUniqueWithoutFromShiftInput | ShiftSwapRequestUpdateWithWhereUniqueWithoutFromShiftInput[]
    updateMany?: ShiftSwapRequestUpdateManyWithWhereWithoutFromShiftInput | ShiftSwapRequestUpdateManyWithWhereWithoutFromShiftInput[]
    deleteMany?: ShiftSwapRequestScalarWhereInput | ShiftSwapRequestScalarWhereInput[]
  }

  export type ShiftSwapRequestUpdateManyWithoutToShiftNestedInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutToShiftInput, ShiftSwapRequestUncheckedCreateWithoutToShiftInput> | ShiftSwapRequestCreateWithoutToShiftInput[] | ShiftSwapRequestUncheckedCreateWithoutToShiftInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutToShiftInput | ShiftSwapRequestCreateOrConnectWithoutToShiftInput[]
    upsert?: ShiftSwapRequestUpsertWithWhereUniqueWithoutToShiftInput | ShiftSwapRequestUpsertWithWhereUniqueWithoutToShiftInput[]
    createMany?: ShiftSwapRequestCreateManyToShiftInputEnvelope
    set?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    disconnect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    delete?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    update?: ShiftSwapRequestUpdateWithWhereUniqueWithoutToShiftInput | ShiftSwapRequestUpdateWithWhereUniqueWithoutToShiftInput[]
    updateMany?: ShiftSwapRequestUpdateManyWithWhereWithoutToShiftInput | ShiftSwapRequestUpdateManyWithWhereWithoutToShiftInput[]
    deleteMany?: ShiftSwapRequestScalarWhereInput | ShiftSwapRequestScalarWhereInput[]
  }

  export type WorkLogUpdateManyWithoutShiftNestedInput = {
    create?: XOR<WorkLogCreateWithoutShiftInput, WorkLogUncheckedCreateWithoutShiftInput> | WorkLogCreateWithoutShiftInput[] | WorkLogUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutShiftInput | WorkLogCreateOrConnectWithoutShiftInput[]
    upsert?: WorkLogUpsertWithWhereUniqueWithoutShiftInput | WorkLogUpsertWithWhereUniqueWithoutShiftInput[]
    createMany?: WorkLogCreateManyShiftInputEnvelope
    set?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    disconnect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    delete?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    update?: WorkLogUpdateWithWhereUniqueWithoutShiftInput | WorkLogUpdateWithWhereUniqueWithoutShiftInput[]
    updateMany?: WorkLogUpdateManyWithWhereWithoutShiftInput | WorkLogUpdateManyWithWhereWithoutShiftInput[]
    deleteMany?: WorkLogScalarWhereInput | WorkLogScalarWhereInput[]
  }

  export type ShiftSwapRequestUncheckedUpdateManyWithoutFromShiftNestedInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutFromShiftInput, ShiftSwapRequestUncheckedCreateWithoutFromShiftInput> | ShiftSwapRequestCreateWithoutFromShiftInput[] | ShiftSwapRequestUncheckedCreateWithoutFromShiftInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutFromShiftInput | ShiftSwapRequestCreateOrConnectWithoutFromShiftInput[]
    upsert?: ShiftSwapRequestUpsertWithWhereUniqueWithoutFromShiftInput | ShiftSwapRequestUpsertWithWhereUniqueWithoutFromShiftInput[]
    createMany?: ShiftSwapRequestCreateManyFromShiftInputEnvelope
    set?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    disconnect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    delete?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    update?: ShiftSwapRequestUpdateWithWhereUniqueWithoutFromShiftInput | ShiftSwapRequestUpdateWithWhereUniqueWithoutFromShiftInput[]
    updateMany?: ShiftSwapRequestUpdateManyWithWhereWithoutFromShiftInput | ShiftSwapRequestUpdateManyWithWhereWithoutFromShiftInput[]
    deleteMany?: ShiftSwapRequestScalarWhereInput | ShiftSwapRequestScalarWhereInput[]
  }

  export type ShiftSwapRequestUncheckedUpdateManyWithoutToShiftNestedInput = {
    create?: XOR<ShiftSwapRequestCreateWithoutToShiftInput, ShiftSwapRequestUncheckedCreateWithoutToShiftInput> | ShiftSwapRequestCreateWithoutToShiftInput[] | ShiftSwapRequestUncheckedCreateWithoutToShiftInput[]
    connectOrCreate?: ShiftSwapRequestCreateOrConnectWithoutToShiftInput | ShiftSwapRequestCreateOrConnectWithoutToShiftInput[]
    upsert?: ShiftSwapRequestUpsertWithWhereUniqueWithoutToShiftInput | ShiftSwapRequestUpsertWithWhereUniqueWithoutToShiftInput[]
    createMany?: ShiftSwapRequestCreateManyToShiftInputEnvelope
    set?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    disconnect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    delete?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    connect?: ShiftSwapRequestWhereUniqueInput | ShiftSwapRequestWhereUniqueInput[]
    update?: ShiftSwapRequestUpdateWithWhereUniqueWithoutToShiftInput | ShiftSwapRequestUpdateWithWhereUniqueWithoutToShiftInput[]
    updateMany?: ShiftSwapRequestUpdateManyWithWhereWithoutToShiftInput | ShiftSwapRequestUpdateManyWithWhereWithoutToShiftInput[]
    deleteMany?: ShiftSwapRequestScalarWhereInput | ShiftSwapRequestScalarWhereInput[]
  }

  export type WorkLogUncheckedUpdateManyWithoutShiftNestedInput = {
    create?: XOR<WorkLogCreateWithoutShiftInput, WorkLogUncheckedCreateWithoutShiftInput> | WorkLogCreateWithoutShiftInput[] | WorkLogUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutShiftInput | WorkLogCreateOrConnectWithoutShiftInput[]
    upsert?: WorkLogUpsertWithWhereUniqueWithoutShiftInput | WorkLogUpsertWithWhereUniqueWithoutShiftInput[]
    createMany?: WorkLogCreateManyShiftInputEnvelope
    set?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    disconnect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    delete?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    update?: WorkLogUpdateWithWhereUniqueWithoutShiftInput | WorkLogUpdateWithWhereUniqueWithoutShiftInput[]
    updateMany?: WorkLogUpdateManyWithWhereWithoutShiftInput | WorkLogUpdateManyWithWhereWithoutShiftInput[]
    deleteMany?: WorkLogScalarWhereInput | WorkLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTimeOffRequestsInput = {
    create?: XOR<UserCreateWithoutTimeOffRequestsInput, UserUncheckedCreateWithoutTimeOffRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTimeOffRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTimeOffTypeFieldUpdateOperationsInput = {
    set?: $Enums.TimeOffType
  }

  export type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RequestStatus
  }

  export type UserUpdateOneRequiredWithoutTimeOffRequestsNestedInput = {
    create?: XOR<UserCreateWithoutTimeOffRequestsInput, UserUncheckedCreateWithoutTimeOffRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTimeOffRequestsInput
    upsert?: UserUpsertWithoutTimeOffRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTimeOffRequestsInput, UserUpdateWithoutTimeOffRequestsInput>, UserUncheckedUpdateWithoutTimeOffRequestsInput>
  }

  export type UserCreateNestedOneWithoutShiftSwapRequestsInput = {
    create?: XOR<UserCreateWithoutShiftSwapRequestsInput, UserUncheckedCreateWithoutShiftSwapRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutShiftSwapRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type ShiftCreateNestedOneWithoutSwapRequestsFromInput = {
    create?: XOR<ShiftCreateWithoutSwapRequestsFromInput, ShiftUncheckedCreateWithoutSwapRequestsFromInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutSwapRequestsFromInput
    connect?: ShiftWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutShiftSwapsWithInput = {
    create?: XOR<UserCreateWithoutShiftSwapsWithInput, UserUncheckedCreateWithoutShiftSwapsWithInput>
    connectOrCreate?: UserCreateOrConnectWithoutShiftSwapsWithInput
    connect?: UserWhereUniqueInput
  }

  export type ShiftCreateNestedOneWithoutSwapRequestsToInput = {
    create?: XOR<ShiftCreateWithoutSwapRequestsToInput, ShiftUncheckedCreateWithoutSwapRequestsToInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutSwapRequestsToInput
    connect?: ShiftWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutShiftSwapRequestsNestedInput = {
    create?: XOR<UserCreateWithoutShiftSwapRequestsInput, UserUncheckedCreateWithoutShiftSwapRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutShiftSwapRequestsInput
    upsert?: UserUpsertWithoutShiftSwapRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutShiftSwapRequestsInput, UserUpdateWithoutShiftSwapRequestsInput>, UserUncheckedUpdateWithoutShiftSwapRequestsInput>
  }

  export type ShiftUpdateOneRequiredWithoutSwapRequestsFromNestedInput = {
    create?: XOR<ShiftCreateWithoutSwapRequestsFromInput, ShiftUncheckedCreateWithoutSwapRequestsFromInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutSwapRequestsFromInput
    upsert?: ShiftUpsertWithoutSwapRequestsFromInput
    connect?: ShiftWhereUniqueInput
    update?: XOR<XOR<ShiftUpdateToOneWithWhereWithoutSwapRequestsFromInput, ShiftUpdateWithoutSwapRequestsFromInput>, ShiftUncheckedUpdateWithoutSwapRequestsFromInput>
  }

  export type UserUpdateOneRequiredWithoutShiftSwapsWithNestedInput = {
    create?: XOR<UserCreateWithoutShiftSwapsWithInput, UserUncheckedCreateWithoutShiftSwapsWithInput>
    connectOrCreate?: UserCreateOrConnectWithoutShiftSwapsWithInput
    upsert?: UserUpsertWithoutShiftSwapsWithInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutShiftSwapsWithInput, UserUpdateWithoutShiftSwapsWithInput>, UserUncheckedUpdateWithoutShiftSwapsWithInput>
  }

  export type ShiftUpdateOneRequiredWithoutSwapRequestsToNestedInput = {
    create?: XOR<ShiftCreateWithoutSwapRequestsToInput, ShiftUncheckedCreateWithoutSwapRequestsToInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutSwapRequestsToInput
    upsert?: ShiftUpsertWithoutSwapRequestsToInput
    connect?: ShiftWhereUniqueInput
    update?: XOR<XOR<ShiftUpdateToOneWithWhereWithoutSwapRequestsToInput, ShiftUpdateWithoutSwapRequestsToInput>, ShiftUncheckedUpdateWithoutSwapRequestsToInput>
  }

  export type UserCreateNestedOneWithoutWorkLogsInput = {
    create?: XOR<UserCreateWithoutWorkLogsInput, UserUncheckedCreateWithoutWorkLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkLogsInput
    connect?: UserWhereUniqueInput
  }

  export type ShiftCreateNestedOneWithoutWorkLogsInput = {
    create?: XOR<ShiftCreateWithoutWorkLogsInput, ShiftUncheckedCreateWithoutWorkLogsInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutWorkLogsInput
    connect?: ShiftWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWorkLogsNestedInput = {
    create?: XOR<UserCreateWithoutWorkLogsInput, UserUncheckedCreateWithoutWorkLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkLogsInput
    upsert?: UserUpsertWithoutWorkLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkLogsInput, UserUpdateWithoutWorkLogsInput>, UserUncheckedUpdateWithoutWorkLogsInput>
  }

  export type ShiftUpdateOneRequiredWithoutWorkLogsNestedInput = {
    create?: XOR<ShiftCreateWithoutWorkLogsInput, ShiftUncheckedCreateWithoutWorkLogsInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutWorkLogsInput
    upsert?: ShiftUpsertWithoutWorkLogsInput
    connect?: ShiftWhereUniqueInput
    update?: XOR<XOR<ShiftUpdateToOneWithWhereWithoutWorkLogsInput, ShiftUpdateWithoutWorkLogsInput>, ShiftUncheckedUpdateWithoutWorkLogsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type ChatMemberCreateNestedManyWithoutRoomInput = {
    create?: XOR<ChatMemberCreateWithoutRoomInput, ChatMemberUncheckedCreateWithoutRoomInput> | ChatMemberCreateWithoutRoomInput[] | ChatMemberUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutRoomInput | ChatMemberCreateOrConnectWithoutRoomInput[]
    createMany?: ChatMemberCreateManyRoomInputEnvelope
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutRoomInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ChatMemberUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<ChatMemberCreateWithoutRoomInput, ChatMemberUncheckedCreateWithoutRoomInput> | ChatMemberCreateWithoutRoomInput[] | ChatMemberUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutRoomInput | ChatMemberCreateOrConnectWithoutRoomInput[]
    createMany?: ChatMemberCreateManyRoomInputEnvelope
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ChatMemberUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ChatMemberCreateWithoutRoomInput, ChatMemberUncheckedCreateWithoutRoomInput> | ChatMemberCreateWithoutRoomInput[] | ChatMemberUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutRoomInput | ChatMemberCreateOrConnectWithoutRoomInput[]
    upsert?: ChatMemberUpsertWithWhereUniqueWithoutRoomInput | ChatMemberUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ChatMemberCreateManyRoomInputEnvelope
    set?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    disconnect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    delete?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    update?: ChatMemberUpdateWithWhereUniqueWithoutRoomInput | ChatMemberUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ChatMemberUpdateManyWithWhereWithoutRoomInput | ChatMemberUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ChatMemberScalarWhereInput | ChatMemberScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutRoomNestedInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutRoomInput | MessageUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutRoomInput | MessageUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutRoomInput | MessageUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ChatMemberUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ChatMemberCreateWithoutRoomInput, ChatMemberUncheckedCreateWithoutRoomInput> | ChatMemberCreateWithoutRoomInput[] | ChatMemberUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutRoomInput | ChatMemberCreateOrConnectWithoutRoomInput[]
    upsert?: ChatMemberUpsertWithWhereUniqueWithoutRoomInput | ChatMemberUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ChatMemberCreateManyRoomInputEnvelope
    set?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    disconnect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    delete?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    update?: ChatMemberUpdateWithWhereUniqueWithoutRoomInput | ChatMemberUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ChatMemberUpdateManyWithWhereWithoutRoomInput | ChatMemberUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ChatMemberScalarWhereInput | ChatMemberScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutRoomInput | MessageUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutRoomInput | MessageUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutRoomInput | MessageUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ChatRoomCreateNestedOneWithoutMembersInput = {
    create?: XOR<ChatRoomCreateWithoutMembersInput, ChatRoomUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ChatRoomCreateOrConnectWithoutMembersInput
    connect?: ChatRoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutChatMembershipsInput = {
    create?: XOR<UserCreateWithoutChatMembershipsInput, UserUncheckedCreateWithoutChatMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type ChatRoomUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ChatRoomCreateWithoutMembersInput, ChatRoomUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ChatRoomCreateOrConnectWithoutMembersInput
    upsert?: ChatRoomUpsertWithoutMembersInput
    connect?: ChatRoomWhereUniqueInput
    update?: XOR<XOR<ChatRoomUpdateToOneWithWhereWithoutMembersInput, ChatRoomUpdateWithoutMembersInput>, ChatRoomUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutChatMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutChatMembershipsInput, UserUncheckedCreateWithoutChatMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatMembershipsInput
    upsert?: UserUpsertWithoutChatMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChatMembershipsInput, UserUpdateWithoutChatMembershipsInput>, UserUncheckedUpdateWithoutChatMembershipsInput>
  }

  export type ChatRoomCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ChatRoomCreateWithoutMessagesInput, ChatRoomUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatRoomCreateOrConnectWithoutMessagesInput
    connect?: ChatRoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type ChatRoomUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ChatRoomCreateWithoutMessagesInput, ChatRoomUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatRoomCreateOrConnectWithoutMessagesInput
    upsert?: ChatRoomUpsertWithoutMessagesInput
    connect?: ChatRoomWhereUniqueInput
    update?: XOR<XOR<ChatRoomUpdateToOneWithWhereWithoutMessagesInput, ChatRoomUpdateWithoutMessagesInput>, ChatRoomUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumShiftStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftStatus | EnumShiftStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftStatusFilter<$PrismaModel> | $Enums.ShiftStatus
  }

  export type NestedEnumShiftStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftStatus | EnumShiftStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShiftStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShiftStatusFilter<$PrismaModel>
    _max?: NestedEnumShiftStatusFilter<$PrismaModel>
  }

  export type NestedEnumTimeOffTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeOffType | EnumTimeOffTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeOffType[] | ListEnumTimeOffTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeOffType[] | ListEnumTimeOffTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeOffTypeFilter<$PrismaModel> | $Enums.TimeOffType
  }

  export type NestedEnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type NestedEnumTimeOffTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeOffType | EnumTimeOffTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeOffType[] | ListEnumTimeOffTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeOffType[] | ListEnumTimeOffTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeOffTypeWithAggregatesFilter<$PrismaModel> | $Enums.TimeOffType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeOffTypeFilter<$PrismaModel>
    _max?: NestedEnumTimeOffTypeFilter<$PrismaModel>
  }

  export type NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ShiftCreateWithoutUserInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    swapRequestsFrom?: ShiftSwapRequestCreateNestedManyWithoutFromShiftInput
    swapRequestsTo?: ShiftSwapRequestCreateNestedManyWithoutToShiftInput
    workLogs?: WorkLogCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateWithoutUserInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    swapRequestsFrom?: ShiftSwapRequestUncheckedCreateNestedManyWithoutFromShiftInput
    swapRequestsTo?: ShiftSwapRequestUncheckedCreateNestedManyWithoutToShiftInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftCreateOrConnectWithoutUserInput = {
    where: ShiftWhereUniqueInput
    create: XOR<ShiftCreateWithoutUserInput, ShiftUncheckedCreateWithoutUserInput>
  }

  export type ShiftCreateManyUserInputEnvelope = {
    data: ShiftCreateManyUserInput | ShiftCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TimeOffRequestCreateWithoutUserInput = {
    id?: string
    fromDate: Date | string
    toDate: Date | string
    type: $Enums.TimeOffType
    reason?: string | null
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeOffRequestUncheckedCreateWithoutUserInput = {
    id?: string
    fromDate: Date | string
    toDate: Date | string
    type: $Enums.TimeOffType
    reason?: string | null
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeOffRequestCreateOrConnectWithoutUserInput = {
    where: TimeOffRequestWhereUniqueInput
    create: XOR<TimeOffRequestCreateWithoutUserInput, TimeOffRequestUncheckedCreateWithoutUserInput>
  }

  export type TimeOffRequestCreateManyUserInputEnvelope = {
    data: TimeOffRequestCreateManyUserInput | TimeOffRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ShiftSwapRequestCreateWithoutRequestedByInput = {
    id?: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
    fromShift: ShiftCreateNestedOneWithoutSwapRequestsFromInput
    swapWith: UserCreateNestedOneWithoutShiftSwapsWithInput
    toShift: ShiftCreateNestedOneWithoutSwapRequestsToInput
  }

  export type ShiftSwapRequestUncheckedCreateWithoutRequestedByInput = {
    id?: string
    fromShiftId: string
    swapWithId: string
    toShiftId: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftSwapRequestCreateOrConnectWithoutRequestedByInput = {
    where: ShiftSwapRequestWhereUniqueInput
    create: XOR<ShiftSwapRequestCreateWithoutRequestedByInput, ShiftSwapRequestUncheckedCreateWithoutRequestedByInput>
  }

  export type ShiftSwapRequestCreateManyRequestedByInputEnvelope = {
    data: ShiftSwapRequestCreateManyRequestedByInput | ShiftSwapRequestCreateManyRequestedByInput[]
    skipDuplicates?: boolean
  }

  export type ShiftSwapRequestCreateWithoutSwapWithInput = {
    id?: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
    requestedBy: UserCreateNestedOneWithoutShiftSwapRequestsInput
    fromShift: ShiftCreateNestedOneWithoutSwapRequestsFromInput
    toShift: ShiftCreateNestedOneWithoutSwapRequestsToInput
  }

  export type ShiftSwapRequestUncheckedCreateWithoutSwapWithInput = {
    id?: string
    requestedById: string
    fromShiftId: string
    toShiftId: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftSwapRequestCreateOrConnectWithoutSwapWithInput = {
    where: ShiftSwapRequestWhereUniqueInput
    create: XOR<ShiftSwapRequestCreateWithoutSwapWithInput, ShiftSwapRequestUncheckedCreateWithoutSwapWithInput>
  }

  export type ShiftSwapRequestCreateManySwapWithInputEnvelope = {
    data: ShiftSwapRequestCreateManySwapWithInput | ShiftSwapRequestCreateManySwapWithInput[]
    skipDuplicates?: boolean
  }

  export type WorkLogCreateWithoutUserInput = {
    id?: string
    hours: number
    notes?: string | null
    createdAt?: Date | string
    shift: ShiftCreateNestedOneWithoutWorkLogsInput
  }

  export type WorkLogUncheckedCreateWithoutUserInput = {
    id?: string
    shiftId: string
    hours: number
    notes?: string | null
    createdAt?: Date | string
  }

  export type WorkLogCreateOrConnectWithoutUserInput = {
    where: WorkLogWhereUniqueInput
    create: XOR<WorkLogCreateWithoutUserInput, WorkLogUncheckedCreateWithoutUserInput>
  }

  export type WorkLogCreateManyUserInputEnvelope = {
    data: WorkLogCreateManyUserInput | WorkLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChatMemberCreateWithoutUserInput = {
    id?: string
    joinedAt?: Date | string
    room: ChatRoomCreateNestedOneWithoutMembersInput
  }

  export type ChatMemberUncheckedCreateWithoutUserInput = {
    id?: string
    roomId: string
    joinedAt?: Date | string
  }

  export type ChatMemberCreateOrConnectWithoutUserInput = {
    where: ChatMemberWhereUniqueInput
    create: XOR<ChatMemberCreateWithoutUserInput, ChatMemberUncheckedCreateWithoutUserInput>
  }

  export type ChatMemberCreateManyUserInputEnvelope = {
    data: ChatMemberCreateManyUserInput | ChatMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutSenderInput = {
    id?: string
    content: string
    sentAt?: Date | string
    room: ChatRoomCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string
    roomId: string
    content: string
    sentAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type ShiftUpsertWithWhereUniqueWithoutUserInput = {
    where: ShiftWhereUniqueInput
    update: XOR<ShiftUpdateWithoutUserInput, ShiftUncheckedUpdateWithoutUserInput>
    create: XOR<ShiftCreateWithoutUserInput, ShiftUncheckedCreateWithoutUserInput>
  }

  export type ShiftUpdateWithWhereUniqueWithoutUserInput = {
    where: ShiftWhereUniqueInput
    data: XOR<ShiftUpdateWithoutUserInput, ShiftUncheckedUpdateWithoutUserInput>
  }

  export type ShiftUpdateManyWithWhereWithoutUserInput = {
    where: ShiftScalarWhereInput
    data: XOR<ShiftUpdateManyMutationInput, ShiftUncheckedUpdateManyWithoutUserInput>
  }

  export type ShiftScalarWhereInput = {
    AND?: ShiftScalarWhereInput | ShiftScalarWhereInput[]
    OR?: ShiftScalarWhereInput[]
    NOT?: ShiftScalarWhereInput | ShiftScalarWhereInput[]
    id?: StringFilter<"Shift"> | string
    userId?: StringFilter<"Shift"> | string
    startTime?: DateTimeFilter<"Shift"> | Date | string
    endTime?: DateTimeFilter<"Shift"> | Date | string
    location?: StringNullableFilter<"Shift"> | string | null
    notes?: StringNullableFilter<"Shift"> | string | null
    status?: EnumShiftStatusFilter<"Shift"> | $Enums.ShiftStatus
    createdBy?: StringFilter<"Shift"> | string
    createdAt?: DateTimeFilter<"Shift"> | Date | string
    updatedAt?: DateTimeFilter<"Shift"> | Date | string
  }

  export type TimeOffRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: TimeOffRequestWhereUniqueInput
    update: XOR<TimeOffRequestUpdateWithoutUserInput, TimeOffRequestUncheckedUpdateWithoutUserInput>
    create: XOR<TimeOffRequestCreateWithoutUserInput, TimeOffRequestUncheckedCreateWithoutUserInput>
  }

  export type TimeOffRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: TimeOffRequestWhereUniqueInput
    data: XOR<TimeOffRequestUpdateWithoutUserInput, TimeOffRequestUncheckedUpdateWithoutUserInput>
  }

  export type TimeOffRequestUpdateManyWithWhereWithoutUserInput = {
    where: TimeOffRequestScalarWhereInput
    data: XOR<TimeOffRequestUpdateManyMutationInput, TimeOffRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type TimeOffRequestScalarWhereInput = {
    AND?: TimeOffRequestScalarWhereInput | TimeOffRequestScalarWhereInput[]
    OR?: TimeOffRequestScalarWhereInput[]
    NOT?: TimeOffRequestScalarWhereInput | TimeOffRequestScalarWhereInput[]
    id?: StringFilter<"TimeOffRequest"> | string
    userId?: StringFilter<"TimeOffRequest"> | string
    fromDate?: DateTimeFilter<"TimeOffRequest"> | Date | string
    toDate?: DateTimeFilter<"TimeOffRequest"> | Date | string
    type?: EnumTimeOffTypeFilter<"TimeOffRequest"> | $Enums.TimeOffType
    reason?: StringNullableFilter<"TimeOffRequest"> | string | null
    status?: EnumRequestStatusFilter<"TimeOffRequest"> | $Enums.RequestStatus
    createdAt?: DateTimeFilter<"TimeOffRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TimeOffRequest"> | Date | string
  }

  export type ShiftSwapRequestUpsertWithWhereUniqueWithoutRequestedByInput = {
    where: ShiftSwapRequestWhereUniqueInput
    update: XOR<ShiftSwapRequestUpdateWithoutRequestedByInput, ShiftSwapRequestUncheckedUpdateWithoutRequestedByInput>
    create: XOR<ShiftSwapRequestCreateWithoutRequestedByInput, ShiftSwapRequestUncheckedCreateWithoutRequestedByInput>
  }

  export type ShiftSwapRequestUpdateWithWhereUniqueWithoutRequestedByInput = {
    where: ShiftSwapRequestWhereUniqueInput
    data: XOR<ShiftSwapRequestUpdateWithoutRequestedByInput, ShiftSwapRequestUncheckedUpdateWithoutRequestedByInput>
  }

  export type ShiftSwapRequestUpdateManyWithWhereWithoutRequestedByInput = {
    where: ShiftSwapRequestScalarWhereInput
    data: XOR<ShiftSwapRequestUpdateManyMutationInput, ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByInput>
  }

  export type ShiftSwapRequestScalarWhereInput = {
    AND?: ShiftSwapRequestScalarWhereInput | ShiftSwapRequestScalarWhereInput[]
    OR?: ShiftSwapRequestScalarWhereInput[]
    NOT?: ShiftSwapRequestScalarWhereInput | ShiftSwapRequestScalarWhereInput[]
    id?: StringFilter<"ShiftSwapRequest"> | string
    requestedById?: StringFilter<"ShiftSwapRequest"> | string
    fromShiftId?: StringFilter<"ShiftSwapRequest"> | string
    swapWithId?: StringFilter<"ShiftSwapRequest"> | string
    toShiftId?: StringFilter<"ShiftSwapRequest"> | string
    status?: EnumRequestStatusFilter<"ShiftSwapRequest"> | $Enums.RequestStatus
    requestedAt?: DateTimeFilter<"ShiftSwapRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ShiftSwapRequest"> | Date | string
  }

  export type ShiftSwapRequestUpsertWithWhereUniqueWithoutSwapWithInput = {
    where: ShiftSwapRequestWhereUniqueInput
    update: XOR<ShiftSwapRequestUpdateWithoutSwapWithInput, ShiftSwapRequestUncheckedUpdateWithoutSwapWithInput>
    create: XOR<ShiftSwapRequestCreateWithoutSwapWithInput, ShiftSwapRequestUncheckedCreateWithoutSwapWithInput>
  }

  export type ShiftSwapRequestUpdateWithWhereUniqueWithoutSwapWithInput = {
    where: ShiftSwapRequestWhereUniqueInput
    data: XOR<ShiftSwapRequestUpdateWithoutSwapWithInput, ShiftSwapRequestUncheckedUpdateWithoutSwapWithInput>
  }

  export type ShiftSwapRequestUpdateManyWithWhereWithoutSwapWithInput = {
    where: ShiftSwapRequestScalarWhereInput
    data: XOR<ShiftSwapRequestUpdateManyMutationInput, ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithInput>
  }

  export type WorkLogUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkLogWhereUniqueInput
    update: XOR<WorkLogUpdateWithoutUserInput, WorkLogUncheckedUpdateWithoutUserInput>
    create: XOR<WorkLogCreateWithoutUserInput, WorkLogUncheckedCreateWithoutUserInput>
  }

  export type WorkLogUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkLogWhereUniqueInput
    data: XOR<WorkLogUpdateWithoutUserInput, WorkLogUncheckedUpdateWithoutUserInput>
  }

  export type WorkLogUpdateManyWithWhereWithoutUserInput = {
    where: WorkLogScalarWhereInput
    data: XOR<WorkLogUpdateManyMutationInput, WorkLogUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkLogScalarWhereInput = {
    AND?: WorkLogScalarWhereInput | WorkLogScalarWhereInput[]
    OR?: WorkLogScalarWhereInput[]
    NOT?: WorkLogScalarWhereInput | WorkLogScalarWhereInput[]
    id?: StringFilter<"WorkLog"> | string
    userId?: StringFilter<"WorkLog"> | string
    shiftId?: StringFilter<"WorkLog"> | string
    hours?: FloatFilter<"WorkLog"> | number
    notes?: StringNullableFilter<"WorkLog"> | string | null
    createdAt?: DateTimeFilter<"WorkLog"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type ChatMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: ChatMemberWhereUniqueInput
    update: XOR<ChatMemberUpdateWithoutUserInput, ChatMemberUncheckedUpdateWithoutUserInput>
    create: XOR<ChatMemberCreateWithoutUserInput, ChatMemberUncheckedCreateWithoutUserInput>
  }

  export type ChatMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: ChatMemberWhereUniqueInput
    data: XOR<ChatMemberUpdateWithoutUserInput, ChatMemberUncheckedUpdateWithoutUserInput>
  }

  export type ChatMemberUpdateManyWithWhereWithoutUserInput = {
    where: ChatMemberScalarWhereInput
    data: XOR<ChatMemberUpdateManyMutationInput, ChatMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type ChatMemberScalarWhereInput = {
    AND?: ChatMemberScalarWhereInput | ChatMemberScalarWhereInput[]
    OR?: ChatMemberScalarWhereInput[]
    NOT?: ChatMemberScalarWhereInput | ChatMemberScalarWhereInput[]
    id?: StringFilter<"ChatMember"> | string
    roomId?: StringFilter<"ChatMember"> | string
    userId?: StringFilter<"ChatMember"> | string
    joinedAt?: DateTimeFilter<"ChatMember"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    roomId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    sentAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type UserCreateWithoutShiftsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    timeOffRequests?: TimeOffRequestCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutShiftsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    timeOffRequests?: TimeOffRequestUncheckedCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutShiftsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutShiftsInput, UserUncheckedCreateWithoutShiftsInput>
  }

  export type ShiftSwapRequestCreateWithoutFromShiftInput = {
    id?: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
    requestedBy: UserCreateNestedOneWithoutShiftSwapRequestsInput
    swapWith: UserCreateNestedOneWithoutShiftSwapsWithInput
    toShift: ShiftCreateNestedOneWithoutSwapRequestsToInput
  }

  export type ShiftSwapRequestUncheckedCreateWithoutFromShiftInput = {
    id?: string
    requestedById: string
    swapWithId: string
    toShiftId: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftSwapRequestCreateOrConnectWithoutFromShiftInput = {
    where: ShiftSwapRequestWhereUniqueInput
    create: XOR<ShiftSwapRequestCreateWithoutFromShiftInput, ShiftSwapRequestUncheckedCreateWithoutFromShiftInput>
  }

  export type ShiftSwapRequestCreateManyFromShiftInputEnvelope = {
    data: ShiftSwapRequestCreateManyFromShiftInput | ShiftSwapRequestCreateManyFromShiftInput[]
    skipDuplicates?: boolean
  }

  export type ShiftSwapRequestCreateWithoutToShiftInput = {
    id?: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
    requestedBy: UserCreateNestedOneWithoutShiftSwapRequestsInput
    fromShift: ShiftCreateNestedOneWithoutSwapRequestsFromInput
    swapWith: UserCreateNestedOneWithoutShiftSwapsWithInput
  }

  export type ShiftSwapRequestUncheckedCreateWithoutToShiftInput = {
    id?: string
    requestedById: string
    fromShiftId: string
    swapWithId: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftSwapRequestCreateOrConnectWithoutToShiftInput = {
    where: ShiftSwapRequestWhereUniqueInput
    create: XOR<ShiftSwapRequestCreateWithoutToShiftInput, ShiftSwapRequestUncheckedCreateWithoutToShiftInput>
  }

  export type ShiftSwapRequestCreateManyToShiftInputEnvelope = {
    data: ShiftSwapRequestCreateManyToShiftInput | ShiftSwapRequestCreateManyToShiftInput[]
    skipDuplicates?: boolean
  }

  export type WorkLogCreateWithoutShiftInput = {
    id?: string
    hours: number
    notes?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWorkLogsInput
  }

  export type WorkLogUncheckedCreateWithoutShiftInput = {
    id?: string
    userId: string
    hours: number
    notes?: string | null
    createdAt?: Date | string
  }

  export type WorkLogCreateOrConnectWithoutShiftInput = {
    where: WorkLogWhereUniqueInput
    create: XOR<WorkLogCreateWithoutShiftInput, WorkLogUncheckedCreateWithoutShiftInput>
  }

  export type WorkLogCreateManyShiftInputEnvelope = {
    data: WorkLogCreateManyShiftInput | WorkLogCreateManyShiftInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutShiftsInput = {
    update: XOR<UserUpdateWithoutShiftsInput, UserUncheckedUpdateWithoutShiftsInput>
    create: XOR<UserCreateWithoutShiftsInput, UserUncheckedCreateWithoutShiftsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutShiftsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutShiftsInput, UserUncheckedUpdateWithoutShiftsInput>
  }

  export type UserUpdateWithoutShiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeOffRequests?: TimeOffRequestUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutShiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeOffRequests?: TimeOffRequestUncheckedUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type ShiftSwapRequestUpsertWithWhereUniqueWithoutFromShiftInput = {
    where: ShiftSwapRequestWhereUniqueInput
    update: XOR<ShiftSwapRequestUpdateWithoutFromShiftInput, ShiftSwapRequestUncheckedUpdateWithoutFromShiftInput>
    create: XOR<ShiftSwapRequestCreateWithoutFromShiftInput, ShiftSwapRequestUncheckedCreateWithoutFromShiftInput>
  }

  export type ShiftSwapRequestUpdateWithWhereUniqueWithoutFromShiftInput = {
    where: ShiftSwapRequestWhereUniqueInput
    data: XOR<ShiftSwapRequestUpdateWithoutFromShiftInput, ShiftSwapRequestUncheckedUpdateWithoutFromShiftInput>
  }

  export type ShiftSwapRequestUpdateManyWithWhereWithoutFromShiftInput = {
    where: ShiftSwapRequestScalarWhereInput
    data: XOR<ShiftSwapRequestUpdateManyMutationInput, ShiftSwapRequestUncheckedUpdateManyWithoutFromShiftInput>
  }

  export type ShiftSwapRequestUpsertWithWhereUniqueWithoutToShiftInput = {
    where: ShiftSwapRequestWhereUniqueInput
    update: XOR<ShiftSwapRequestUpdateWithoutToShiftInput, ShiftSwapRequestUncheckedUpdateWithoutToShiftInput>
    create: XOR<ShiftSwapRequestCreateWithoutToShiftInput, ShiftSwapRequestUncheckedCreateWithoutToShiftInput>
  }

  export type ShiftSwapRequestUpdateWithWhereUniqueWithoutToShiftInput = {
    where: ShiftSwapRequestWhereUniqueInput
    data: XOR<ShiftSwapRequestUpdateWithoutToShiftInput, ShiftSwapRequestUncheckedUpdateWithoutToShiftInput>
  }

  export type ShiftSwapRequestUpdateManyWithWhereWithoutToShiftInput = {
    where: ShiftSwapRequestScalarWhereInput
    data: XOR<ShiftSwapRequestUpdateManyMutationInput, ShiftSwapRequestUncheckedUpdateManyWithoutToShiftInput>
  }

  export type WorkLogUpsertWithWhereUniqueWithoutShiftInput = {
    where: WorkLogWhereUniqueInput
    update: XOR<WorkLogUpdateWithoutShiftInput, WorkLogUncheckedUpdateWithoutShiftInput>
    create: XOR<WorkLogCreateWithoutShiftInput, WorkLogUncheckedCreateWithoutShiftInput>
  }

  export type WorkLogUpdateWithWhereUniqueWithoutShiftInput = {
    where: WorkLogWhereUniqueInput
    data: XOR<WorkLogUpdateWithoutShiftInput, WorkLogUncheckedUpdateWithoutShiftInput>
  }

  export type WorkLogUpdateManyWithWhereWithoutShiftInput = {
    where: WorkLogScalarWhereInput
    data: XOR<WorkLogUpdateManyMutationInput, WorkLogUncheckedUpdateManyWithoutShiftInput>
  }

  export type UserCreateWithoutTimeOffRequestsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutTimeOffRequestsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftUncheckedCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutTimeOffRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTimeOffRequestsInput, UserUncheckedCreateWithoutTimeOffRequestsInput>
  }

  export type UserUpsertWithoutTimeOffRequestsInput = {
    update: XOR<UserUpdateWithoutTimeOffRequestsInput, UserUncheckedUpdateWithoutTimeOffRequestsInput>
    create: XOR<UserCreateWithoutTimeOffRequestsInput, UserUncheckedCreateWithoutTimeOffRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTimeOffRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTimeOffRequestsInput, UserUncheckedUpdateWithoutTimeOffRequestsInput>
  }

  export type UserUpdateWithoutTimeOffRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutTimeOffRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUncheckedUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserCreateWithoutShiftSwapRequestsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestCreateNestedManyWithoutUserInput
    shiftSwapsWith?: ShiftSwapRequestCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutShiftSwapRequestsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftUncheckedCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestUncheckedCreateNestedManyWithoutUserInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutShiftSwapRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutShiftSwapRequestsInput, UserUncheckedCreateWithoutShiftSwapRequestsInput>
  }

  export type ShiftCreateWithoutSwapRequestsFromInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutShiftsInput
    swapRequestsTo?: ShiftSwapRequestCreateNestedManyWithoutToShiftInput
    workLogs?: WorkLogCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateWithoutSwapRequestsFromInput = {
    id?: string
    userId: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    swapRequestsTo?: ShiftSwapRequestUncheckedCreateNestedManyWithoutToShiftInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftCreateOrConnectWithoutSwapRequestsFromInput = {
    where: ShiftWhereUniqueInput
    create: XOR<ShiftCreateWithoutSwapRequestsFromInput, ShiftUncheckedCreateWithoutSwapRequestsFromInput>
  }

  export type UserCreateWithoutShiftSwapsWithInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestCreateNestedManyWithoutRequestedByInput
    workLogs?: WorkLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutShiftSwapsWithInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftUncheckedCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestUncheckedCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedCreateNestedManyWithoutRequestedByInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutShiftSwapsWithInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutShiftSwapsWithInput, UserUncheckedCreateWithoutShiftSwapsWithInput>
  }

  export type ShiftCreateWithoutSwapRequestsToInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutShiftsInput
    swapRequestsFrom?: ShiftSwapRequestCreateNestedManyWithoutFromShiftInput
    workLogs?: WorkLogCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateWithoutSwapRequestsToInput = {
    id?: string
    userId: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    swapRequestsFrom?: ShiftSwapRequestUncheckedCreateNestedManyWithoutFromShiftInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftCreateOrConnectWithoutSwapRequestsToInput = {
    where: ShiftWhereUniqueInput
    create: XOR<ShiftCreateWithoutSwapRequestsToInput, ShiftUncheckedCreateWithoutSwapRequestsToInput>
  }

  export type UserUpsertWithoutShiftSwapRequestsInput = {
    update: XOR<UserUpdateWithoutShiftSwapRequestsInput, UserUncheckedUpdateWithoutShiftSwapRequestsInput>
    create: XOR<UserCreateWithoutShiftSwapRequestsInput, UserUncheckedCreateWithoutShiftSwapRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutShiftSwapRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutShiftSwapRequestsInput, UserUncheckedUpdateWithoutShiftSwapRequestsInput>
  }

  export type UserUpdateWithoutShiftSwapRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUpdateManyWithoutUserNestedInput
    shiftSwapsWith?: ShiftSwapRequestUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutShiftSwapRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUncheckedUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUncheckedUpdateManyWithoutUserNestedInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type ShiftUpsertWithoutSwapRequestsFromInput = {
    update: XOR<ShiftUpdateWithoutSwapRequestsFromInput, ShiftUncheckedUpdateWithoutSwapRequestsFromInput>
    create: XOR<ShiftCreateWithoutSwapRequestsFromInput, ShiftUncheckedCreateWithoutSwapRequestsFromInput>
    where?: ShiftWhereInput
  }

  export type ShiftUpdateToOneWithWhereWithoutSwapRequestsFromInput = {
    where?: ShiftWhereInput
    data: XOR<ShiftUpdateWithoutSwapRequestsFromInput, ShiftUncheckedUpdateWithoutSwapRequestsFromInput>
  }

  export type ShiftUpdateWithoutSwapRequestsFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutShiftsNestedInput
    swapRequestsTo?: ShiftSwapRequestUpdateManyWithoutToShiftNestedInput
    workLogs?: WorkLogUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateWithoutSwapRequestsFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    swapRequestsTo?: ShiftSwapRequestUncheckedUpdateManyWithoutToShiftNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type UserUpsertWithoutShiftSwapsWithInput = {
    update: XOR<UserUpdateWithoutShiftSwapsWithInput, UserUncheckedUpdateWithoutShiftSwapsWithInput>
    create: XOR<UserCreateWithoutShiftSwapsWithInput, UserUncheckedCreateWithoutShiftSwapsWithInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutShiftSwapsWithInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutShiftSwapsWithInput, UserUncheckedUpdateWithoutShiftSwapsWithInput>
  }

  export type UserUpdateWithoutShiftSwapsWithInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUpdateManyWithoutRequestedByNestedInput
    workLogs?: WorkLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutShiftSwapsWithInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUncheckedUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUncheckedUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type ShiftUpsertWithoutSwapRequestsToInput = {
    update: XOR<ShiftUpdateWithoutSwapRequestsToInput, ShiftUncheckedUpdateWithoutSwapRequestsToInput>
    create: XOR<ShiftCreateWithoutSwapRequestsToInput, ShiftUncheckedCreateWithoutSwapRequestsToInput>
    where?: ShiftWhereInput
  }

  export type ShiftUpdateToOneWithWhereWithoutSwapRequestsToInput = {
    where?: ShiftWhereInput
    data: XOR<ShiftUpdateWithoutSwapRequestsToInput, ShiftUncheckedUpdateWithoutSwapRequestsToInput>
  }

  export type ShiftUpdateWithoutSwapRequestsToInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutShiftsNestedInput
    swapRequestsFrom?: ShiftSwapRequestUpdateManyWithoutFromShiftNestedInput
    workLogs?: WorkLogUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateWithoutSwapRequestsToInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    swapRequestsFrom?: ShiftSwapRequestUncheckedUpdateManyWithoutFromShiftNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type UserCreateWithoutWorkLogsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestCreateNestedManyWithoutSwapWithInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutWorkLogsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftUncheckedCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestUncheckedCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedCreateNestedManyWithoutSwapWithInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutWorkLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkLogsInput, UserUncheckedCreateWithoutWorkLogsInput>
  }

  export type ShiftCreateWithoutWorkLogsInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutShiftsInput
    swapRequestsFrom?: ShiftSwapRequestCreateNestedManyWithoutFromShiftInput
    swapRequestsTo?: ShiftSwapRequestCreateNestedManyWithoutToShiftInput
  }

  export type ShiftUncheckedCreateWithoutWorkLogsInput = {
    id?: string
    userId: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    swapRequestsFrom?: ShiftSwapRequestUncheckedCreateNestedManyWithoutFromShiftInput
    swapRequestsTo?: ShiftSwapRequestUncheckedCreateNestedManyWithoutToShiftInput
  }

  export type ShiftCreateOrConnectWithoutWorkLogsInput = {
    where: ShiftWhereUniqueInput
    create: XOR<ShiftCreateWithoutWorkLogsInput, ShiftUncheckedCreateWithoutWorkLogsInput>
  }

  export type UserUpsertWithoutWorkLogsInput = {
    update: XOR<UserUpdateWithoutWorkLogsInput, UserUncheckedUpdateWithoutWorkLogsInput>
    create: XOR<UserCreateWithoutWorkLogsInput, UserUncheckedCreateWithoutWorkLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkLogsInput, UserUncheckedUpdateWithoutWorkLogsInput>
  }

  export type UserUpdateWithoutWorkLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUpdateManyWithoutSwapWithNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUncheckedUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUncheckedUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type ShiftUpsertWithoutWorkLogsInput = {
    update: XOR<ShiftUpdateWithoutWorkLogsInput, ShiftUncheckedUpdateWithoutWorkLogsInput>
    create: XOR<ShiftCreateWithoutWorkLogsInput, ShiftUncheckedCreateWithoutWorkLogsInput>
    where?: ShiftWhereInput
  }

  export type ShiftUpdateToOneWithWhereWithoutWorkLogsInput = {
    where?: ShiftWhereInput
    data: XOR<ShiftUpdateWithoutWorkLogsInput, ShiftUncheckedUpdateWithoutWorkLogsInput>
  }

  export type ShiftUpdateWithoutWorkLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutShiftsNestedInput
    swapRequestsFrom?: ShiftSwapRequestUpdateManyWithoutFromShiftNestedInput
    swapRequestsTo?: ShiftSwapRequestUpdateManyWithoutToShiftNestedInput
  }

  export type ShiftUncheckedUpdateWithoutWorkLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    swapRequestsFrom?: ShiftSwapRequestUncheckedUpdateManyWithoutFromShiftNestedInput
    swapRequestsTo?: ShiftSwapRequestUncheckedUpdateManyWithoutToShiftNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftUncheckedCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestUncheckedCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUncheckedUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUncheckedUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type ChatMemberCreateWithoutRoomInput = {
    id?: string
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutChatMembershipsInput
  }

  export type ChatMemberUncheckedCreateWithoutRoomInput = {
    id?: string
    userId: string
    joinedAt?: Date | string
  }

  export type ChatMemberCreateOrConnectWithoutRoomInput = {
    where: ChatMemberWhereUniqueInput
    create: XOR<ChatMemberCreateWithoutRoomInput, ChatMemberUncheckedCreateWithoutRoomInput>
  }

  export type ChatMemberCreateManyRoomInputEnvelope = {
    data: ChatMemberCreateManyRoomInput | ChatMemberCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutRoomInput = {
    id?: string
    content: string
    sentAt?: Date | string
    sender: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutRoomInput = {
    id?: string
    senderId: string
    content: string
    sentAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutRoomInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput>
  }

  export type MessageCreateManyRoomInputEnvelope = {
    data: MessageCreateManyRoomInput | MessageCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type ChatMemberUpsertWithWhereUniqueWithoutRoomInput = {
    where: ChatMemberWhereUniqueInput
    update: XOR<ChatMemberUpdateWithoutRoomInput, ChatMemberUncheckedUpdateWithoutRoomInput>
    create: XOR<ChatMemberCreateWithoutRoomInput, ChatMemberUncheckedCreateWithoutRoomInput>
  }

  export type ChatMemberUpdateWithWhereUniqueWithoutRoomInput = {
    where: ChatMemberWhereUniqueInput
    data: XOR<ChatMemberUpdateWithoutRoomInput, ChatMemberUncheckedUpdateWithoutRoomInput>
  }

  export type ChatMemberUpdateManyWithWhereWithoutRoomInput = {
    where: ChatMemberScalarWhereInput
    data: XOR<ChatMemberUpdateManyMutationInput, ChatMemberUncheckedUpdateManyWithoutRoomInput>
  }

  export type MessageUpsertWithWhereUniqueWithoutRoomInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutRoomInput, MessageUncheckedUpdateWithoutRoomInput>
    create: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutRoomInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutRoomInput, MessageUncheckedUpdateWithoutRoomInput>
  }

  export type MessageUpdateManyWithWhereWithoutRoomInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutRoomInput>
  }

  export type ChatRoomCreateWithoutMembersInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    messages?: MessageCreateNestedManyWithoutRoomInput
  }

  export type ChatRoomUncheckedCreateWithoutMembersInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type ChatRoomCreateOrConnectWithoutMembersInput = {
    where: ChatRoomWhereUniqueInput
    create: XOR<ChatRoomCreateWithoutMembersInput, ChatRoomUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutChatMembershipsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutChatMembershipsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftUncheckedCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestUncheckedCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutChatMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChatMembershipsInput, UserUncheckedCreateWithoutChatMembershipsInput>
  }

  export type ChatRoomUpsertWithoutMembersInput = {
    update: XOR<ChatRoomUpdateWithoutMembersInput, ChatRoomUncheckedUpdateWithoutMembersInput>
    create: XOR<ChatRoomCreateWithoutMembersInput, ChatRoomUncheckedCreateWithoutMembersInput>
    where?: ChatRoomWhereInput
  }

  export type ChatRoomUpdateToOneWithWhereWithoutMembersInput = {
    where?: ChatRoomWhereInput
    data: XOR<ChatRoomUpdateWithoutMembersInput, ChatRoomUncheckedUpdateWithoutMembersInput>
  }

  export type ChatRoomUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutRoomNestedInput
  }

  export type ChatRoomUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutChatMembershipsInput = {
    update: XOR<UserUpdateWithoutChatMembershipsInput, UserUncheckedUpdateWithoutChatMembershipsInput>
    create: XOR<UserCreateWithoutChatMembershipsInput, UserUncheckedCreateWithoutChatMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChatMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChatMembershipsInput, UserUncheckedUpdateWithoutChatMembershipsInput>
  }

  export type UserUpdateWithoutChatMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutChatMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUncheckedUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUncheckedUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type ChatRoomCreateWithoutMessagesInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    members?: ChatMemberCreateNestedManyWithoutRoomInput
  }

  export type ChatRoomUncheckedCreateWithoutMessagesInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    members?: ChatMemberUncheckedCreateNestedManyWithoutRoomInput
  }

  export type ChatRoomCreateOrConnectWithoutMessagesInput = {
    where: ChatRoomWhereUniqueInput
    create: XOR<ChatRoomCreateWithoutMessagesInput, ChatRoomUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutMessagesInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    shifts?: ShiftUncheckedCreateNestedManyWithoutUserInput
    timeOffRequests?: TimeOffRequestUncheckedCreateNestedManyWithoutUserInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedCreateNestedManyWithoutRequestedByInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedCreateNestedManyWithoutSwapWithInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    chatMemberships?: ChatMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type ChatRoomUpsertWithoutMessagesInput = {
    update: XOR<ChatRoomUpdateWithoutMessagesInput, ChatRoomUncheckedUpdateWithoutMessagesInput>
    create: XOR<ChatRoomCreateWithoutMessagesInput, ChatRoomUncheckedCreateWithoutMessagesInput>
    where?: ChatRoomWhereInput
  }

  export type ChatRoomUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ChatRoomWhereInput
    data: XOR<ChatRoomUpdateWithoutMessagesInput, ChatRoomUncheckedUpdateWithoutMessagesInput>
  }

  export type ChatRoomUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUpdateManyWithoutRoomNestedInput
  }

  export type ChatRoomUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUncheckedUpdateManyWithoutUserNestedInput
    timeOffRequests?: TimeOffRequestUncheckedUpdateManyWithoutUserNestedInput
    shiftSwapRequests?: ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByNestedInput
    shiftSwapsWith?: ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    chatMemberships?: ChatMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ShiftCreateManyUserInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    notes?: string | null
    status?: $Enums.ShiftStatus
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeOffRequestCreateManyUserInput = {
    id?: string
    fromDate: Date | string
    toDate: Date | string
    type: $Enums.TimeOffType
    reason?: string | null
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftSwapRequestCreateManyRequestedByInput = {
    id?: string
    fromShiftId: string
    swapWithId: string
    toShiftId: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftSwapRequestCreateManySwapWithInput = {
    id?: string
    requestedById: string
    fromShiftId: string
    toShiftId: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkLogCreateManyUserInput = {
    id?: string
    shiftId: string
    hours: number
    notes?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type ChatMemberCreateManyUserInput = {
    id?: string
    roomId: string
    joinedAt?: Date | string
  }

  export type MessageCreateManySenderInput = {
    id?: string
    roomId: string
    content: string
    sentAt?: Date | string
  }

  export type ShiftUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    swapRequestsFrom?: ShiftSwapRequestUpdateManyWithoutFromShiftNestedInput
    swapRequestsTo?: ShiftSwapRequestUpdateManyWithoutToShiftNestedInput
    workLogs?: WorkLogUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    swapRequestsFrom?: ShiftSwapRequestUncheckedUpdateManyWithoutFromShiftNestedInput
    swapRequestsTo?: ShiftSwapRequestUncheckedUpdateManyWithoutToShiftNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeOffRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeOffTypeFieldUpdateOperationsInput | $Enums.TimeOffType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeOffRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeOffTypeFieldUpdateOperationsInput | $Enums.TimeOffType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeOffRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromDate?: DateTimeFieldUpdateOperationsInput | Date | string
    toDate?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeOffTypeFieldUpdateOperationsInput | $Enums.TimeOffType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestUpdateWithoutRequestedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromShift?: ShiftUpdateOneRequiredWithoutSwapRequestsFromNestedInput
    swapWith?: UserUpdateOneRequiredWithoutShiftSwapsWithNestedInput
    toShift?: ShiftUpdateOneRequiredWithoutSwapRequestsToNestedInput
  }

  export type ShiftSwapRequestUncheckedUpdateWithoutRequestedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromShiftId?: StringFieldUpdateOperationsInput | string
    swapWithId?: StringFieldUpdateOperationsInput | string
    toShiftId?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestUncheckedUpdateManyWithoutRequestedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromShiftId?: StringFieldUpdateOperationsInput | string
    swapWithId?: StringFieldUpdateOperationsInput | string
    toShiftId?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestUpdateWithoutSwapWithInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestedBy?: UserUpdateOneRequiredWithoutShiftSwapRequestsNestedInput
    fromShift?: ShiftUpdateOneRequiredWithoutSwapRequestsFromNestedInput
    toShift?: ShiftUpdateOneRequiredWithoutSwapRequestsToNestedInput
  }

  export type ShiftSwapRequestUncheckedUpdateWithoutSwapWithInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedById?: StringFieldUpdateOperationsInput | string
    fromShiftId?: StringFieldUpdateOperationsInput | string
    toShiftId?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestUncheckedUpdateManyWithoutSwapWithInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedById?: StringFieldUpdateOperationsInput | string
    fromShiftId?: StringFieldUpdateOperationsInput | string
    toShiftId?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: ShiftUpdateOneRequiredWithoutWorkLogsNestedInput
  }

  export type WorkLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    shiftId?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    shiftId?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: ChatRoomUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ChatMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: ChatRoomUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestCreateManyFromShiftInput = {
    id?: string
    requestedById: string
    swapWithId: string
    toShiftId: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftSwapRequestCreateManyToShiftInput = {
    id?: string
    requestedById: string
    fromShiftId: string
    swapWithId: string
    status?: $Enums.RequestStatus
    requestedAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkLogCreateManyShiftInput = {
    id?: string
    userId: string
    hours: number
    notes?: string | null
    createdAt?: Date | string
  }

  export type ShiftSwapRequestUpdateWithoutFromShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestedBy?: UserUpdateOneRequiredWithoutShiftSwapRequestsNestedInput
    swapWith?: UserUpdateOneRequiredWithoutShiftSwapsWithNestedInput
    toShift?: ShiftUpdateOneRequiredWithoutSwapRequestsToNestedInput
  }

  export type ShiftSwapRequestUncheckedUpdateWithoutFromShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedById?: StringFieldUpdateOperationsInput | string
    swapWithId?: StringFieldUpdateOperationsInput | string
    toShiftId?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestUncheckedUpdateManyWithoutFromShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedById?: StringFieldUpdateOperationsInput | string
    swapWithId?: StringFieldUpdateOperationsInput | string
    toShiftId?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestUpdateWithoutToShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestedBy?: UserUpdateOneRequiredWithoutShiftSwapRequestsNestedInput
    fromShift?: ShiftUpdateOneRequiredWithoutSwapRequestsFromNestedInput
    swapWith?: UserUpdateOneRequiredWithoutShiftSwapsWithNestedInput
  }

  export type ShiftSwapRequestUncheckedUpdateWithoutToShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedById?: StringFieldUpdateOperationsInput | string
    fromShiftId?: StringFieldUpdateOperationsInput | string
    swapWithId?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftSwapRequestUncheckedUpdateManyWithoutToShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedById?: StringFieldUpdateOperationsInput | string
    fromShiftId?: StringFieldUpdateOperationsInput | string
    swapWithId?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogUpdateWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkLogsNestedInput
  }

  export type WorkLogUncheckedUpdateWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogUncheckedUpdateManyWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMemberCreateManyRoomInput = {
    id?: string
    userId: string
    joinedAt?: Date | string
  }

  export type MessageCreateManyRoomInput = {
    id?: string
    senderId: string
    content: string
    sentAt?: Date | string
  }

  export type ChatMemberUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChatMembershipsNestedInput
  }

  export type ChatMemberUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMemberUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}