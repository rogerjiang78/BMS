import { SAVE_CATEGORY_LIST } from '../action_types'

export const createSaveProductAction = (value) => ({
  type: SAVE_CATEGORY_LIST,
  data: value
})
