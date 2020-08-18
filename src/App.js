import React, {  useRef, useEffect, useCallback, createContext, useContext, useReducer } from "react";
import './App.css';

const TodoListContext = createContext();
// 操作组件
function Control(props) {
  const inputRef = useRef()
  let { dispatch } = useContext(TodoListContext);
  const onSubmit = () => {
    const newText = inputRef.current.value.trim();
    dispatch({
      type: "add",
      payload: {
        id: Date.now(),
        text: newText,
        complete: false,
      },
    });
    inputRef.current.value = "";
  }
  return (
    <div className="control">
      <h1>todos</h1>
      <input
        type="text"
        ref={inputRef}
        className="new-todo"
        placeholder="what needs to be done?"
      />
      <button className="new-todo__button" onClick={onSubmit}>添加</button>
    </div>
  );
}

// 列表组件
function Todos(props) {
  let { todos } = useContext(TodoListContext);
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        );
      })}
    </ul>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return action.payload;
    case "add":
      return [...state, action.payload];
    case "remove":
       return state.filter((todo) => {
        return todo.id !== action.payload;
      })
    case "toggle":
      return state.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, complete: !todo.complete }
          : todo;
      });
    default: 
      return state
  }
}

function TodoItem(props) {
  let { dispatch } = useContext(TodoListContext);
  const {
    todo: { id, text, complete },
  } = props;
  const onChange = () => {
    dispatch({ type: "toggle", payload: id });
  }
  const onRemove = () => {
    dispatch({ type: "remove", payload: id });
  }
  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? "complete" : ""}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  );
}

function TodoList() {
  const initialState = useCallback(() => {
    const _todos = localStorage.getItem("_$-todos_");
    return _todos ? JSON.parse(_todos) : [];
  }, []);
  const [todos, dispatch] = useReducer(reducer, initialState());
  // const [todos, setTodos] = useState([]);
  // const addTodo = useCallback((todo) => {
  //   setTodos(todos => [...todos, todo])
  // }, [])
  // const removeTodo = useCallback((id) => {
  //   setTodos((todos) =>
  //     todos.filter((todo) => {
  //       return todo.id !== id;
  //     })
  //   );
  // }, [])
  // const toggleTodo = useCallback((id) => {
  //   setTodos((todos) =>
  //     todos.map((todo) => {
  //       return todo.id === id ? {...todo, complete: !todo.complete} : todo
  //     })
  //   );
  // }, [])
  // 项目启动一次
  // useEffect(() => {
  //   if (localStorage.getItem("_$-todos_")) {
  //     const todos = JSON.parse(localStorage.getItem("_$-todos_"));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("_$-todos_", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <TodoListContext.Provider value={{ todos, dispatch }}>
        <Control />
        <Todos />
      </TodoListContext.Provider>
    </div>
  );
}

export default TodoList;
