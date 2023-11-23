import { Shape } from './shape.js';
import { onEvent, select } from './utils.js';

const shapeContainer = select('#shape-container');
const shapeSelect = select('#shape-select');
const colorSelect = select('#color-select');
const createButton = select('#create-btn');
const validationParagraph = select('#validation');

const shapesArray = [];
const maxShapes = 20;

let shapeCounter = 0;

function validateSelection(shape, color) {
    if (shape === 'Select a shape' || color === 'Select a colour') {
        validationParagraph.textContent = 'Please select a shape and a color.';
        return false;
    }

    if (shapesArray.length >= maxShapes) {
        validationParagraph.textContent = 'Maximum number of shapes reached (20).';
        return false;
    }

    validationParagraph.textContent = '';
    return true;
}

function createShapeElement(shape, color) {
    const newShape = new Shape(shape, color);
    shapesArray.push(newShape);

    const shapeElement = document.createElement('div');
    shapeElement.classList.add('shape');
    shapeElement.style.backgroundColor = color;

    if (shape === 'circle') {
        shapeElement.style.borderRadius = '50%';
    }

    shapeCounter++; // Increment the shape counter

    onEvent('click', shapeElement, () => {
        validationParagraph.textContent = `Unit ${shapeCounter}: ${color} ${shape}`;
    });

    return shapeElement;
}

function handleCreateClick() {
    const selectedShape = shapeSelect.value;
    const selectedColor = colorSelect.value;

    if (validateSelection(selectedShape, selectedColor)) {
        const shapeElement = createShapeElement(selectedShape, selectedColor);
        shapeContainer.appendChild(shapeElement);
    }
}

function handleColorChange() {
    const selectedColor = colorSelect.value;
    document.documentElement.style.setProperty('--selected-color', selectedColor);
}

onEvent('click', createButton, handleCreateClick);

onEvent('change', colorSelect, handleColorChange);
