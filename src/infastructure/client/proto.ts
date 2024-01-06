/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "BasegRPC";

export interface ActionDOM {
  sns: string;
  sessionId: string;
  actionType: string;
  payload: string;
}

export interface DataDOM {
  type: string;
  id: string;
  name: string;
  value: string;
  innerText: string;
  timestamp: string;
}

export interface DataFromHttpResponse {
  sns: string;
  url: string;
  body: string;
  timestamp: string;
}

export interface ResponseAgent {
  status: boolean;
  message: string;
}

function createBaseActionDOM(): ActionDOM {
  return { sns: "", sessionId: "", actionType: "", payload: "" };
}

export const ActionDOM = {
  encode(message: ActionDOM, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sns !== "") {
      writer.uint32(10).string(message.sns);
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    if (message.actionType !== "") {
      writer.uint32(26).string(message.actionType);
    }
    if (message.payload !== "") {
      writer.uint32(34).string(message.payload);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionDOM {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionDOM();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sns = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.actionType = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.payload = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionDOM {
    return {
      sns: isSet(object.sns) ? globalThis.String(object.sns) : "",
      sessionId: isSet(object.sessionId) ? globalThis.String(object.sessionId) : "",
      actionType: isSet(object.actionType) ? globalThis.String(object.actionType) : "",
      payload: isSet(object.payload) ? globalThis.String(object.payload) : "",
    };
  },

  toJSON(message: ActionDOM): unknown {
    const obj: any = {};
    if (message.sns !== "") {
      obj.sns = message.sns;
    }
    if (message.sessionId !== "") {
      obj.sessionId = message.sessionId;
    }
    if (message.actionType !== "") {
      obj.actionType = message.actionType;
    }
    if (message.payload !== "") {
      obj.payload = message.payload;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionDOM>, I>>(base?: I): ActionDOM {
    return ActionDOM.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionDOM>, I>>(object: I): ActionDOM {
    const message = createBaseActionDOM();
    message.sns = object.sns ?? "";
    message.sessionId = object.sessionId ?? "";
    message.actionType = object.actionType ?? "";
    message.payload = object.payload ?? "";
    return message;
  },
};

function createBaseDataDOM(): DataDOM {
  return { type: "", id: "", name: "", value: "", innerText: "", timestamp: "" };
}

export const DataDOM = {
  encode(message: DataDOM, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.value !== "") {
      writer.uint32(34).string(message.value);
    }
    if (message.innerText !== "") {
      writer.uint32(42).string(message.innerText);
    }
    if (message.timestamp !== "") {
      writer.uint32(50).string(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataDOM {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataDOM();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.value = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.innerText = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.timestamp = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DataDOM {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      innerText: isSet(object.innerText) ? globalThis.String(object.innerText) : "",
      timestamp: isSet(object.timestamp) ? globalThis.String(object.timestamp) : "",
    };
  },

  toJSON(message: DataDOM): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.innerText !== "") {
      obj.innerText = message.innerText;
    }
    if (message.timestamp !== "") {
      obj.timestamp = message.timestamp;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DataDOM>, I>>(base?: I): DataDOM {
    return DataDOM.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DataDOM>, I>>(object: I): DataDOM {
    const message = createBaseDataDOM();
    message.type = object.type ?? "";
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.value = object.value ?? "";
    message.innerText = object.innerText ?? "";
    message.timestamp = object.timestamp ?? "";
    return message;
  },
};

function createBaseDataFromHttpResponse(): DataFromHttpResponse {
  return { sns: "", url: "", body: "", timestamp: "" };
}

export const DataFromHttpResponse = {
  encode(message: DataFromHttpResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sns !== "") {
      writer.uint32(10).string(message.sns);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.body !== "") {
      writer.uint32(26).string(message.body);
    }
    if (message.timestamp !== "") {
      writer.uint32(34).string(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataFromHttpResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataFromHttpResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sns = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.url = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.body = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.timestamp = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DataFromHttpResponse {
    return {
      sns: isSet(object.sns) ? globalThis.String(object.sns) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      body: isSet(object.body) ? globalThis.String(object.body) : "",
      timestamp: isSet(object.timestamp) ? globalThis.String(object.timestamp) : "",
    };
  },

  toJSON(message: DataFromHttpResponse): unknown {
    const obj: any = {};
    if (message.sns !== "") {
      obj.sns = message.sns;
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.body !== "") {
      obj.body = message.body;
    }
    if (message.timestamp !== "") {
      obj.timestamp = message.timestamp;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DataFromHttpResponse>, I>>(base?: I): DataFromHttpResponse {
    return DataFromHttpResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DataFromHttpResponse>, I>>(object: I): DataFromHttpResponse {
    const message = createBaseDataFromHttpResponse();
    message.sns = object.sns ?? "";
    message.url = object.url ?? "";
    message.body = object.body ?? "";
    message.timestamp = object.timestamp ?? "";
    return message;
  },
};

function createBaseResponseAgent(): ResponseAgent {
  return { status: false, message: "" };
}

export const ResponseAgent = {
  encode(message: ResponseAgent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status === true) {
      writer.uint32(8).bool(message.status);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseAgent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseAgent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseAgent {
    return {
      status: isSet(object.status) ? globalThis.Boolean(object.status) : false,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: ResponseAgent): unknown {
    const obj: any = {};
    if (message.status === true) {
      obj.status = message.status;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseAgent>, I>>(base?: I): ResponseAgent {
    return ResponseAgent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseAgent>, I>>(object: I): ResponseAgent {
    const message = createBaseResponseAgent();
    message.status = object.status ?? false;
    message.message = object.message ?? "";
    return message;
  },
};

export type AgentService = typeof AgentService;
export const AgentService = {
  sendDataHttp: {
    path: "/BasegRPC.Agent/SendDataHTTP",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DataFromHttpResponse) => Buffer.from(DataFromHttpResponse.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DataFromHttpResponse.decode(value),
    responseSerialize: (value: ResponseAgent) => Buffer.from(ResponseAgent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ResponseAgent.decode(value),
  },
  sendDataDom: {
    path: "/BasegRPC.Agent/SendDataDOM",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DataDOM) => Buffer.from(DataDOM.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DataDOM.decode(value),
    responseSerialize: (value: ResponseAgent) => Buffer.from(ResponseAgent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ResponseAgent.decode(value),
  },
  sendActionDom: {
    path: "/BasegRPC.Agent/SendActionDOM",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ActionDOM) => Buffer.from(ActionDOM.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ActionDOM.decode(value),
    responseSerialize: (value: ResponseAgent) => Buffer.from(ResponseAgent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ResponseAgent.decode(value),
  },
} as const;

export interface AgentServer extends UntypedServiceImplementation {
  sendDataHttp: handleUnaryCall<DataFromHttpResponse, ResponseAgent>;
  sendDataDom: handleUnaryCall<DataDOM, ResponseAgent>;
  sendActionDom: handleUnaryCall<ActionDOM, ResponseAgent>;
}

export interface AgentClient extends Client {
  sendDataHttp(
    request: DataFromHttpResponse,
    callback: (error: ServiceError | null, response: ResponseAgent) => void,
  ): ClientUnaryCall;
  sendDataHttp(
    request: DataFromHttpResponse,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ResponseAgent) => void,
  ): ClientUnaryCall;
  sendDataHttp(
    request: DataFromHttpResponse,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ResponseAgent) => void,
  ): ClientUnaryCall;
  sendDataDom(
    request: DataDOM,
    callback: (error: ServiceError | null, response: ResponseAgent) => void,
  ): ClientUnaryCall;
  sendDataDom(
    request: DataDOM,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ResponseAgent) => void,
  ): ClientUnaryCall;
  sendDataDom(
    request: DataDOM,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ResponseAgent) => void,
  ): ClientUnaryCall;
  sendActionDom(
    request: ActionDOM,
    callback: (error: ServiceError | null, response: ResponseAgent) => void,
  ): ClientUnaryCall;
  sendActionDom(
    request: ActionDOM,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ResponseAgent) => void,
  ): ClientUnaryCall;
  sendActionDom(
    request: ActionDOM,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ResponseAgent) => void,
  ): ClientUnaryCall;
}

export const AgentClient = makeGenericClientConstructor(AgentService, "BasegRPC.Agent") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): AgentClient;
  service: typeof AgentService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
