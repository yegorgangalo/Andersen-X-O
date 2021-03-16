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
    const { nextPlayerName, nextPlayWith, scoreName1, scoreName2, scoreVictory1, scoreVictory2, clickCount, playCellContent} = playProgressObj;
    playCellCollection.forEach((cell, idx) => cell.textContent=playCellContent[idx])

    const xo = new TicTacToe({
        playField: playArea,
        player1Name: scoreName1,
        player2Name: scoreName2,
        player1Victory: scoreVictory1,
        player2Victory: scoreVictory2,
        playFirstSuit: nextPlayWith,
        clickCount: clickCount
    });

    window.addEventListener('beforeunload', () => setLocalStorage(xo));

})()

/* -------------------Modal Window---------------------- */
formModalRef.addEventListener('submit', toggleModal);
function toggleModal() {
    backdropRef.classList.toggle("is-hidden");
};
/* ----------------------------------------- */

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

    const xo = new TicTacToe({
        playField: playArea,
        player1Name: submittedData.namePlayer1,
        player2Name: submittedData.namePlayer2,
        playFirstSuit: submittedData.choosePlayWith,
    });

    window.addEventListener('beforeunload', ()=>setLocalStorage(xo));
};

function setLocalStorage(xoObj) {
    const playProgressObj = {
            nextPlayerName: document.querySelector('[player-name]').textContent,
            nextPlayWith: document.querySelector('[play-with-xo]').textContent,
            scoreName1: document.querySelector('[score-player1]').textContent,
            scoreName2: document.querySelector('[score-player2]').textContent,
            scoreVictory1: document.querySelector('[score-victory1]').textContent,
            scoreVictory2: document.querySelector('[score-victory2]').textContent,
            clickCount: xoObj.getClickCount(),
            playCellContent: [...playCellCollection].map(cell => cell.textContent)
    }

    console.log(JSON.stringify(playProgressObj));
    localStorage.setItem('playProgressXO', JSON.stringify(playProgressObj));
}