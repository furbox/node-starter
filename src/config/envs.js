import 'dotenv/config'
import env from 'env-var'

const envs = {
    APP_NAME: env.get('APP_NAME').required().asString(),
    PORT: env.get('PORT').required().asPortNumber(),
    REDIS_URL: env.get('REDIS_URL').required().asString(),
    COOKIE_SECRET: env.get('COOKIE_SECRET').required().asString(),
    MJ_APIKEY_PRIVATE: env.get('MJ_APIKEY_PRIVATE').required().asString(),
    MJ_APIKEY_PUBLIC: env.get('MJ_APIKEY_PUBLIC').required().asString(),
}

export default envs