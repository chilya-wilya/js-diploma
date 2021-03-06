import { PIN, PINS } from "./constants";

// reset add new pin modal window
export function resetModal() {
    const pinContainer = document.getElementById('pin-container');
    const addPinModalWindow = document.getElementById('add-pin_modal');
    addPinModalWindow.parentElement.removeChild(addPinModalWindow);
    pinContainer.style.overflow = 'visible';
};

//get users and pins data from mockApi and set data in one array
export const fetchPinsByUser = async (userId) => {
    let pinsData  = await fetch(`https://6231aaa405f5f4d40d8045dc.mockapi.io/users/${userId}/pins`)
    return await pinsData.json();
};

export const fetchAllUser = async() => {
    let userData  = await fetch(`https://6231aaa405f5f4d40d8045dc.mockapi.io/users`)
    return await userData.json();
};

export const fetchAllPins = async () => {
    let pins = [];
    for(let i=1; i <= 3; i++) {
        pins.push(await fetchPinsByUser(i));
    }
    return pins;     
};


//display pins with modal menu on dashboard
export const createPin = (pins) => {

    let pinContainer = document.getElementById('pin-container');
    pinContainer.innerHTML = '';
    
    pins.forEach(pin => {
        let new_pin = document.createElement('div');
        new_pin.style.opacity = 0;
        new_pin.classList.add(PIN);
        new_pin.classList.add(`${pin.pin_size}`);

        new_pin.innerHTML = 
        `<div class="pin__hashtag">${pin.hashtag}</div>
        <div id="pin__${pin.id}" class="pin__id"></div>
        <div class="pin__modal">
            <div class="modal_header">
                <div id="${pin.id}_pin-menu-button" class="modal_menu">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/OOjs_UI_icon_ellipsis.svg" alt="pin-menu">
                </div>
            </div>
            <div class="modal_footer">
                <div class="modal_avatar">
                    <img src="${pin.user.avatar}" alt="pin-avatar">
                </div>
                <div class="modal_description">
                    <span>${pin.description}</span>
                </div>
            </div>
            <div id="pin-menu-area">
                <div id="pin-menu-container" class="pin-menu__container">
                    <div class="pin-menu__select-board">
                        <div class="pin-menu__save-pin">
                            <button id="${pin.id}_save-pin-on-board" class="save-pin-on-board"></button>
                            <p>Save to the board</p>
                        </div>
        
                        <select class='pin-menu__selector' name="pin-select-board" id="${pin.id}_pin-select-board">
                            <option value="" selected disabled>Select a board</option>
                            <option value="default">All pins</option>
                            <option value="board1">Board 1</option>
                            <option value="board2">Board 2</option>
                            <option value="board3">Board 3</option>
                        </select>
                    </div>
                    <div class="pin-menu__report">
                        <button id="pin-menu-report">Report</button>
                    </div>
                </div>
        
                <div id="pin-menu-report-modal-area" class="pin-menu__report-modal-area">
                    <div id="pin-menu-report-modal-container" class="pin-menu__report-modal-container">
                        <div class="pin-menu__report-wrapper">
                            <button id="${pin.id}_pin-report-button" class="pin-report">Hate speech or symbol</button>
                        </div>
                        <div class="pin-menu__report-wrapper">
                            <button id="${pin.id}_pin-report-button" class="pin-report">Bullying or harassment</button>
                        </div>
                        <div class="pin-menu__report-wrapper">
                            <button id="${pin.id}_pin-report-button" class="pin-report">Sale of illegal goods</button>
                        </div>
                        <div class="pin-menu__report-wrapper">
                            <button id="${pin.id}_pin-report-button" class="pin-report">False information</button>
                        </div>
                        <div class="pin-menu__report-wrapper">
                            <button id="${pin.id}_pin-report-button" class="pin-report">I just don't like it</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pin__image">
            <img src="${pin.img}" alt="pin-image">
        </div>`;

        //create pin modal menu window
        const pinImage =  new_pin.children[3].children[0];
        const pinMenuButton = new_pin.children[2].children[0].children[0];
        const pinMenuArea = new_pin.children[2].children[2];
        const pinMenu = new_pin.children[2].children[2].children[0];
        const pinReportButton = new_pin.children[2].children[2].children[0].children[1].children[0];
        const pinReportArea = new_pin.children[2].children[2].children[1];
        const pinReportMenu = new_pin.children[2].children[2].children[1].children[0];
        const pinModalArea = new_pin.children[2];

        pinMenuButton.addEventListener('click', () => {
            pinMenuArea.style.opacity = '1';
            pinMenuArea.style.pointerEvents = 'all';
            pinMenu.style.opacity = '1';
            pinMenu.style.pointerEvents = 'all';
        })
        
        pinReportButton.addEventListener('click', () => {
            pinReportArea.style.opacity = '1';
            pinReportArea.style.pointerEvents = 'all';
        
            pinReportMenu.style.opacity = '1';
            pinReportMenu.style.pointerEvents = 'all';
        })
        
        document.addEventListener('mouseover', (e) => {
            if (e.target === pinModalArea) {
                pinMenuModal()
            }
        })
        
        function pinMenuModal() {
            pinMenuArea.style.opacity = '0';
            pinMenuArea.style.pointerEvents = 'none';
            pinMenu.style.opacity = '0';
            pinMenu.style.pointerEvents = 'none';
        
            pinReportArea.style.opacity = '0';
            pinReportArea.style.pointerEvents = 'none';
            pinReportMenu.style.opacity = '0';
            pinReportMenu.style.pointerEvents = 'none';
        }

        pinImage.classList.add('pin_max_height');

        //append pin to dashboard
        new_pin.style.opacity = 1;
        pinContainer.append(new_pin);
    })
};


