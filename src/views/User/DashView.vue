<template>
  <div class="score">
    <v-card class="pa-5">
      <v-card-title>
        <v-row class="justify-space-between">
          <span>ຂໍ້ມູນສັ່ງຊື້({{ scoresUser.length||0 }})</span>
        </v-row>
      </v-card-title>
      <div>
        <v-data-table
          :search="search"
          :headers="headers"
          :items="scoresUser"
          :footer-props="{ itemsPerPageText: 'ໜ້າທີ :' }"
          pagination.sync="pagination"
          item-key="idx"
          @dblclick:row="viewAction"
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
    ],
  }),

  computed: {
    ...mapGetters({
      scoresUser: "scoreMod/scoresUser",
      length: "scoreMod/length",
    }),
  },
  watch: {
    scoresUser(val) {
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
    this.getScoresUser();
    this.Loading();
  },
  methods: {
    ...mapActions("scoreMod", [
      "getScoresUser",
    ]),
    Loading() {
      if (this.length == false) {
        this.loading = false;
      }
    },
  },
};
</script>
