import express from "express";
import fs from "fs";
import { idText } from "typescript";
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
  console.log("hello");
});

class TodoObject {
  id: number;
  text: string;
  completed: boolean;
  constructor(id: number, text: string, completed: boolean) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

const todo1 = new TodoObject(1, "잠자기", true);
const todo2 = new TodoObject(2, "이빨 닦기", false);
const todo3 = new TodoObject(3, "화장", false);

const todoList = [todo1, todo2, todo3];

app.get("/", (req, res) => {
  res.status(200).send(todoList);
});

app.post("/todos", (req, res) => {
  const todo = req.body;
  fs.writeFileSync("./todos.json", JSON.stringify(todo.text));
  const text = fs.readFileSync("./todos.json", "utf8");
  const newTodo = new TodoObject(
    todoList[todoList.length - 1].id + 1,
    text,
    false
  );
  todoList.push(newTodo);
  res.status(201).send("complete");
});

// app.put()
