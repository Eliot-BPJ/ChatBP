import { FormEvent, useState } from "react";

type CommandAction = {
  [key: string]: () => JSX.Element;
};

function SudoCommand() {
  const [value, setValue] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="card-input flex-auto justify-center">
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="sudo password"
          type="password"
          className="p-1"
        ></input>
      </form>
    </div>
  );
}

export const commandActions: CommandAction = {
  about: () => (
    <div className="card-help">
      <h3 key="about-1">CHATBYPASS v0.1</h3>
      <p key="about-2">
        The main goal of this project is to give an access to chatGPT even if
        something, like a proxy, is blocking you
      </p>
    </div>
  ),
  help: () => (
    <div className="card-help">
      <h3>How to Use:</h3>
      <p>To interact with the terminal, type a command and press Enter</p>
      <div className="code-block">
        <span>&gt; about</span>
        <code className="block">Displays information about the project</code>
      </div>
      <div className="code-block">
        <span>&gt; help</span>
        <code className="block">Lists all available commands </code>
      </div>
      <div className="code-block">
        <span>&gt; whoami</span>
        <code className="block">Provides information about the creator </code>
      </div>
      <p>
        To interact with Sam Altman&apos;s product, start your command with a
        &apos;&lt;&apos;, followed by a space. For example:
      </p>
      <code className="code-block">&lt; What is your question ?</code>
    </div>
  ),
  whoami: () => (
    <div className="card-help">
      <h3 key="whoami-1">Eliot Boyer</h3>
      <p key="whoami-2">Développeur / Concépteur d&apos;application</p>
      <a
        href="https://linkedin.com/in/eliot-boyer"
        target="_blank"
        className="social-link"
      >
        <i className="fab fa-linkedin"></i> LinkedIn<br></br>
      </a>
      <a
        href="https://github.com/Eliot-BPJ"
        target="_blank"
        className="social-link"
      >
        <i className="fab fa-github"></i> GitHub
      </a>
    </div>
  ),
  sudo: () => {
    return <SudoCommand />;
  },
};
