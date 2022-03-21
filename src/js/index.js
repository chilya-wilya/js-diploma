import prefetchImages from 'prefetch-image';




//switch user modal js


const switchUserButton = document.getElementById('switch-user-button');
const switchUserArea = document.getElementById('switch-user-area');
const switchUserModal = document.getElementById('switch-user-window');


switchUserButton.addEventListener('click', () => {
    switchUserArea.style.opacity = '1';
    switchUserArea.style.pointerEvents = 'all';

    switchUserModal.style.opacity = '1';
    switchUserModal.style.pointerEvents = 'all';
});


function closeSwitchUserWindow() {
    switchUserModal.style.opacity = '0';
    switchUserModal.style.pointerEvents = 'none';
    switchUserArea.style.opacity = '0';
    switchUserArea.style.pointerEvents = 'none';
}

document.addEventListener('mouseover', (e) => {
    if (e.target === switchUserArea) {
        closeSwitchUserWindow()
    }
})




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
        reset_modal();
    }
});

function reset_modal() {
    const modalsPin = document.querySelector('.add-pin_modal .modals_pin');

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
}



// load pins on main page


const fetchPinsByUser = async (userId, callback) => {
    let pinsData  = await fetch(`https://6231aaa405f5f4d40d8045dc.mockapi.io/users/${userId}/pins`)
    return await pinsData.json();
}

const fetchAllPins = async () => {
    let pins = [];
    for(let i=1; i <= 3; i++) {
        pins.push(await fetchPinsByUser(i));
    }
    return pins;     
}

const fetchAllUser = async() => {
    let userData  = await fetch(`https://6231aaa405f5f4d40d8045dc.mockapi.io/users`)
    return await userData.json();
}

const create_pin = (pins) => {

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
                <div id="pin-menu-button_${pin.id}" class="modal_menu">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/OOjs_UI_icon_ellipsis.svg" alt="pin-menu">
                </div>
            </div>
            <div class="modal_footer">
                <div class="modal_avatar">
                    ${pin.user.avatar.outerHTML}
                </div>
                <div class="modal_description">
                    <span>${pin.description}</span>
                </div>
            </div>
            <div id="pin-menu-area">
                <div id="pin-menu-container" class="pin-menu__container">
                    <div class="pin-menu__select-board">
                        <div class="pin-menu__save-pin">
                            <button id="save-pin-on-board"></button>
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
                            <button class="pin-report">Hate speech or symbol</button>
                        </div>
                        <div class="pin-menu__report-wrapper">
                            <button class="pin-report">Bullying or harassment</button>
                        </div>
                        <div class="pin-menu__report-wrapper">
                            <button class="pin-report">Sale of illegal goods</button>
                        </div>
                        <div class="pin-menu__report-wrapper">
                            <button class="pin-report">False information</button>
                        </div>
                        <div class="pin-menu__report-wrapper">
                            <button class="pin-report">I just don't like it</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pin__image">
        ${pin.img.outerHTML}
        </div>`;

        let pinImage =  new_pin.children[2].children[0];

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

        // console.log(pinMenuButton);
        // console.log(pinMenuArea);
        // console.log(pinMenu);

        // console.log(pinReportButton);

        // console.log(pinReportArea);
        // console.log(pinReportMenu);
        // console.log(pinModalArea);


        pinImage.classList.add('pin_max_height');
    
        new_pin.style.opacity = 1;
        pinContainer.append(new_pin);
    })
}




const onStartApp = async () => {
    const fetchedPins = await fetchAllPins();
    const users = await fetchAllUser();

    let pins = [].concat.apply([], fetchedPins);
    let fetchedImages = await prefetchImages(pins.map(val => val.img)).then(result => result);
    let fetchedAvatars = await prefetchImages(users.map(val => val.avatar)).then(result => result);

    pins.forEach(pin => {
        fetchedImages.forEach(image => {
            if(pin.img === image.currentSrc) {
                pin.img = image;
            }
        })
    });

    users.forEach(user => {
        fetchedAvatars.forEach(avatar => {
            if(user.avatar === avatar.currentSrc) {
                user.avatar = avatar;
            }
        })
    });

    pins.forEach(pin => {
        users.forEach(user => {
            if(pin.userId === user.id) {
                pin.user = user;
            }
        })
    });
    // console.log(pins)
    create_pin(pins); 
}

onStartApp();