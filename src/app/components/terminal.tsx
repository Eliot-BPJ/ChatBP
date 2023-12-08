"use client";
import { useEffect, useRef, useState } from "react";
import { commandActions } from "../utils/commandActions";
import { sendQuestion } from "../utils/sendMessage";
import CommandBlock from "./commandBlock";

type CliList = {
  cmd: string;
  answer: string[];
}[];

const Terminal = () => {
  const [cmd, setCmd] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [cliList, setCliList] = useState<CliList>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const cmdRef = useRef("");

  useEffect(() => {
    cmdRef.current = cmd;
  }, [cmd]);

  useEffect(() => {
    const input = document.getElementById("commandInput");

    if (!input) return;
    document.addEventListener("click", function (event) {
      if (!input.contains(event.target as Node)) {
        input.focus();
      }
    });

    const handleKeyPress = async (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          const trimmedCmd = cmdRef.current.trim();
          if (trimmedCmd.length <= 0) return;
          const action = commandActions[trimmedCmd];
          let defaultMsg = ["Command not found"];

          setHistoryIndex(cliList.length + 1);
          if (trimmedCmd.startsWith("< ")) {
            setLoading(true);
            defaultMsg = await sendQuestion(trimmedCmd.substring(2));
            setLoading(false);
          }
          if (action) {
            setCliList((prevCliList) => [
              ...prevCliList,
              { cmd: trimmedCmd, answer: action() },
            ]);
          } else {
            setCliList((prevCliList) => [
              ...prevCliList,
              { cmd: trimmedCmd, answer: defaultMsg },
            ]);
          }
          setCmd("");
          break;
        default:
          break;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (historyIndex >= 0) {
            const newIndex = Math.max(historyIndex - 1, -1);
            if (newIndex === -1) {
              setCmd(""); // Reset to live input if reaching the top of history
            } else {
              setCmd(cliList[newIndex]?.cmd || "");
            }
            setHistoryIndex(newIndex);
          }
          break;
        case "ArrowDown":
          if (historyIndex < cliList.length - 1) {
            const newIndex = Math.min(historyIndex + 1, cliList.length - 1);
            setCmd(cliList[newIndex]?.cmd || "");
            setHistoryIndex(newIndex);
          } else {
            setCmd(""); // Clear the live input when at the end of history
            setHistoryIndex(cliList.length - 1); // Ensure historyIndex doesn't exceed the array length
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [cliList, historyIndex]);

  const showCliCommandList = () => {
    if (!cliList) return;

    return cliList.map((elem, i) => (
      <div key={i}>
        {/* <CommandBlock command={elem.cmd} answer={elem.answer }></CommandBlock> */}
        <div className="flex items-center">
          <span className="text-blue-400 mt-2">
            <span className="text-red-400">guest</span>@
            <span className="text-blue-500">term.chatbp</span>:$&gt;
          </span>
          <span className="pl-2 pt-2">{elem.cmd}</span>
        </div>
        {Array.isArray(elem.answer) ? (
          elem.answer.map((line, index) => (
            <p key={index} className="typing-animation">
              {line}
            </p>
          ))
        ) : (
          <p className="typing-animation">{elem.answer}</p>
        )}
      </div>
    ));
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center mx-2">
      <div className="w-full h-full border border-red-400 rounded-md my-2 shadow-lg">
        <div
          id="term-block"
          className="py-4 px-6 flex-1 overflow-auto"
          style={{ maxHeight: "calc(100vh - 1rem)" }} // Limit max height for scroll
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center">
              <span className="text-blue-400">
                <span className="text-red-400">guest</span>@
                <span className="text-blue-500">term.chatbp</span>:$&gt;
              </span>
              <span className="pl-2">banner</span>
            </div>
            <p className="mt-2 mb-2 text-2xl font-bold text-blue-400 ml-10">
              CHATBYPASS <span className="text-xs">v 0.1</span>
            </p>
            <span>Type &apos;help&apos; for available commands</span>
            <p>
              <span> - </span>
              <br />
              ChatBP allows you to ask something to Sam Altman&apos;s child even
              if some proxies are trying to block our beloved assistant
              <br />
              <span> - </span>
            </p>
            {showCliCommandList()}
            <div className="flex items-center pt-2 items-baseline">
              <span className="text-blue-400 w-fit">
                <span className="text-red-400">guest</span>@
                <span className="text-blue-500">term.chatbp</span>
                :$&gt;
              </span>
              <form action="sub"></form>
              <input
                value={cmd}
                onChange={(e) => setCmd(e.target.value)}
                type="text"
                className="bg-transparent border-none focus:outline-none w-full pl-2"
                id="commandInput"
                autoComplete="off"
                autoFocus
              />
            </div>
            {loading && (
              <span>
                <span className="bouncing-points">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
