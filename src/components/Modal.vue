<template>
  <div class="modal">
    <div class="modal-card">
      <div>
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
        console.log("aa", this.category);
        this.$emit("params-change", this.category);
        this.$emit("close-modal");
      },
    },
  };
</script>
<style lang="scss">
  /* Modal */
  .modal,
  .overlay {
    position: fixed;
    display: flex;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: center;
  }
  .overlay {
    opacity: 0.7;
    background-color: black;
  }
  .modal-card {
    width: 460px;
    height: 270px;
    background: white;
    z-index: 999;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      text-align: left;
      font: normal normal bold 22px/32px SpoqaHanSans;
      letter-spacing: 0px;
      color: #212529;
      opacity: 1;
    }
    .filter {
      font: normal normal normal 16px/32px SpoqaHanSans;
      color: #495057;
      .modal-inner {
        display: flex;
        align-items: center;
      }
    }
    button {
      width: 99px;
      height: 40px;
      background: #00c854 0% 0% no-repeat padding-box;
      border-radius: 3px;
      border: 0;
      font: normal normal normal 16px/32px SpoqaHanSans;
      color: #ffffff;
    }
    .flex {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
