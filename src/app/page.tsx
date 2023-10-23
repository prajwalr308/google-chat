"use client";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import Image from "next/image";
import { Message } from "../../typing";
import useSWR from "swr";
import { getData } from "@/utils/fetchData";
import { fetcher } from "@/utils/fetchMessages";

import Provider from "@/components/Provider";
import { getServerSession } from "next-auth";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import React from "react";
// import Loading from "@/components/loading";
export const dynamic = "force-dynamic";
export default function Home() {
  const [client] = React.useState(new QueryClient());
  //server side
  // const data= await getData();
  // const messages: Message[] = data.message || [];
  // console.log("messages in page tsx",messages);

  // client side

  // if (!messages) return <Loading />;
  return (
    <QueryClientProvider client={client}>
      <SessionProvider>
      <ReactQueryStreamedHydration> <Header />
        <main>
          {/* messge list*/}
          <MessageList />

          {/* chat input */}
          <ChatInput />
        </main></ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
       
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
