chrome.runtime.onInstalled.addListener((e) => {
    console.log('Welcome');
});
chrome.storage.sync.get('isVideoPlayerPage', ({isVideoPlayerPage}) => {
    console.log('is video player page');
});