<template>
  <v-app id="home" style="fontfamily:">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center" @click="$router.push(`/home`)">
        Tplus website
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/auth" text>
        <span class="mr-2">auths</span>
      </v-btn>
      <v-btn to="/score" text>
        <span class="mr-2">Score</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn to="/" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <router-view />
  </v-app>
</template>

<script>
export default {
  components: {},
};
</script>
<style lang="css">
#home{
  font-family: "NotoSansLao";
}

.v-dialog {
  font-family: "NotoSansLao";
}
.v-avatar {
  font-family: "NotoSansLao";
}
.v-text-field label {
  font-size: 1rem;
}
.v-data-table th {
  font-size: 14px !important;
  text-shadow: none !important;
  font-family: "NotoSansLao";
}
.v-data-table td {
  font-size: 12px !important;
  font-family: "NotoSansLao";
}

</style>