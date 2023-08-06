const express = require("express");
const router = express.Router();

const Todo = require("../MODELS/Todo");

router.get("/test", async (req, res) => {
  res.json({
    message: "Todo Routes API is working",
  });
});

router.post("/createtodo", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
    });
    const savedTodo = await newTodo.save();
    res.json({savedTodo, message: "Todo created successfully"});
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

router.get("/getalltodos", async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.json(allTodos);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

router.get("/gettodo/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).json({
        message: "Todo not found",
      });
    }
    res.json({
      todo,
      message: "Todo fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

router.put("/updatetodo/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    // Here instead of findbyId we use findByIdAndUpdate
    // so that we can update the todo in one go
    // and also we have to use the new:true option to get the updated todo back
    // and we don't need to give all the fields in the body
    // we can just give the fields we want to update
    // and it will automatically update the todo
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        completed,
      },
      {
        new: true,
      }
    );

    if (!todo) {
      res.status(404).json({
        message: "Todo not found",
      });
    }
    // todo.title = title;
    // todo.description = description;
    // todo.completed = completed;
    // const updatedTodo = await todo.save();
    res.json({
      todo,
      message: "Todo updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

router.delete("/deletetodo/:id", async (req, res) => {
  try {
    // we can use findByIdAndDelete or findById
    // but like above findByIdAndUpdate
    // we don't need to give any extra options
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      res.status(404).json({
        message: "Todo not found",
      });
    }
    // // If we use findByIdAndDelete then we don't need to
    // // use the below 2 line code
    // // Here we are using the delete method of the todo
    // // so that we delet the item from the database
    // // and then saved backed the remaining items 
    // // into the database
    // // // But for any reason below code doesn't work
    // // // that's why we are using findByIdAndDelete
    // const deletedTodo = await todo.delete();
    // await deletedTodo.save();

    res.json({
      message: "Todo deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;
