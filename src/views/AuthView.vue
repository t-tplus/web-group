<template>
  <div>
    <v-row class="justify-end ma-1 mt-5">
      <v-btn to="/auth/add"><v-icon>mdi-plus</v-icon>ເພີ່ມໃໝ່</v-btn>
    </v-row>
    <v-container class="pa-4 text-center">
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in auths">
          <v-col :key="i" cols="12" md="4">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                color="lime accent-4"
                ><v-img
                  height="200"
                  contain
                  :src="
                    item.image
                      ? item.image
                      : 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'
                  "
                ></v-img>
                <v-card-title class="white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 text-left">
                      ຊື່ເຂົ້າໃຊ້: {{ item.userName }}
                    </p>

                    <div>
                      <p
                        class="
                          ma-0
                          text-left
                        "
                      >
                        ຕໍາແໜ່ງ:{{ item.role }}
                      </p>
                      <p
                        class="
                          text-caption
                          font-weight-medium font-italic
                          text-left
                        "
                      >
                        {{ item.status }}
                      </p>
                    </div>
                  </v-row>
                </v-card-title>
                <v-card-actions class="justify-center">
                  <v-btn @click="delAction(item)"
                    ><v-icon>mdi-delete-outline</v-icon>ລົບອອກ</v-btn
                  >
                  <v-btn @click="editAction(item)"
                    ><v-icon>mdi-pencil-box-outline</v-icon>ແກ້ໄຂ</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"],
    transparent: "rgba(255, 255, 255, 0)",
  }),
  computed: {
    ...mapGetters({
      delAlert: "stateMod/delAlert",
      toastError: "stateMod/toastError",
      toastDeleteSuccess: "stateMod/toastDeleteSuccess",
      auths: "adminMod/admins",
    }),
  },
  mounted() {
    this.getAdmins();
  },
  methods: {
    ...mapActions("adminMod", ["getAdmins", "delAdmin"]),
    ...mapActions("stateMod", ["Toast"]),
    toast(icon, title, timer) {
      this.Toast({ icon: icon, title: title, timer: timer }).then((item) => {
        this.$swal(item);
      });
    },
    delAction(item) {
      this.$swal(this.delAlert).then((result) => {
        if (result.isConfirmed) {
          this.deleteConfirm(item);
        }
      });
    },
    deleteConfirm(item) {
      try {
        this.delAdmin(item)
          .then((res) => {
            if (res.status == 201) {
              this.$swal(this.toastDeleteSuccess);
              this.getAdmins();
            } else {
              this.$swal(this.toastError);
            }
          })
          .catch((error) => {
            this.$swal(this.toastError);
            console.log(error);
          });
      } catch (error) {
        console.log(error);
        this.$swal(this.toastError);
      }
    },
    editAction(item) {
      this.$router.push(`/auth/edit/${item._id}`);
    },
  },
};
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>