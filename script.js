const text = "App Developer";
let index = 0;

function typeEffect() {
    document.querySelector(".typing").textContent = text.slice(0, index++);
    if (index <= text.length) {
        setTimeout(typeEffect, 100);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);