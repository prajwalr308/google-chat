import { Message } from "../../typing";


export const uploadMessagetoUpstash = async (messageObj:Message) => {
    const response = await fetch("/api/addMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj),
    });
    const data = await response.json();
    return data;
  };