import { mergeRawSchemas } from '../utils/mergeRawSchemas'
import championships from './championships'
import matches from './matches'
import bet from './bet'

export default mergeRawSchemas(
  championships,
  bet,
  matches
)
