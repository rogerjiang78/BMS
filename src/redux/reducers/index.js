import { combineReducers } from 'redux';
import loginReducer from './login_reducer';
import menuReducer from './menu_reducer';
import productListReducer from './product_reducer';
import categoryListReducer from './category_reducer'

export default combineReducers({
  userInfo: loginReducer,
  title: menuReducer,
  productList: productListReducer,
  categoryList: categoryListReducer,
});
