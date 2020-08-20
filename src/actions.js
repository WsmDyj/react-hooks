export function createSet(payload) {
  return {
    type: 'set',
    payload
  }
}
export function createAdd(text) {
  return (dispatch, getState) => {
    setTimeout(() => {
      const { todos } = getState()
      if (!todos.find(todo => todo.text === text)) {
        dispatch({
          type: 'add',
          payload: {
            id: Date.now(),
            text: text,
            complete: false
          }
        })
      } else {
        alert('todo重复添加')
      }
    }, (1000))
  }
}
export function createRemove(payload) {
  return {
    type: 'remove',
    payload
  }
}
export function createToggle(payload) {
  return {
    type: 'toggle',
    payload
  }
}