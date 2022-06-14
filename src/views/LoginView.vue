<template>
  <v-app class="app">
    <v-main>
      <div>
        <v-row no-gutters class="justify-center">
          <v-col cols="12" md="10" lg="8">
            <v-card flat tile class="ma-2 ma-md-6 pa-2 pa-md-16">
              <v-row no-gutters class="justify-center">
                <v-col cols="12" md="6">
                  <v-card height="400" flat tile color="#f0f0f0">
                    <v-row no-gutters class="pt-16 justify-center"
                      ><p style="color: black">ເຂົ້າສູ່ລະບົບ</p></v-row
                    >
                    <v-row no-gutters class="pt-10 mx-2 justify-center">
                      <v-text-field
                        outlined
                        dense
                        required
                        autofocus
                        v-model="auth.userName"
                        :rules="[auth.rulesUserName.required]"
                        label="ຊື່ເຂົ້າໃຊ້ລະບົບ"
                        ref="userName"
                        prepend-inner-icon="mdi-account"
                        @keyup.enter="passwordFocus"
                      ></v-text-field>

                      <v-text-field
                        outlined
                        dense
                        required
                        v-model="auth.password"
                        :rules="[
                          auth.rulesPassword.required,
                          auth.rulesPassword.min,
                        ]"
                        label="ລະຫັດຜ່ານ"
                        ref="password"
                        :type="show ? 'text' : 'password'"
                        prepend-inner-icon="mdi-lock"
                        :append-icon="
                          show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                        "
                        class="mt-3"
                        @keyup.enter="Signin"
                        @click:append="show = !show"
                      ></v-text-field>
                    </v-row>
                    <v-row no-gutters class="pt-10 mx-2 justify-center">
                      <v-btn
                        width="100%"
                        @click="Signin"
                        >ເຂົ້າສູ່ລະບົບ</v-btn
                      >
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "App",

  data: () => ({
    show: false,
    auth: {
      userName: "",
      password: "",
      rulesUserName: {
        required: (value) => !!value || "ກະລຸນາປ້ອນຊື່ເຂົ້າໃຊ້ລະບົບ!",
      },
      rulesPassword: {
        required: (value) => !!value || "ກະລຸນາປ້ອນລະຫັດຜ່ານ!",
        min: (v) => v.length >= 6 || "ຢ່າງໜ້ວຍ 6 ຕົວອັກສອນ",
      },
    },
  }),
  methods: {
    ...mapMutations({
      setToken: "adminMod/setToken",
    }),
    ...mapActions("adminMod", ["signIn"]),
    ...mapActions("stateMod", ["Toast"]),
    toast(icon, title, timer) {
      this.Toast({ icon: icon, title: title, timer: timer }).then((item) => {
        this.$swal(item);
      });
    },
    passwordFocus() {
      if (
        this.auth.userName != null &&
        this.auth.userName != undefined &&
        this.auth.userName != ""
      ) {
        this.$refs.password.focus();
      }
    },
    Signin() {
      try {
        if (this.auth.userName == "") {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາໃສ່ຊື່ເຂົ້າໃຊ້ລະບົບ</div>`
          );
          return;
        } else if (this.auth.password == "") {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາໃສ່ລະຫັດຜ່ານ</div>`
          );
          return;
        }
        this.signIn(this.auth)
          .then((res) => {
            if (res.data.token) {
              window.localStorage.removeItem("token");
              this.setToken(res.data.token);
              window.localStorage.setItem(
                "admin",
                JSON.stringify(res.data.admin)
              );
              window.localStorage.setItem("token", res.data.token);
              console.log(window.localStorage.getItem("token"));
              if (res.data.result.role == "admin") {
                this.$router.push(`/home`);
                this.$router.go();
              } 
              this.toast(
                "success",
                `<div style='font-family:"Noto Sans Lao";' >ເຂົ້າລະບົບສໍາເລັດແລ້ວ</div>`,
                4000
              );
            } else {
              this.toast(
                "warning",
                `<div style='font-family:"Noto Sans Lao";color:red' >ຊື່ເຂົ້າໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ</div>`
              );
            }
            if (res.data.message == "INVALID_USER_NAME_OR_PASSWORD") {
              this.toast(
                "warning",
                `<div style='font-family:"Noto Sans Lao";color:red' >ຊື່ເຂົ້າໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ</div>`
              );
            }
          })
          .catch((error) => {
            this.toast(
              "warning",
              `<div style='font-family:"Noto Sans Lao";color:red' >ຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ</div>`
            );
            console.log(error);
          });
      } catch (error) {
        this.toast(
          "warning",
          `<div style='font-family:"Noto Sans Lao";color:red' >ຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ</div>`
        );
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.app {
  font-family: "NotoSansLao";
}
p {
  font-size: 1rem;
  color: white;
}
</style>
