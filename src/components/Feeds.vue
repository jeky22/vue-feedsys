<template>
  <div class="container">
    <div>
      <button>로그인</button>
    </div>
    <div class="ord">
      <button
        @click="params.ord = 'asc'"
        :class="{ active: params.ord == 'asc' }"
      >
        오름차순
      </button>
      <button
        @click="params.ord = 'desc'"
        :class="{ active: params.ord == 'desc' }"
      >
        내림차순
      </button>
    </div>
    <div class="filter" v-for="filter in filters" v-bind:key="filter">
      <input
        type="checkbox"
        :id="filter.name"
        :value="filter.id"
        v-model="params.category"
      />
      <label :for="filter.name">{{ filter.name }}</label>
    </div>
    <div class="card" v-for="feed in $store.state.feeds" v-bind:key="feed.id">
      <router-link :to="'/' + feed.id">
        <!-- <div>
        {{ feed.id }}
        {{ feed.category_id }}
      </div>
      <div>
        {{ feed.user_id }}
        {{ feed.created_at }}
      </div>
      <div>
        {{ feed.title }}
        {{ feed.contents }}
      </div> -->
        {{ feed.id }}
        {{ feed.contents }}
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Feeds",
    data() {
      return {
        filters: [],
        params: {},
        hasMoreList: true,
      };
    },
    methods: {
      //무한스크롤
      async onScroll() {
        if (
          this.hasMoreList &&
          window.scrollY + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
          console.log("-reach endpoint-");
          this.hasMoreList = await this.$store.dispatch("updateFeeds");
        }
      },
    },
    async mounted() {
      this.filters = await this.$store.dispatch("fetchCategory");
      this.params.category = this.filters.map((c) => c.id);
      window.addEventListener("scroll", this.onScroll);
    },
    unmounted() {
      window.removeEventListener("scroll", this.onScroll);
    },
    watch: {
      params: {
        deep: true,
        async handler() {
          if (this.params.category.length) {
            this.hasMoreList = await this.$store.dispatch(
              "fetchFeeds",
              this.params
            );
          } else {
            this.$store.commit("fetchFeeds", []);
          }
        },
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
  .card {
    background-color: wheat;
    height: 100px;
    border: 1px solid;
  }
</style>
