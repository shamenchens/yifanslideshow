# 柯 P 滑出來對你說政見 2.1


## 簡介

本 Plugin 之內容與資訊來源，使用「[柯文哲野生官網 unlimited](http://unlimited.kptaipei.tw/)」所提供之 API 服務，讓您可以簡單、輕鬆地在 個人網站 或 網誌 中埋入「柯P彩蛋」，並讓更多人得以了解柯文哲之政見。

更多相關說明，請參考 [柯文哲野生官網 unlimited](http://unlimited.kptaipei.tw/)


## 使用範例

[請點擊這裡](http://goooooooogle.github.io/kp/)


## Firefox Addon

如果要產生 xpi addon 檔案，到專案目錄下打 `make` 即可，這個指令會下載 Firefox Addon SDK 與 jquery 並且打包成 xpi 檔案放到 `firefox/kp-slide.xpi`

如果想要測試，請用 `make run`，會開啟一個新的 Firefox 視窗並且已經安裝好 addon。


![image](http://i.imgur.com/43Mm5gW.png)


## 更新紀錄

ver 1.0 初次亮相，請多指教 了解更多

ver 2.0 更改 Plugin 架構，並且新增可自訂之 Options

ver 2.1 新增數個 options：可設定多張圖片、對話框出現效果、可選左側或右側滑出、可設定文字和背景顏色等等
移除 left 選項，改以 enter_distance 取代


## 授權

本專案採用 [BSD 授權](https://github.com/goooooooogle/kp/blob/gh-pages/LICENSE)
