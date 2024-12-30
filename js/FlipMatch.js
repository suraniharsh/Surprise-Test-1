const GAME_CONFIG = {
    MATCH_SCORE: 10,
    FLIP_DELAY: 1000,
    GRID_SIZE: 16,
    ANIMATION_DURATION: 500
};


const CARD_PAIRS = [
    { symbol: '🎮', name: 'gaming' },
    { symbol: '🎲', name: 'dice' },
    { symbol: '🎯', name: 'target' },
    { symbol: '🎨', name: 'art' },
    { symbol: '🎭', name: 'theater' },
    { symbol: '🎪', name: 'circus' },
    { symbol: '🎟️', name: 'ticket' },
    { symbol: '🎬', name: 'movie' }
];

let gameState = {
    cards: [],
    flippedCards: [],
    moves: 0,
    score: 0,
    canFlip: true,
    isGameOver: false,
    matchedPairs: 0
};

const DOM = {
    elements: {
        gameBoard: 'gameBoard',
        moves: 'moves',
        score: 'score',
        winModal: 'winModal',
        finalScore: 'finalScore',
        finalMoves: 'finalMoves'
    },
    refs: {},
    init() {
        for (const [key, id] of Object.entries(this.elements)) {
            const element = document.getElementById(id);
            if (!element) {
                console.error(`Element with id '${id}' not found!`);
                continue;
            }
            this.refs[key] = element;
        }
    }
};

const SoundManager = {
    sounds: {},
    async init() {
        try {
            this.sounds = {
                flip: new Audio('../sounds/flip.mp3'),
                match: new Audio('../sounds/match.mp3'),
                win: new Audio('../sounds/win.mp3')
            };
            
            await Promise.all(
                Object.values(this.sounds).map(sound => 
                    sound.load().catch(err => console.warn('Sound loading failed:', err))
                )
            );
        } catch (error) {
            console.warn('Sound initialization failed:', error);
        }
    },
    play(soundName) {
        try {
            const sound = this.sounds[soundName];
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(err => console.warn('Sound playback failed:', err));
            }
        } catch (error) {
            console.warn('Sound playback error:', error);
        }
    }
};

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function createCardElement(symbol, index) {
    const card = document.createElement('div');
    card.className = 'memory-card card bg-white rounded-lg aspect-square cursor-pointer transform transition-all duration-500 relative hover:shadow-lg';
    
    card.innerHTML = `
        <div class="card-face front absolute inset-0 flex items-center justify-center text-3xl bg-white rounded-lg transform transition-transform duration-500 backface-hidden">
            <span class="text-gray-400">❓</span>
        </div>
        <div class="card-face back absolute inset-0 flex items-center justify-center text-4xl bg-white rounded-lg transform transition-transform duration-500 backface-hidden">
            <span>${symbol}</span>
        </div>
    `;

    card.dataset.symbol = symbol;
    card.dataset.index = index;
    return card;
}

function handleCardClick(card) {
    if (!canPlayerFlipCard(card)) return;

    flipCard(card);
    gameState.flippedCards.push(card);

    if (gameState.flippedCards.length === 2) {
        handlePairFlipped();
    }
}

function canPlayerFlipCard(card) {
    return (
        gameState.canFlip &&
        !gameState.flippedCards.includes(card) &&
        !card.classList.contains('matched') &&
        !gameState.isGameOver &&
        gameState.flippedCards.length < 2
    );
}

function flipCard(card) {
    card.classList.add('flipped');
    SoundManager.play('flip');
}

function handlePairFlipped() {
    gameState.moves++;
    updateGameStats();
    
    const [firstCard, secondCard] = gameState.flippedCards;
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
        handleMatch(firstCard, secondCard);
    } else {
        handleMismatch(firstCard, secondCard);
    }
}

function handleMatch(firstCard, secondCard) {
    SoundManager.play('match');
    gameState.matchedPairs++;
    
    [firstCard, secondCard].forEach(card => {
        card.classList.add('matched');
        card.style.animation = 'matchPulse 0.5s ease-out';
        setTimeout(() => {
            card.style.animation = '';
        }, GAME_CONFIG.ANIMATION_DURATION);
    });

    gameState.score += GAME_CONFIG.MATCH_SCORE;
    updateGameStats();
    
    gameState.flippedCards = [];
    
    if (gameState.matchedPairs === CARD_PAIRS.length) {
        setTimeout(handleGameWin, GAME_CONFIG.ANIMATION_DURATION);
    }
}

function handleMismatch(firstCard, secondCard) {
    gameState.canFlip = false;
    
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        gameState.flippedCards = [];
        gameState.canFlip = true;
    }, GAME_CONFIG.FLIP_DELAY);
}

function updateGameStats() {
    if (DOM.refs.moves) DOM.refs.moves.textContent = gameState.moves;
    if (DOM.refs.score) DOM.refs.score.textContent = gameState.score;
}

function handleGameWin() {
    gameState.isGameOver = true;
    SoundManager.play('win');
    
    if (DOM.refs.finalScore) DOM.refs.finalScore.textContent = gameState.score;
    if (DOM.refs.finalMoves) DOM.refs.finalMoves.textContent = gameState.moves;
    if (DOM.refs.winModal) DOM.refs.winModal.classList.remove('hidden');
}

function initializeGame() {
    gameState = {
        cards: [],
        flippedCards: [],
        moves: 0,
        score: 0,
        canFlip: true,
        isGameOver: false,
        matchedPairs: 0
    };

    const cardPairs = [...CARD_PAIRS, ...CARD_PAIRS];
    const shuffledCards = shuffleArray(cardPairs);

    if (DOM.refs.gameBoard) {
        DOM.refs.gameBoard.innerHTML = '';
        shuffledCards.forEach((card, index) => {
            const cardElement = createCardElement(card.symbol, index);
            cardElement.addEventListener('click', () => handleCardClick(cardElement));
            DOM.refs.gameBoard.appendChild(cardElement);
        });
    }

    updateGameStats();
    if (DOM.refs.winModal) {
        DOM.refs.winModal.classList.add('hidden');
    }
}

const gameStyles = `
    .memory-card {
        perspective: 1000px;
    }
    .backface-hidden {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }
    .card-face {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: transform 0.5s;
    }
    .card.flipped .front {
        transform: rotateY(180deg);
    }
    .card.flipped .back {
        transform: rotateY(0);
    }
    .card-face.back {
        transform: rotateY(180deg);
    }
    .matched {
        background-color: #e2e8f0;
    }
    @keyframes matchPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); background-color: #c7ddf5; }
        100% { transform: scale(1); }
    }
`;

async function init() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = gameStyles;
    document.head.appendChild(styleSheet);

    DOM.init();

    await SoundManager.init();

    initializeGame();
}

window.addEventListener('DOMContentLoaded', init);
window.restartGame = initializeGame;
