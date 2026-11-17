import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ENTREPRENEUR" | "LAWYER" | "INVESTOR" | "USER";
    } & DefaultSession["user"];
  }

  interface User {
    role: "ENTREPRENEUR" | "LAWYER" | "INVESTOR" | "USER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ENTREPRENEUR" | "LAWYER" | "INVESTOR" | "USER";
  }
}
