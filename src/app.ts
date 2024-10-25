import { Elysia } from 'elysia'
import { autoroutes } from 'elysia-autoroutes'
import Database from './db';

// Migrate DB
await Database.getInstance().migrate();

const port = process.env.PORT || 5372;

const app = new Elysia()
	.use(
		autoroutes({
			routesDir: './api',
			generateTags: false,
		})
	)
	.listen(port)

console.log(`Example web server running -> http://localhost:${port}`)

export type ElysiaApp = typeof app