import { revalidateTag } from "next/cache";
import { serverPusher } from "../../../../pusher";
import redis from "../../../../redis";
import { Message } from "../../../../typing";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const myData = await req.json();
  if (req.method !== "POST") {
    return new NextResponse(
      JSON.stringify({ body: "Please provide something to search for" }),
      {
        status: 405,
      }
    );
  }

  console.log(req.method, myData, "test");
  const message: Message = myData;

  const createdAt = Date.now();

  const newMessage = {
    ...message,
    createdAt,
  };

  await redis
    .hset("messages", message.id, JSON.stringify(newMessage))
    .catch((e) => console.log(e));
  serverPusher.trigger("messages", "new-message", newMessage).catch((e) => {
    console.log(e);
  });
  revalidateTag("messages");
  return new NextResponse(JSON.stringify({ message: myData }), {
    status: 200,
  });
}
