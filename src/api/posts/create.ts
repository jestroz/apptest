import { t } from 'elysia'
import type { ElysiaApp } from '../../app'
import Database, { schema } from '../../db'

export default (app: ElysiaApp) => app.post('/', async (context) => {
	// Create post in DB
	const newPost = await Database.getInstance().db.insert(schema.posts).values({ content: context.body.content }).returning();
	if (!newPost) {
		return context.error(500, 'Failed to create post!')
	}

	// Return post if valid
	return newPost
}, {
	body: t.Object({
		content: t.String()
	})
})