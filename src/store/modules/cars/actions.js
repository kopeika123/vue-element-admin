import { api_carsall,api_marka, api_model,api_color,api_save_car,api_delete_car } from "@/api/cars/getCars";
import {getTm_id} from "@/utils/auth";
import mutations from "@/store/modules/cars/mutations";
import state from "@/store/modules/cars/state";

const actions  = {
  fetchCars({commit}) {
    return new Promise((resolve, reject) => {
      api_carsall(getTm_id()).then(response => {
        commit('carsAllMut', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadMarka({commit}) {
    return new Promise((resolve, reject) => {
      api_marka().then(response => {
        commit('markaMut', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadModel({commit},mark_id){
    return new Promise((resolve, reject) => {
      api_model(mark_id).then(response => {
        commit('modelMut', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadColor({commit}){
    return new Promise((resolve, reject) => {
      api_color().then(response => {
        commit('colorMut', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveCar({commit},data){
    commit('saveCar', [])
    return new Promise((resolve, reject) => {
      api_save_car(data).then(response => {
        commit('saveCar', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteCar({commit},delId){
    return new Promise((resolve, reject) => {
      api_delete_car(delId).then(response => {
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
