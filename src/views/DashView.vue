<template>
  <div class="score">
    <v-card class="pa-5">
      <v-card-title>
        <v-row class="justify-space-between">
          <span>ຂໍ້ມູນສັ່ງຊື້ຂອງເຮົາ({{ scoresAuth.length || 0 }})</span>
        </v-row>
      </v-card-title>
      <div>
        <v-data-table
          :search="search"
          :headers="headers"
          :items="scoresAuth"
          :footer-props="{ itemsPerPageText: 'ໜ້າທີ :' }"
          pagination.sync="pagination"
          item-key="idx"
        >
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
    ],
  }),

  computed: {
    ...mapGetters({
      scoresAuth: "scoreMod/scoresAuth",
      length: "scoreMod/length",
    }),
  },
  watch: {
    scoresAuth(val) {
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
    this.getScoresAuth();
    this.Loading();
  },
  methods: {
    ...mapActions("scoreMod", ["getScoresAuth"]),
    Loading() {
      if (this.length == false) {
        window.location.reload();
        this.loading = false;
      }
    },
  },
};
</script>
