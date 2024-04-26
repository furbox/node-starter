import { createClient } from 'redis';
import RedisStore from "connect-redis"
import session from 'express-session'
import envs from '../config/envs.js'

export class CacheManager {
    constructor() {
        this.client = createClient({
            url: envs.REDIS_URL
        })

        this.client.connect();

        this.redisStore = new RedisStore({
            client: this.client
        })

        this.sessionMiddleware = session({
            store: this.redisStore,
            secret: envs.COOKIE_SECRET,
            saveUninitialized: false,
            resave: false,
            name: 'sessionId',
            cookie: {
                secure: process.env.ENVIROMENT === "production",
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 // 1 semana
            }
        })

    }

    async connectIfNeeded() {
        if (this.client.isReady) {
            return;
        }

        await this.client.connect()
    }

    async set(key, value) {
        await this.connectIfNeeded();
        const valueString = JSON.stringify(value);
        await this.client.set(key, valueString);
    }

    async get(key) {
        await this.connectIfNeeded();
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }
}