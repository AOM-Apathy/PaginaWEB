const gameForm = document.getElementById('game-form');
const gamesContainer = document.getElementById('games-container');
const btnShowAdd = document.getElementById('btn-add-game');
const addSection = document.getElementById('add-game-section');

let games = JSON.parse(localStorage.getItem('myGames')) || [];

// Mostrar/Ocultar formulario
btnShowAdd.addEventListener('click', () => {
    addSection.classList.toggle('hidden');
});

// Registrar Juego
gameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('game-title').value;
    const progress = document.getElementById('game-progress').value;

    const newGame = {
        id: Date.now(),
        title,
        progress,
        completed: false
    };

    games.push(newGame);
    saveAndRender();
    gameForm.reset();
    addSection.classList.add('hidden');
});

function toggleComplete(id) {
    games = games.map(game => 
        game.id === id ? { ...game, completed: !game.completed } : game
    );
    saveAndRender();
}

function deleteGame(id) {
    games = games.filter(game => game.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('myGames', JSON.stringify(games));
    renderGames();
    updateStats();
}

function updateStats() {
    document.getElementById('completed-count').innerText = games.filter(g => g.completed).length;
    document.getElementById('playing-count').innerText = games.filter(g => !g.completed).length;
}

function renderGames() {
    gamesContainer.innerHTML = '';
    games.forEach(game => {
        const div = document.createElement('div');
        div.classList.add('game-card');
        if (game.completed) div.classList.add('completed');

        div.innerHTML = `
            <h3>${game.title}</h3>
            <p>Avance: ${game.progress}</p>
            <p>Estado: ${game.completed ? '✅ Completado' : '🎮 Jugando'}</p>
            <button onclick="toggleComplete(${game.id})">${game.completed ? 'Reabrir' : 'Marcar Completado'}</button>
            <button onclick="deleteGame(${game.id})" style="background:gray; color:white;">Eliminar</button>
        `;
        gamesContainer.appendChild(div);
    });
}

// Carga inicial
renderGames();
updateStats();