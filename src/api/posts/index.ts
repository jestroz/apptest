import { t } from 'elysia'
import type { ElysiaApp } from '../../app'
import Database, { schema } from '../../db'
import { eq } from 'drizzle-orm';

export default (app: ElysiaApp) => app.get('/', async (context) => {
	// Find posts in DB
	const posts = await Database.getInstance().db.query.posts.findMany();

	// Return posts
	return posts
})