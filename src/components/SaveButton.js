import { saveCanvasAsPNG } from './functions.js';


function SaveButton() {

  const handleSaveButtonClick = () => {
    const canvas = document.getElementById('your-canvas-id');
    saveCanvasAsPNG(canvas, 'canvas_image.png');
  };

  return (
    <button onClick={handleSaveButtonClick}>Tallenna</button>
  );
}

export default SaveButton;
