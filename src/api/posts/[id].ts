import { t } from 'elysia'
import type { ElysiaApp } from '../../app'
import Database, { schema } from '../../db'
import { eq } from 'drizzle-orm';

export default (app: ElysiaApp) => app.get('/', async (context) => {
	const postId = Number.parseInt(context.params.id, 10);

	// Check for valid ID
	if (isNaN(postId)) {
		return context.error(400, 'No ID provided')
	}

	// Find post in DB
	const post = await Database.getInstance().db.query.posts.findFirst({ where: eq(schema.posts.id, postId) });
	if (!post) {
		return context.error(404, 'Post not found')
	}

	// Return post if valid
	return post
}, {
	params: t.Object({
		id: t.String()
	})
})