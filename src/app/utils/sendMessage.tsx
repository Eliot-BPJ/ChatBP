import ChatCompletionRequestMessage from "openai";

export const sendQuestion = async (command: string) => {
  const response = await sendToAPI(command);
  const screenWidth = window.innerWidth;
  const charLimit = calculateCharLimit(screenWidth);

  return splitResponseIntoChunks(response, charLimit);
};

const calculateCharLimit = (screenWidth: number) => {
  if (screenWidth < 1600 && screenWidth > 1000) {
    return 105;
  } else if (screenWidth < 1000 && screenWidth > 700) {
    return 70;
  } else if (screenWidth < 700 && screenWidth > 500) {
    return 55;
  } else if (screenWidth < 500) {
    return 35;
  } else {
    return 190;
  }
};

const splitResponseIntoChunks = (response: string, charLimit: number) => {
  const chunks: string[] = [];
  let i = 0;

  while (i < response.length) {
    let substring = response.substring(i, i + charLimit);
    if (i + charLimit < response.length) {
      let spaceIndex = substring.lastIndexOf(" ");
      if (spaceIndex !== -1) {
        chunks.push(substring.substring(0, spaceIndex));
        i += spaceIndex + 1;
      } else {
        chunks.push(substring);
        i += charLimit;
      }
    } else {
      chunks.push(substring);
      break;
    }
  }

  return chunks;
};

const sendToAPI = async (message: string) => {
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
