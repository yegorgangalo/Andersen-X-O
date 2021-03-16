export default class TicTacToe {
    constructor({
        PlayField,
        Player1Name,
        Player2Name,
        PlayFirstSuit = "X",
    }) {
        this.clickCount = 0;
        this.PLAYER1 = {
            name: Player1Name?.trim() ? Player1Name : "Player1",
            suit: PlayFirstSuit,
            victory: 0
        };
        this.PLAYER2 = {
            name: Player2Name?.trim() ? Player2Name : "Player2",
            suit: PlayFirstSuit === "X" ? "O" : "X",
            victory: 0
        };
        this.refs = this.getRefs(PlayField);
        this.refs.spanPlayerNameRef.textContent = this.PLAYER1.name;
        this.refs.spanPlayWithRef.textContent = this.PLAYER1.suit;
        this.refs.spanScoreName1Ref.textContent = this.PLAYER1.name;
        this.refs.spanScoreName2Ref.textContent = this.PLAYER2.name;
        this.refs.spanScoreVictory1Ref.textContent = this.PLAYER1.victory;
        this.refs.spanScoreVictory2Ref.textContent = this.PLAYER2.victory;
        this.refs.playCellCollection.forEach(cell => cell.addEventListener('click', this.putMarkInCell.bind(this)));
    }

    getRefs(PlayField) {
        const refs = {};
        refs.spanPlayerNameRef = PlayField.querySelector('[player-name]');
        refs.spanPlayWithRef = PlayField.querySelector('[play-with-xo]');
        refs.spanScoreName1Ref = PlayField.querySelector('[score-player1]');
        refs.spanScoreName2Ref = PlayField.querySelector('[score-player2]');
        refs.spanScoreVictory1Ref = PlayField.querySelector('[score-victory1]');
        refs.spanScoreVictory2Ref = PlayField.querySelector('[score-victory2]');
        refs.playCellCollection = PlayField.querySelectorAll('.play-field td')
        return refs;
    }

    putMarkInCell(event) {
        const currentCell = event.target;
        if (currentCell.textContent !== '') {
            return;
        }
        this.clickCount += 1;
        currentCell.textContent = this.clickIsOdd() ? this.PLAYER1.suit : this.PLAYER2.suit;
        this.isWinner(currentCell) && this.endGame();
        this.changePlayer();
    }

    clickIsOdd() {
        return this.clickCount % 2 ? true : false;
    }

    endGame() {
        this.clickIsOdd()
            ? (this.PLAYER1.victory += 1, this.refs.spanScoreVictory1Ref.textContent = this.PLAYER1.victory)
            : (this.PLAYER2.victory += 1, this.refs.spanScoreVictory2Ref.textContent = this.PLAYER2.victory);
        this.refs.playCellCollection.forEach(cell => cell.textContent = '');
        this.clickCount = this.clickIsOdd() ? 1 : 0;
    }

    changePlayer() {
        const playerName = this.refs.spanPlayerNameRef;
        const playWith = this.refs.spanPlayWithRef;
        this.clickIsOdd()
            ? (playerName.textContent = this.PLAYER2.name, playWith.textContent = this.PLAYER2.suit)
            : (playerName.textContent = this.PLAYER1.name, playWith.textContent = this.PLAYER1.suit)
    }

    isWinner(markedCell) {
        if (this.clickCount < 5) {
            return;
        }
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