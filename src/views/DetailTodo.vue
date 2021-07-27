<template>
  <div>
    <h1>Detail Todo</h1>
    <div>
      <template v-if="pageStatus === 'success'">
        <div class="row mt-3 justify-content-center">
          <div class="col-md-3 border p-3">
            <div class="text-center font-weight-bold">{{ todoData.todo }}</div>
            <div>at {{ todoData.where }}</div>
            <div style="font-size: 12px; color: grey" class="mt-2">
              {{ todoData.detail }}
            </div>
            <div
              style="font-size: 12px"
              class="mt-4 text-success"
              v-if="todoData.is_done"
            >
              you've done this activity
            </div>
            <button
              class="btn-sm w-100 mt-4 btn btn-primary"
              v-if="!todoData.is_done"
              @click="onDoneClick"
            >
              done
            </button>
          </div>
        </div>
      </template>
      <template v-if="pageStatus === 'loading'">
        <div class="text-center">loading...</div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DetailTodo",
  data() {
    return {
      todoData: {},
      pageStatus: "loading",
    };
  },
  mounted() {
    this.getDetailTodo();
  },
  methods: {
    async getDetailTodo() {
      const { id } = this.$route.params;
      const response = await axios.get(`http://localhost:3000/todos/${id}`);
      this.todoData = response.data;
      this.pageStatus = "success";
    },

    async onDoneClick() {
      const { id } = this.$route.params;
      const response = await axios.patch(`http://localhost:3000/todos/${id}`, {
        is_done: true,
      });
      if (response.status === 200) {
        this.$router.push({ name: "vuejs_unit_test_using_jest" });
      }
    },
  },
};
</script>
