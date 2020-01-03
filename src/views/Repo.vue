<template>
  <div>
    <router-link
      :to="{
        name: 'profile',
        params: {
          username: username
        }
      }"
    >
      {{ username }} Repository List
    </router-link>

    <div v-if="loading">Loading..</div>
    <div v-if="errMessage">
      <h1>{{ errMessage }}</h1>
      <router-link
        :to="{
          name: 'profile',
          params: {
            username: username
          }
        }"
      >
        Go back to profile page
      </router-link>
    </div>

    <p>{{ username }}/{{ repo }} README</p>
    <VueMarkdown v-if="decodedReadmeContent">
      {{ decodedReadmeContent }}
    </VueMarkdown>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import client from "../client";
export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      loading: true,
      errMessage: "",
      readmeData: {},
      username: this.$route.params.username,
      repo: this.$route.params.repo
    };
  },
  computed: {
    decodedReadmeContent() {
      // GitHub returns the content of readme
      // as base64 encoded string. This function
      // decodes the string to Markdown for rendering.
      if ("content" in this.readmeData) {
        return atob(this.readmeData.content);
      } else {
        return "";
      }
    }
  },
  mounted() {
    // fetch the README of the repository

    // fetch the user data through github
    client
      .readme(this.username, this.repo)
      .then(response => {
        this.readmeData = response.data;
        this.loading = false;
      })
      .catch(err => {
        console.error(err.response);
        this.errMessage = `Error ${err.response.status} - ${err.response.statusText}`;
      });
  }
};
</script>
