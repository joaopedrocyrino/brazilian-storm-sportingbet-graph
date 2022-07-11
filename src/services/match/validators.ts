import Joi from 'joi'

export const getManyValidator = Joi.object({
  champId: Joi.string().pattern(/^[0-9]+$/)
})
