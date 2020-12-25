import { api_carsall,api_marka } from "@/api/cars/getCars";
import {getTm_id, getToken} from "@/utils/auth";
//import mutations from "@/store/modules/cars/mutations";
//import state from "@/store/modules/cars/state";

const state = {
  carsAll: [],
  marka: []
}

const mutations = {
  carsAllMut: (state, carsAll) => {
    state.carsAll = carsAll
  },
  MARKA_MUT: (state, marka) => {
    state.marka = marka
  },
}
const actions  = {
  fetchCars({ commit }) {
    commit('carsAllMut', []);
    return new Promise((resolve, reject) => {
      api_carsall(getTm_id()).then(response => {
        commit('carsAllMut', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadMarka({ commit }) {
    return new Promise((resolve, reject) => {
      api_marka().then(response => {
        commit('MARKA_MUT', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
  export default {
    namespaced: true,
    actions,
    mutations,
    state
  }
