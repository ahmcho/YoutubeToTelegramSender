let color = '#3aa757';
chrome.runtime.onInstalled.addListener((e) => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});
chrome.storage.sync.get('isVideoPlayerPage', ({isVideoPlayerPage}) => {
    console.log('asdasd 233');
});