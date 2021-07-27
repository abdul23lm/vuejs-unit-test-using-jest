<template>
  <div class="border px-2 py-3">
    <div class="font-weight-bold" v-if="!isDone">{{todo}}</div>
    <div class="font-weight-bold" v-if="isDone"><del ref="delRef"> {{todo}} </del> </div>
    <router-link ref="linkRef" :to="`/detail/${todoId}`">
      <button class="btn btn-primary px-2 py-0 mt-2" style="font-size:14px">
        detail
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TodoCard',
  props: {
    todo: String,
    todoId: Number,
    isDone: Boolean
  }
}
</script>