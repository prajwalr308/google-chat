'use client'
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import Image from "next/image";
import { Message } from "../../typing";
import useSWR from "swr";
import { getData } from "@/utils/fetchData";
import { fetcher } from "@/utils/fetchMessages";
// import Loading from "@/components/loading";

export default async function Home() {
  //server side
  // const data= await getData();
  // const messages: Message[] = data.message || [];
  // console.log("messages in page tsx",messages);

  // client side
  const { data, error } = useSWR("/api/getMessages", fetcher);
  console.log(data);

  const messages: Message[] = data || [];

  // if (!messages) return <Loading />;
  return (
    <main>
      {/* messge list*/}
      <MessageList initialMessages={messages || []} />

      {/* chat input */}
      <ChatInput />
    </main>
  );
}
