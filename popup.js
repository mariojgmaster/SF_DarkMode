/**
    * @description      : 
    * @author           : Mário Jorge Ribeiro
    * @group            : 
    * @created          : 06/06/2024 - 13:23:35
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/06/2024
    * - Author          : Mário Jorge Ribeiro
    * - Modification    : 
**/
document.addEventListener('DOMContentLoaded', () => {
    // Restaurar cores salvas
    chrome.storage.sync.get(['SF_DM_textColor', 'SF_DM_backgroundColor'], (data) => {
        if (data.SF_DM_textColor) {
            document.getElementById('textColorPicker').value = data.SF_DM_textColor;
        }
        if (data.SF_DM_backgroundColor) {
            document.getElementById('colorPicker').value = data.SF_DM_backgroundColor;
        }
    });

    document.getElementById('applyColor').addEventListener('click', () => {
        const textColor = document.getElementById('textColorPicker').value;
        const color = document.getElementById('colorPicker').value;

        // Salvar cores no armazenamento do Chrome
        chrome.storage.sync.set({
            SF_DM_textColor: textColor,
            SF_DM_backgroundColor: color
        });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab && (activeTab.url.includes("salesforce.com") || activeTab.url.includes("force.com"))) {
                chrome.tabs.sendMessage(activeTab.id, { color, textColor }, (response) => {
                    // Mostrar feedback visual
                    const feedbackMessage = document.getElementById('feedbackMessage');
                    feedbackMessage.style.display = 'block';
                    setTimeout(() => {
                        feedbackMessage.style.display = 'none';
                    }, 2000);
                });
            } else {
                const feedbackMessage = document.getElementById('feedbackMessage');
                feedbackMessage.style.display = 'block';
                feedbackMessage.innerHTML = 'Active tab is not a supported Salesforce page.';
            }
        });
    });
});
