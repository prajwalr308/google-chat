export const getData = async (): Promise<any | null> => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://google-chat-tan.vercel.app/api/getMessages"
      : "http://localhost:3000/api/getMessages";
  const response = await fetch(apiUrl,{
    cache: 'no-store'
  });
  if (!response.ok) throw new Error("Error fetching data");
  const data = await response.json();
  return data || null;
};
