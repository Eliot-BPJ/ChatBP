"use client";

const CommandBlock = (command: string, answer: string | string[]) => {
  return (
    <div className="flex items-center">
      <span className="text-green-400 mt-2">
        <span className="text-purple-400">guest</span>@
        <span className="text-green-700">term.chatbp</span>:$ ~
      </span>
      <span className="pl-2 pt-2">{command}</span>
    </div>
  );
};

export default CommandBlock;
