import ChatCompletionRequestMessage from "openai";

export const sendQuestion = async (command: string, chat4: boolean) => {
  const response = await sendToAPI(command, chat4);
  const charLimit = calculateCharByLineLimit();

  return splitResponseIntoChunks(response, charLimit);
};

const calculateCharByLineLimit = () => {
  const screenWidth = window.innerWidth;
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
  const chunks: JSX.Element[] = [];
  let i = 0;

  while (i < response.length) {
    let substring = response.substring(i, i + charLimit);
    if (i + charLimit < response.length) {
      let spaceIndex = substring.lastIndexOf(" ");
      if (spaceIndex !== -1) {
        chunks.push(<p key={i}>{substring.substring(0, spaceIndex)}</p>);
        i += spaceIndex + 1;
      } else {
        chunks.push(<p key={i}>{substring}</p>);
        i += charLimit;
      }
    } else {
      chunks.push(<p key={i}>{substring}</p>);
      break;
    }
  }

  return <div className="card-chat">{chunks}</div>;
};

const sendToAPI = async (message: string, chat4: boolean) => {
  // const url = chat4
  //   ? "https://chat-bp-api.vercel.app/api/chat4"
  //   : "https://chat-bp-api.vercel.app/api/chat";
  const url = chat4
    ? "http://localhost:3001/api/chat4"
    : "http://localhost:3001/api/chat";
  try {
    const response = await fetch(url, {
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
