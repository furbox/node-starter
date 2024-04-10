import 'dotenv/config'
import env from 'env-var'

const envs = {
    APP_NAME: env.get('APP_NAME').required().asString()
}

export default envs