import { NextResponse } from "next/server";
import { container } from "@/lib/properties";
import { handleFile, EvalResultDatasource, CkptEvalDatasource } from "@/dto";

export async function POST(request: Request) {
  const resultDTO = container.get<EvalResultDatasource>(EvalResultDatasource);
  const evalDTO = container.get<CkptEvalDatasource>(CkptEvalDatasource);
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const ckptId = formData.get("ckptId") as string;
  const finishTime = formData.get("finishTime") as string;
  const fileBuffer = await file.arrayBuffer();
  const evalResult = await handleFile(Buffer.from(fileBuffer));
  if (ckptId === undefined) {
    return NextResponse.json(
      {
        code: 1,
        data: {},
        msg: `Failed to save evaluation. Please choose a checkpoint.`,
      },
      { status: 200 },
    );
  }
  evalResult.ckpt = ckptId;
  if (finishTime) {
    evalResult.finishTime = new Date(finishTime);
  }
  const savedResult = await resultDTO.createOne(evalResult.saveDocument);
  await evalDTO.createOne({ _from: ckptId, _to: savedResult._id });

  return NextResponse.json(
    { code: 0, data: savedResult, msg: `${savedResult._id} created` },
    { status: 200 },
  );
}