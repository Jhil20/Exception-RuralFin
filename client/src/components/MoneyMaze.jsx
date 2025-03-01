import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MoneyMaze = () => {
  const gridSize = 5;
  const initialPlayer = { x: 0, y: 0, balance: 1000 };
  const [level, setLevel] = useState(1);
  const maxLevel = 3;
  const navigate = useNavigate();
  const onExit = () => {
    navigate("/userDashboard");
  };

  // Define different goal positions for each level
  const goals = {
    1: { x: 4, y: 4 },
    2: { x: 0, y: 4 },
    3: { x: 4, y: 0 },
  };

  // Get current goal based on level
  const goal = goals[level];

  // Define cells for each level with increasing difficulty
  const levelCells = {
    1: [
      { x: 1, y: 1, type: "tax", effect: -150 },
      { x: 2, y: 2, type: "stock", effect: 250 },
      { x: 3, y: 1, type: "medical", effect: -180 },
      { x: 4, y: 2, type: "bonus", effect: 300 },
      { x: 0, y: 2, type: "lottery", effect: 400 },
      { x: 1, y: 3, type: "rent", effect: -250 },
      { x: 3, y: 3, type: "business", effect: 350 },
      { x: 4, y: 0, type: "lawsuit", effect: -350 },
      { x: 2, y: 4, type: "inheritance", effect: 500 },
      { x: 0, y: 4, type: "donation", effect: 150 },
    ],
    2: [
      { x: 0, y: 1, type: "crypto", effect: -400 },
      { x: 1, y: 0, type: "startup", effect: 450 },
      { x: 1, y: 2, type: "divorce", effect: -500 },
      { x: 2, y: 3, type: "realestate", effect: 600 },
      { x: 2, y: 1, type: "insurance", effect: 250 },
      { x: 3, y: 2, type: "education", effect: -300 },
      { x: 3, y: 4, type: "sidehustle", effect: 350 },
      { x: 4, y: 3, type: "mortgage", effect: -450 },
      { x: 4, y: 1, type: "promotion", effect: 500 },
      { x: 2, y: 4, type: "fraud", effect: -550 },
    ],
    3: [
      { x: 0, y: 2, type: "market_crash", effect: -700 },
      { x: 1, y: 1, type: "ipo", effect: 800 },
      { x: 1, y: 3, type: "bankruptcy", effect: -600 },
      { x: 2, y: 0, type: "inheritance", effect: 900 },
      { x: 2, y: 2, type: "healthcare", effect: -500 },
      { x: 2, y: 4, type: "investment", effect: 700 },
      { x: 3, y: 1, type: "debt", effect: -800 },
      { x: 3, y: 3, type: "royalty", effect: 600 },
      { x: 4, y: 2, type: "tax_audit", effect: -900 },
      { x: 4, y: 4, type: "lawsuit", effect: -750 },
    ],
  };

  // Get current level's cells
  const cells = levelCells[level];
  const [player, setPlayer] = useState(initialPlayer);
  const [gameOver, setGameOver] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [message, setMessage] = useState("");

  const movePlayer = (dx, dy) => {
    if (gameOver) return;

    const newX = player.x + dx;
    const newY = player.y + dy;

    if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) return;
    let newBalance = player.balance;
    const cell = cells.find((c) => c.x === newX && c.y === newY);

    if (cell) {
      newBalance += cell.effect;
      const action = cell.effect > 0 ? "gained" : "lost";
      const amount = Math.abs(cell.effect);
      setMessage(`You ${action} $${amount} from ${cell.type}`);
    } else {
      setMessage("");
    }
    setPlayer({ x: newX, y: newY, balance: newBalance });

    // Check if player reached the goal
    if (newX === goal.x && newY === goal.y) {
      if (level < maxLevel) {
        // Level complete but not the final level
        setLevelComplete(true);
        setMessage(
          `Level ${level} complete! 🎉 Click 'Next Level' to continue.`
        );
      } else {
        // Game complete - won all levels
        setGameOver(true);
        setMessage("Congratulations! You've achieved Financial Freedom! 🎉");
      }
    }

    // Check if player is broke
    if (newBalance <= 0) {
      setGameOver(true);
      setMessage("Game Over! You're broke! 💸");
    }
  };

  const resetGame = () => {
    setPlayer(initialPlayer);
    setGameOver(false);
    setLevelComplete(false);
    setLevel(1);
    setMessage("");
  };

  const nextLevel = () => {
    if (level < maxLevel) {
      setLevel((prev) => prev + 1);
      setPlayer(initialPlayer);
      setLevelComplete(false);
      setMessage(`Starting Level ${level + 1}`);
    }
  };

  const getCellContent = (x, y) => {
    if (x === goal.x && y === goal.y) return "🏆";
    const cell = cells.find((c) => c.x === x && c.y === y);
    // Level 1 cell icons
    if (cell?.type === "stock") return "📈";
    if (cell?.type === "tax") return "📝";
    if (cell?.type === "bonus") return "💰";
    if (cell?.type === "medical") return "🏥";
    if (cell?.type === "lottery") return "🎟";
    if (cell?.type === "rent") return "🏠";
    if (cell?.type === "business") return "🏢";
    if (cell?.type === "lawsuit") return "⚖";
    if (cell?.type === "inheritance") return "📜";
    if (cell?.type === "donation") return "🎁";

    // Level 2 cell icons
    if (cell?.type === "crypto") return "₿";
    if (cell?.type === "startup") return "🚀";
    if (cell?.type === "divorce") return "💔";
    if (cell?.type === "realestate") return "🏘";
    if (cell?.type === "insurance") return "🛡";
    if (cell?.type === "education") return "🎓";
    if (cell?.type === "sidehustle") return "💼";
    if (cell?.type === "mortgage") return "🏦";
    if (cell?.type === "promotion") return "📊";
    if (cell?.type === "fraud") return "🕵";

    // Level 3 cell icons
    if (cell?.type === "market_crash") return "📉";
    if (cell?.type === "ipo") return "🔔";
    if (cell?.type === "bankruptcy") return "💣";
    if (cell?.type === "healthcare") return "💊";
    if (cell?.type === "investment") return "💎";
    if (cell?.type === "debt") return "🔗";
    if (cell?.type === "royalty") return "👑";
    if (cell?.type === "tax_audit") return "🔍";
    return "";
  };

  const getCellColor = (x, y) => {
    if (player.x === x && player.y === y) return "#3182ce";
    if (x === goal.x && y === goal.y) return "#48bb78";

    const cell = cells.find((c) => c.x === x && c.y === y);
    if (cell?.effect > 0) return "#9ae6b4";
    if (cell?.effect < 0) return "#feb2b2";

    return "#e2e8f0";
  };

  return (
    <div className="flex bg-blue-600/80 justify-center items-center bg-opacity-90 shadow-lg w-full h-[100vh]">
      <div className="w-8/12 flex justify-center items-center h-full bg-white bg-opacity-90 shadow-xl shadow-black/80">
        <div className="mt-4 w-1/3 text-sm text-center ml-10">
          <p className="text-2xl font-bold text-left">
            Reach the trophy 🏆 with a positive balance to complete the level!
          </p>
          <p className="text-lg text-left font-semibold mt-4">
            Current level: {level} of {maxLevel}
          </p>
          <p className="text-lg text-left">
            Watch out for negative events that decrease your money:
          </p>
          {level === 1 && (
            <p className="text-lg text-left">
              Taxes 📝, Medical bills 🏥, Rent 🏠, Lawsuits ⚖
            </p>
          )}
          {level === 2 && (
            <p className="text-lg text-left">
              - Crypto losses ₿, Divorce 💔, Education costs 🎓, Mortgage 🏦,
              Fraud 🕵
            </p>
          )}
          {level === 3 && (
            <p className="text-lg text-left">
              - Market crash 📉, Bankruptcy 💣, Healthcare 💊, Debt 🔗, Tax
              audit 🔍
            </p>
          )}
          <p className="text-lg text-left font-semibold mt-4">
            Collect positive events to increase your balance:
          </p>
          {level === 1 && (
            <p className="text-lg text-left">
              Stocks 📈, Bonuses 💰, Lottery wins 🎟, Business profits 🏢,
              Inheritance 📜, Donations 🎁
            </p>
          )}
          {level === 2 && (
            <p className="text-lg text-left">
              - Startup success 🚀, Real estate 🏘, Insurance payouts 🛡, Side
              hustle 💼, Promotion 📊
            </p>
          )}
          {level === 3 && (
            <p className="text-lg text-left">
              - IPO gains 🔔, Inheritance 📜, Investments 💎, Royalties 👑
            </p>
          )}
        </div>

        <div className="flex w-2/3 flex-wrap justify-center pl-36">
          <h1 className="text-xl font-bold w-full mb-2 text-center">
            Money Maze - Level {level}
          </h1>
          <h2 className="text-lg mb-4 w-full text-center">
            Balance: ₹{player.balance}
          </h2>

          {message && (
            <div className="flex justify-center w-full">
              <div
                className={`p-2 w-80 rounded-lg shadow-lg mb-6 text-center ${
                  gameOver
                    ? message.includes("Freedom")
                      ? "bg-green-200"
                      : "bg-red-200"
                    : "bg-gray-200"
                }`}
              >
                {message}
              </div>
            </div>
          )}

          <div
            className={`grid gap-2 mb-4`}
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {[...Array(gridSize)].map((_, y) =>
              [...Array(gridSize)].map((_, x) => (
                <div
                  key={`${x}-${y}`}
                  className="w-14 h-14 flex items-center justify-center border border-gray-300 rounded-md relative"
                  style={{ backgroundColor: getCellColor(x, y) }}
                >
                  {getCellContent(x, y)}
                  {player.x === x && player.y === y && (
                    <div className="absolute w-full h-full flex items-center justify-center text-2xl text-white font-bold drop-shadow-md">
                      🧑
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col w-full items-center gap-2">
            <button
              onClick={() => movePlayer(0, -1)}
              disabled={gameOver}
              className={`px-4 py-2 text-white cursor-pointer hover:shadow-black/30 hover:shadow-lg transition duration-700 rounded ${
                gameOver ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
              }`}
            >
              ⬆ Up
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => movePlayer(-1, 0)}
                disabled={gameOver}
                className={`px-4 py-2 text-white cursor-pointer hover:shadow-black/30 hover:shadow-lg transition duration-700 rounded ${
                  gameOver ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                }`}
              >
                ⬅ Left
              </button>
              <button
                onClick={() => movePlayer(1, 0)}
                disabled={gameOver}
                className={`px-4 py-2 text-white cursor-pointer hover:shadow-black/30 hover:shadow-lg transition duration-700 rounded ${
                  gameOver ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                }`}
              >
                Right ➡
              </button>
            </div>

            <button
              onClick={() => movePlayer(0, 1)}
              disabled={gameOver}
              className={`px-4 py-2 text-white cursor-pointer hover:shadow-black/30 hover:shadow-lg transition duration-700 rounded ${
                gameOver ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
              }`}
            >
              Down ⬇
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            {gameOver && (
              <button
                onClick={resetGame}
                className="px-4 py-2 cursor-pointer hover:shadow-lg hover:shadow-black/40 transition duration-700 bg-green-500 text-white rounded"
              >
                Play Again
              </button>
            )}
            {levelComplete && (
              <button
                onClick={nextLevel}
                className="px-4 py-2 cursor-pointer hover:shadow-lg hover:shadow-black/40 transition duration-700 bg-purple-500 text-white rounded"
              >
                Next Level
              </button>
            )}
            <button
              onClick={onExit}
              className="px-4 py-2 cursor-pointer hover:shadow-lg hover:shadow-black/40 transition duration-700 bg-red-500 text-white rounded"
            >
              Exit Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyMaze;
