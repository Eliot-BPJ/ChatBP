"use client";
import { useEffect, useRef, useState } from "react";
import { commandActions } from "../utils/commandActions";
import { sendQuestion } from "../utils/sendMessage";
import CommandBlock from "./commandBlock";

type CliList = {
  cmd: string;
  answer: JSX.Element;
}[];

const Terminal = () => {
  const [cmd, setCmd] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [cliList, setCliList] = useState<CliList>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const cmdRef = useRef("");
  const [windowSize, setWindowSize] = useState({x : 0, y : 0});

  useEffect(() => {
    cmdRef.current = cmd;
  }, [cmd]);

  useEffect(() => { // events listeners
    const input = document.getElementById("commandInput");
    setWindowSize({x : window.innerWidth, y : window.innerHeight})
    if (!input) return;
    document.addEventListener("click", function (event) {
      const clickedElement = event.target as Node;
      const isInput = clickedElement instanceof HTMLInputElement;
      if (!isInput) {
        input.focus();
      }
    });

    const handleKeyPress = async (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          const trimmedCmd = cmdRef.current.trim();
          if (trimmedCmd.length <= 0) return;
          const action = commandActions[trimmedCmd];
          let defaultMsg = <p>Command not found</p>;

          setHistoryIndex(cliList.length + 1);
          if (trimmedCmd.startsWith("< ")) {
            setLoading(true);
            defaultMsg = await sendQuestion(trimmedCmd.substring(2), false);
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
          <div className="pt-2">
          <div className="bg-gray-800 rounded ml-2" style={{ width: (elem.cmd.length <= 0 ? 2 : elem.cmd.length+2) + "ch" }}>
            <span className="pl-2">{elem.cmd}</span>
          </div>
          </div>
        </div>
        <div className="deploy-animation">{elem.answer}</div>
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
              <div className="bg-gray-800 rounded ml-2" style={{ width: "15" }}>
                <span className="px-2">banner</span>
              </div>
            </div>
            <p className="mt-2 mb-2 text-2xl font-bold text-blue-400 ml-10">
              CHATBYPASS <span className="text-xs">v 0.1</span>
            </p>
            <p>
              Welcome to ChatBP
              <br />
            </p>
            <a
              href="https://github.com/Eliot-BPJ/ChatBP"
              target="_blank"
              className="social-link text-blue-400 mt-2 mb-2 w-fit"
            >
              <i className="fab fa-github text-xl"></i> ChatBP GitHub page
            </a>
            <span>Type &apos;help&apos; for available commands</span>
            {showCliCommandList()}
            <div className="flex items-center pt-2 items-baseline">
              <span style={{ whiteSpace: "nowrap" }} className="text-blue-400 w-fit">
                <span className="text-red-400">guest</span>@
                <span className="text-blue-500">term.chatbp</span>:$&gt;
              </span>
              <div className="bg-gray-800 rounded ml-2" style={{ width: (cmd.length <= 0 ? 2 : cmd.length+2) + "ch" }}>
                <input
                  value={cmd}
                  onChange={(e) => setCmd(e.target.value)}
                  type="text"
                  className="bg-transparent focus:outline-none w-full ml-2"
                  id="commandInput"
                  autoComplete="off"
                  autoFocus
                />
              </div>
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
