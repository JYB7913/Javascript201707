~(function () {
    let desW = 640;
    let doc = document.documentElement;

    function refreshRem() {
        let winW = doc.clientWidth;
        if (winW >= desW) {
            doc.style.fontSize = '100px';
            return;
        }
        let radio = desW / winW;
        doc.style.fontSize = 100 / radio + 'px';
    }

    refreshRem();
    window.addEventListener('resize', refreshRem);
})();