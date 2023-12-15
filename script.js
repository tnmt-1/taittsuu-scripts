// ==UserScript==
// @name         タイッツー
// @namespace    http://tampermonkey.net/
// @version      2023-12-14
// @description  try to take over the world!
// @author       tnmt
// @match        https://taittsuu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=taittsuu.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // つぶやくダイアログを表示したとき、フォーカスをテキストボックスに設定する
    const taiitsuButtons = document.getElementsByClassName("normalTaiitsuButtonWrap");
    Array.from(taiitsuButtons).forEach((taiitsuButton) => {
        taiitsuButton.addEventListener('click', () => {
            const taiitsuInput = document.getElementById("taiitsuInput");
            taiitsuInput.focus();
        })
    });

    // つぶやくダイアログが非表示で`n`を押したとき、つぶやくダイアログを表示する
    window.addEventListener('keypress', (e) => {
        const taiitsuDialog = document.getElementById("taiitsuDialog");
        if (taiitsuDialog.style.display !== 'none') return;
        if (e.key !== 'n') return;

        Taittsuu.Post.showTaiitsuDialog();
        const taiitsuInput = document.getElementById("taiitsuInput");
        taiitsuInput.focus();
    });

    // つぶやくダイアログが表示で`esc`を押したとき、つぶやくダイアログを非表示にする
    window.addEventListener('keydown', (e) => {
        const taiitsuDialog = document.getElementById("taiitsuDialog");
        if (taiitsuDialog.style.display !== '') return;
        if (e.key !== 'Escape') return;

        $('#taiitsuDialog').hide();
    });

    // Ctrl + Enterでタイーツできるようにする
    const taiitsuInput = document.getElementById("taiitsuInput");
    taiitsuInput.addEventListener('keypress', (e) => {
        if (!(e.ctrlKey && e.key === 'Enter')) return;
        $('#taiitsuButton').click();

        // タイッツー後、1.5秒後に再表示する
        setTimeout(() => {
            $('#refreshButton').click();
        }, 1500);
    });
})();
