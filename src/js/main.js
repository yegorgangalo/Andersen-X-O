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
    const { scoreName1, scoreName2, scoreVictory1, scoreVictory2, clickCount, playCellContent} = playProgressObj;
    playCellCollection.forEach((cell, idx) => cell.textContent = playCellContent[idx])

    const xo = new TicTacToe({
        playField: playArea,
        player1Name: scoreName1,
        player2Name: scoreName2,
        player1Victory: scoreVictory1,
        player2Victory: scoreVictory2,
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

    const { namePlayer1, namePlayer2, choosePlayWith} = submittedData;
    const xo = new TicTacToe({
        playField: playArea,
        player1Name: namePlayer1,
        player2Name: namePlayer2,
        playNextSuit: choosePlayWith,
    });

    window.addEventListener('beforeunload', ()=>setLocalStorage(xo));
};

function setLocalStorage(xoObj) {
    const { PLAYER1, PLAYER2 } = xoObj;
    const playProgressObj = {
            scoreName1: PLAYER1.name,
            scoreName2: PLAYER2.name,
            scoreVictory1: PLAYER1.victory,
            scoreVictory2: PLAYER2.victory,
            clickCount: xoObj.getClickCount(),
            playCellContent: [...playCellCollection].map(cell => cell.textContent)
    }
    localStorage.setItem('playProgressXO', JSON.stringify(playProgressObj));
}