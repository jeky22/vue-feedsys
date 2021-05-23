<template>
  <section class="login-section">
    <div class="login">
      <button>로그인</button>
    </div>
  </section>
  <section class="main-section">
    <div class="options">
      <div class="order">
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
      <button class="filter-button" @click="modalToggle = !modalToggle">
        필터
      </button>
      <Modal
        v-if="modalToggle"
        :filters="filters"
        :categoryValue="params.category"
        @close-modal="modalToggle = false"
        @params-change="(val) => setParams(val)"
      />
    </div>
    <div class="container">
      <Cards :filterName="filters" />
    </div>
  </section>
</template>

<script>
  import Modal from "./Modal";
  import Cards from "./Cards";

  export default {
    name: "Feeds",
    components: {
      Modal,
      Cards,
    },
    data() {
      return {
        filters: [],
        params: { ord: "asc", category: [] },
        hasMoreList: true,
        modalToggle: false,
      };
    },
    methods: {
      setParams(val) {
        this.params.category = val;
      },
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
