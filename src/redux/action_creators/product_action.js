import { SAVE_PRODUCT_LIST } from '../action_types'

export const createSaveProductAction = (value) => ({
  type: SAVE_PRODUCT_LIST,
  data: value
})
