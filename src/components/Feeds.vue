<template>
  <div class="container">
    <div>
      <button>로그인</button>
    </div>
    <div class="ord">
      <button @click="ord = 'asc'" :class="{ active: ord == 'asc' }">
        오름차순
      </button>
      <button @click="ord = 'desc'" :class="{ active: ord == 'desc' }">
        내림차순
      </button>
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
    data() {
      return {
        ord: "asc",
        params: {
          category: [],
          ord: "",
        },
      };
    },
    async mounted() {
      const res = await this.$store.dispatch("fetchCategory");
      this.params.category = res.map((c) => c.id);
      this.params.ord = this.ord;
      console.log("2", this.params);
      await this.$store.dispatch("fetchFeeds", this.params);
    },
    watch: {
      ord: async function(val) {
        this.params.ord = val;
        await this.$store.dispatch("fetchFeeds", this.params);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    display: grid;
  }
  .ord {
    border: 0;
    .active {
      background: green;
    }
  }
</style>
