import React, { useState, useRef, useEffect, useCallback } from "react";
const TodoApp = () => {
  const [todo, setTodo] = useState("");
  const [toggle, setToggle] = useState(true);
  const [option, setOption] = useState("all");
  const [allComplete, setAllComplete] = useState([]);
  const [allUnComplete, setAllUnComplete] = useState([]);
  //adding new todo in localStorage
  const addTodo = (e) => {
    e.preventDefault();
    if (todo) {
      const allTodoList = JSON.parse(localStorage.getItem("todo"));
      localStorage.setItem(
        "todo",
        JSON.stringify([
          ...allTodoList,
          { id: new Date().getTime().toString(), todo, complete: false },
        ])
      );
    }
    setTodo("");
  };
  //modify complete section
  const CutTheTodo = (todoId, index) => {
    const allTodoList = JSON.parse(localStorage.getItem("todo"));
    const newTodo = allTodoList.find((eachTodo) => {
      return eachTodo.id === todoId;
    });
    // if (newTodo.id == id) {
    //   setCompleted(!isCompleted);
    // } else if (newTodo.id !== id) {
    //   setCompleted(!isCompleted);
    //   newTodo.complete = isCompleted;
    // }
    // if(newTodo.complete==)
    newTodo.complete = !newTodo.complete;
    window.location.reload();
    allTodoList.splice(index, 1, newTodo);
    localStorage.setItem("todo", JSON.stringify(allTodoList));
  };
  //removing todo from localStorage
  const removeFromLocalStorage = (index) => {
    const allTodoList = JSON.parse(localStorage.getItem("todo"));
    allTodoList.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(allTodoList));
    window.location.reload();
  };
  //getting all todo from  localStorage
  const getTodoFromLocalStorage = () => {
    const allTodoFromLocalStorage = JSON.parse(localStorage.getItem("todo"));
    if (option === "uncompleted") {
      const uncompleted = allTodoFromLocalStorage.filter((todo) => {
        return todo.complete !== true;
      });
      setAllUnComplete(uncompleted);
    }
    if (option === "completed") {
      const completed = allTodoFromLocalStorage.filter((todo) => {
        return todo.complete === true;
      });
      setAllUnComplete(completed);
    }
  };

  useEffect(() => {
    getTodoFromLocalStorage();
  }, [option]);
  return (
    <>
      <div className="todoApp">
        <h1>Todo App</h1>
        <div className="heading">
          <div className="inputSection">
            <form>
              <input
                type="text"
                name="todo"
                title="todo app"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <button type="submit" onClick={addTodo}>
                <i className="fa-solid fa-circle-plus"></i>
              </button>
            </form>
          </div>
          <div className="selection">
            <div className="optionArea" onClick={() => setToggle(!toggle)}>
              <h3 id="currentOne">{option}</h3>
              <button type="button">
                <i className="fa-solid fa-circle-chevron-down"></i>
              </button>
              {!toggle && (
                <div className="option">
                  <h4 onClick={() => setOption("all")}>all</h4>
                  <h4 onClick={() => setOption("completed")}>completed</h4>
                  <h4 onClick={() => setOption("uncompleted")}>uncompleted</h4>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="todoList">
          {(option === "all"
            ? JSON.parse(localStorage.getItem("todo"))
            : option === "complete"
            ? allComplete
            : allUnComplete
          ).map((eachTodo, index) => {
            const { id, todo, complete } = eachTodo;

            return (
              <div className="eachList" key={id}>
                <p className={complete ? "active" : ""}>{todo}</p>
                <button
                  type="button"
                  className="cutTheTodo"
                  onClick={() => CutTheTodo(id, index)}
                >
                  <i className="fa-solid fa-circle-check"></i>
                </button>
                <button
                  type=" button"
                  onClick={() => removeFromLocalStorage(index)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TodoApp;
