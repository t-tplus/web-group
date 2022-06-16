<template>
  <v-card class="pa-5 mx-2 mx-lg-16" elevation="10">
    <v-btn  class="mx-2" to="/score"
      ><v-icon left>mdi-arrow-left</v-icon>ກັບຄືນ</v-btn
    >
    <v-row no-gutters class="justify-center">
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card flat tile class="my-2 my-md-10 py-2 px-0 px-md-5">
            <v-row no-gutters class="justify-center"
              ><span style="font-size: 1.2rem; color: black" class="ml-2">
                ຂໍ້ມູນສັ່ງຊື້
              </span>
              <v-icon>mdi-chevron-double-right</v-icon>
              <span style="color: blue; font-size: 1.2rem">ເພີ່ມສັ່ງຊື້</span>
            </v-row>
            <v-row no-gutters class="justify-center mt-5">
              <v-col cols="12" md="7" class="px-2">
                <p>ເບີໂທ<span>*</span></p>
                <v-text-field
                  outlined
                  dense
                  required
                  v-model="score.tel"
                  :rules="[rules.tel.required]"
                  type="number"
                ></v-text-field>
                 <p>ເລກຊີມ<span>*</span></p>
                <v-text-field
                  outlined
                  dense
                  required
                  v-model="score.account"
                  :rules="[rules.account.required]"
                  type="number"
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
    score: {
      tel: null,
      account: null,
    },
    rules: {
      account: {
        required: (value) => !!value || "ກະລຸນາປ້ອນເລກຊີມ",
      },
      tel: {
        required: (value) => !!value || "ກະລຸນາປ້ອນເບີໂທ",
      },
    },
  }),

  computed: {
    ...mapGetters({
      toastError: "stateMod/toastError",
      toastAddSuccess: "stateMod/toastAddSuccess",
    }),
  },
  mounted() {},
  methods: {
    ...mapActions("scoreMod", ["postScore"]),
    ...mapActions("stateMod", ["Toast"]),
    toast(icon, title, timer) {
      this.Toast({ icon: icon, title: title, timer: timer }).then((item) => {
        this.$swal(item);
      });
    },
    clear() {
      this.$refs.form.reset();
      this.score = {
      tel: null,
      account: null,
      };
    },
    submit() {
      this.$refs.form.validate();
      try {
        if (
          !this.score.account
        ) {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາປ້ອນເລກຊີມ</div>`
          );
          return;
        }
        if (
          !this.score.tel
        ) {
          this.toast(
            "warning",
            `<div style='font-family:"Noto Sans Lao";color:red' >ກະລຸນາປ້ອນເບີໂທ</div>`
          );
          return;
        }
        this.postScore(this.score)
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
