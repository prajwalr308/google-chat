export const getData = async(): Promise<any | null> => {
  const response = await fetch(
    "https://google-chat-tan.vercel.app" || "http://localhost:3000" + "/api/getMessages"
  );
  if (!response.ok) throw new Error("Error fetching data");
  const data = await response.json();
  return data || null;
};
