const {PLAYER1, PLAYER2} = {
    PLAYER1: {
        name: "Player1",
        suit: "",
    },
    PLAYER2: {
        name: "Player2",
        suit: "",
    }
}

/* --------REFS------------- */
const refs = {
    formModalRef: document.querySelector('[data-form-modal]'),
    backdropRef: document.querySelector("[data-backdrop]"),
    spanPlayerNameRef: document.querySelector('[player-name]'),
    spanPlayWithRef: document.querySelector('[play-with-xo]'),
}

const { formModalRef, backdropRef, spanPlayerNameRef, spanPlayWithRef } = refs;


/* --------FORM in modal window------------- */
  const takeFormData = event => {
    event.preventDefault();
    const formRef = event.target;
    const formData = new FormData(formRef);
    const submittedData = {};

    formData.forEach((value, key) => {
      submittedData[key] = value;
    });

      if (submittedData.namePlayer1) {
          PLAYER1.name = submittedData.namePlayer1;
      }
      if (submittedData.namePlayer1) {
          PLAYER2.name = submittedData.namePlayer2;
      }
      PLAYER1.suit = submittedData.choosePlayWith;
      PLAYER2.suit = PLAYER1.suit === "X" ? "O" : "X";

      spanPlayerNameRef.textContent = PLAYER1.name;
      spanPlayWithRef.textContent = PLAYER1.suit;
  };

formModalRef && formModalRef.addEventListener('submit', takeFormData);


    /* -------------------Modal Window---------------------- */
    function toggleModal() {
        backdropRef.classList.toggle("is-hidden");
    };

    formModalRef && formModalRef.addEventListener('submit', toggleModal);
/* ----------------------------------------- */

const playCellCollection = document.querySelectorAll('.play-field td')
playCellCollection.forEach(cell => cell.addEventListener('click', putMarkInCell));

function putMarkInCell(event) {
    const currentCell = event.target;
    if (currentCell.textContent !== '') {
        return;
    }
    currentCell.textContent = spanPlayerNameRef.textContent === PLAYER1.name
        ? PLAYER1.suit
        : PLAYER2.suit;

    isWinner(currentCell) && alert("Winner");
    changePlayer();
}

function changePlayer() {
    spanPlayerNameRef.textContent === PLAYER1.name
        ? (spanPlayerNameRef.textContent = PLAYER2.name, spanPlayWithRef.textContent = PLAYER2.suit)
        : (spanPlayerNameRef.textContent = PLAYER1.name, spanPlayWithRef.textContent = PLAYER1.suit)
}

function isWinner(markedCell) {
    const mark = markedCell.textContent;
    switch (markedCell.id) {
        case "1":
            if (playCellCollection[1].textContent === mark && playCellCollection[2].textContent === mark ||
                playCellCollection[3].textContent === mark && playCellCollection[6].textContent === mark ||
                playCellCollection[4].textContent === mark && playCellCollection[8].textContent === mark
            ) {
                return true;
                }
            break;
        case "2":
            if (playCellCollection[0].textContent === mark && playCellCollection[2].textContent === mark ||
                playCellCollection[4].textContent === mark && playCellCollection[7].textContent === mark
            ) {
                return true;
                }
            break;
        case "3":
            if (playCellCollection[0].textContent === mark && playCellCollection[1].textContent === mark ||
                playCellCollection[5].textContent === mark && playCellCollection[8].textContent === mark ||
                playCellCollection[4].textContent === mark && playCellCollection[6].textContent === mark
            ) {
                return true;
                }
            break;
        case "4":
            if (playCellCollection[0].textContent === mark && playCellCollection[6].textContent === mark ||
                playCellCollection[4].textContent === mark && playCellCollection[5].textContent === mark
            ) {
                return true;
                }
            break;
        case "5":
            if (playCellCollection[0].textContent === mark && playCellCollection[8].textContent === mark ||
                playCellCollection[1].textContent === mark && playCellCollection[7].textContent === mark ||
                playCellCollection[2].textContent === mark && playCellCollection[6].textContent === mark ||
                playCellCollection[3].textContent === mark && playCellCollection[5].textContent === mark
            ) {
                return true;
                }
            break;
        case "6":
            if (playCellCollection[2].textContent === mark && playCellCollection[8].textContent === mark ||
                playCellCollection[3].textContent === mark && playCellCollection[4].textContent === mark
            ) {
                return true;
                }
            break;
        case "7":
            if (playCellCollection[0].textContent === mark && playCellCollection[3].textContent === mark ||
                playCellCollection[2].textContent === mark && playCellCollection[4].textContent === mark ||
                playCellCollection[7].textContent === mark && playCellCollection[8].textContent === mark
            ) {
                return true;
                }
            break;
        case "8":
            if (playCellCollection[1].textContent === mark && playCellCollection[4].textContent === mark ||
                playCellCollection[6].textContent === mark && playCellCollection[8].textContent === mark
            ) {
                return true;
                }
            break;
        case "9":
            if (playCellCollection[0].textContent === mark && playCellCollection[4].textContent === mark ||
                playCellCollection[2].textContent === mark && playCellCollection[5].textContent === mark ||
                playCellCollection[6].textContent === mark && playCellCollection[7].textContent === mark
            ) {
                return true;
                }
            break;

        default:
            break;
    }
    // if ( markedCell.id = 1) {
    //     return true;
    // }
}