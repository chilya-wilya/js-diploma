// reset add new pin modal window

export function resetModal() {

    const modalsPin = document.querySelector('.add-pin_modal .modals_pin');
    const addPinModal = document.querySelector('.add-pin_modal');
    const pinContainer = document.getElementById('pin-container');

    addPinModal.style.opacity = '0';
    addPinModal.style.pointerEvents = 'none';
    pinContainer.style.overflow = 'visible';

    document.querySelector('#upload_img_label').style.display = 'block';
    modalsPin.style.display = 'none';
    modalsPin.style.opacity = '0';

    if (modalsPin.children[0].children[0]) modalsPin.children[0].removeChild(modalsPin.children[0].children[0]);
    document.querySelector('#pin_description').value = '';
    document.querySelector('#pin_hashtag').value = '';
    document.querySelector('#pin_size').value = '';
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

    pins.forEach(pin => {
        let new_pin = document.createElement('div');
        // let pinImage =  pin.img;
        new_pin.style.opacity = 0;
            
        new_pin.classList.add('pin');
        new_pin.classList.add(`${pin.pin_size}`);
        // pinImage.classList.add('pin_max_width');

        new_pin.innerHTML = 
        `<div class="pin__hashtag">${pin.hashtag}</div>
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
        
                        <select class='pin-menu__selector' name="pin-select-board" id="pin-select-board">
                            <option value="" selected disabled>Select a board</option>
                            <option value="pin-board1">Board 1</option>
                            <option value="pin-board2">Board 2</option>
                            <option value="pin-board3">Board 3</option>
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

        const pinImage =  new_pin.children[2].children[0];

        const pinMenuButton = new_pin.children[1].children[0].children[0];

        const pinMenuArea = new_pin.children[1].children[2];
        const pinMenu = new_pin.children[1].children[2].children[0];

        const pinReportButton = new_pin.children[1].children[2].children[0].children[1].children[0];

        const pinReportArea = new_pin.children[1].children[2].children[1];
        const pinReportMenu = new_pin.children[1].children[2].children[1].children[0];

        const pinModalArea = new_pin.children[1];

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


        //removal pins from dashboard and addition pins to boards

        const pinReportButtons = document.querySelectorAll(".pin-report");

  //      console.log(pinReportButtons)

        pinReportButtons.forEach(el => {
            el.addEventListener('click', () => {
                let pins = getPinsFromStorage();
                let deletePinId = el.id.split('_')[0];
                
                for(let i = 0; i < pins.length; i++) {
                    if (pins[i].id === deletePinId) {
                        pins = arrayRemove(pins, pin)
                     //   saveToStorage(pins);
                        break;
                    }
                }

      //          console.log(pins)
                
                // pins.forEach(pin => {
                //     //console.log(+pin.id);
                //     //console.log(deletePinId)
                    
                // })
                //console.log(pins)
            })
        })



        //append pin to dashboard

        new_pin.style.opacity = 1;
        pinContainer.append(new_pin);
    })
};



//save/load pins to/from local storage

export const saveToStorage = (pins) => {
    localStorage.setItem("pins", JSON.stringify(pins));
};

export const getPinsFromStorage = () => {
    return JSON.parse(localStorage.getItem("pins"));
};

function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele.id !== value.id; 
    });
}



// djfkd bdb


