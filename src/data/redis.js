import { createClient } from 'redis';
import envs from '../config/envs.js'

export class CacheManager {
    constructor() {
        this.client = createClient({
            url: envs.REDIS_URL
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