<template>
  <div>
    {{ repoData.name }} |
    <router-link
      :to="{
        name: 'repo',
        params: {
          repo: repoData.name
        }
      }"
      >Readme
    </router-link>
  </div>
</template>
<script>
export default {
  name: "RepoItem",
  props: {
    repoData: Object
  }
};
</script>
