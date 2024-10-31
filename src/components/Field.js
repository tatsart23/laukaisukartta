import React, { useRef, useEffect, useState } from 'react';
import { handleCanvasClick, handleSaveButtonClick } from '../functions/functions';
import { buttons } from './Buttons'; // Tuodaan napit toisesta tiedostosta


const Field = () => {

  const [buttonsId, setButtonsId] = useState(0);
  const [shots, setShots] = useState(0);
  const [missedShots, setMissedShots] = useState(0);
  const [goals, setGoals] = useState(0);
  const [saves, setSaves] = useState(0);
  const [opponentSaves, setOpponentSaves] = useState(0);
  const [opponentShots, setOpponentShots] = useState(0);
  const [opponentMissedShots, setOpponentMissedShots] = useState(0);
  const [opponentGoals, setOpponentGoals] = useState(0);
  const [period, setPeriod] = useState(1);

  const canvasRef = useRef(null);

  const handleSaveClick = () => {
    handleSaveButtonClick(canvasRef, saves, shots, missedShots, goals, opponentSaves, opponentShots, opponentMissedShots, opponentGoals, period, setPeriod);
    setShots(0);
    setMissedShots(0);
    setSaves(0);
    setOpponentSaves(0);
    setOpponentShots(0);
    setOpponentMissedShots(0);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = './img/field.png'
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };

    if (period < 3) {
      setPeriod(period + 1);
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = './img/field.png'
    image.onload = () => {
      context.drawImage(image, 0, 0);
    };
  }, []);

  return (
    <>
      <section className='drawboard'>
        <div className='canvasarea'>
          <canvas
            ref={canvasRef}
            width={900}
            height={500}
            onClick={(event) => handleCanvasClick(event, canvasRef, buttonsId, setShots, setSaves, setMissedShots, setGoals, setOpponentShots, setOpponentSaves, setOpponentMissedShots, setOpponentGoals)}

          />
          <div className="buttonpanel">
            {buttons.map((button, index) => (
              <button key={index} className={`button ${buttonsId === index ? 'active' : ''}`} onClick={() => setButtonsId(index)}>
              {button.text}
            </button>
            ))}
            <div className="inputfield">
              <div className="input-row">
                <p>Torjunnat Koti</p>
                <input type="number" value={saves} readOnly/>
              </div>
              <div className="input-row">
                <p>Laukaus Koti</p>
                <input type="number" value={shots} readOnly/>
              </div>
              <div className="input-row">
                <p>Laukaus Ohi Koti</p>
                <input type="number" value={missedShots} readOnly/>
              </div>
              <div className="input-row">
                <p>Maali Koti</p>
                <input type="number" value={goals} readOnly/>
              </div>
              <div className="input-row">
                <p>Torjunnat Vieras</p>
                <input type="number" value={opponentSaves} readOnly/>
              </div>
              <div className="input-row">
                <p>Laukaus Vieras</p>
                <input type="number" value={opponentShots} readOnly/>
              </div>
              <div className="input-row">
                <p>Laukaus Ohi Vieras</p>
                <input type="number" value={opponentMissedShots} readOnly/>
              </div>
              <div className="input-row">
                <p>Maali Vieras</p>
                <input type="number" value={opponentGoals} readOnly/>
              </div>  
            </div>
          </div>
          <div className="period">
            <p>Erä {period}</p>
          </div>
          <div className="percentages">
            <div className="input-row">
              <p>Torjuntaprosentti koti</p>
              <input type="number" value={saves === 0 ? 0 : (saves / opponentShots * 100).toFixed(2)} readOnly/>
            </div>
            <div className="input-row">
              <p>Torjuntaprosentti vieras</p>
              <input type="number" value={opponentSaves === 0 ? 0 : (opponentSaves / shots * 100).toFixed(2)}  readOnly/>
            </div>
            <div className="input-row">
              <p>Laukaisutarkkuus koti</p>
              <input type="number" value={shots === 0 ? 0 : Math.round((goals / shots) * 100).toFixed(2)} readOnly/>
            </div>
            <div className="input-row">
              <p>Laukaisutarkkuus vieras</p>
              <input type="number" value={opponentShots === 0 ? 0 : Math.round((opponentGoals / opponentShots) * 100).toFixed(2)} readOnly/>
            </div>
            <button className='savebutton' onClick={handleSaveClick}>Tallenna</button>
            <button className='resetbutton' onClick={() => window.location.reload()}>Nollaa</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Field;
