/* --- TYPING EFFECT --- */
const typingText = document.querySelector('.typing');
const text = 'Vern Kuato';
let index = 0;

function type() {
  if (index < text.length) {
    typingText.textContent += text.charAt(index);
    index++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (index > 0) {
    typingText.textContent = text.substring(0, index - 1);
    index--;
    setTimeout(erase, 50);
  } else {
    setTimeout(type, 500);
  }
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  if (typingText) type();
});

/* --- SMOOTH SCROLL --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
