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
              <span style="color: blue; font-size: 1.2rem">ແກ້ໄຂຜູ້ໃຊ້</span>
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
    },
    role: ["admin", "user"],
  }),

  computed: {
    ...mapGetters({
      admin: "adminMod/admin",
      toastError: "stateMod/toastError",
      toastUpdateSuccess: "stateMod/toastUpdateSuccess",
    }),
  },
  mounted() {
      this.getAdmin(this.$route.params.id)
  },
  methods: {
    ...mapActions("adminMod", ["getAdmin","putAdmin"]),
    ...mapActions("stateMod", ["Toast"]),
    toast(icon, title, timer) {
      this.Toast({ icon: icon, title: title, timer: timer }).then((item) => {
        this.$swal(item);
      });
    },
    lastNameFocus() {
      if (
        this.admin.firstName != null &&
        this.admin.firstName != undefined &&
        this.admin.firstName != ""
      ) {
        this.$refs.lastName.focus();
      }
    },
    roleFocus() {
      if (
        this.admin.userName != null &&
        this.admin.userName != undefined &&
        this.admin.userName != ""
      ) {
        this.$refs.role.focus();
      }
    },
    passwordFocus() {
      if (
        this.admin.role != null &&
        this.admin.role != undefined &&
        this.admin.role != ""
      ) {
        this.$refs.password.focus();
      }
    },
    clear() {
      this.$refs.form.reset();
      this.getAdmin(this.$route.params.id)
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
        this.putAdmin(this.admin)
          .then((res) => {
            if (res.status == 201) {
              this.$swal(this.toastUpdateSuccess);
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
