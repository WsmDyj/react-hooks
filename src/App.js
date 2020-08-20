/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from "react";
import { createSet, createAdd, createRemove, createToggle } from './actions'
import './App.css';

// action和dispatch合并
function bindActionCreators(actionCreators, dispatch) {
  const ret = {}
  for (let key in actionCreators) {
    ret[key] = function(...args) {
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }
  return ret
}

// 操作组件
function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()
  const onSubmit = () => {
    const newText = inputRef.current.value.trim();
    addTodo(({
      id: Date.now(),
      text: newText,
      complete: false
    }));
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
  const { todos, toggleTodo, removeTodo } = props
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        );
      })}
    </ul>
  )
}

function TodoItem(props) {
  const {
    todo: { id, text, complete },
    removeTodo, toggleTodo
  } = props;
  const onChange = () => {
    toggleTodo(id)
  }
  const onRemove = () => {
    removeTodo(id)
  }
  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? "complete" : ""}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [incrementCount, setIncrementCount] = useState(0);

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
  //       return todo.id === id ? { ...todo, complete: !todo.complete } : todo
  //     })
  //   );
  // }, [])

  function reducer(state, action) {
    const { type, payload } = action
    const { todos, incrementCount } = state
    switch (type) {
      case 'set':
        return {
          ...state, 
          todos: payload, 
          incrementCount: incrementCount + 1
        }
      case 'add':
        return {
          ...state, 
          todos: todos => [...todos, payload], 
          incrementCount: incrementCount + 1
        }
      case 'remove':
        return {
          ...state, 
          todos: todos.filter((todo) => {
            return todo.id !== payload
          })
        }
      case 'toggle':
        return {
          ...state, 
          todos: todos.map((todo) => {
            return todo.id === payload ? { ...todo, complete: !todo.complete } : todo
          })
        }
      default:
    }
    return state
  }

  const dispatch = useCallback((action) => {
    const state = {
      todos,
      incrementCount
    }
    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount
    }
    const newState = reducer(state, action)
    for (let key in newState) {
      setters[key](newState[key])
    }
  }, [todos, incrementCount])

  
  // 项目启动一次
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("_$-todos_"));
    dispatch(createSet(todos))
  },[]);
  

  useEffect(() => {
    localStorage.setItem("_$-todos_", JSON.stringify(todos));
  }, [todos]);


  return (
    <div className="todo-list">
      {incrementCount}
      <Control 
        {
          ...bindActionCreators({
            addTodo: createAdd
          }, dispatch)
        }
      />
      <Todos todos={todos} 
      {
        ...bindActionCreators({
          removeTodo: createRemove,
          toggleTodo: createToggle
        }, dispatch)
      } />
    </div>
  );
}

export default TodoList;