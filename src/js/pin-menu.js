
// pin menu modals


const pinMenuButton = document.getElementById('pin-menu-button');

const pinReportButton = document.getElementById('pin-menu-report');

const pinMenuArea = document.getElementById('pin-menu-area')
const pinMenu = document.getElementById('pin-menu-container')

const pinReportArea = document.getElementById('pin-menu-report-modal-area');
const pinReportMenu = document.getElementById('pin-menu-report-modal-container');

const pinModalArea = document.getElementById('pin-modal-area');

console.log(pinMenuButton);

pinMenuButton.addEventListener('click', () => {
    pinMenuArea.style.opacity = '1';
    pinMenuArea.style.pointerEvents = 'all';
    console.log(pinMenu)
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