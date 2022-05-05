import { PromiseObservable } from "../../../observable/promise-observable";
import { HttpOptions } from "./http-types";
export declare const get: <T = any>(url: RequestInfo, { type, ...init }?: HttpOptions) => PromiseObservable<string | Blob | T>;
