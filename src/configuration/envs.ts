// Importamos dependencias
import 'dotenv/config';
import * as joi from 'joi';

// Creamos una interfaz que se encargue de mejorar el tipado de nuestro codigo
interface VariablesDeEntorno {
    PORT: number;
    JWT_SEED: string;
    DATABASE_URL:string;
}

// Configuramos JOI
const envs_schema = joi.object({
    PORT: joi.number().integer().required(), // definimos tipo y si es requerido
    DATABASE_URL: joi.string().required(), // definimos tipo y si es requerido
    JWT_SEED: joi.string().required(), // definimos tipo y si es requerido
}).unknown(true);

/**
 * @return error | variables de entorno (value)
 */
const {error, value} = envs_schema.validate(process.env);

if(error) throw new Error(`Config validation error: ${error.message}`);

const variables_entorno: VariablesDeEntorno = value;

export const envs = {
    port: variables_entorno.PORT,
    database_url: variables_entorno.DATABASE_URL,
    jwt_seed: variables_entorno.JWT_SEED
}
