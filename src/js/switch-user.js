//switch user modal js
const switchUserButton = document.getElementById('switch-user-button');
const header = document.getElementById('header');

switchUserButton.addEventListener('click', () => {

    let switchUserArea = document.createElement('div');
    switchUserArea.setAttribute("id", "switch-user-area"); 
    switchUserArea.innerHTML = 
    `<div id="switch-user-window" class="switch-user-modal">  
        <div class="switch-user-modal__user-wrapper">
            <div class="switch-user-modal__avatar"></div>
            <div class="switch-user-modal__user-info">
                <h3>Hello, Jack!</h3>
                <p>jacktompson89@gmail.com</p>
            </div>
        </div>
        
        <p class="switch-user-modal__menu">Personal information</p>
        
        <div class="switch-user-modal__menu-button">
            <button id="switch-user-modal-menu-button">Edit profile</button>
        </div>
        <div class="switch-user-modal__menu-button">
            <button id="switch-user-modal-menu-button">Your account settings</button>
        </div>

        <p class="switch-user-modal__menu">Actions</p>

        <div class="switch-user-modal__menu-button">
            <button id="switch-user-modal-menu-button">Add account</button>
        </div>
        <div class="switch-user-modal__menu-button">
            <button id="switch-user-modal-menu-button">Switch user</button>
        </div>
        <div class="switch-user-modal__menu-button">
            <button id="switch-user-modal-menu-button">Log out</button>
        </div>

        <p class="switch-user-modal__menu">Support</p>

        <div class="switch-user-modal__menu-button">
            <button id="switch-user-modal-menu-button">Settings</button>
        </div>
        <div class="switch-user-modal__menu-button">
            <button id="switch-user-modal-menu-button">Get help</button>
        </div>
    </div>`;

    header.append(switchUserArea);

    const switchUserModal = document.getElementById('switch-user-window');

    switchUserArea.style.opacity = '1';
    switchUserArea.style.pointerEvents = 'all';

    switchUserModal.style.opacity = '1';
    switchUserModal.style.pointerEvents = 'all';
});

document.addEventListener('mouseover', (e) => {
    const switchUserArea = document.getElementById('switch-user-area');
    if (e.target === switchUserArea) {
        switchUserArea.parentElement.removeChild(switchUserArea);
    }
})
