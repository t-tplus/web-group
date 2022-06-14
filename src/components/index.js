
import vueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import { SpinnerLoader } from "vue-spinners-css";
// import VueApexCharts from "vue-apexcharts";
function useFrameWork(app) {
  app.use(vueSweetalert2)
}
function setComponents(app) {
//   app.component('v-loading', SpinnerLoader)
console.log(app)
}
export {
  setComponents,
  useFrameWork
}
