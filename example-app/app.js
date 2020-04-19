const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const app = express(feathers());

class MessageService {
  constructor() {
    this.messages = [];
  }

  async find() {
    return this.messages;
  }

  async create(data) {
    const message = {
      id: "xxxx-xxxx-xxxx-xxxx".replace(/x/g, () =>
        Math.floor(Math.random() * 16).toString("16")
      ),
      text: data.text,
      createdAt: data.createdAt,
    };

    this.messages.push(message);
    return message;
  }

  async get(id) {
    return this.messages.find((message) => message.id === id);
  }

  async patch(id, data) {
    const message = await this.get(id);
    if (!message) return null;
    const newMessage = { ...message, ...data };

    this.messages = this.messages.map((m) => (m.id === id ? newMessage : m));

    return newMessage;
  }

  async remove(id) {
    const message = await this.get(id);
    if (!message) return null;

    this.messages.splice(this.messages.indexOf(message), 1);

    return message;
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  console.log(req.method, req.url, req.body);
  next();
});

app.configure(express.rest());

app.use("messages", new MessageService());
app.service("messages").hooks({
  before: {
    create: [
      (context) => {
        context.data.createdAt = new Date().toISOString();
      },
    ],
  },
});

app.use(express.errorHandler());

app.listen(3030, () => {
  console.log("server listening on port 3030");
});

app
  .service("messages")
  .create({
    text: "hello",
  })
  .then(() => {
    app.service("messages").find().then(console.log);
  });
