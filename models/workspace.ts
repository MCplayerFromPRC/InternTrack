/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { z } from "zod";

export const WorkspaceSchema = z.object({
  name: z.string().max(100),
  ownerId: z.string().max(50),
  created: z.instanceof(Date),
  updated: z.instanceof(Date),
  archived: z.instanceof(Date).nullable(),
});

export type Workspace = z.output<typeof WorkspaceSchema>;
export type WorkspaceInput = z.input<typeof WorkspaceSchema>;
