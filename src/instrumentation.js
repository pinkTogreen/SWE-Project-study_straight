import connect from '@/lib/db'

export async function register() {
	await connect()
}

/*
I don't think this is needed, yet I'm unsure if I'm supposed to delete it
commenting it out does not affect the application
*/