import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1692367",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET as string ,
  cluster: "ap2",
  useTLS: true,
});

export const clientPusher = new ClientPusher(
  process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  {
    cluster: "ap2",
    forceTLS: true,
  }
);
