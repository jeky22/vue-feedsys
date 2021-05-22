<template>
  <div v-for="(feed, index) in $store.state.feeds" v-bind:key="feed.id">
    <router-link :to="'/' + feed.id">
      <div class="card">
        <div class="inline space-between">
          <div class="category">
            {{ filterMap.get(feed.category_id) }}
          </div>
          <div class="id">
            {{ feed.id }}
          </div>
        </div>
        <div class="inline flex-start">
          <div class="user_id">
            {{ feed.user_id }}
          </div>
          <div class="created_at">
            {{ feed.created_at.split("T")[0] }}
          </div>
        </div>
        <div class="inline-text">
          <span class="title">
            {{ feed.title }}
          </span>
          <span class="contents">
            {{ feed.contents }}
          </span>
        </div>
      </div>
    </router-link>
    <div class="card" v-if="(index + 1) % 3 === 0 && adsIndex(index)">
      <div class="sponsered">
        sponsered
      </div>
      <div class="ads-inline">
        <img
          :src="'https://cdn.comento.kr/assignment/' + adsIndex(index).img"
        />
        <div class="ads-between">
          <div class="ads-title">{{ adsIndex(index).title }}</div>
          <div class="ads-contents">{{ adsIndex(index).contents }}</div>
        </div>
      </div>
      <!-- {{ adsIndex(index).id }} -->
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      filterName: Array,
    },
    methods: {
      adsIndex(index) {
        return this.$store.state.ads[(index - 2) / 3];
      },
    },
    computed: {
      filterMap() {
        let self = new Map();
        for (let { id, name } of this.filterName) {
          self.set(id, name);
        }
        return self;
      },
    },
  };
</script>
