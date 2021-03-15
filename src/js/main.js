class TicTacToe {
    constructor({
        PlayField,
        Player1Name,
        Player2Name,
        PlayFirstSuit = "X",
    }) {
        this.PLAYER1 = {
            name: Player1Name?.trim() ? Player1Name : "Player1",
            suit: PlayFirstSuit
        };
        this.PLAYER2 = {
            name: Player2Name?.trim() ? Player2Name : "Player2",
            suit: PlayFirstSuit === "X" ? "O" : "X"
        };
        this.refs = this.getRefs(PlayField);
        this.refs.spanPlayerNameRef.textContent = this.PLAYER1.name;
        this.refs.spanPlayWithRef.textContent = this.PLAYER1.suit;
        this.refs.playCellCollection.forEach(cell => cell.addEventListener('click', this.putMarkInCell.bind(this)));
    }

    getRefs(PlayField) {
        const refs = {};
        refs.spanPlayerNameRef = PlayField.querySelector('[player-name]');
        refs.spanPlayWithRef = PlayField.querySelector('[play-with-xo]');
        refs.playCellCollection = PlayField.querySelectorAll('.play-field td')
        return refs;
    }

    putMarkInCell(event) {
        const currentCell = event.target;
        if (currentCell.textContent !== '') {
            return;
        }
        currentCell.textContent = this.refs.spanPlayerNameRef.textContent === this.PLAYER1.name
            ? this.PLAYER1.suit
            : this.PLAYER2.suit;

        this.isWinner(currentCell) && alert("Winner");
        this.changePlayer();
    }

    changePlayer() {
        const playerName = this.refs.spanPlayerNameRef;
        const playWith = this.refs.spanPlayWithRef;
        playerName.textContent === this.PLAYER1.name
            ? (playerName.textContent = this.PLAYER2.name, playWith.textContent = this.PLAYER1.suit)
            : (playerName.textContent = this.PLAYER1.name, playWith.textContent = this.PLAYER2.suit)
    }

    isWinner(markedCell) {
        const mark = markedCell.textContent;
        const cells = this.refs.playCellCollection;
    switch (markedCell.id) {
        case "1":
            if (cells[1].textContent === mark && cells[2].textContent === mark ||
                cells[3].textContent === mark && cells[6].textContent === mark ||
                cells[4].textContent === mark && cells[8].textContent === mark
            ) {
                return true;
                }
            break;
        case "2":
            if (cells[0].textContent === mark && cells[2].textContent === mark ||
                cells[4].textContent === mark && cells[7].textContent === mark
            ) {
                return true;
                }
            break;
        case "3":
            if (cells[0].textContent === mark && cells[1].textContent === mark ||
                cells[5].textContent === mark && cells[8].textContent === mark ||
                cells[4].textContent === mark && cells[6].textContent === mark
            ) {
                return true;
                }
            break;
        case "4":
            if (cells[0].textContent === mark && cells[6].textContent === mark ||
                cells[4].textContent === mark && cells[5].textContent === mark
            ) {
                return true;
                }
            break;
        case "5":
            if (cells[0].textContent === mark && cells[8].textContent === mark ||
                cells[1].textContent === mark && cells[7].textContent === mark ||
                cells[2].textContent === mark && cells[6].textContent === mark ||
                cells[3].textContent === mark && cells[5].textContent === mark
            ) {
                return true;
                }
            break;
        case "6":
            if (cells[2].textContent === mark && cells[8].textContent === mark ||
                cells[3].textContent === mark && cells[4].textContent === mark
            ) {
                return true;
                }
            break;
        case "7":
            if (cells[0].textContent === mark && cells[3].textContent === mark ||
                cells[2].textContent === mark && cells[4].textContent === mark ||
                cells[7].textContent === mark && cells[8].textContent === mark
            ) {
                return true;
                }
            break;
        case "8":
            if (cells[1].textContent === mark && cells[4].textContent === mark ||
                cells[6].textContent === mark && cells[8].textContent === mark
            ) {
                return true;
                }
            break;
        case "9":
            if (cells[0].textContent === mark && cells[4].textContent === mark ||
                cells[2].textContent === mark && cells[5].textContent === mark ||
                cells[6].textContent === mark && cells[7].textContent === mark
            ) {
                return true;
                }
            break;

        default:
            break;
    }
}
}


//========================================================//
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