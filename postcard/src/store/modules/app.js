
const state = {
  templateName: null,
  userImg:'',
  mailImg:'',
}
const mutations = {
  SET_TEMPLATE(state, payload) {
    state.templateName = payload
  },
  SET_USERIMG(state, payload) {
    state.userImg = payload
  },
  SET_MAILIMG(state, payload) {
    state.mailImg = payload
  },
}
const actions = {
}
export default {
  state,
  mutations,
  actions
}
