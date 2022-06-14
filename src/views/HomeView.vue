<template>
  <v-app>
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
