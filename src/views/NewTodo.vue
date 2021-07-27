<template>
  <div>
    <h1>Create New Todo</h1>
    <div class="mt-3 row justify-content-center">
      <div class="col-md-5 border p-5">
        <input
          type="text"
          ref="inputTodo"
          v-model="form.todo"
          class="form-control mb-2"
          placeholder="what you want to do??"
        />
        <input
          type="text"
          ref="inputWhere"
          v-model="form.where"
          class="form-control mb-2"
          placeholder="Where?"
        />
        <input
          type="text"
          ref="inputDetail"
          v-model="form.detail"
          class="form-control mb-2"
          placeholder="Detail task"
        />
        <button
          ref="button"
          @click="onSaveBtnClick"
          :disabled="form.isLoadingBtn"
          class="btn-sm w-100 mt-4 btn btn-primary"
        >
          {{ form.isLoadingBtn ? "loading..." : "Save" }}
        </button>
        <p ref="errorMessage" class="text-danger mt-2" v-if="form.error">
          {{ form.error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewTodo",
  data() {
    return {
      form: {
        todo: "",
        where: "",
        detail: "",
        error: "",
        isLoadingBtn: false,
      },
    };
  },
  methods: {
    async onSaveBtnClick() {
      const { todo, where, detail } = this.form;
      if (!todo || !where || !detail) {
        return (this.form.error = "incomplete form !!");
      }

      this.form.isLoadingBtn = true;

      try {
        const response = await axios.post("http://localhost:3000/todos", {
          todo,
          where,
          detail,
          is_done: false,
        });
        if (response.status === 201) {
          this.$router.push({ name: "vuejs_unit_test_using_jest" });
        } else {
          this.form.error = "failed save todo";
        }
      } catch (error) {
        this.form.error = error.message;
      } finally {
        this.form.isLoadingBtn = false;
      }
    },
  },
};
</script>