//save/load pins to/from local storage
export const saveToStorage = (pins) => {
    localStorage.setItem(PINS, JSON.stringify(pins));
};

export const getPinsFromStorage = () => {
    return JSON.parse(localStorage.getItem(PINS));
};


//function to delete obj from array of pins
export const arrayRemove = (arr, value) => { 
    return arr.filter(el => el.id !== value.id);
}

//remove pins from dashboard
export const removePinsFromDashboard = (actualPins) => {
    actualPins.forEach(pin => {

        const pinReportButton = document.getElementById(`${pin.id}_pin-report-button`);

        pinReportButton.addEventListener('click', () => {
            console.log('test')
            const deletePinId = pinReportButton.id.split('_')[0];
            const pinToDelete = document.getElementById(`pin__${pin.id}`).parentElement;
            
            for(let i = 0; i < actualPins.length; i++) {
                if (actualPins[i].id === deletePinId) {
                    actualPins = arrayRemove(actualPins, pin);
                    pinToDelete.parentElement.removeChild(pinToDelete);
                    saveToStorage(actualPins); 
                    break;
                }
            }
        })
    });
};

// add pins to boards and board selection
export const addPinsToBoards = (actualPins) => {
    actualPins.forEach(pin => {

        const pinSelectedBoard = document.getElementById(`${pin.id}_pin-select-board`);
        const pinSaveToBoardButton = document.getElementById(`${pin.id}_save-pin-on-board`);

        pinSaveToBoardButton.addEventListener('click', () => {

            const BoardedPinId = pinSaveToBoardButton.id.split('_')[0];           
            for(let i = 0; i < actualPins.length; i++) {
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
};


export const filterPinsByHashtag = (actualPins) => {
    const hashtagSearch = document.getElementById(`pin-search`);
    hashtagSearch.addEventListener('change', () => {
        const rightHashtag = hashtagSearch.value;
        createPin(rightHashtag === '' ? 
        actualPins : 
        actualPins.filter(pin => pin.hashtag === rightHashtag || pin.hashtag === '#' + rightHashtag));
    });
}


