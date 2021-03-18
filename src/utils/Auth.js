const APP_LOGIN_USER = 'APP_LOGIN_USER';

/**
 *
 */
export const AuthLogin = () => {
  let loginUserStr = sessionStorage.getItem(APP_LOGIN_USER);
  if (loginUserStr) {
    return true
  }
  return false
}

/**
 *
 * @param {Object} user
 * @return undefined
 */
export const SaveLoginUserInfo = (user) => {
  sessionStorage.setItem(APP_LOGIN_USER, JSON.stringify(user));
}
