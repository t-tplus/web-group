import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import moment from "moment";
import { adminHeader, apiURL } from '../constant/index';
Vue.use(Vuex)
const adminModule = {
  namespaced: true,
  state: {
    token: window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null,
    admins: [],
    admin: [],
    length: true
  },
  mutations: {
    setToken(state, tken) {
      state.token = tken
      window.localStorage.setItem('token', tken)
    },
    setAdmins(state, admin) {
      state.admins = admin;
    },
    setAdmin(state, admin) {
      state.admin = admin;
    },
    setLength(state, admin) {
      state.length = admin;
    },
  },
  actions: {
    signIn(context, admin) {
      try {
        return axios.post(apiURL + `auths/sign-in`, admin)
      } catch (error) {
        console.log(error)
      }
    },
    isSignIn(context, id) {
      console.log(id)
      try {
        return axios.get(apiURL + `auths/check/token`, { headers: adminHeader })
      } catch (error) {
        console.log(error)
      }
    },
    getAdmins(context) {
      try {
        axios.get(apiURL + `auths`, { headers: adminHeader }).then((res) => {
            var adminlist = []
          if (res.data.error != undefined) {
            context.commit("setAdmins", adminlist);
            context.commit("setLength", false);
            return
          }
          if (res.data.length < 1) {
            context.commit("setAdmins", adminlist);
            context.commit("setLength", false);
            return
          }
          for (const idx in res.data) {
            const el = res.data[idx];
            var admin = {
              idx: parseInt(idx) + 1,
              _id: el._id,
              userName: el.userName,
              status: el.status,
              role: el.role,
              createdAt:
                moment(String(el.createdAt)).format("DD-MM-YYYY"),
              updatedAt:
                moment(String(el.updatedAt)).format("DD-MM-YYYY"),
            };
            adminlist.push(admin);
          }
          context.commit("setAdmins", adminlist);
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
    getAdmin(context, id) {
      try {
        axios
          .get(apiURL + `auths/${id}`, { headers: adminHeader })
          .then((res) => {
            if (res.data.error != undefined) return
            const el = res.data;
            var admin = {
              _id: el._id,
              userName: el.userName,
              status: el.status,
              role: el.role,
              oldPassword: null,
              newPassword: null,
              confirmPassword: null,
              createdAt:
                moment(String(el.createdAt)).format("DD-MM-YYYY"),
              updatedAt:
                moment(String(el.updatedAt)).format("DD-MM-YYYY"),
            };
            context.commit("setAdmin", admin);
          })
          .catch((error) => {
            console.log(error)
          });
      } catch (error) {
        console.log(error);
      }
    },

    delAdmin(context, item) {
      try {
        return axios
          .delete(apiURL + `auths/${item._id}`, { headers: adminHeader })

      } catch (e) {
        console.log(e);
      }
    },
    postAdmin(context, item) {
      try {
        return axios
          .post(apiURL + `auths/sign-up`, item, { headers: adminHeader })
      } catch (e) {
        console.log(e);
      }
    },
    putAdmin(context, item) {
      try {
        return axios
          .put(apiURL + `auths/${item._id}`, item, { headers: adminHeader })
      } catch (e) {
        console.log(e);
      }
    },
  },

  getters: {
    token: state => state.token,
    admins: (state) => state.admins,
    admin: (state) => state.admin,
    length: (state) => state.length,
  }
};
export default adminModule;
