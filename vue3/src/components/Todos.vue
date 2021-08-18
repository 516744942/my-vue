<template>
  <div>
    <!-- 新增 -->
    <input
      type="text"
      v-model="newTodo"
      @keyup.enter="addTodo"
      autofocus
      placeholder="新增今日待办"
      autocomplete="on"
    />
    <ul>
      <li
        :class="{ completed: todo.completed }"
        v-for="(todo, index) in todos"
        :key="todo.id"
      >
        <div>
          <input type="checkbox" v-model="todo.completed" />
          <!-- @change="todoCompleted($event,index)" -->

          <label for="">{{ todo.id }}</label>
          <button @click="removeTodo($event, index)">X</button>
        </div>

        <!-- 编辑待办 -->
        <input
          type="text"
          class="edit"
          v-model="todo.title"
          @blur="doneEdit(doto)"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(doto)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      newTodo: "",
      todos: [],
    });
    function addTodo() {
      state.todos.push({
        id: new Date().getTime() + state.todos.length + 1,
        title: state.newTodo,
        completed: false,
      });
    }
    function removeTodo(index) {
      state.todos.splice(index, 1);
    }
    function cancelEdit(index) {
      state.todos.splice(index, 1);
    }
    function doneEdit(index) {
      state.todos.splice(index, 1);
    }
    function todoCompleted(e, index) {
      // state.todos[index].completed = e.target.checked;
    }

    return {
      ...toRefs(state),
      addTodo,
      removeTodo,
      todoCompleted,
      doneEdit,
      cancelEdit
    };
  },
};
</script>

<style  scoped>
.completed label {
  text-decoration: line-through;
}
</style>