// referanse til HTML-elementer
const outputElement = document.getElementById("output");
const statusElement = document.getElementById("status");

const btnGames = document.getElementById("btnGames");
const btnUsers = document.getElementById("btnUsers");
const btnGenres = document.getElementById("btnGenres");
const btnGameById = document.getElementById("btnGameById");
const gameIdInput = document.getElementById("gameId");

// Async funksjon for å hente data fra en API
async function fetchData(path) {
	try {
		const response = await fetch(path);
		const data = await response.json();
		outputElement.textContent = JSON.stringify(data, null, 2);
	} catch (err) {
		outputElement.textContent = "Error: " + err;
	}
}

btnGames.addEventListener("click", () => fetchData("/games"));
btnUsers.addEventListener("click", () => fetchData("/users"));
btnGenres.addEventListener("click", () => fetchData("/genres"));

// Søk etter spill basert på ID med validering
btnGameById.addEventListener("click", () => {
	const id = Number(gameIdInput.value);

	if (!id || id < 1) {
		statusElement.textContent = "Enter a valid ID";
		return;
	}

	fetchData("/games/" + id);
});
