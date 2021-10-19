javascript: (async function() {
    async function digestMessage(message) {
        var msgUint8 = new TextEncoder().encode(message);
        var hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
        var hashArray = Array.from(new Uint8Array(hashBuffer));
        var hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        return hashHex;
    }
    async function main() {
        var prevLabel = "prevSha256";
        var prevSha = localStorage.getItem(prevLabel);
        var curSha = await digestMessage(document.getElementsByTagName("body")[0].innerHTML);
        if (!prevSha) {
            localStorage.setItem(prevLabel, curSha);
            alert("First run");
        } else if (curSha === prevSha) {
            alert("No Change");
        } else {
            localStorage.setItem(prevLabel, curSha);
            alert("URL Changed");
        }
    }
    await main();
})();
