<template>
  <v-app id="app">
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style  lang="css">
@font-face {
  font-size: 1.8rem;
  font-family: "NotoSansLao";
  src: local("NotoSansLao"),
    url(./assets/NotoSansLao-Regular.ttf) format("truetype");
}
.description {
  font-family: "NotoSansLao";
  font-size: 1rem;
}
  </style>
