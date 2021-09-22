import { ref } from "vue"
let todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem("vue3-todos")) || [];
    todos.forEach((todo, index) => {
      todo.id = index + 1;
    });
    return todos;
  },
  save(todos) {
    localStorage.setItem("vue3-todos", JSON.stringify(todos));
  },
};

export function useTodos(state) {
  const todos = ref(todoStorage, fetch())
  function addTodo() {
    console.log(i++);
    state.todos.push({
      id: new Date().getTime() + state.todos.length + 1,
      title: state.newTodo,
      completed: false,
    });
    state.newTodo = ""
  }
  function removeTodo(index) {
    state.todos.splice(index, 1);
  }
  watchEffect(() => {
    todoStorage.save(state.todos); //副作用
  });
  return {
    todos,
    addTodo,
    removeTodo
  }
}