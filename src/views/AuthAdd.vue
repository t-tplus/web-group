<template>
  <v-card class="pa-5 mx-2 mx-lg-16" elevation="10">
    <v-btn  class="mx-2" to="/auth"
      ><v-icon left>mdi-arrow-left</v-icon>ກັບຄືນ</v-btn
    >
    <v-row no-gutters class="justify-center">
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card flat tile class="my-2 my-md-10 py-2 px-0 px-md-5">
            <v-row no-gutters class="justify-center"
              ><span style="font-size: 1.2rem; color: black" class="ml-2">
                ຂໍ້ມູນຜູ້ໃຊ້
              </span>
              <v-icon>mdi-chevron-double-right</v-icon>
              <span style="color: blue; font-size: 1.2rem">ເພີ່ມຜູ້ໃຊ້</span>
            </v-row>
            <v-row no-gutters class="justify-center mt-5">
              <v-col cols="12" md="7" class="px-2">
                <p>ຊື່ເຂົ້ໃຊ້<span>*</span></p>
                <v-text-field
                  outlined
                  dense
                  required
                  v-model="admin.userName"
                  :rules="[rules.userName.required]"
                  ref="userName"
                  @keyup.enter="roleFocus"
                ></v-text-field>
                <p>ສະຖານະ<span>*</span></p>
                <v-autocomplete
                  outlined
                  dense
                  required
                  clearable
                  v-model="admin.role"
                  :items="role"
                  :rules="[rules.role.required]"
                  @change="latFocus"
                  item-color="blue darken-1"
                  no-data-text="ບໍ່ມີຂໍ້ມູນ!"
                  ref="role"
                ></v-autocomplete>
                <p>ສ້າງລະຫັດຜ່ານ<span>*</span></p>
                <v-text-field
                  outlined
                  dense
                  required
                  v-model="admin.password"
                  :rules="[rules.password.required, rules.password.min]"
                  ref="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  @keyup.enter="confirmFocus"
                ></v-text-field>
                <p>ຢືນຢັນລະຫັດຜ່ານ<span>*</span></p>
                <v-text-field
                  outlined
                  dense
                  required
                  v-model="admin.confirmPassword"
                  :rules="[rules.confirmPassword.required]"
                  ref="confirmPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  @keyup.enter="submit"
                ></v-text-field>
                <v-row no-gutters class="mx-2 justify-center">
                  <v-btn
                    large
                    width="200"
                    class="ma-2"
                    @click="clear"
                    >ຍົກເລີກ</v-btn
                  >
                  <v-btn
                    large
                    width="200"
                    class="ma-2"
                    @click="submit"
                    >ບັນທຶກ</v-btn
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    valid: true,
    show1: true,
    show2: true,
    admin: {
      status: "active",
      role: "admin",
      password: null,
      confirmPassword: null,
      userName: null,
    },
    rules: {
      userName: {
        required: (value) => !!value || "ກະລຸນາປ້ອນຊື່ເຂົ້າໃຊ້",
      },
      status: {
        required: (value) => !!value || "ກະລຸນາເລືອກສະຖານະ",
      },
      role: {
        required: (value) => !!value || "ກະລຸນາເລືອກຕໍາແໜ່ງ",
      },
      password: {
        required: (value) => !!value || "ກະລຸນາປ້ອນລະຫັດຜ່ານ",
        min: (v) => v.length >= 8 || "ຢ່າງໜ້ວຍ 8 ຕົວອັກສອນ",
      },
      confirmPassword: {
        required: (value) => !!value || "ກະລຸນາຢືນຢັນລະຫັດຜ່ານ",
        min: (v) => v.length >= 8 || "ຢ່າງໜ້ວຍ 8 ຕົວອັກສອນ",
      },
    },
    role: ["admin", "user"],
  }),

  computed: {
    ...mapGetters({
      toastError: "stateMod/toastError",
      toastAddSuccess: "stateMod/toastAddSuccess",
    }),
  },
  mounted() {},
  methods: {
    ...mapActions("adminMod", ["postAdmin"]),
    ...mapActions("stateMod", ["Toast"]),
    toast(icon, title, timer) {
      this.Toast({ icon: icon, title: title, timer: timer }).then((item) => {
        this.$swal(item);
      });
    },
    clear() {
      this.$refs.form.reset();
      this.admin = {
        status: "active",
        role: "admin",
        password: null,
        confirmPassword: null,
        userName: null,
      };
    },
    submit() {
      this.$refs.form.validate();
      try {
        if (
          !this.admin.userName
        ) {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາປ້ອນຊື່ເຂົ້າໃຊ້</div>`
          );
          return;
        }
        if (
          !this.admin.status
        ) {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາເລືອກສະຖານະ</div>`
          );
          return;
        }
        if (
          !this.admin.role
        ) {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາເລືອກຕໍາແໜ່ງ</div>`
          );
          return;
        }
        if (
          !this.admin.password
        ) {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາໃສ່ລະຫັດຜ່ານ</div>`
          );
          return;
        }
        if (this.admin.password.length < 8) {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາໃສ່ລະຫັດຜ່ານຢ່າງໜ້ອຍ 8 ຕົວອັກສອນ</div>`
          );
          return;
        }
        if (
          !this.admin.confirmPassword
        ) {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາຢືນຢັນລະຫັດຜ່ານ</div>`
          );
          return;
        }

        if (this.admin.password != this.admin.confirmPassword) {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາຢືນຢັນລະຫັດຜ່ານໃຫ້ຖຶກຕ້ອງ</div>`
          );
          return;
        }

        this.postAdmin(this.admin)
          .then((res) => {
            if (res.status == 201) {
              this.$swal(this.toastAddSuccess);
              this.clear();
            } else {
              this.$swal(this.toastError);
            }
          })
          .catch((error) => {
            this.$swal(this.toastError);
            console.log(error);
          });
      } catch (error) {
        this.$swal(this.toastError);
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
p {
  font-size: 1rem;
}
span {
  color: red;
}
</style>
