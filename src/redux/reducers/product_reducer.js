import { SAVE_CATEGORY_LIST } from '../action_types';
// 初始化数据
let initState = [];
export default function CategoryListReducer(preState = initState, action) {
  const { type, data } = action;
  // console.log(data);
  let newState;
  switch (type) {
    case SAVE_CATEGORY_LIST:
      newState = [...data]
      return newState;
    default:
      return preState;
  }
}
