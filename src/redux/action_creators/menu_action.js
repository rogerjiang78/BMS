import { SAVE_TITLE } from '../action_types'

export const createSaveTitleAction = (value) => ({
  type: SAVE_TITLE,
  data: value
})
