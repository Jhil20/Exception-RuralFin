import React, { useState } from 'react';

const FarmToFortune = ({ onExit }) => {
  const initialState = {
    money: 500,
    crops: 0,
    seeds: 0,
    loan: 0,
  };
  
  const [state, setState] = useState(initialState);
  const [message, setMessage] = useState("Welcome to your farm! Start by buying seeds.");
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
      actionMessage = `Purchased seeds for $${action.cost}`;
    }
    
    if (action.earn && newState.crops > 0) {
      newState.money += action.earn;
      actionMessage = `Sold crops for $${action.earn}`;
    }
    
    if (action.loan) {
      newState.loan += action.loan;
      newState.money += action.loan;
      actionMessage = `Took a loan of $${action.loan}`;
    }
    
    if (action.repay) {
      const interest = action.repay - 200;
      newState.loan -= 200;
      newState.money -= action.repay;
      actionMessage = `Repaid $200 loan with $${interest} interest`;
    }
    
    // Apply other effects
    Object.keys(action.effect).forEach((key) => {
      if (key !== "money" && key !== "loan") { // Already handled above
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'auto'
    }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Farm to Fortune 🌾</h1>
      
      <div style={{ 
        marginBottom: '1rem', 
        padding: '0.5rem', 
        backgroundColor: gameWon ? '#c6f6d5' : '#e2e8f0',
        borderRadius: '0.25rem',
        fontWeight: gameWon ? 'bold' : 'normal',
        textAlign: 'center',
        width: '100%'
      }}>
        {message}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.5rem',
        marginBottom: '1rem',
        backgroundColor: '#f7fafc',
        padding: '1rem',
        borderRadius: '0.5rem',
        width: '100%'
      }}>
        <div style={{ padding: '0.5rem', fontWeight: 'bold' }}>💰 Money: ${state.money}</div>
        <div style={{ padding: '0.5rem', fontWeight: 'bold' }}>🌱 Seeds: {state.seeds}</div>
        <div style={{ padding: '0.5rem', fontWeight: 'bold' }}>🌾 Crops: {state.crops}</div>
        <div style={{ padding: '0.5rem', fontWeight: 'bold', color: state.loan > 0 ? '#e53e3e' : 'inherit' }}>
          🏦 Loan: ${state.loan}
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '0.5rem',
        width: '100%'
      }}>
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={() => handleAction(action)}
            style={{
              padding: '0.5rem',
              backgroundColor: '#4299e1',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              opacity: (
                (action.cost && state.money < action.cost) || 
                (action.earn && state.crops <= 0) || 
                (action.name === "Plant Seeds 🌿" && state.seeds <= 0) ||
                (action.repay && (state.money < action.repay || state.loan <= 0))
              ) ? '0.5' : '1',
            }}
            disabled={
              (action.cost && state.money < action.cost) || 
              (action.earn && state.crops <= 0) || 
              (action.name === "Plant Seeds 🌿" && state.seeds <= 0) ||
              (action.repay && (state.money < action.repay || state.loan <= 0))
            }
          >
            {action.name}
            {action.cost ? ` (-$${action.cost})` : ''}
            {action.earn ? ` (+$${action.earn})` : ''}
            {action.loan ? ` (+$${action.loan})` : ''}
            {action.repay ? ` (-$${action.repay})` : ''}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {gameWon && (
          <button
            onClick={resetGame}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Play Again
          </button>
        )}
        
        <button
          onClick={onExit}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#f56565',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}
        >
          Exit Game
        </button>
      </div>
      
      <div style={{ marginTop: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
        <p>Grow your farm and earn $2000 while being debt-free to win!</p>
        <p><strong>Game Guide:</strong></p>
        <p>1. Buy seeds with money 🌱</p>
        <p>2. Plant seeds to grow crops 🌿</p>
        <p>3. Sell crops for profit 🌾</p>
        <p>4. Take loans if needed, but remember to pay them back with interest 🏦</p>
        <p>5. Reach $2000 with no debt to win! 🏆</p>
      </div>
    </div>
  );
};

export default FarmToFortune;