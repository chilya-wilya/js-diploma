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
        saveToStorage(pins);
        createPin(pins); 
    }

}

onStartApp();