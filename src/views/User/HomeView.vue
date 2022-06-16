<template>
  <v-app class="home">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center" @click="$router.push(`/user`)">
        Tplus website
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/user/score/old" text>
        <span class="mr-2">ປະຫວັດຜ່ານມາ</span>
      </v-btn>
      <v-btn to="/user/score" text>
        <span class="mr-2">ສັ່ງຊື້ໃໝ່</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="logout" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <router-view />
  </v-app>
</template>

<script>
export default {
  components: {},
  
  methods:{
    logout(){
      this.$router.push(`/`)
      localStorage.clear()
    }
  }
};
</script>
<style >
.home{
  font-family: 'Noto Sans Lao';
}
</style>