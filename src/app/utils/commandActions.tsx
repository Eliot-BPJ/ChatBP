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
    "Sam Altman's child: start your line with '< ' and write your question (dont't forget the space after the angle bracket)",
  ],
  whoami: () => [
    "- Eliot Boyer, Mélomane avant tout",
    "Développeur / Concépteur d'application",
  ],
};
