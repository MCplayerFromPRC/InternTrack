import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { db } from "@/lib/database";
import { User } from "@/models";
import { authConfig } from "./auth.config";

async function getUser(email: string) {
  try {
    const cursor = await db.query<User>(
      `FOR doc IN User FILTER doc.email == "${email}" RETURN doc`,
    );
    const users = await cursor.all();
    if (users.length === 1) {
      const { _id, ...user } = users[0];
      return {
        id: _id,
        ...user,
      };
    } else if (users.length === 0) {
      return null;
    } else {
      throw new Error(
        `Conflict email ${email} for users ${users.map((u) => u._id)}.`,
      );
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
