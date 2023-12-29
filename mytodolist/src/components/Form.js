import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) => 
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if(editTodo) {
        setInput(editTodo.title);
    } else {
        setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if(!editTodo){
        setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
    setInput("");
    } else {
        updateTodo(input, editTodo.id, editTodo.completed)
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter the task that you need to do..."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="new-task-button" type="submit">
        {editTodo ? "Save Changes" : "Add Task"}
      </button>
    </form>
  );
};

export default Form;
