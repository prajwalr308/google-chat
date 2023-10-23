import { Message } from "../../typing";

export const fetcher = async () => {
  const res = await fetch("/api/getMessages",{
    cache: 'no-store'
  });
  const data = await res.json();
  const messages: Message[] = data.messages;
  return messages;
};
