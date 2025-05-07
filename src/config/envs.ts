import * as joi from 'joi';

process.loadEnvFile();

interface EnvsState {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const { PORT, PRODUCTS_MICROSERVICE_HOST, PRODUCTS_MICROSERVICE_PORT } =
  value as EnvsState;

export const envs = {
  port: PORT,
  productsMicroserviceHost: PRODUCTS_MICROSERVICE_HOST,
  productsMicroservicePort: PRODUCTS_MICROSERVICE_PORT,
  ordersMicroserviceHost: PRODUCTS_MICROSERVICE_HOST,
  ordersMicroservicePort: PRODUCTS_MICROSERVICE_PORT,
};
