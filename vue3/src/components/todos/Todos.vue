<template>
  <div>
    <!-- 新增 -->
    <EditTodo
      type="text"
      v-model:todo-title="newTodo"
      @enterValue="addTodo"
      autofocus
      placeholder="新增今日待办"
      autocomplete="on"
    ></EditTodo>
    <!-- todo列表 -->
    <ul>
      <TodoItem
        v-for="(todo, index) in filterTodos"
        :index="index"
        :todo="todo"
        :key="todo.id"
        v-model:edited-todo="editedTodo"
        @remove-todo="removeTodo"
        @edited-todo="editedTodo"
      >
      </TodoItem>
    </ul>

    <!-- 过滤 -->
    <Filter :items="filterItmes" v-model="visibility" />
  </div>
</template>

<script>
import { reactive, toRefs, computed, watchEffect } from "vue";
import TodoItem from "./TodoItem.vue";
import Filter from "./Filter.vue";
import { useTodos } from "./useTodos";
const filter = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter((todo) => !todo.completed);
  },
  completed(todos) {
    return todos.filter((todo) => todo.completed);
  },
};
// 缓存操作

// import EditTodo from "./EditTodo.vue";
export default {
  components: {
    // EditTodo,
    TodoItem,
    Filter,
  },
  setup() {
    const todoState = reactive({
      newTodo: "",
      editedTodo: null,
    });
    const { todos, addTodo, removeTodo } = useTodos(todoState);
    const state = reactive({
      newTodo: "",
      todos: todoStorage.fetch(),
      // editedTodo: null, //正在编辑的todo
      visibility: "all",
      filterTodos: computed(() => {
        return filter[state.visibility](state.todos);
      }),
      filterItmes: [
        { label: "All", value: "all" },
        { label: "Active", value: "active" },
        { label: "Completed", value: "completed" },
      ],
    });
    let i = 0;
    // function addTodo() {
    //   console.log(i++);
    //   state.todos.push({
    //     id: new Date().getTime() + state.todos.length + 1,
    //     title: state.newTodo,
    //     completed: false,
    //   });
    //   console.log(state.todos);
    // }
    // function removeTodo(index) {
    //   state.todos.splice(index, 1);
    // }
    function editedTodo(todo) {}
    function doneEdit(todo) {
      state.editedTodo = null;
    }

    function todoCompleted(e, index) {
      // state.todos[index].completed = e.target.checked;
    }
    watchEffect(() => {
      todoStorage.save(state.todos); //副作用
    });

    return {
      ...toRefs(state),
      addTodo,
      todoCompleted,
      doneEdit,
      editedTodo,
      removeTodo,
      // cancelEdit,
      // editTodo,
    };
  },
};
</script>

<style  scoped>
</style>