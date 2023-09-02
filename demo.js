// 初始化
let round = 1;
let playerWins = 0;
let robotWins = 0;
let playerLosses = 0;
let robotLosses = 0;
let playerConsecutiveWins = 0;
let robotConsecutiveWins = 0;

function updateRoundText() {
    const roundText = document.querySelector(".round");
    roundText.textContent = `回合 ${round}（${round} / 3）`;
}

// 处理游戏逻辑的函数，接受玩家选择的手势作为参数
function playRound(playerChoice) {
    // 机器人的手势
    const choices = ["rock", "paper", "scissor"];
    const robotChoice = choices[Math.floor(Math.random() * 3)];

    // 显示手势图片
    const playerGesture = document.querySelector(".my .gesture");
    playerGesture.innerHTML = `<img class="my-img" src="./images/${playerChoice}.png" alt="${playerChoice}">`;
    const robotGesture = document.querySelector(".robot .gesture");
    robotGesture.innerHTML = `<img class="robot-img" src="./images/${robotChoice}.png" alt="${robotChoice}">`;

    let resultText = "";
    // 每局输赢情况
    if (playerChoice === robotChoice) {
        resultText = "-- 平局 --";
    } else if (
        (playerChoice === "rock" && robotChoice === "scissor") ||
        (playerChoice === "scissor" && robotChoice === "paper") ||
        (playerChoice === "paper" && robotChoice === "rock")
    ) {
        resultText = "-- 你赢了 --";
        playerWins++;
        robotLosses++;

        robotConsecutiveWins = 0;
        playerConsecutiveWins++;
    } else {
        resultText = "-- 机器人赢了 --";
        robotWins++;
        playerLosses++;

        playerConsecutiveWins = 0;
        robotConsecutiveWins++;
    }

    // 本局结果
    const thisResult = document.querySelector(".this-result");
    thisResult.textContent = resultText;

    // 胜负分数
    const playerWinsElement = document.querySelector(".my .success");
    playerWinsElement.textContent = playerWins;

    const robotWinsElement = document.querySelector(".robot .success");
    robotWinsElement.textContent = robotWins;

    const playerLossesElement = document.querySelector(".my .failure");
    playerLossesElement.textContent = playerLosses;

    const robotLossesElement = document.querySelector(".robot .failure");
    robotLossesElement.textContent = robotLosses;

    round++;
    // 游戏结束
    if (round > 3 || playerConsecutiveWins === 2 || robotConsecutiveWins === 2) {
        const finalResult = document.querySelector(".final-result");
        setTimeout(() => {
            // 隐藏最后一局文本结果
            thisResult.style.display = "none";
        }, 2000);
        setTimeout(() => {
            if (playerWins > robotWins) {
                finalResult.textContent = "🥳恭喜！！你赢了！";
            } else if (playerWins < robotWins) {
                finalResult.textContent = "🤖很遗憾~机器人赢了！";
            } else {
                finalResult.textContent = "ᕙ(`▿´)ᕗ 游戏结束，平局！";
            }
        }, 3000)

    } else {
        //继续下一局
        updateRoundText();
    }
}

function onSubmit(event) {
    event.preventDefault();
    const gestureSelect = document.getElementById("gesture-select");
    const selectedGesture = gestureSelect.value;
    playRound(selectedGesture);
    const selectDialog = document.getElementById("select-dialog");
    selectDialog.close();
}

document.addEventListener("DOMContentLoaded", () => {
    updateRoundText();
    const startButton = document.getElementById("start");
    startButton.addEventListener("click", () => {
        const selectDialog = document.getElementById("select-dialog");
        selectDialog.showModal();
    });

    const selectForm = document.getElementById("select-form");
    selectForm.addEventListener("submit", onSubmit);

    // 重置游戏
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
        location.reload();
    });

});
