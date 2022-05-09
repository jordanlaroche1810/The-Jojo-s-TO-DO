const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const app = express();

const port = 4000;

const prisma = new PrismaClient();

/* AJOUTER UNE TODO ✅ */
async function addTodo(task) {
  const todo = await prisma.todo.create({
    data: {
      nom: task.nom,
      statut: task.statut,
      description: task.description,
      dueDate: task.dueDate,
    },
  });
  return todo;
}

/* AFFICHER LES TODO ✅ */
async function getTodos() {
  const todos = await prisma.todo.findMany();
  return todos;
}

/* AFFICHER UNE SEULE TODO ✅ */
async function getTodo(id) {
  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });
  return todo;
}

/* AFFICHER TOUTES LES TODOS TERMINÉES */
async function getDone() {
  await prisma.todo.findMany({
    select: {
      statut: "Fini!",
    },
  });
}

/* METTRE À JOUR UNE TODO */
async function upTodo(id, todo) {
  return await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      nom: todo.nom,
      description: todo.description,
      statut: todo.statut,
      dueDate: todo.dueDate,
    },
  });
}

/* RETIRER UNE TODO */
async function deleteTodo(id) {
  const todo = await prisma.todo.delete({
    where: {
      id: id,
    },
  });
}

/* RETIRER LES TODOS TERMINÉES */
async function deleteDoneTodo() {
  await prisma.todo.delete({
    select: {
      statut: "Fini!",
    },
  });
}

/* 
main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) */

app.use(cors());
app.use(express.json());

app.get("/api/todos", async (req, res) => {
  const todos = await getTodos()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.status(200).json(todos);
});

app.post("/api/todos", async (req, res) => {
  const todo = await addTodo(req.body)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.status(200).json(todo);
});

app.get("/api/todos/:id", async (req, res) => {
  const todo = await getTodo(parseInt(req.params.id))
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.status(200).json(todo);
});

app.delete("/api/todos/:id", async (req, res) => {
  await deleteTodo(parseInt(req.params.id))
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.status(204).send("ok");
});

app.put("/api/todos/:id", async (req, res) => {
  const todo = await upTodo(parseInt(req.params.id), req.body)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.status(200).json(todo);
});

app.get("*", (req, res) => {
  res.status(404).json({
    error: "La route existe pas, désolé 😅 ",
  });
});
app.listen(port, () => {
  console.log(`L'appli guette dans le quartier : http://localhost:${port}`);
});
