import readline from "node:readline";
import TaskifyServer from "./terminalServer.js";
import EventEmitter from "node:events";

const client = new EventEmitter();
const server = new TaskifyServer(client);
const cursorPrompt = "taskify> ";
server.on("response", (response) => {
  process.stdout.write("\u001B[2J\u001B[0;0f"); // clear the prompt
  process.stdout.write(response);
  process.stdout.write(`\n${cursorPrompt}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: cursorPrompt,
});

rl.prompt();

rl.on("line", (line) => {
  let [command, ...args] = line.trim().split(" ");
  client.emit("command", command, args);
}).on("close", () => {
  console.log("Have a great day! Bye");
  process.exit(0);
});
