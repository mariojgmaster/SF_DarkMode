/**
    * @description      : 
    * @author           : Mário Jorge Ribeiro
    * @group            : 
    * @created          : 06/06/2024 - 13:39:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/06/2024
    * - Author          : Mário Jorge Ribeiro
    * - Modification    : 
**/
function applyColors(textColor, backgroundColor, onlyBackgroundImportant = false) {
    const style = document.createElement('style');
    style.innerHTML = `* {
        color: ${textColor + (onlyBackgroundImportant ? '!important' : '')};
        background: ${backgroundColor}!important;
    }`;
    document.head.appendChild(style);
}

function applySavedColors() {
    chrome.storage.sync.get(['SF_DM_textColor', 'SF_DM_backgroundColor'], (data) => {
        const textColor = data.SF_DM_textColor;
        const backgroundColor = data.SF_DM_backgroundColor;
        console.log(textColor, backgroundColor);

        if (textColor && backgroundColor) {
            applyColors(textColor, backgroundColor, true);
        }
    });
}

window.addEventListener('load', applySavedColors);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.color && request.textColor) {
        applyColors(request.textColor, request.color, true);
        sendResponse({ status: 'success' });
    }
});

