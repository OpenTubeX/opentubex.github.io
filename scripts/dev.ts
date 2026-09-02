const env = { ...process.env };

if (!env.GH_TOKEN) {
	const ghPath = Bun.which('gh');

	if (ghPath) {
		const tokenResult = Bun.spawnSync([ghPath, 'auth', 'token'], {
			stdout: 'pipe',
			stderr: 'ignore',
		});
		const token = tokenResult.success ? tokenResult.stdout.toString().trim() : '';

		if (token) env.GH_TOKEN = token;
	}
}

const astro = Bun.spawn([process.execPath, 'x', 'astro', 'dev', ...Bun.argv.slice(2)], {
	env,
	stdin: 'inherit',
	stdout: 'inherit',
	stderr: 'inherit',
});

process.exit(await astro.exited);
