import { Router } from "express";

export const flashcardInfoRouter = Router();

flashcardInfoRouter.get('/', (req, res) => {
	res.send('info menu')
})

flashcardInfoRouter.get('/stats', (req, res) => {
	throw new Error('no stats at this time');
	res.send(`
<html>
	<body>
		<h1>Flashcard Stats</h1>
		<p>testing</p>
	</body>
</html>
	`)
});

flashcardInfoRouter.get('/logs', (req, res) => {
	res.send(`
<html>
	<body>
		<h1>Flashcard Logs</h1>
		<p>testing</p>
	</body>
</html>
	`)
});
