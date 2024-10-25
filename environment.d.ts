declare module 'bun' {
	interface Env {
		readonly NODE_ENV: 'development' | 'testing' | 'production';
		readonly PORT: number;
		readonly DB_URI: string;
	}
}
