document.addEventListener('DOMContentLoaded', () => {      const squares = document.querySelectorAll(".grid div"),
        grid = document.querySelector(".grid"),
        currentPlayer = document.querySelector("#current-player"),
        result = document.querySelector("#result");
      let player = 1;

      const declareWinner = (w) => {
        result.textContent = `Player ${w} Won! Congratulations! <3`;
        grid.setAttribute("style", "pointer-events:none");
        setTimeout(() => {
          document
            .querySelectorAll(".player-one")
            .forEach((sq) => sq.classList.remove("player-one", "taken"));
          document
            .querySelectorAll(".player-two")
            .forEach((sq) => sq.classList.remove("player-two", "taken"));
          grid.setAttribute("style", "");
          result.textContent = "";
          player = 1;
          currentPlayer.textContent = player;
        }, 3000);
      };

      const checkLines = (ar, i) => {
        const oneWin = ar.every(
            (n) => squares[n] && squares[n].classList.contains("player-one")
          ),
          twoWin = ar.every(
            (n) => squares[n] && squares[n].classList.contains("player-two")
          );

        if (oneWin) {
          declareWinner("One");
        } else if (twoWin) {
          declareWinner("Two");
        }
      };

      const checkBoard = (i) => {
        let winArr = [
          [i, i + 6, i + 12, i + 18],
          [i, i + 7, i + 14, i + 21],
          [i, i + 8, i + 16, i + 24],
          [i, i + 1, i + 2, i + 3],
          [i, i - 1, i - 2, i - 3],
        ];
        winArr.forEach((ar, i) => {
          checkLines(ar, i);
        });
      };

      const checkPlayer = (i) => {
        if (player === 1) {
          squares[i].classList.add("taken", "player-one");
          player = 2;
        } else if (player === 2) {
          squares[i].classList.add("taken", "player-two");
          player = 1;
        }
        currentPlayer.textContent = player;
      };

      grid.addEventListener("click", (e) => {
        let clicked = e.target.id - 1;
        if (
          squares[clicked + 7].classList.contains("taken") &&
          !squares[clicked].classList.contains("taken")
        ) {
          checkPlayer(clicked);
        } else {
          alert("Can't add this");
        }
        checkBoard(clicked);
      });

})
