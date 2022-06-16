<template>
  <v-app id="home" style="fontfamily:">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center" @click="homePage">
        Tplus website
      </div>

      <v-spacer></v-spacer>
      <v-btn to="/auth" text>
        <span class="mr-2">ຜູ້ໃຊ້</span>
      </v-btn>
      <v-btn to="/score/all" text>
        <span class="mr-2">ສັ່ງຊື້ທັງໝົດ</span>
      </v-btn>
      <v-btn to="/home" text>
        <span class="mr-2">ສັ່ງຊື້ຂອງເຮົາ</span>
      </v-btn>
      <v-btn to="/score" text>
        <span class="mr-2">ໄດ້ຮັບຢືນຢັນ</span>
      </v-btn>
      <v-btn to="/score/null" text>
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
  methods:{
    logout(){
      this.$router.push(`/`)
      localStorage.clear()
    },
    homePage(){
      this.$router.push(`/home`)
    }
  }
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