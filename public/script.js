async function henteBrukere() {
    const res = await fetch('/allGames');
    const games = await res.json();

    games.forEach(game => {
        const rad = document.createElement('div');
        rad.classList.add('game');

        const gameName = document.createElement('h1');
        gameName.textContent = Game.title;
        rad.appendChild(gameName);

        tabellBody.appendChild(rad);
    });
}