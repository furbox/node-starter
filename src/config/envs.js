import 'dotenv/config'
import env from 'env-var'

const envs = {
    APP_NAME: env.get('APP_NAME').required().asString(),
    PORT: env.get('PORT').required().asPortNumber(),
    REDIS_URL: env.get('REDIS_URL').required().asString()
}

export default envs