export const SET_ALERT = 'SET_ALERT'


export const setAlert = (open, type, title, content) => ({
  type: SET_ALERT,
  payload: {
    open: open,
    type: type,
    title: title,
    content: content
  }
})