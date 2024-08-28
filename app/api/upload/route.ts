import { NextResponse } from "next/server";
import { container } from "@/lib/properties";
import { handleFile, EvalResultDatasource } from "@/dto/EvalResultDTO";

export async function POST(request: Request) {
  const evalDTO = container.get<EvalResultDatasource>(EvalResultDatasource);
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const fileBuffer = await file.arrayBuffer();
  const { ckptId, finishTime } = await request.json();
  const evalResult = await handleFile(Buffer.from(fileBuffer));
  if (ckptId === undefined) {
    return new NextResponse(
      `Failed to save evaluation. Please choose a checkpoint.`,
      { status: 200 },
    );
  }
  evalResult.ckpt = ckptId;
  if (finishTime) {
    evalResult.finishTime = finishTime;
  }
  const savedResult = await evalDTO.createOne(evalResult.saveDocument);

  return new NextResponse(`${savedResult._id} created`, { status: 200 });
}
