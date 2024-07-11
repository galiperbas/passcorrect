function add_more_char(str, need) {
    let pos = 0;
    const low_case = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < need; i++) {
        pos = Math.floor(Math.random() * 1000) % str.length;
        str = str.substring(0, pos) + low_case.charAt(Math.floor(Math.random() * 1000) % 26) + str.substring(pos + 1);
    }
    return str;
}

function suggester(l, u, d, s, str) {
    const num = "0123456789";
    const low_case = "abcdefghijklmnopqrstuvwxyz";
    const up_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const spl_char = "@#$_()!";

    let pos = 0;

    if (l === 0) {
        pos = Math.floor(Math.random() * 1000) % str.length;
        str = str.substring(0, pos) + low_case.charAt(Math.floor(Math.random() * 1000) % 26) + str.substring(pos + 1);
    }
    if (u === 0) {
        pos = Math.floor(Math.random() * 1000) % str.length;
        str = str.substring(0, pos) + up_case.charAt(Math.floor(Math.random() * 1000) % 26) + str.substring(pos + 1);
    }
    if (d === 0) {
        pos = Math.floor(Math.random() * 1000) % str.length;
        str = str.substring(0, pos) + num.charAt(Math.floor(Math.random() * 1000) % 10) + str.substring(pos + 1);
    }
    if (s === 0) {
        pos = Math.floor(Math.random() * 1000) % str.length;
        str = str.substring(0, pos) + spl_char.charAt(Math.floor(Math.random() * 1000) % 7) + str.substring(pos + 1);
    }

    return str;
}

function generate_password(n, p) {
    let l = 0, u = 0, d = 0, s = 0, need = 0;
    let suggest;

    for (let i = 0; i < n; i++) {
        if (p.charCodeAt(i) >= 97 && p.charCodeAt(i) <= 122) {
            l = 1;
        } else if (p.charCodeAt(i) >= 65 && p.charCodeAt(i) <= 90) {
            u = 1;
        } else if (p.charCodeAt(i) >= 48 && p.charCodeAt(i) <= 57) {
            d = 1;
        } else {
            s = 1;
        }
    }

    if ((l + u + d + s) === 4) {
        return "Your Password is Strong";
    } else {
        return "Suggested password";
    }
}

function checkPassword() {
    const input = document.getElementById("passwordInput").value;
    const feedback = document.getElementById("feedback");
    const suggestions = document.getElementById("suggestions");

    suggestions.innerHTML = "";

    if (input.length === 0) {
        feedback.textContent = "";
        return;
    }

    const status = generate_password(input.length, input);

    feedback.textContent = status;

    if (status === "Suggested password") {
        for (let i = 0; i < 10; i++) {
            let suggest = suggester(0, 0, 0, 0, input);
            let need = 8 - suggest.length;
            if (need > 0) {
                suggest = add_more_char(suggest, need);
            }
            const suggestionElement = document.createElement("div");
            suggestionElement.textContent = suggest;
            suggestionElement.classList.add("suggestion");
            suggestions.appendChild(suggestionElement);
        }
    }
}
