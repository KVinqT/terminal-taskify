import readline from "node:readline";
import { EventEmitter } from "node:stream";

const client = new EventEmitter();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "taskify> ",
});

rl.prompt();

rl.on("line", (line) => {
  let [command, ...args] = line.trim().split(" ");
  client.emit("command", command, args); //emitting the command altogether with their arguments
}).on("close", () => {
  console.log("Have a great day! Bye");
  process.exit(0);
});
