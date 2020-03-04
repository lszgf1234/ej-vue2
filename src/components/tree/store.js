import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    commands: [],
    commandTrigger: 0,
  },

  getters: {
    commands: state => state.commands,
    commandTrigger: state => state.commandTrigger,
  },

  mutations: {
    change (state, {index, command}) {
      state.commands.splice(index, state.commands.length - index, command)
    },
    commandTriggerChange (state, commandTriggerChange) {
      state.commandTrigger = commandTriggerChange
    },
    clearCommand (state) {
      state.commands = []
    },
  },

  actions: {
    change ({commit}, {index, command}) {
      commit('change', {index, command})
    },
    commandTriggerChange ({commit}, commandTriggerChange) {
      commit('commandTriggerChange', commandTriggerChange)
    },
    clearCommand ({commit}) {
      commit('clearCommand')
    },
  },
})

