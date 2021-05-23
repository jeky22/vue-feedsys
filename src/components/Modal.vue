<template>
  <div class="modal">
    <div class="modal-card">
      <div>
        <div class="exit" @click="$emit('close-modal')">X</div>
        <div class="title">필터</div>
        <div class="filter">
          <div
            v-for="filter in filters"
            v-bind:key="filter"
            class="modal-inner"
          >
            <input
              type="checkbox"
              :id="filter.name"
              :value="filter.id"
              v-model="category"
            />
            <label :for="filter.name">{{ filter.name }}</label>
          </div>
        </div>
      </div>
      <div class="flex">
        <button @click="submitFilter()">
          저장하기
        </button>
      </div>
    </div>
    <div class="overlay" @click="$emit('close-modal')"></div>
  </div>
</template>
<script>
  export default {
    props: {
      filters: Array,
      categoryValue: Array,
    },
    data() {
      return {
        category: this.categoryValue,
      };
    },
    methods: {
      submitFilter() {
        this.$emit("params-change", this.category);
        this.$emit("close-modal");
      },
    },
  };
</script>
