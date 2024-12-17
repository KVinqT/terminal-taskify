import EventEmitter from "node:events";

class TaskifyServer extends EventEmitter {
  taskLists = {};
  taskCount = 1;
  constructor(client) {
    super();
    process.nextTick(() => {
      this.emit(
        "response",
        'Type a command (Type "help" to list the available commands)'
      );
    });
    client.on("command", (command, args) => {
      switch (command) {
        case "add":
        case "delete":
        case "list":
        case "help":
          this[command](args);
          break;
        default:
          this.emit("response", "Unknown command");
      }
    });
  }

  add(args) {
    // if my terminal input command is add wash my face at 7 am --> my args will be  --> ['wash', 'my', 'face', 'at', '7', 'am']
    const actualTask = args.join(" ");
    this.taskLists[this.taskCount] = actualTask; // { 1: 'actualTask 1', 2: 'actualTask 2', 3: 'actualTask 3}
    this.emit("response", `Task ${this.taskCount} added successfully`);
    this.taskCount++;
  }
  delete(toDeleteTaskId) {
    //filter tasks from the taskLists
    const newTaskLists = Object.fromEntries(
      Object.entries(this.taskLists).filter((task) => task[0] != toDeleteTaskId)
    );
    this.taskLists = newTaskLists;
    this.emit("response", `Successfully deleted task ${toDeleteTaskId}`);
    //deleted message
  }
  list() {
    //below task --> [['1', 'actualTask 1'],['2', 'actualTask 2']]
    const response = `
  ${Object.entries(this.taskLists)
    .map(([key, value]) => {
      return `${key} -->  ${value}`;
    })
    .join("\n")}
    `;
    this.emit("response", response);
  }
  help() {}
}
export default TaskifyServer;
