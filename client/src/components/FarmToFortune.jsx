import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FarmToFortune = () => {
  const navigate = useNavigate();
  console.log("navigate", navigate);
  const onExit = () => {
    console.log("clicked");
    navigate("/userDashboard");
  };
  const initialState = {
    money: 500,
    crops: 0,
    seeds: 0,
    loan: 0,
  };

  const [state, setState] = useState(initialState);
  const [message, setMessage] = useState(
    "Welcome to your farm! Start by buying seeds."
  );
  const [gameWon, setGameWon] = useState(false);

  // Define possible actions
  const actions = [
    { name: "Buy Seeds 🌱", cost: 50, effect: { seeds: 1 } },
    { name: "Sell Crops 🌾", earn: 150, effect: { crops: -1 } },
    { name: "Plant Seeds 🌿", effect: { seeds: -1, crops: 1 } },
    { name: "Take Loan 💰", loan: 200, effect: { loan: 200, money: 200 } },
    { name: "Repay Loan 🏦", repay: 220, effect: { loan: -200, money: -220 } },
  ];

  const handleAction = (action) => {
    let newState = { ...state };
    let actionMessage = "";

    // Check if action is possible
    if (action.cost && newState.money < action.cost) {
      setMessage("Not enough money!");
      return;
    }

    if (action.earn && newState.crops <= 0) {
      setMessage("No crops to sell!");
      return;
    }

    if (action.name === "Plant Seeds 🌿" && newState.seeds <= 0) {
      setMessage("No seeds to plant!");
      return;
    }

    if (action.repay && newState.money < action.repay) {
      setMessage("Not enough money to repay loan!");
      return;
    }

    if (action.repay && newState.loan <= 0) {
      setMessage("You don't have any loans to repay.");
      return;
    }

    // Apply action effects
    if (action.cost) {
      newState.money -= action.cost;
      actionMessage = `Purchased seeds for ₹${action.cost}`;
    }

    if (action.earn && newState.crops > 0) {
      newState.money += action.earn;
      actionMessage = `Sold crops for ₹${action.earn}`;
    }

    if (action.loan) {
      newState.loan += action.loan;
      newState.money += action.loan;
      actionMessage = `Took a loan of ₹${action.loan}`;
    }

    if (action.repay) {
      const interest = action.repay - 200;
      newState.loan -= 200;
      newState.money -= action.repay;
      actionMessage = `Repaid $200 loan with ₹${interest} interest`;
    }

    // Apply other effects
    Object.keys(action.effect).forEach((key) => {
      if (key !== "money" && key !== "loan") {
        // Already handled above
        newState[key] += action.effect[key];

        if (key === "seeds" && action.effect[key] > 0) {
          actionMessage = `Bought ${action.effect[key]} seed(s)`;
        } else if (key === "crops" && action.effect[key] > 0) {
          actionMessage = "Successfully planted seeds";
        }
      }
    });

    // Check for win condition
    if (newState.money >= 2000 && newState.loan <= 0) {
      setGameWon(true);
      actionMessage = "🎉 Congratulations! You've built a thriving farm! 🎉";
    }

    setState(newState);
    setMessage(actionMessage);
  };

  const resetGame = () => {
    setState(initialState);
    setMessage("Welcome to your farm! Start by buying seeds.");
    setGameWon(false);
  };

  return (
    <div className="w-full h-full flex justify-center bg-blue-600/80">
      <div className="flex flex-col items-center p-4 px-10 bg-white shadow-xl shadow-black/70 bg-opacity-90 w-10/12 h-[100vh]">
        <h1 className="text-3xl font-extrabold mb-4 mt-4">Farm to Fortune 🌾</h1>

        <div
          className={`mb-4 p-2 rounded text-center w-1/2 ${
            gameWon ? "bg-green-200 font-bold" : "bg-gray-200 font-semibold shadow-md shadow-black/20"
          }`}
        >
          {message}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-200 shadow-md shadow-black/30 p-4 rounded-lg w-full">
          <div className="p-2 font-bold">💰 Money: ₹{state.money}</div>
          <div className="p-2 font-bold">🌱 Seeds: {state.seeds}</div>
          <div className="p-2 font-bold">🌾 Crops: {state.crops}</div>
          <div
            className={`p-2 font-bold ${state.loan > 0 ? "text-red-600" : ""}`}
          >
            🏦 Loan: ₹{state.loan}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          {actions.map((action) => (
            <button
              key={action.name}
              onClick={() => handleAction(action)}
              className={`p-2 bg-blue-500 shadow-md shadow-black/30 transition duration-500 text-white rounded cursor-pointer ${
                (action.cost && state.money < action.cost) ||
                (action.earn && state.crops <= 0) ||
                (action.name === "Plant Seeds 🌿" && state.seeds <= 0) ||
                (action.repay &&
                  (state.money < action.repay || state.loan <= 0))
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
              disabled={
                (action.cost && state.money < action.cost) ||
                (action.earn && state.crops <= 0) ||
                (action.name === "Plant Seeds 🌿" && state.seeds <= 0) ||
                (action.repay &&
                  (state.money < action.repay || state.loan <= 0))
              }
            >
              {action.name}
              {action.cost ? ` (-₹${action.cost})` : ""}
              {action.earn ? ` (+₹${action.earn})` : ""}
              {action.loan ? ` (+₹${action.loan})` : ""}
              {action.repay ? ` (-₹${action.repay})` : ""}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          {gameWon && (
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
            >
              Play Again
            </button>
          )}

          <button
            onClick={() => onExit()}
            className="px-4 py-2 transition duration-500 shadow-md shadow-black/30 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600"
          >
            Exit Game
          </button>
        </div>

        <div className="mt-4 text-sm text-center">
          <p className="text-xl font-bold mb-4">Grow your farm and earn ₹2000 while being debt-free to win!</p>
          <p>
            <strong className="text-lg">Game Guide:</strong>
          </p>
          <p className="text-[18px]">1. Buy seeds with money 🌱</p>
          <p className="text-[18px]">2. Plant seeds to grow crops 🌿</p>
          <p className="text-[18px]">3. Sell crops for profit 🌾</p>
          <p className="text-[18px]">
            4. Take loans if needed, but remember to pay them back with interest
            🏦
          </p>
          <p className="text-[18px]">5. Reach ₹2000 with no debt to win! 🏆</p>
        </div>
      </div>
    </div>
  );
};

export default FarmToFortune;
