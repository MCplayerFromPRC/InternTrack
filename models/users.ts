/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().max(100),
  ownerId: z.string().max(50),
  createdAt: z.instanceof(Date).nullable(),
  email: z.string().max(100),
  rawPassword: z.string().max(100),
});

export type User = z.output<typeof UserSchema>;
export type UserInput = z.input<typeof UserSchema>;
