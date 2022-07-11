import { UserInputError } from 'apollo-server'
import Joi from 'joi'

class Services {
  protected async gateway ({ schema, req }: {
    schema?: Joi.ObjectSchema<any>
    req: any
  }): Promise<void> {
    this.checkRequest(req, schema)
  }

  private readonly checkRequest = (
    request: any,
    schema?: Joi.ObjectSchema<any>
  ): void => {
    if (schema) {
      const { error } = schema.validate(request)
      if (error) {
        console.log(error)
        throw new UserInputError('')
      }
    }
  }
};

export default Services
