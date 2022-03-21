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
