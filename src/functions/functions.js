export const activateButton = (buttons, index) => {
    buttons.forEach((button, i) => {
      if (i === index) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
};

export const handleCanvasClick = (event, canvasRef, buttonsId, setShots, setSaves, setMissedShots, setGoals, setOpponentShots, setOpponentSaves, setOpponentMissedShots, setOpponentGoals) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect(); 
    const offsetX = event.clientX - rect.left; 
    const offsetY = event.clientY - rect.top;
    if (buttonsId === 0) {
      setShots(prevShots => prevShots + 1);
      setOpponentSaves(prevOpponentSaves => prevOpponentSaves + 1);
    } else if (buttonsId === 1) {
      setMissedShots(prevSaves => prevSaves + 1);
    } else if (buttonsId === 2) {
      setGoals(prevGoals => prevGoals + 1);
      setShots(prevShots => prevShots + 1);
    } else if (buttonsId === 3) {
      setOpponentShots(prevOpponentShots => prevOpponentShots + 1);
      setSaves(prevSaves => prevSaves + 1);
    } else if (buttonsId === 4) {
      setOpponentMissedShots(prevOpponentMissedShots => prevOpponentMissedShots + 1);
    } else if (buttonsId === 5) {
      setOpponentGoals(prevOpponentGoals => prevOpponentGoals + 1);
      setOpponentShots(prevOpponentShots => prevOpponentShots + 1);
    }
  
    handleButtonClick(buttonsId, canvasRef, offsetX, offsetY);
};
  
export const handleButtonClick = (buttonsId, canvasRef, offsetX, offsetY) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    switch (buttonsId) {
        case 0:
            const size = 9;
            const thickness = 4;
            ctx.beginPath();
            ctx.moveTo(offsetX - size, offsetY - size);
            ctx.lineTo(offsetX + size, offsetY + size);
            ctx.moveTo(offsetX + size, offsetY - size);
            ctx.lineTo(offsetX - size, offsetY + size);
            ctx.lineWidth = thickness;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            break;
      
        case 1:
            const radius = 8;
            const circleThickness = 4;
            ctx.beginPath();
            ctx.arc(offsetX, offsetY, radius, 0, 2 * Math.PI);
            ctx.lineWidth = circleThickness;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            break;

        case 2:
            const triangleSize = 9;
            const triangleThickness = 4;
            ctx.beginPath();
            ctx.moveTo(offsetX - triangleSize, offsetY + triangleSize); 
            ctx.lineTo(offsetX + triangleSize, offsetY + triangleSize); 
            ctx.lineTo(offsetX, offsetY - triangleSize); 
            ctx.closePath(); 
            ctx.lineWidth = triangleThickness;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            break;

        case 3:
            const oppSize = 9;
            const oppThickness = 4;
            ctx.beginPath();
            ctx.moveTo(offsetX - oppSize, offsetY - oppSize);
            ctx.lineTo(offsetX + oppSize, offsetY + oppSize);
            ctx.moveTo(offsetX + oppSize, offsetY - oppSize);
            ctx.lineTo(offsetX - oppSize, offsetY + oppSize);
            ctx.lineWidth = oppThickness;
            ctx.strokeStyle = 'red';
            ctx.stroke();
            break;

        case 4:
            const oppRadius = 8;
            const oppCircleThickness = 4;
            ctx.beginPath();
            ctx.arc(offsetX, offsetY, oppRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = oppCircleThickness;
            ctx.stroke();
            break;

        case 5:
            const oppTriangleSize = 9;
            const oppTriangleThickness = 4;
            ctx.beginPath();
            ctx.moveTo(offsetX - oppTriangleSize, offsetY + oppTriangleSize);
            ctx.lineTo(offsetX + oppTriangleSize, offsetY + oppTriangleSize);
            ctx.lineTo(offsetX, offsetY - oppTriangleSize);
            ctx.closePath();
            ctx.lineWidth = oppTriangleThickness;
            ctx.strokeStyle = 'red';
            ctx.stroke();
            break;
            
        default:
            break;
    }
};

export function saveCanvasAsPNG(canvas, filename = 'canvas.png') {
    
    const dataURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;

    link.click();
}

export function handleSaveButtonClick(canvasRef, period, saves, shots, missedShots, goals, opponentSaves, opponentShots, opponentMissedShots, opponentGoals) {
  
  const canvas = canvasRef.current;

  const canvasName = prompt("Lisää joukkueiden nimet:", "TuTo - ");

  

  if (canvasName === null) {
      return;
  }

  const newCanvas = document.createElement('canvas');
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;
  const newContext = newCanvas.getContext('2d');
  newContext.drawImage(canvas, 0, 0);

  drawText(newContext, `Torjunnat Koti: ${saves}`, 10, 20);
  drawText(newContext, `Laukaus Koti: ${shots}`, 150, 20);
  drawText(newContext, `Laukaus Ohi Koti: ${missedShots}`, 290, 20);
  drawText(newContext, `Maali Koti: ${goals}`, 440, 20);
  drawText(newContext, `Torjunta% koti: ${saves === 0 ? 0 : (saves / opponentShots * 100).toFixed(2)} %`, 590, 20);
  drawText(newContext, `Erä: ${period}` , 620 , 200)
  

  drawText(newContext, `Torjunnat Vieras: ${opponentSaves}`, 10, 480);
  drawText(newContext, `Laukaus Vieras: ${opponentShots}`, 150, 480);
  drawText(newContext, `Laukaus Ohi Vieras: ${opponentMissedShots}`, 290, 480);
  drawText(newContext, `Maali Vieras: ${opponentGoals}`, 440, 480);
  drawText(newContext, `Torjunta% vieras: ${opponentSaves === 0 ? 0 : (opponentSaves / shots * 100).toFixed(2)} %`, 590, 480)

  saveCanvasAsPNG(newCanvas, `${canvasName}.png`);

}

  
export function drawText(context, text, x, y) {
    context.fillStyle = '#000'; 
    context.font = '14px Arial'; 
    context.fillText(text, x, y); 
}