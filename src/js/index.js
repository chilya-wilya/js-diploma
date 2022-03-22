import prefetchImages from 'prefetch-image';
import {fetchAllUser, fetchAllPins, createPin, saveToStorage, getPinsFromStorage, arrayRemove } from './utils.js';


const onStartApp = async () => {
    const fetchedPins = await fetchAllPins();
    const users = await fetchAllUser();

    let pins = [].concat.apply([], fetchedPins);
    let fetchedImages = await prefetchImages(pins.map(val => val.img)).then(result => result); 
    let fetchedAvatars = await prefetchImages(users.map(val => val.avatar)).then(result => result);

    pins.forEach(pin => {
        users.forEach(user => {
            if(pin.userId === user.id) {
                pin.user = user;
            }
        })
    });

    console.log(pins);

    let actualPins = getPinsFromStorage();

    if(actualPins && actualPins.length) {
        createPin(actualPins); 
    } else {
        saveToStorage(pins);
        createPin(pins); 
        actualPins = pins;
    }



    //removal pins from dashboard 

    actualPins.forEach(pin => {

        const pinReportButton = document.getElementById(`${pin.id}_pin-report-button`);

        pinReportButton.addEventListener('click', () => {
            const deletePinId = pinReportButton.id.split('_')[0];
            const pinToDelete = document.getElementById(`pin__${pin.id}`).parentElement;
            
            for(let i = 0; i < pins.length; i++) {
                if (actualPins[i].id === deletePinId) {
                    actualPins = arrayRemove(actualPins, pin);
                    pinToDelete.parentElement.removeChild(pinToDelete);
                    saveToStorage(actualPins); 
                    break;
                }
            }
        })
    });

    

    // addition pins to boards

    actualPins.forEach(pin => {

        const pinSelectedBoard = document.getElementById(`${pin.id}_pin-select-board`);
        const pinSaveToBoardButton = document.getElementById(`${pin.id}_save-pin-on-board`);

        pinSaveToBoardButton.addEventListener('click', () => {

            const BoardedPinId = pinSaveToBoardButton.id.split('_')[0];           
            for(let i = 0; i < pins.length; i++) {
                if (actualPins[i].id === BoardedPinId) {

                    actualPins[i].board = pinSelectedBoard.options[pinSelectedBoard.selectedIndex].value;
                    saveToStorage(actualPins);
                    break;
                }
            }
        })
    });


    const boardSelector = document.getElementById(`select-board`);
    boardSelector.addEventListener('click', () => {
        const selectedBoard = boardSelector.options[boardSelector.selectedIndex].value;
        createPin(selectedBoard === 'default' ? actualPins : actualPins.filter(pin => pin.board === selectedBoard))
    });

    console.log(actualPins);



    // filter pins by hashtag

    const hashtagSearch = document.getElementById(`pin-search`);
    hashtagSearch.addEventListener('change', () => {
        const rightHashtag = hashtagSearch.value;
        createPin(rightHashtag === '' ? 
        actualPins : 
        actualPins.filter(pin => pin.hashtag === rightHashtag || pin.hashtag === '#' + hashtagSearch.value));
    });

}

onStartApp();