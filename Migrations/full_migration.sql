--
-- File generated with SQLiteStudio v3.4.17 on fre. mar 13 12:17:33 2026
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Game
CREATE TABLE IF NOT EXISTS Game (game_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, developer TEXT, status TEXT);
INSERT INTO Game (game_id, title, description, developer, status) VALUES (1, 'The Witcher 3: Wild Hunt', 'Open world RPG', 'CD Projekt Red', 'Completed');
INSERT INTO Game (game_id, title, description, developer, status) VALUES (2, 'Minecraft', 'Sandbox survival game', 'Mojang', 'Playing');
INSERT INTO Game (game_id, title, description, developer, status) VALUES (3, 'Valorant', 'Tactical FPS', 'Riot Games', 'Paused');
INSERT INTO Game (game_id, title, description, developer, status) VALUES (4, 'Stardew Valley', 'Farming simulator RPG', 'ConcernedApe', 'Completed');

-- Table: Game_genre
CREATE TABLE IF NOT EXISTS Game_genre (
    genre_game_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id         INTEGER NOT NULL,
    genre_id        INTEGER NOT NULL,
    FOREIGN KEY (game_id) REFERENCES Game(game_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id) ON DELETE CASCADE
);
INSERT INTO Game_genre (genre_game_id, game_id, genre_id) VALUES (1, 1, 1);
INSERT INTO Game_genre (genre_game_id, game_id, genre_id) VALUES (2, 1, 2);
INSERT INTO Game_genre (genre_game_id, game_id, genre_id) VALUES (3, 2, 5);
INSERT INTO Game_genre (genre_game_id, game_id, genre_id) VALUES (4, 2, 4);
INSERT INTO Game_genre (genre_game_id, game_id, genre_id) VALUES (5, 3, 3);
INSERT INTO Game_genre (genre_game_id, game_id, genre_id) VALUES (6, 4, 1);
INSERT INTO Game_genre (genre_game_id, game_id, genre_id) VALUES (7, 4, 4);

-- Table: Genre
CREATE TABLE IF NOT EXISTS Genre (
    genre_id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL
);
INSERT INTO Genre (genre_id, name) VALUES (1, 'RPG');
INSERT INTO Genre (genre_id, name) VALUES (2, 'Adventure');
INSERT INTO Genre (genre_id, name) VALUES (3, 'Shooter');
INSERT INTO Genre (genre_id, name) VALUES (4, 'Simulation');
INSERT INTO Genre (genre_id, name) VALUES (5, 'Sandbox');
INSERT INTO Genre (genre_id, name) VALUES (6, 'Strategy');

-- Table: User_game
CREATE TABLE IF NOT EXISTS User_game (
    game_user_id    INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id         INTEGER NOT NULL,
    user_id         INTEGER NOT NULL,
    FOREIGN KEY (game_id) REFERENCES Game(game_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
INSERT INTO User_game (game_user_id, game_id, user_id) VALUES (1, 1, 1);
INSERT INTO User_game (game_user_id, game_id, user_id) VALUES (2, 2, 1);
INSERT INTO User_game (game_user_id, game_id, user_id) VALUES (3, 3, 2);
INSERT INTO User_game (game_user_id, game_id, user_id) VALUES (4, 4, 3);
INSERT INTO User_game (game_user_id, game_id, user_id) VALUES (5, 2, 4);

-- Table: Users
CREATE TABLE IF NOT EXISTS Users (
    user_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    username    TEXT NOT NULL,
    email       TEXT NOT NULL
);
INSERT INTO Users (user_id, username, email) VALUES (1, 'felix', 'felix@example.com');
INSERT INTO Users (user_id, username, email) VALUES (2, 'anna', 'anna@example.com');
INSERT INTO Users (user_id, username, email) VALUES (3, 'mats', 'mats@example.com');
INSERT INTO Users (user_id, username, email) VALUES (4, 'lena', 'lena@example.com');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
