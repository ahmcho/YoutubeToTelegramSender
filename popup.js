// When the button is clicked, inject setPageBackgroundColor into current page
if(localStorage.BOT_TOKEN){
    botId.value = localStorage.BOT_TOKEN;
}
if(localStorage.CHAT_ID){
    chatId.value = localStorage.CHAT_ID;
}
function sendToTelegram(el){
    chrome.storage.sync.get('response', ({response}) => {
        console.log(response);        
        if(!response.ok){
            el.textContent = response.description;   
            el.setAttribute('class','error');     
        } else {
            chatId.setAttribute('class','success-input');
            botId.setAttribute('class','success-input'); 
            el.textContent = "Message was sent";
            el.setAttribute('class','success');
        }
    });
}
sendVideo.addEventListener("click", async (e) => {
    e.preventDefault();
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let messageSpan = document.querySelector('#outputMessage');
    if(tab.url.includes('youtube') !== false){
        if(chatId.value !== '' || botId.value !== '') {
            localStorage.setItem('BOT_TOKEN', botId.value);
            localStorage.setItem('CHAT_ID', chatId.value);
            chrome.scripting.executeScript({
              target: {tabId: tab.id},
              function: setPageBackgroundColor,
              args: [[chatId.value, botId.value]]
            }, () => {
                chrome.storage.sync.get('isVideoPlayerPage', ({isVideoPlayerPage}) => {
                    if(!isVideoPlayerPage){
                        messageSpan.textContent = `Please, navigate to any video`;
                        messageSpan.setAttribute('class', 'error');
                    } else {
                        sendToTelegram(messageSpan);
                    }
                });
            });
        } else {
            document.querySelector('form').checkValidity();
            document.querySelector('form').reportValidity();
            chatId.setAttribute('class','error-input');
            botId.setAttribute('class','error-input');
            messageSpan.textContent = "Please, enter all required fields";   
            messageSpan.setAttribute('class','error');  
        }
    } else {
        messageSpan.textContent = "Only YouTube is supported";
        messageSpan.setAttribute('class','error')
    }
});


  async function setPageBackgroundColor([chatId, botId]) {
    const getSeconds = (timestampArray) => {
        if(timestampArray.length == 1){
            return parseInt(timestampArray[0]);
        }
        if(timestampArray.length == 2){
            return parseInt(timestampArray[0])*60 + parseInt(timestampArray[1]);
        }
        if(timestampArray.length == 3){
            return parseInt(timestampArray[0])*3600 + parseInt(timestampArray[1])*60 + parseInt(timestampArray[2]);
        }
    };  
    if(window.location.href.split('&')[0].includes('watch')){
        let currentTimestampText = document.querySelector('.ytp-time-current').textContent
        console.log(currentTimestampText);
        let currentTimestampArr = currentTimestampText.split(':');
        //let seconds = getSeconds(currentTimestampArr);
        let seconds = parseInt(document.querySelectorAll('.ytp-progress-bar')[document.querySelectorAll('.ytp-progress-bar').length -1].getAttribute('aria-valuenow'));
        const yt_url  = window.location.search.split('&')[0].slice(3);
        const url = `https://youtu.be/${yt_url}?t=${seconds}`;
        const res = await fetch(`https://api.telegram.org/bot${botId.trim()}/sendMessage?text=${url}&chat_id=${chatId.trim()}`);
        const resJSON = await res.json();
        chrome.storage.sync.set({isVideoPlayerPage: true})
        chrome.storage.sync.set({response: resJSON});
    } else {
        chrome.storage.sync.set({isVideoPlayerPage: false})
    }
    
}