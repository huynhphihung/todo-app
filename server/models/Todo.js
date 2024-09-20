import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  todoName: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {timestamps: true})

const TodoModel = mongoose.model("Todo", TodoSchema)

export default TodoModel
