<template>
  <div>
    <h1>GitHub Username:</h1>
    <input @keyup.enter="routeToUser" v-model="username" />
    <button @click="routeToUser">Search</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    routeToUser() {
      this.$router.push({
        name: "profile",
        params: { username: this.username }
      });
    }
  }
};
</script>
