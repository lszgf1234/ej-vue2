const notificationModule = {
  state: {
    notifications: 0,
    notiInfomation: [],
    notiNotify: [],
    notiCommission: [],
  },
  mutations: {
    setNotifications (state, data) {
      state.notifications = data
    },
    setInfomation (state, data) {
      state.notiInfomation = data
    },
    setNotify (state, data) {
      state.notiNotify = data
    },
    setCommission (state, data) {
      state.notiCommission = data
    },
  },
}

export default notificationModule
