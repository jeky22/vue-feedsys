<template>
  <div class="home">
    <Feeds />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Feeds from "@/components/Feeds.vue";

  export default {
    name: "Home",
    components: {
      Feeds,
    },
  };
</script>
