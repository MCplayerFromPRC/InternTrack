import { NextResponse } from "next/server";
import { container } from "@/lib/properties";
import { handleFile, EvalResultDatasource } from "@/dto/EvalResultDTO";

export async function POST(request: Request) {
  const evalDTO = container.get<EvalResultDatasource>(EvalResultDatasource);
  const formData = await request.formData();
  console.log('form data---', formData);
  const file = formData.get("file") as File;
  const fileBuffer = await file.arrayBuffer();
  const ckptId = formData.get("ckptId") as string;
  const finishTime = new Date(formData.get("finishTime") as string);
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
