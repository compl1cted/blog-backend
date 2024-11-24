import { SignOptions } from "jsonwebtoken";

export const AccessTokenConfig: SignOptions = {
    expiresIn: "30m",
}

export const RefreshTokenConfig: SignOptions = {
    expiresIn: "30d",
}