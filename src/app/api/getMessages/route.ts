import redis from "../../../../redis";
import { Message } from "../../../../typing";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse(
      JSON.stringify({ body: "Please provide something to search for" }),
      {
        status: 405,
      }
    );
  }
  const messageResponse = await redis.hvals("messages");
  const messages: Message[] = messageResponse
    .map((message) => JSON.parse(message))
    .sort((a: Message, b: Message) => a.createdAt - b.createdAt);

  return new NextResponse(JSON.stringify({ messages }), {
    status: 200,
  });
}
