import Joi from 'joi'

export const getBetsValidator = Joi.object({
  champId: Joi.string().pattern(/^[0-9]+$/),
  matchId: Joi.string().pattern(/^[0-9]+$/)
})

export const getManyValidator = Joi.object({
  better: Joi.string().pattern(/^[0-9]+$/)
})
