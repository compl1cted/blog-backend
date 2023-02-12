import { CookieOptions } from "express";
import { CookieLifetime } from "./consts";

export const CookieConfig: CookieOptions = {
    expires: new Date(
        Date.now() + CookieLifetime
    ),
    // maxAge: CookieLifetime,
    path: '/',
    httpOnly: true,
    sameSite: "strict",
}