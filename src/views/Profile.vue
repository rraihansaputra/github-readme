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
    var url = "https://api.github.com";
    fetch(url + "/users/" + this.username)
      .then(res => {
        // Handle errors
        if (res.status == 401) {
          this.errMessage = "GitHub API Rate Limit Exceeded (60 per hour)";
        }
        if (res.status == 404) {
          this.errMessage = `User ${this.username} not Found`;
          this.loading = false;
        } else {
          return res.json();
        }
      })
      .then(response => {
        this.profileData = response;

        // fetch repository data of user
        fetch(response["repos_url"])
          .then(res => res.json())
          .then(response => (this.repoData = response))

          // hide loading component
          .then((this.loading = false));
      });
  }
};
</script>
