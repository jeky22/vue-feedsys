<template>
  <div class="container">
    <div>
      <button>로그인</button>
    </div>
    <div v-for="feed in $store.state.feeds" v-bind:key="feed.id">
      <div>
        {{ feed.category_id }}
      </div>
      <div>
        {{ feed.user_id }}
        {{ feed.created_at }}
      </div>
      <div>
        {{ feed.title }}
        {{ feed.contents }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Feeds",
    async mounted() {
      const category = await this.$store.dispatch("fetchCategory");
      const categoryList = category.map((c) => c.id);
      await this.$store.dispatch("fetchFeeds", categoryList);
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    display: grid;
  }
</style>
