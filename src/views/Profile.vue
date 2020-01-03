<template>
  <div>
    <div v-if="loading">Loading..</div>
    <div v-if="errMessage">
      <h1>{{ errMessage }}</h1>
    </div>

    <h1>{{ username }} <br /></h1>

    Repositories: <br />
    <RepoItem v-for="repo in repoData" :repoData="repo" :key="repo.id" />
  </div>
</template>
<script>
import RepoItem from "../components/RepoItem";
import client from "../client";

export default {
  components: {
    RepoItem
  },
  data() {
    return {
      errMessage: "",
      loading: true,
      username: this.$route.params.username,
      repoUrl: "",
      profileData: {},
      repoData: {}
    };
  },
  mounted() {
    // Ensure loading component is shown
    this.loading = true;

    // fetch the user data through github
    client
      .repos(this.username)
      .then(response => {
        this.profileData = response.data[0].owner;
        this.repoData = response.data;
      })
      // hide loading component
      .then((this.loading = false))
      .catch(err => {
        console.error(err.response);
        this.errMessage = `Error ${err.response.status} - ${err.response.statusText}`;
      });
  }
};
</script>
