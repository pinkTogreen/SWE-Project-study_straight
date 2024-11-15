export async function register() {
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		const db = await import('./lib/db')
		await db.default()
	}
}

/*
I don't think this is needed, yet I'm unsure if I'm supposed to delete it
commenting it out does not affect the application
*/