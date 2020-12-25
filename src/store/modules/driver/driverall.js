import { api_driverall} from '@/api/driver/getDriverAll'
import {getTm_id} from "@/utils/auth";

const state = {
  setDriverAll: [],
}
const mutations = {
  driverAllMutation: (state, driverAll) => {
    state.setDriverAll = driverAll
  },
}
const driverall = {
  driverall({commit},data) {
    return new Promise((resolve, reject) => {
      api_driverall(data[0],data[1],getTm_id()).then(response => {
        commit('driverAllMutation', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
}
  export default {
    namespaced: true,
    state,
    mutations,
    actions: driverall
}
