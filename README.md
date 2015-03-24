# Yifan 滑出來對你說 0.1

## 使用範例

[請點擊這裡](http://shamenchens.github.io/yifanslideshow/demo)


## Firefox Addon

如果要產生 xpi addon 檔案，到專案目錄下打 `make` 即可，這個指令會下載 Firefox Addon SDK 與 jquery 並且打包成 xpi 檔案放到 `firefox/yifan-slideshow.xpi`

如果想要測試，請用 `make run`，會開啟一個新的 Firefox 視窗並且已經安裝好 addon。

## Chrome Extension

Build Chrome extension 稍微麻煩一點，請先到專案目錄下面打 `make chrome`，這個時候 jquery 跟 yifansays 的檔案會被複製到 chrome 目錄底下，這個時候請打開 Chrome -> 工具 -> 擴充功能，點選 `封裝擴充功能` 即可打包 chrome extension，詳情請見 Chrome 官網上面的[打包說明](https://developer.chrome.com/extensions/packaging)

## 更新紀錄

ver 0.1 初次亮相，請多指教 了解更多

## 授權

本專案採用 [BSD 授權](https://github.com/shamenchens/yifanslideshow/blob/gh-pages/LICENSE)
