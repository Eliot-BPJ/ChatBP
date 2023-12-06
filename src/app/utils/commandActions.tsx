type CommandAction = {
  [key: string]: () => string[];
};

export const commandActions: CommandAction = {
  about: () => [
    "CHATBYPASS v0.0.1",
    "The main goal of this project is to give an access to chatGPT even if something, like a proxy, is blocking you",
  ],
  help: () => [
    "Available commands: about, help, whoami",
    "chatGPT: start your line with '> ' and write your question",
  ],
  whoami: () => [
    "- Eliot Boyer, Mélomane avant tout",
    "Développeur / Concépteur d'application",
  ],
};
