function registerApi(app, database) {
	app.get("/games", (req, res) => {
		const rows = database.prepare("SELECT * FROM Game").all();
		res.json(rows);
	});

	app.get("/games/:id", (req, res) => {
		// Leser id fra URL-en, f.eks. /games/2 -> req.params.id = "2"
		const gameId = Number(req.params.id);
		// ? er en plassholder: verdien gameId settes trygt inn av better-sqlite3
		const row = database.prepare("SELECT * FROM Game WHERE game_id = ?").get(gameId);

		if (!row) {
			return res.status(404).json({ error: "Game not found" });
		}

		res.json(row);
	});

	app.get("/users", (req, res) => {
		const rows = database.prepare("SELECT * FROM Users").all();
		res.json(rows);
	});

	app.get("/genres", (req, res) => {
		const rows = database.prepare("SELECT * FROM Genre").all();
		res.json(rows);
	});

	app.get('/allUsersGames', (req, res) => {
		const rows = database.prepare(`
			SELECT users.username, game.title, game.description
			FROM users
			INNER JOIN user_game
			ON users.user_id = user_game.user_id
			INNER JOIN game
			ON user_game.game_id = game.game_id
			WHERE users.user_id = ?`).all();
		res.json(rows);
	});
}

// Gjør funksjonen tilgjengelig for andre filer (brukes i app.js via require)
module.exports = registerApi;
