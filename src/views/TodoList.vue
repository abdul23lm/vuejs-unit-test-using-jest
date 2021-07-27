<template>
  <div>
    <h1>My Todo List</h1>

    <div class="mt-3">
      <template v-if="pageStatus == 'success'">
        <div ref="successState" class="row">
          <div class="col-md-3" v-for="(item, index) in todos" :key="index">
            <TodoCard
              ref="todoCard"
              :isDone="item.is_done"
              :todo="item.todo"
              :todoId="item.id"
            />
          </div>
        </div>
      </template>
      <template v-if="pageStatus == 'loading'">
        <div ref="loadingState">loading ..</div>
      </template>
      <template v-if="pageStatus == 'error'">
        <div ref="errorState">Something went wrong, try again later</div>
      </template>
      <template v-if="pageStatus == 'empty'">
        <div ref="emptyState">You have 0 list</div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TodoCard from "@/components/TodoCard.vue";
export default {
  name: "vuejs_unit_test_using_jest",
  components: {
    TodoCard,
  },
  data() {
    return {
      todos: [],
      pageStatus: "loading",
    };
  },
  mounted() {
    this.getAllTodos();
  },
  methods: {
    async getAllTodos() {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        if (response.data.length) {
          this.pageStatus = "success";
        } else {
          this.pageStatus = "empty";
        }
        this.todos = response.data;
      } catch (error) {
        this.pageStatus = "error";
      }
    },
  },
};
</script>
