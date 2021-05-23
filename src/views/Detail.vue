<template>
  <div class="container">
    <div v-if="loading" class="question-card ">
      <div class="title">
        {{ question.title }}
      </div>
      <div class="contents">
        {{ question.contents }}
      </div>
      <div class="created">
        {{ question.created_at.split("T")[0] }}
      </div>
    </div>
    <div class="answer">
      <div class="answer-header">
        답변 <span>{{ answer.length }}</span>
      </div>
      <div class="answer-card" v-for="(reply, index) in answer" :key="index">
        <div class="username">{{ reply.user.name }}</div>
        <div class="contents">{{ reply.contents }}</div>
        <div class="created">{{ reply.created_at.split("T")[0] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Feeds",
    data() {
      return {
        question: {},
        answer: [],
        loading: false,
      };
    },
    methods: {},
    async mounted() {
      const { title, created_at, contents, reply } = await this.$store.dispatch(
        "fetchDetail",
        {
          id: this.$route.params.id,
        }
      );
      this.question = { title, created_at, contents };
      this.answer = reply;
      this.loading = true;
    },
  };
</script>
