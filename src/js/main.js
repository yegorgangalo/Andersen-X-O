import TicTacToe from './components/TicTacToe';

/* --------REFS------------- */
const refs = {
    formModalRef: document.querySelector('[data-form-modal]'),
    backdropRef: document.querySelector("[data-backdrop]"),
    playArea: document.querySelector('[play-area]'),
    playCellCollection: document.querySelectorAll('.play-field td')
}
const { formModalRef, backdropRef, playArea, playCellCollection} = refs;

/* -------------------LOCAL STORAGE----------------------- */
(() => {
    if (!localStorage.getItem('playProgressXO')) {
        toggleModal();
        return;
    }

    playArea.classList.toggle('visually-hidden');
    const playProgressString = localStorage.getItem('playProgressXO');
    const playProgressObj = JSON.parse(playProgressString);
    const { PLAYER1, PLAYER2, clickCount, playCellContent} = playProgressObj;
    playCellCollection.forEach((cell, idx) => cell.textContent = playCellContent[idx])

    const xo = new TicTacToe({
        playField: playArea,
        player1Name: PLAYER1.name,
        player2Name: PLAYER2.name,
        player1Victory: PLAYER1.victory,
        player2Victory: PLAYER2.victory,
        player1Suit:PLAYER1.suit,
        clickCount
    });

    window.addEventListener('beforeunload', () => setLocalStorage(xo));
})()

function setLocalStorage({ PLAYER1, PLAYER2, getClickCount }) {
    if (!PLAYER1 || !PLAYER2 || !getClickCount) {
        return;
    }
    const playProgressObj = {
        PLAYER1,
        PLAYER2,
        clickCount: getClickCount(),
        playCellContent: [...playCellCollection].map(cell => cell.textContent)
    }
    localStorage.setItem('playProgressXO', JSON.stringify(playProgressObj));
}

/* --------FORM in modal window------------- */
formModalRef.addEventListener('submit', takeFormData);
function takeFormData(event) {
    event.preventDefault();
    const formRef = event.target;
    const formData = new FormData(formRef);
    const submittedData = {};

    formData.forEach((value, key) => {
        submittedData[key] = value;
    });

    playArea.classList.toggle('visually-hidden');

    const { namePlayer1, namePlayer2, choosePlayWith} = submittedData;
    const xo = new TicTacToe({
        playField: playArea,
        player1Name: namePlayer1,
        player2Name: namePlayer2,
        player1Suit: choosePlayWith,
    });

    window.addEventListener('beforeunload', () => setLocalStorage(xo));
    toggleModal();
};

/* -------------------Modal Window---------------------- */
function toggleModal() {
    backdropRef.classList.toggle("is-hidden");
};
/* ----------------------------------------- */