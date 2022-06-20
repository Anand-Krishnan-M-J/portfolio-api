import { Request } from "express";
export type RequestWithAuth = Request & { error?: any,authData };
