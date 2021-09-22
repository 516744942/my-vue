<template>
  <li :class="{ completed: todo.completed, editing: todo === editedTodo }">
    <div class="view">
      <input type="checkbox" v-model="todo.completed" />
      <!-- @change="todoCompleted($event,index)" -->
      <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
      <button @click="removeTodo($event, index)">X</button>
    </div>

    <!-- 编辑待办 -->
    <EditTodo
      type="text"
      class="edit"
      v-todo-focus="todo === editedTodo"
      v-model:todo-title="todo.title"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.escape="cancelEdit(todo)"
    ></EditTodo>
  </li>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    todo: {
      type: Object,
      required: true,
      default: () => {},
    },
    editTedTodo: Object,
  },
  emits: ["remove-todo", "update:edited-todo"],
  setup(props, { emit }) {
    const state = reactive({
      beforeEditCache: "",
      editedTodo:null,
    });
    console.log('todotodo',props.todo)

    function removeTodo() {
      emit("remove-todo", props.index);
    }

    function editTodo(todo) {
      state.editedTodo = todo;
      state.beforeEditCache = todo.title;
      emit("update:edited-todo", todo);
      // state.todos.splice(index, 1);
    }
    function cancelEdit(todo) {
      // console.log("cancelEdit", todo.title);
      todo.title = state.beforeEditCache;
      state.editedTodo = null;
      emit("update:edited-todo", null);
    }
    function doneEdit(todo) {
      emit("update:edited-todo", todo);
      state.editedTodo = null;
    }

    return {
      ...toRefs(state),
      removeTodo,
      editTodo,
      cancelEdit,
      doneEdit,
    };
  },
  directives: {
    "todo-focus": (el, { value, ...others }) => {
      if (value) {
        el.focus();
      }
    },
  },
};
</script>

<style  scoped>
.completed label {
  text-decoration: line-through;
}
.edit,
.editing .view {
  display: none;
}
.view,
.editing .edit {
  display: block;
}
</style>