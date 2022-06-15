import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import moment from "moment";
import { adminHeader, apiURL } from '../constant/index';
Vue.use(Vuex)
const scoreModule = {
  namespaced: true,
  state: {
    scores: [],
    scoresNull: [],
    score: [],
    length: true
  },
  mutations: {
    setScores(state, score) {
      state.scores = score;
    },
    setScoresNull(state, score) {
      state.scoresNull = score;
    },
    setScore(state, score) {
      state.score = score;
    },
    setLength(state, score) {
      state.length = score;
    },
  },
  actions: {
    getScores(context) {
      try {
        axios.get(apiURL + `scores`, { headers: adminHeader }).then((res) => {
          var scorelist = []
          if (res.data.error != undefined) {
            context.commit("setScores", scorelist);
            context.commit("setLength", false);
            return
          }
          if (res.data.length < 1) {
            context.commit("setScores", scorelist);
            context.commit("setLength", false);
            return
          }
          for (const idx in res.data) {
            const el = res.data[idx];
            var score = {
              idx: parseInt(idx) + 1,
              _id: el._id,
              admin: el.admin ? el.admin.userName : null,
              user: el.user ? el.user.userName : null,
              tel: el.tel,
              account: el.account,
              addDate:
                moment(String(el.addDate)).format("DD-MM-YYYY"),
              endDate: el.endDate ?
                moment(String(el.endDate)).format("DD-MM-YYYY") : null,
              createdAt:
                moment(String(el.createdAt)).format("DD-MM-YYYY"),
              updatedAt:
                moment(String(el.updatedAt)).format("DD-MM-YYYY"),
            };
            scorelist.push(score);
          }
          context.commit("setScores", scorelist);
          context.commit("setLength", true);
        }).catch((error) => {
          context.commit("setLength", false);
          console.log(error)
        });
      } catch (error) {
        context.commit("setLength", false);
        console.log(error);
      }
    },
    
    getScoresNull(context) {
      try {
        axios.get(apiURL + `scores`, { headers: adminHeader }).then((res) => {
          var scorelist = []
          if (res.data.error != undefined) {
            context.commit("setScoresNull", scorelist);
            context.commit("setLength", false);
            return
          }
          if (res.data.length < 1) {
            context.commit("setScoresNull", scorelist);
            context.commit("setLength", false);
            return
          }
          var index=0
          for (const idx in res.data) {
            const el = res.data[idx];
            if(!el.user){
              index+=1
              var score = {
                idx: index,
                _id: el._id,
                admin: el.admin ? el.admin.userName : null,
                tel: el.tel,
                account: el.account,
                addDate:
                  moment(String(el.addDate)).format("DD-MM-YYYY"),
                endDate: el.endDate ?
                  moment(String(el.endDate)).format("DD-MM-YYYY") : null,
                createdAt:
                  moment(String(el.createdAt)).format("DD-MM-YYYY"),
                updatedAt:
                  moment(String(el.updatedAt)).format("DD-MM-YYYY"),
              };
              scorelist.push(score);
            }
          }
          context.commit("setScoresNull", scorelist);
          context.commit("setLength", true);
        }).catch((error) => {
          context.commit("setLength", false);
          console.log(error)
        });
      } catch (error) {
        context.commit("setLength", false);
        console.log(error);
      }
    },
    getScore(context, id) {
      try {
        axios
          .get(apiURL + `scores/${id}`, { headers: adminHeader })
          .then((res) => {
            if (res.data.error != undefined) return
            const el = res.data;
            var score = {
              _id: el._id,
              admin: el.admin ? el.admin.userName : null,
              user: el.user ? el.user.userName : null,
              tel: el.tel,
              account: el.account,
              addDate:
                moment(String(el.addDate)).format("DD-MM-YYYY"),
              endDate: el.endDate ?
                moment(String(el.endDate)).format("DD-MM-YYYY") : null,
              createdAt:
                moment(String(el.createdAt)).format("DD-MM-YYYY"),
              updatedAt:
                moment(String(el.updatedAt)).format("DD-MM-YYYY"),
            };
            context.commit("setScore", score);
          })
          .catch((error) => {
            console.log(error)
          });
      } catch (error) {
        console.log(error);
      }
    },

    delScore(context, item) {
      try {
        return axios
          .delete(apiURL + `scores/${item._id}`, { headers: adminHeader })

      } catch (e) {
        console.log(e);
      }
    },
    postScore(context, item) {
      try {
        return axios
          .post(apiURL + `scores`, item, { headers: adminHeader })
      } catch (e) {
        console.log(e);
      }
    },
    putScore(context, item) {
      try {
        return axios
          .put(apiURL + `scores/${item._id}`, item, { headers: adminHeader })
      } catch (e) {
        console.log(e);
      }
    },
  },

  getters: {
    scores: (state) => state.scores,
    scoresNull: (state) => state.scoresNull,
    score: (state) => state.score,
    length: (state) => state.length,
  }
};
export default scoreModule;
