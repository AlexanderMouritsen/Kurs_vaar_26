const path = require("node:path");
const { execFileSync } = require("node:child_process");

const dbPath = path.join(__dirname, "..", "SpillKurs.db");

const sporringer = [
  {
    navn: "1. Alle brukere",
    forklaring: "Viser alt innhold i Users-tabellen.",
    sql: `
SELECT *
FROM Users;
`.trim(),
  },
  {
    navn: "2. Alle spill",
    forklaring: "Viser alt innhold i Game-tabellen.",
    sql: `
SELECT *
FROM Game;
`.trim(),
  },
  {
    navn: "3. Alle sjangre",
    forklaring: "Viser alt innhold i Genre-tabellen.",
    sql: `
SELECT *
FROM Genre;
`.trim(),
  },
  {
    navn: "4. Spill som er Playing",
    forklaring: "Viser spill med status Playing.",
    sql: `
SELECT title, status
FROM Game
WHERE status = 'Playing';
`.trim(),
  },
  {
    navn: "5. Spill fra Mojang",
    forklaring: "Viser spill laget av Mojang.",
    sql: `
SELECT title, developer
FROM Game
WHERE developer = 'Mojang';
`.trim(),
  },
  {
    navn: "6. Hvilke spill har felix?",
    forklaring: "En enkel join mellom Users, User_game og Game.",
    sql: `
SELECT Users.username, Game.title
FROM Users
JOIN User_game ON Users.user_id = User_game.user_id
JOIN Game ON User_game.game_id = Game.game_id
WHERE Users.username = 'felix';
`.trim(),
  },
  {
    navn: "7. Hvilke sjangre har Minecraft?",
    forklaring: "En enkel join mellom Game, Game_genre og Genre.",
    sql: `
SELECT Game.title, Genre.name
FROM Game
JOIN Game_genre ON Game.game_id = Game_genre.game_id
JOIN Genre ON Game_genre.genre_id = Genre.genre_id
WHERE Game.title = 'Minecraft';
`.trim(),
  },
];

function kjorSporring(sql) {
  return execFileSync("sqlite3", ["-header", "-column", dbPath, sql], {
    encoding: "utf8",
  }).trim();
}

if (require.main === module) {
  for (const sporring of sporringer) {
    console.log(`\n${sporring.navn}`);
    console.log(`${sporring.forklaring}\n`);
    console.log(`${sporring.sql}\n`);

    try {
      const resultat = kjorSporring(sporring.sql);
      console.log(resultat || "(Ingen rader)");
    } catch (error) {
      console.error(`Klarte ikke å kjore sporringen: ${error.message}`);
    }
  }
}

module.exports = sporringer;
