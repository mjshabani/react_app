export const ADD_SECRET_KEY = 'ADD_SECRET_KEY'


export const addSecretKey = content => ({
  type: ADD_SECRET_KEY,
  payload: {
    username : content,
    secret_key : content,
  }
})