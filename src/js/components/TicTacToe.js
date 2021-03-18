export default class TicTacToe {
    constructor({
        playField,
        player1Name,
        player2Name,
        player1Victory = 0,
        player2Victory = 0,
        player1Suit,
        clickCount = 0
    }) {
        this._clickCount = clickCount || 0;
        this.PLAYER1 = {
            name: player1Name?.trim() || "Player1",
            suit: player1Suit || "X",
            victory: Number(player1Victory) || 0
        };
        this.PLAYER2 = {
            name: player2Name?.trim() || "Player2",
            suit: player1Suit === "X" ? "O" : "X",
            victory: Number(player2Victory) || 0
        };
        this.refs = this.getRefs(playField);
        const { spanPlayerNameRef, spanPlayWithRef, spanScoreName1Ref, spanScoreName2Ref, spanScoreVictory1Ref, spanScoreVictory2Ref, playFieldRef, refreshBtnRef, restartBtnRef } = this.refs;
        spanPlayerNameRef.textContent = this.clickIsOdd() ? this.PLAYER2.name : this.PLAYER1.name;
        spanPlayWithRef.textContent = this.clickIsOdd() ? this.PLAYER2.suit : this.PLAYER1.suit;
        spanScoreName1Ref.textContent = this.PLAYER1.name;
        spanScoreName2Ref.textContent = this.PLAYER2.name;
        spanScoreVictory1Ref.textContent = this.PLAYER1.victory;
        spanScoreVictory2Ref.textContent = this.PLAYER2.victory;
        playFieldRef.addEventListener('click', this.putMarkInCell);
        refreshBtnRef.addEventListener('click', this.refreshGame);
        restartBtnRef.addEventListener('click', this.restartGame);
    }

    getRefs(playField) {
        return {
            playFieldRef: playField,
            spanPlayerNameRef: playField.querySelector('[player-name]'),
            spanPlayWithRef: playField.querySelector('[play-with-xo]'),
            spanScoreName1Ref: playField.querySelector('[score-player1]'),
            spanScoreName2Ref: playField.querySelector('[score-player2]'),
            spanScoreVictory1Ref: playField.querySelector('[score-victory1]'),
            spanScoreVictory2Ref: playField.querySelector('[score-victory2]'),
            playCellCollection: playField.querySelectorAll('.play-field td'),
            refreshBtnRef: playField.querySelector('[refresh-btn]'),
            restartBtnRef: playField.querySelector('[restart-btn]'),
            backdropRef: document.querySelector("[data-backdrop]")
        }
    }

    getClickCount = () => this._clickCount;

    putMarkInCell = ({ target }) => {
        const { id, textContent, tagName } = target;
        if ( tagName !== 'TD' || textContent !== '') {
            return;
        }
        this._clickCount += 1;
        target.textContent = this.clickIsOdd() ? this.PLAYER1.suit : this.PLAYER2.suit;
        this.changePlayer();
        if (this._clickCount < 5) {
            return;
        }
        const isWinner = this.isWinner(id);
        if (isWinner) {
            this.addPlusOneVictory();
            this.refreshGame();
            return;
        }
        if (this._clickCount > 8 && this.checkIsAllCellsMarked() && !isWinner) {
            this.refreshGame();
            return;
        }
    }

    clickIsOdd() {
        return Boolean(this._clickCount % 2);
    }

    checkIsAllCellsMarked() {
        return ![...this.refs.playCellCollection].find(cell => cell.textContent === '');
    }

    addPlusOneVictory() {
        if (this.clickIsOdd()) {
            this.PLAYER1.victory += 1;
            this.refs.spanScoreVictory1Ref.textContent = this.PLAYER1.victory;
            return;
        }
        this.PLAYER2.victory += 1;
        this.refs.spanScoreVictory2Ref.textContent = this.PLAYER2.victory;
    }

    refreshGame = () => {
        this.refs.playCellCollection.forEach(cell => cell.textContent = '');
        this._clickCount = this.clickIsOdd() ? 1 : 0;
    }

    restartGame = () => {
        localStorage.removeItem('playProgressXO');
        this.refreshGame();
        const { playFieldRef, backdropRef,refreshBtnRef, restartBtnRef} = this.refs;
        playFieldRef.classList.toggle('visually-hidden');
        backdropRef.classList.toggle("is-hidden");
        playFieldRef.removeEventListener('click', this.putMarkInCell);
        refreshBtnRef.removeEventListener('click', this.refreshGame);
        restartBtnRef.removeEventListener('click', this.restartGame);
        this.PLAYER1 = null;
        this.PLAYER2 = null;
        this.refs = null;
    }

    changePlayer() {
        const { spanPlayerNameRef, spanPlayWithRef } = this.refs;
        if (this.clickIsOdd()) {
            spanPlayerNameRef.textContent = this.PLAYER2.name;
            spanPlayWithRef.textContent = this.PLAYER2.suit;
            return;
        }
        spanPlayerNameRef.textContent = this.PLAYER1.name;
        spanPlayWithRef.textContent = this.PLAYER1.suit;
    }

    isWinner(id) {
        if (!(id % 2)) {
            return this.checkIsWinRow(id) || this.checkIsWinColomn(id);
        }
        return this.checkIsWinRow(id) || this.checkIsWinColomn(id) || this.checkIsWinDiagonal(id);
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
        const isWinMainDiagonal = () => this.toCompare(0, 4);
        const isWinSecondDiagonal = () => this.toCompare(2, 2);

        const id = Number(cellId);
        if (id === 1 || id === 9) {
            return isWinMainDiagonal();
        }
        if (id === 3 || id === 7) {
            return isWinSecondDiagonal();
        }
        if (id === 5) {
            return isWinMainDiagonal() || isWinSecondDiagonal();
        }
    }

    toCompare(firstCellIndex, gap) {
        const cells = this.refs.playCellCollection;
        const firstCell = cells[firstCellIndex].textContent;
        const secondCell = cells[firstCellIndex + gap].textContent;
        const thirdCell = cells[firstCellIndex + 2 * gap].textContent;
        return firstCell === secondCell && secondCell === thirdCell;
    }
}