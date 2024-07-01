/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Typography } from "@mui/joy";
import SimpleGraph from "@/app/ui/ckpts/SimpleGraph";

export default async function Page() {

  return (
    <Container className="max-w-none py-8" maxWidth={false}>
      <Typography level="h2" gutterBottom>
        Tasks
      </Typography>
      <SimpleGraph />
    </Container>
  );
};
