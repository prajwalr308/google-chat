'use client'
import React from "react";
import { Message } from "../../typing";
import Image from "next/image";
import { useSession } from "next-auth/react";
type Props = {
  message: Message;
};
const MessageComponent = ({ message }: Props) => {
  const {data:session}=useSession();
  const isUser = message.email === session?.user?.email;
  console.log(message.email,isUser ,"test")

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2"
          height={10}
          width={50}
          src={message.profilePic}
          alt="profile-pic"
        />
      </div>
      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px]  ${
            isUser ? "text-green-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.userName}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? "bg-green-400 ml-auto order-2" : "bg-red-400 "
            }`}
          >
            <p>{message.message}</p>
          </div>
          <p
            className={`text-[0.65rem] italic px-2 text-gray-300 ${
              isUser && "text-right"
            }}`}
          >
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
