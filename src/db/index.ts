import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';

export default class Database {
	public db = drizzle(postgres(process.env.DB_URI), { schema });
	public queryClient = postgres(process.env.DB_URI);
	public static instance: Database;

	public static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}

		return new Database();
	}

	public async migrate() {
		console.log('Migrating database...');

		const migrationClient = postgres(process.env.DB_URI, { max: 1 });
		await migrate(drizzle(migrationClient), { migrationsFolder: './src/db/drizzle' }).then(() => {
			console.log('Migration complete!');
			migrationClient.end();
		});
	}
}

export { schema };
