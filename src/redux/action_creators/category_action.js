import { SAVE_PRODUCT_LIST } from '../action_types';

export const createSaveCategoryAction = (value) => ({
  type: SAVE_PRODUCT_LIST,
  data: value,
});
