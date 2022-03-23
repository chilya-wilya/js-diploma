import {resetModal} from './utils';

//pin modal js
const pinContainer = document.getElementById('pin-container');
const addPinButton = document.getElementById('add-pin-modal-button');

addPinButton.addEventListener('click', () => {
    let addPinModalWindow = document.createElement('div');
    addPinModalWindow.setAttribute("id", "add-pin_modal");
    
    addPinModalWindow.innerHTML =
    `<div class="add-pin_container">
        <div class="side" id="left_side">
            <div class="upload_pin">
                <label for="upload_pin" id="upload_img_label">
                    <div class="upload_img_container">
                        <div id="dotted_border">
                            <div class="download_icon_container">
                                <img src="https://pngset.com/images/circle-icons-upload-icon-svg-upload-file-recycling-symbol-logo-trademark-transparent-png-1129745.png" alt="upload_pin" class="download_icon">
                            </div>
                            <div>Click to upload</div>
                            <div>Recommendation: Use high-quality .jpg files less than 20MB</div>
                        </div>
                    </div>
                    <input type="file" name="upload_pin" id="upload_pin">
                </label>

                <div class="modals_pin">
                    <div class="pin_image">
                    </div>
                </div>
            </div>
        </div>

        <div class="side" id="right_side">

            <div class="pin_info">
                <input placeholder="Add a description" type="text" class="new_pin_input" id="pin_description">
                <input placeholder="Add a #hashtag" type="text" class="new_pin_input" id="pin_hashtag">
            </div>

            <div class="size_selection">
                <div class="select_size">
                    <select name="pin_size" id="pin_size">
                        <option value="" disabled selected>Select pin's size</option>
                        <option value="small">small</option>
                        <option value="medium">medium</option>
                        <option value="large">large</option>
                    </select>
                    <div class="save_pin">Save</div>
                </div>
            </div>
        </div>
    </div>`;

    pinContainer.append(addPinModalWindow);

    // const addPinModal = document.getElementById('add-pin_modal');
    addPinModalWindow.style.opacity = '1';
    addPinModalWindow.style.pointerEvents = 'all';
    pinContainer.style.overflow = 'hidden';

    addPinModalWindow.addEventListener('click', event => {
        if (event.target === addPinModalWindow) {
            resetModal();
        }
    });    
});