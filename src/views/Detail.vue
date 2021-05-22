<template>
  <h1>{{ $route.params.id }}</h1>
  <h1>dd</h1>
  <h3>{{ data.contents }}</h3>
</template>

<script>
  export default {
    name: "Feeds",
    data() {
      return {
        data: {},
      };
    },
    methods: {},
    async mounted() {
      this.data = await this.$store.dispatch("fetchDetail", {
        id: this.$route.params.id,
      });
      console.log(this.data);
    },
    unmounted() {},
    watch: {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
