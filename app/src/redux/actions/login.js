import Cookie from 'js-cookie'

export const ADD_TOKEN = 'ADD_TOKEN'

export const addToken = (user_type, username, token) => {
  Cookie.set('user_type', user_type)
  Cookie.set('username', username)
  Cookie.set('token', token)
  return {
    type: ADD_TOKEN,
    payload: {
      user_type: user_type,
      username: username,
      token: token,
    }
  }
}