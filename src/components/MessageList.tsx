"use client";
import { fetcher } from "@/utils/fetchMessages";
import React, { useEffect, useRef } from "react";
import useSWR, { mutate } from "swr";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../../pusher";
import { Message } from "../../typing";
type Props = {
  initialMessages: Message[];
};
const MessageList = ({ initialMessages }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { data: messages, error } = useSWR("/api/getMessages", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  console.log("🚀 ~ file: MessageList.tsx:37 ~ MessageList ~ data", messages);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, initialMessages]);
  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", (message: Message) => {
      if (messages?.find((m) => m.id === message.id)) return;
      if (!messages) {
        mutate("/api/getMessages");
      } else {
        mutate("/api/getMessages");
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [mutate, messages]);
  return (
    <div className="space-y-5 px-5 pt-8 pb-32 ">
      {(messages || initialMessages).map((message) => (
        <div key={message.id}>
          <MessageComponent message={message} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
