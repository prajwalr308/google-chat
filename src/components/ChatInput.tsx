"use client";

import React from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../../typing";
import useSWR from "swr";
import { fetcher } from "@/utils/fetchMessages";
import { useSession } from "next-auth/react";

const ChatInput = () => {
  const { data: session } = useSession();
  const [message, setMessage] = React.useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  console.log("🚀 ~ file: ChatInput.tsx:12 ~ ChatInput ~ data", messages);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !session) return;
    const sentMessage = message;
    setMessage("");
    const id = uuid();
    const messageObj: Message = {
      id,
      message: sentMessage,
      createdAt: Date.now(),
      userName: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    const uploadMessagetoUpstash = async () => {
      const response = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageObj),
      });
      const data = await response.json();
      console.log(
        "🚀 ~ file: ChatInput.tsx:33 ~ uploadMessagetoUpstah ~ data:",
        data
      );
      return [...messages!, data.message];
    };
    await mutate(uploadMessagetoUpstash, {
      optimisticData: [...messages!, messageObj],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t bg-white border-gray-100"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!message}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
