document.addEventListener("DOMContentLoaded", function() {
    let balance = 100; 
    const betAmountInput = document.getElementById("betAmount");
    const placeBetButton = document.getElementById("placeBet");
    const cars = document.querySelectorAll(".car");
    const balanceDisplay = document.getElementById("balanceDisplay");
  
    updateBalanceDisplay();
  
    placeBetButton.addEventListener("click", function() {
      const betAmount = parseInt(betAmountInput.value);
      const selectedCar = document.querySelector('input[name="selectedCar"]:checked').value;
  
      if (isNaN(betAmount) || betAmount < 5) {
        alert("Invalid bet amount. Minimum bet is R$5.");
        return;
      }
  
      if (betAmount > balance) {
        alert("Insufficient balance. You cannot bet more than your current balance.");
        return;
      }
  
      
      startRace(selectedCar, betAmount);
    });
  
    function startRace(selectedCar, betAmount) {
      const raceDuration = 5000; 
      const distancePerInterval = 10; 
      let positions = [0, 0, 0, 0, 0]; 
    
      const raceInterval = setInterval(() => {
       
        positions = positions.map((position, i) => {
         
          const distance = Math.random() * distancePerInterval;
          const newPosition = position + distance;
          return newPosition;
        });
  
        cars.forEach((car, index) => {
          car.style.left = positions[index] + "px";
        });
    
        if (positions.some(position => position >= 500)) {
          clearInterval(raceInterval); 
          showResult(positions, selectedCar, betAmount); 
        }
      }, 50);
    }
  
    function showResult(positions, selectedCar, betAmount) {
      console.log("Race finished!");
      console.log("Positions:", positions);
    
      
      const winningIndex = positions.findIndex(position => position >= 500) + 1; 
    
      let message;
      let winningColor;
      switch (winningIndex) {
        case 1:
          winningColor = "vermelho";
          break;
        case 2:
          winningColor = "verde";
          break;
        case 3:
          winningColor = "azul";
          break;
        case 4:
          winningColor = "amarelo";
          break;
        case 5:
          winningColor = "rosa";
          break;
        default:
          winningColor = "desconhecida";
      }
    
      if (parseInt(selectedCar) === winningIndex) {
        balance += betAmount;
        message = `Congratulations! The ${winningColor} car won! You won R$${betAmount * 2}.`;
      } else {
        balance -= betAmount; 
        message = `Sorry! The ${winningColor} car won. You lost your bet of R$${betAmount}.`;
      }
    
      updateBalanceDisplay(); 
      alert(message);
    }
  
    function updateBalanceDisplay() {
      balanceDisplay.textContent = `Balance: R$${balance.toFixed(2)}`;
    }
  });