<template>
  <div class="score">
    <v-card class="pa-5">
      <v-card-title>
        <v-row class="justify-space-between">
          <span>ຂໍ້ມູນສັ່ງຊື້({{ scores.length||0 }})</span>
          <v-btn  @click="newAction"
            ><v-icon>mdi-plus-circle</v-icon>ເພີ່ມໃໝ່</v-btn
          >
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
          :items="scores"
          :footer-props="{ itemsPerPageText: 'ໜ້າທີ :' }"
          pagination.sync="pagination"
          item-key="idx"
          @dblclick:row="viewAction"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-row class="justify-start">
              <v-icon @click="updateAction(item)" class="mr-2" color="update">
                mdi-pencil
              </v-icon>
              <v-icon @click="deleteAction(item)" class="mr-2" color="delete">
                mdi-delete
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
    deleteItem: null,
    headers: [
      {
        text: "ລຳດັບ",
        align: "center",
        sortable: false,
        value: "idx",
      },
      {
        text: "ເບີໂທ",
        value: "tel",
      },
      {
        text: "ເລກຊີມ",
        value: "account",
      },
      {
        text: "ຜູ້ສັ່ງຊື້",
        value: "admin",
      },
      {
        text: "ວັນທີ່ສັ່ງຊື້",
        value: "addDate",
      },
      {
        text: "ຜູ້ຢືນຢັນ",
        value: "user",
      },
      {
        text: "ວັນທີ່ຢືນຢັນ",
        value: "endDate",
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
      delAlert: "stateMod/delAlert",
      toastError: "stateMod/toastError",
      toastDeleteSuccess: "stateMod/toastDeleteSuccess",
      scores: "scoreMod/scores",
      length: "scoreMod/length",
    }),
  },
  watch: {
    scores(val) {
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
    this.getScores();
    this.Loading();
  },
  methods: {
    ...mapActions("scoreMod", [
      "getScores",
      "delScore",
    ]),
    ...mapActions("stateMod", ["Toast"]),
    Alert() {
      this.$swal(this.delAlert).then((result) => {
        if (result.isConfirmed) {
          this.deleteConfirm();
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
    newAction() {
      this.$router.push(`/score/add`);
    },
    deleteAction(item) {
      this.deleteItem = item;
      this.Alert();
    },
    deleteConfirm() {
      try {
        this.delScore(this.deleteItem)
          .then((res) => {
            if (res.status == 201) {
              this.$swal(this.toastDeleteSuccess);
              this.getScores();
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
