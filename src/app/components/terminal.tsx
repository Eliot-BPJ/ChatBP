"use client";
import { useEffect, useRef, useState } from "react";
import { commandActions } from "../utils/commandActions";
import { sendMessage } from "../utils/sendMessage";
import ChatCompletionRequestMessage from "openai";
import CommandBlock from "./commandBlock";

type CliList = {
  cmd: string;
  answer: string[];
}[];

const Terminal = () => {
  const [cmd, setCmd] = useState<string>("");
  const [cliList, setCliList] = useState<CliList>([]);
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
      if (event.key === "Enter") {
        const trimmedCmd = cmdRef.current.trim();
        const action = commandActions[trimmedCmd];
        let defaultMsg = ["Command not found"];

        if (trimmedCmd.startsWith("> ")) {
          defaultMsg[0] = await sendMessage(trimmedCmd.substring(2));
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
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const showCliCommandList = () => {
    if (!cliList) return;

    return cliList.map((elem, i) => (
      <div key={i}>
        {/* <CommandBlock command={elem.cmd} answer={elem.answer }></CommandBlock> */}
        <div className="flex items-center">
          <span className="text-green-400 mt-2">
            <span className="text-purple-400">guest</span>@
            <span className="text-green-700">term.chatbp</span>:$ ~
          </span>
          <span className="pl-2 pt-2">{elem.cmd}</span>
        </div>
        {Array.isArray(elem.answer) ? (
          elem.answer.map((line, index) => <p key={index}>{line}</p>)
        ) : (
          <p>{elem.answer}</p>
        )}
      </div>
    ));
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center mx-2">
      <div className="w-full h-full border border-purple-400 rounded-md my-2 shadow-lg">
        <div className="py-4 px-6 flex-1">
          <div className="flex items-center">
            <span className="text-green-400">
              <span className="text-purple-400">guest</span>@
              <span className="text-green-700">term.chatbp</span>:$ ~
            </span>
            <span className="pl-2">!banner</span>
          </div>
          <p className="mt-2 mb-2 text-2xl font-bold text-green-400 ml-10">
            CHATBYPASS <span className="text-xs">v0.0.1</span>
          </p>
          <span>Type &apos;!help&apos; for available commands</span>
          <p>
            <span> ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ </span>
            <br />
            This website allow you to ask something to chatGPT even if some
            proxy are trying to block our beloved assistant
            <br />
            <span> ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ </span>
          </p>
          {showCliCommandList()}
          <div className="flex items-center pt-2">
            <span className="text-green-400" style={{ width: "13rem" }}>
              <span className="text-purple-400">guest</span>@
              <span className="text-green-700">term.chatbp</span>
              :$ ~
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
        </div>
      </div>
    </div>
  );
};

export default Terminal;
