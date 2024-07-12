/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { GraphWrapper } from "./graph_component";
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {

  return (
    <div className="max-w-none py-8" maxWidth={false}>
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Tasks
      </h1>
      <GraphWrapper />
    </div>
  );
};
