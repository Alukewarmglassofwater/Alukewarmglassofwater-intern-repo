import * as Joi from 'joi';

export const envSchema = Joi.object({
  // Database
  DB_HOST: Joi.alternatives()
    .try(Joi.string().hostname(), Joi.string().ip())
    .required(),
  DB_PORT: Joi.number().port().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  // Redis
  REDIS_HOST: Joi.alternatives()
    .try(Joi.string().hostname(), Joi.string().ip())
    .required(),
  REDIS_PORT: Joi.number().port().required(),
}).unknown(true); // allow other vars
