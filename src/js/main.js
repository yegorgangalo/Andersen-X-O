import TicTacToe from './components/TicTacToe';

/* --------REFS------------- */
const refs = {
    formModalRef: document.querySelector('[data-form-modal]'),
    backdropRef: document.querySelector("[data-backdrop]"),
    playArea: document.querySelector('[play-area]'),
}
const { formModalRef, backdropRef, playArea} = refs;


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

    new TicTacToe({
        playField: playArea,
        player1Name: submittedData.namePlayer1,
        player2Name: submittedData.namePlayer2,
        playFirstSuit: submittedData.choosePlayWith,
    });


};


/* -------------------Modal Window---------------------- */
formModalRef.addEventListener('submit', toggleModal);
function toggleModal() {
    backdropRef.classList.toggle("is-hidden");
};
/* ----------------------------------------- */