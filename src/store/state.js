import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const stateModule = {
  namespaced: true,
  state: {
    delAlert: {
      position: "center",
      icon: "warning",
      html: `<div style='font-family:"Noto Sans Lao"; font-size:1.5rem' >ທ່ານຕ້ອງການລົບອອກບໍ?</div>`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: `<div style='font-family:"Noto Sans Lao";color:#0F71BA' >ຕົກລົງ</div>`,
      cancelButtonText: `<div style='font-family:"Noto Sans Lao";color:white' >ຍົກເລີກ</div>`,
      confirmButtonColor: "#cccccc",
      cancelButtonColor: "#0F71BA",
      reverseButtons: true,
      buttonsStyling: true,
      showLoaderOnConfirm: true,
    },
    confirmAlert: {
      position: "center",
      icon: "warning",
      html: `<div style='font-family:"Noto Sans Lao"; font-size:1.5rem' >ທ່ານແນ່ໃຈບໍ?</div>`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: `<div style='font-family:"Noto Sans Lao";color:#0F71BA' >ຕົກລົງ</div>`,
      cancelButtonText: `<div style='font-family:"Noto Sans Lao";color:white' >ຍົກເລີກ</div>`,
      confirmButtonColor: "#cccccc",
      cancelButtonColor: "#0F71BA",
      reverseButtons: true,
      buttonsStyling: true,
      showLoaderOnConfirm: true,
    },
    toastAddSuccess: {
      icon: 'success',
      title: `<div style='font-family:"Noto Sans Lao";' >ບັນທຶກຂໍ້ມູນສໍາເລັດແລ້ວ</div>`,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    },

    toastUpdateSuccess: {
      icon: 'success',
      title: `<div style='font-family:"Noto Sans Lao";' >ແກ້ໄຂຂໍ້ມູນສໍາເລັດແລ້ວ</div>`,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    },

    toastDeleteSuccess: {
      icon: 'success',
      title: `<div style='font-family:"Noto Sans Lao";' >ລົບຂໍ້ມູນສໍາເລັດແລ້ວ</div>`,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    },
    toastError: {
      icon: 'error',
      title: `<div style='font-family:"Noto Sans Lao";color:red' >ຂໍ້ມູນຜິດພາດ</div>`,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }
  },
  actions: {
    Toast(context, item) {
      try {
        const toast = {
          icon: item.icon,
          title: item.title,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: (item.timer == undefined || item.timer == null || isNaN(item.timer)) ? 2000 : item.timer,
          timerProgressBar: true,
        }
        return toast
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    delAlert: (state) => state.delAlert,
    confirmAlert: (state) => state.confirmAlert,
    toastAddSuccess: (state) => state.toastAddSuccess,
    toastUpdateSuccess: (state) => state.toastUpdateSuccess,
    toastDeleteSuccess: (state) => state.toastDeleteSuccess,
    toastError: (state) => state.toastError,
  }
};
export default stateModule;

