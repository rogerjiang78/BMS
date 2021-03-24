import { SAVE_USER_INFO, DELETE_USER_INFO } from '../action_types';
import storageUtils from '../../utils/storageUtils';

const loginUser = storageUtils.getUser();

const { user, token } = loginUser;

let initState = {
  user: user || {},
  token: token || '',
  isLogin: loginUser ? true : false,
};
export default function loginReducer(preState = initState, action) {
  const { type, data } = action;
  // console.log(data);
  let newState;
  switch (type) {
    case SAVE_USER_INFO:
      newState = {
        user: data.user,
        token: data.token,
        isLogin: true,
      };
      return newState;
      case DELETE_USER_INFO:
      newState = {
        user: {},
        token: '',
        isLogin: false,
      };
      return newState;
    default:
      return preState;
  }
}
