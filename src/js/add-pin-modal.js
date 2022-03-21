import {resetModal} from './utils';

//pin modal js

const addPinModal = document.querySelector('.add-pin_modal');
const pinContainer = document.getElementById('pin-container');

document.getElementById('add-pin-modal').addEventListener('click', () => {
    addPinModal.style.opacity = '1';
    addPinModal.style.pointerEvents = 'all';
    pinContainer.style.overflow = 'hidden';
});

document.querySelector('.add-pin_modal ').addEventListener('click', event => {
    if (event.target === addPinModal) {
        resetModal();
    }
});



