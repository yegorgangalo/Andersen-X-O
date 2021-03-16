export default class TicTacToe {
    constructor({
        playField,
        player1Name,
        player2Name,
        playFirstSuit = "X",
    }) {
        this.clickCount = 0;
        this.PLAYER1 = {
            name: player1Name?.trim() ? player1Name : "Player1",
            suit: playFirstSuit,
            victory: 0
        };
        this.PLAYER2 = {
            name: player2Name?.trim() ? player2Name : "Player2",
            suit: playFirstSuit === "X" ? "O" : "X",
            victory: 0
        };
        this.refs = this.getRefs(playField);
        this.refs.spanPlayerNameRef.textContent = this.PLAYER1.name;
        this.refs.spanPlayWithRef.textContent = this.PLAYER1.suit;
        this.refs.spanScoreName1Ref.textContent = this.PLAYER1.name;
        this.refs.spanScoreName2Ref.textContent = this.PLAYER2.name;
        this.refs.spanScoreVictory1Ref.textContent = this.PLAYER1.victory;
        this.refs.spanScoreVictory2Ref.textContent = this.PLAYER2.victory;
        this.refs.playField.addEventListener('click', this.putMarkInCell.bind(this));
    }

    getRefs(playField) {
        return {
            playField,
            spanPlayerNameRef: playField.querySelector('[player-name]'),
            spanPlayWithRef: playField.querySelector('[play-with-xo]'),
            spanScoreName1Ref: playField.querySelector('[score-player1]'),
            spanScoreName2Ref: playField.querySelector('[score-player2]'),
            spanScoreVictory1Ref: playField.querySelector('[score-victory1]'),
            spanScoreVictory2Ref: playField.querySelector('[score-victory2]'),
            playCellCollection: playField.querySelectorAll('.play-field td')
        }
    }

    putMarkInCell(event) {
        const currentCell = event.target;
        if ( currentCell.tagName !== 'TD' || currentCell.textContent !== '') {
            return;
        }
        this.clickCount += 1;
        currentCell.textContent = this.clickIsOdd() ? this.PLAYER1.suit : this.PLAYER2.suit;
        this.isWinner(currentCell.id) && this.endGame();
        this.changePlayer();
    }

    clickIsOdd() {
        return Boolean(this.clickCount % 2);
    }

    endGame() {
        if (this.clickIsOdd()) {
            this.PLAYER1.victory += 1;
            this.refs.spanScoreVictory1Ref.textContent = this.PLAYER1.victory;
        } else {
            this.PLAYER2.victory += 1;
            this.refs.spanScoreVictory2Ref.textContent = this.PLAYER2.victory;
        }

        this.refs.playCellCollection.forEach(cell => cell.textContent = '');
        this.clickCount = this.clickIsOdd() ? 1 : 0;
    }

    changePlayer() {
        const playerName = this.refs.spanPlayerNameRef;
        const playWith = this.refs.spanPlayWithRef;

        if (this.clickIsOdd()) {
            playerName.textContent = this.PLAYER2.name;
            playWith.textContent = this.PLAYER2.suit;
        } else {
            playerName.textContent = this.PLAYER1.name;
            playWith.textContent = this.PLAYER1.suit;
        }
    }

    isWinner(id) {
        if (this.clickCount < 5) {
            return;
        }
        if (!(id % 2)) {
            const isWin = this.checkIsWinRow(id) || this.checkIsWinColomn(id);
            return isWin;
        }
        const isWin = this.checkIsWinRow(id) || this.checkIsWinColomn(id) || this.checkIsWinDiagonal(id);
        return isWin;
    }

    checkIsWinRow(id) {
        let index = null;
        if (id / 3 <= 1) {
            index = 0;
        }
        if (id / 3 > 1 && id / 3 <= 2) {
            index = 3;
        }
        if (id / 3 > 2 && id / 3 <= 3) {
            index = 6;
        }
        return this.toCompare(index, 1);
    }

    checkIsWinColomn(id) {
        let index = null;
        if (id % 3 === 1) {
            index = 0;
        }
        if (id % 3 === 2) {
            index = 1;
        }
        if (id % 3 === 0) {
            index = 2;
        }
        return this.toCompare(index, 3);
    }

    checkIsWinDiagonal(cellId) {
        const id = Number(cellId);
        if (id === 1 || id === 9) {
            return this.isWinMainDiagonal();
        }
        if (id === 3 || id === 7) {
            return this.isWinSecondDiagonal();
        }
        if (id === 5) {
            return this.isWinMainDiagonal() || this.isWinSecondDiagonal();
        }
    }

    isWinMainDiagonal() {
        const index = 0;
        return this.toCompare(index, 4);
    }

    isWinSecondDiagonal() {
        const index = 2;
        return this.toCompare(index, 2);
    }

    toCompare(firstCellIndex, gap) {
        const cells = this.refs.playCellCollection;
        const firstCell = cells[firstCellIndex].textContent;
        const secondCell = cells[firstCellIndex + gap].textContent;
        const thirdCell = cells[firstCellIndex + 2 * gap].textContent;
        const isWin = (firstCell === secondCell && secondCell === thirdCell);
        return isWin;
    }
}