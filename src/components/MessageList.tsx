"use client";
import { fetcher } from "@/utils/fetchMessages";
import React, { useEffect, useRef } from "react";
import useSWR, { mutate } from "swr";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../../pusher";
import { Message } from "../../typing";
import { useQuery, useQueryClient } from "@tanstack/react-query";
type Props = {
  initialMessages: Message[];
};
const MessageList = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { data: messages, refetch } = useQuery({
    queryKey: ["/api/getMessages"],
    queryFn: () => fetcher(),
  });

  console.log("🚀 ~ file: MessageList.tsx:37 ~ MessageList ~ data", messages);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    queryClient.invalidateQueries({queryKey:["/api/getMessages"]});
    channel.bind("new-message", (message: Message) => {
      if (messages?.find((m) => m.id === message.id)) return;
      if (!messages) {
        queryClient.invalidateQueries({queryKey:["/api/getMessages"]});
        refetch();
      } else {
        queryClient.invalidateQueries({queryKey:["/api/getMessages"]});
        refetch();
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [mutate, messages]);
  if (!messages) return <div>loading...</div>;
  return (
    <div className="space-y-5 px-5 pt-8 pb-32 ">
      {messages.map((message) => (
        <div key={message.id}>
          <MessageComponent message={message} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
