import { SAVE_PRODUCT_LIST } from '../action_types';

let initState = [];
export default function ProductListReducer(preState = initState, action) {
  const { type, data } = action;
  // console.log(data);
  let newState;
  switch (type) {
    case SAVE_PRODUCT_LIST:
      newState = [...data]
      return newState;
    default:
      return preState;
  }
}
