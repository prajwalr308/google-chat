"use client";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import Image from "next/image";
import { Message } from "../../typing";
import useSWR from "swr";
import { getData } from "@/utils/fetchData";
import { fetcher } from "@/utils/fetchMessages";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Provider from "@/components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from 'react-query/devtools'
// import Loading from "@/components/loading";

export default function Home() {
  const queryClient = new QueryClient();
  //server side
  // const data= await getData();
  // const messages: Message[] = data.message || [];
  // console.log("messages in page tsx",messages);

  // client side

  // if (!messages) return <Loading />;
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Header />
        <main>
          {/* messge list*/}
          <MessageList />

          {/* chat input */}
          <ChatInput />
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
