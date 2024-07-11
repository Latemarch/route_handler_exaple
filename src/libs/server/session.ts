import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_PUBLIC_SESSION_PW!,
  cookieName: "ASPSession",
  cookieOptions: {
    // httpOnly: true,
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    // secure: process.env.NODE_ENV === "production",
    secure: false,
  },
};
