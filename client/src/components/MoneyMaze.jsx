import React, { useState } from 'react';

const MoneyMaze = ({ onExit }) => {
  const gridSize = 5;
  const initialPlayer = { x: 0, y: 0, balance: 1000 };
  const [level, setLevel] = useState(1);
  const maxLevel = 3;
  
  // Define different goal positions for each level
  const goals = {
    1: { x: 4, y: 4 },
    2: { x: 0, y: 4 },
    3: { x: 4, y: 0 }
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
    ]
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
        setMessage(`Level ${level} complete! 🎉 Click 'Next Level' to continue.`);
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
      setLevel(prev => prev + 1);
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
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Money Maze - Level {level}</h1>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Balance: ${player.balance}</h2>
      
      {message && (
        <div style={{ 
          marginBottom: '1rem', 
          padding: '0.5rem', 
          backgroundColor: gameOver ? (message.includes('Freedom') ? '#c6f6d5' : '#fed7d7') : '#e2e8f0',
          borderRadius: '0.25rem',
          fontWeight: gameOver ? 'bold' : 'normal'
        }}>
          {message}
        </div>
      )}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        {[...Array(gridSize)].map((_, y) =>
          [...Array(gridSize)].map((_, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                width: '3.5rem',
                height: '3.5rem',
                backgroundColor: getCellColor(x, y),
                border: '1px solid #cbd5e0',
                borderRadius: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                position: 'relative'
              }}
            >
              {getCellContent(x, y)}
              {player.x === x && player.y === y && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 'bold',
                  textShadow: '0 0 3px black'
                }}>
                  🧑
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => movePlayer(0, -1)}
          disabled={gameOver}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: gameOver ? '#a0aec0' : '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: gameOver ? 'not-allowed' : 'pointer'
          }}
        >
          ⬆ Up
        </button>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => movePlayer(-1, 0)}
            disabled={gameOver}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: gameOver ? '#a0aec0' : '#4299e1',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: gameOver ? 'not-allowed' : 'pointer'
            }}
          >
            ⬅ Left
          </button>
          
          <button
            onClick={() => movePlayer(1, 0)}
            disabled={gameOver}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: gameOver ? '#a0aec0' : '#4299e1',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: gameOver ? 'not-allowed' : 'pointer'
            }}
          >
            Right ➡
          </button>
        </div>
        
        <button
          onClick={() => movePlayer(0, 1)}
          disabled={gameOver}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: gameOver ? '#a0aec0' : '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: gameOver ? 'not-allowed' : 'pointer'
          }}
        >
          Down ⬇
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {gameOver && (
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
        
        {levelComplete && (
          <button
            onClick={nextLevel}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#9f7aea',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Next Level
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
        <p>Reach the trophy 🏆 with a positive balance to complete the level!</p>
        <p>Current level: {level} of {maxLevel}</p>
        <p>Watch out for negative events that decrease your money:</p>
        {level === 1 && (
          <p>- Taxes 📝, Medical bills 🏥, Rent 🏠, Lawsuits ⚖</p>
        )}
        {level === 2 && (
          <p>- Crypto losses ₿, Divorce 💔, Education costs 🎓, Mortgage 🏦, Fraud 🕵</p>
        )}
        {level === 3 && (
          <p>- Market crash 📉, Bankruptcy 💣, Healthcare 💊, Debt 🔗, Tax audit 🔍</p>
        )}
        <p>Collect positive events to increase your balance:</p>
        {level === 1 && (
          <p>- Stocks 📈, Bonuses 💰, Lottery wins 🎟, Business profits 🏢, Inheritance 📜, Donations 🎁</p>
        )}
        {level === 2 && (
          <p>- Startup success 🚀, Real estate 🏘, Insurance payouts 🛡, Side hustle 💼, Promotion 📊</p>
        )}
        {level === 3 && (
          <p>- IPO gains 🔔, Inheritance 📜, Investments 💎, Royalties 👑</p>
        )}
      </div>
    </div>
  );
};

export default MoneyMaze;