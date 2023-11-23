
'use strict';
import { Shape } from './shape.js';
import { onEvent, select, selectAll } from './utils.js';


const shapeContainer = select('#shape-container');
const shapeSelect = select('#shape-select');
const colorSelect = select('#color-select');
const button = select('#create-btn');
const validationParagraph = select('#validation');

const shapesArray = [];
const maxShapes = 20;

function createShape() {
    const selectedShape = shapeSelect.value;
    const selectedColor = colorSelect.value;

    // Validation
    if (selectedShape === 'Select a shape' || selectedColor === 'Select a colour') {
        validationParagraph.textContent = 'Please select a shape and a color.';
        return;
    }

    if (shapesArray.length >= maxShapes) {
        validationParagraph.textContent = 'Maximum number of shapes reached (20).';
        return;
    }

    validationParagraph.textContent = ''; // Clear validation message

    const newShape = new Shape(selectedShape, selectedColor);
    shapesArray.push(newShape);

    const shapeDiv = document.createElement('div');
    shapeDiv.classList.add('shape');
    shapeDiv.style.backgroundColor = selectedColor;
    shapeDiv.textContent = selectedShape.charAt(0).toUpperCase();
    
    if (selectedShape === 'circle') {
        shapeDiv.style.borderRadius = '50%';
    }

    onEvent('click', shapeDiv, () => {
        validationParagraph.textContent = newShape.getInfo();
    });
    

    shapeContainer.appendChild(shapeDiv);
}

onEvent('click', button, createShape);