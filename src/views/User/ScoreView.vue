<template>
  <div class="score">
    <v-card class="pa-5">
      <v-card-title>
        <v-row class="justify-space-between">
          <span>ຂໍ້ມູນບັດ({{ scoresNull.length||0 }})</span>
        </v-row>
      </v-card-title>
      <v-row class="justify-end">
        <v-col cols="12" md="6" lg="5">
          <v-text-field
            outlined
            dense
            reverse
            v-model="search"
            single-line
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="ຄົ້ນຫາ"
            class="my-2 my-md-5"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <div>
        <v-data-table
          :search="search"
          :headers="headers"
          :items="scoresNull"
          :footer-props="{ itemsPerPageText: 'ໜ້າທີ :' }"
          pagination.sync="pagination"
          item-key="idx"
          @dblclick:row="viewAction"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-row class="justify-start">
              <v-icon @click="checkAction(item)" class="mr-2" >
                mdi-check-underline
              </v-icon>
            </v-row>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data: () => ({
    search: "",
    loading: true,
    cfItem: null,
    headers: [
      {
        text: "ລຳດັບ",
        align: "center",
        sortable: false,
        value: "idx",
      },
      {
        text: "ບັນຊີ",
        value: "account",
      },
      {
        text: "ເບີ້ໂທ",
        value: "tel",
      },
      {
        text: "ແອດມີນ",
        value: "admin",
      },
      {
        text: "ວັນທີ່ລົງທະບຽນ",
        value: "addDate",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
  }),

  computed: {
    ...mapGetters({
      confirmAlert: "stateMod/confirmAlert",
      toastError: "stateMod/toastError",
      toastDeleteSuccess: "stateMod/toastDeleteSuccess",
      scoresNull: "scoreMod/scoresNull",
      length: "scoreMod/length",
    }),
  },
  watch: {
    scoresNull(val) {
      if (val.length > 0 || this.length == false) {
        this.loading = false;
      }
    },

    length(val) {
      if (val == false) {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getScoresNull();
    this.Loading();
  },
  methods: {
    ...mapActions("scoreMod", [
      "getScoresNull",
      "putScore",
    ]),
    ...mapActions("stateMod", ["Toast"]),
    Alert() {
      this.$swal(this.confirmAlert).then((result) => {
        if (result.isConfirmed) {
          this.confirm();
        }
      });
    },
    toast(icon, title) {
      this.Toast({ icon: icon, title: title }).then((item) => {
        this.$swal(item);
      });
    },
    Loading() {
      if (this.length == false) {
        this.loading = false;
      }
    },
    checkAction(item) {
      this.cfItem = item;
      this.Alert();
    },
    confirm() {
      try {
        this.putScore(this.cfItem)
          .then((res) => {
            if (res.status == 201) {
              this.$swal(this.toastDeleteSuccess);
              this.getScoresNull();
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
  },
};
</script>
