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

    new TicTacToe({
        PlayField: playArea,
        Player1Name: submittedData.namePlayer1,
        Player2Name: submittedData.namePlayer2,
        PlayFirstSuit: submittedData.choosePlayWith,
    });
};


/* -------------------Modal Window---------------------- */
formModalRef.addEventListener('submit', toggleModal);
function toggleModal() {
    backdropRef.classList.toggle("is-hidden");
};
/* ----------------------------------------- */