import prefetchImages from 'prefetch-image';
import {fetchAllUser, fetchAllPins, createPin, saveToStorage, getPinsFromStorage, isLocalStorageHasPins } from './utils.js';


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

    if(actualPins) {
        createPin(actualPins); 
    } else {
        createPin(pins); 
        saveToStorage(pins);
    }


    function arrayRemove(arr, value) { 
        return arr.filter(function(ele){ 
            return ele.id !== value.id; 
        });
    }

    actualPins.forEach(pin => {
        const pinReportButton = document.getElementById(`${pin.id}_pin-report-button`);

        pinReportButton.addEventListener('click', () => {
            let deletePinId = pinReportButton.id.split('_')[0];
            const pinToDelete = document.getElementById(`pin__${pin.id}`).parentElement;

            // console.log(pinToDelete);
            // console.log(deletePinId);
            
            for(let i = 0; i < pins.length; i++) {
                if (actualPins[i].id === deletePinId) {
                    actualPins = arrayRemove(actualPins, pin);
                    // console.log(pins[i].id); //get an object to be removed
                    pinToDelete.parentElement.removeChild(pinToDelete);
                    saveToStorage(actualPins);  //save new arr to local storage
                    break;
                }
            }
            console.log(actualPins)
        })
    });

    

}

onStartApp();