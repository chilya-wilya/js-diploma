import {fetchAllUser, fetchAllPins, createPin, saveToStorage, getPinsFromStorage,
        removePinsFromDashboard, addPinsToBoards, filterPinsByHashtag } from './utils.js';


const onStartApp = async () => {
    const fetchedPins = await fetchAllPins();
    const users = await fetchAllUser();
    let pins = [].concat.apply([], fetchedPins);

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

    removePinsFromDashboard(actualPins);
    addPinsToBoards(actualPins);
    filterPinsByHashtag(actualPins);

    console.log(actualPins);
}

onStartApp();