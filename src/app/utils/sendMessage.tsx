import ChatCompletionRequestMessage from "openai";

export const sendMessage = async (message: string) => {
  try {
    // const response = await fetch(`http://localhost:3001/api/chat`, {
    const response = await fetch(`https://chat-bp-api.vercel.app/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    return await response.json();
  } catch (error) {
    console.log("Send message error: ", error);
  }
};
