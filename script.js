/* --- TYPING EFFECT --- */
const typingText = document.querySelector('.typing');
const text = 'Vern Kuato';
let index = 0;

function type() {
  if (!typingText) return; // Safety check
  if (index < text.length) {
    typingText.textContent += text.charAt(index);
    index++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (!typingText) return; // Safety check
  if (index > 0) {
    typingText.textContent = text.substring(0, index - 1);
    index--;
    setTimeout(erase, 50);
  } else {
    setTimeout(type, 500);
  }
}

/* --- DYNAMIC BLOG LOADING --- */
async function loadBlogPosts() {
  const blogContainer = document.querySelector('.blog-list');
  if (!blogContainer) return; 

  // Detect location
  const isInsideBlogFolder = window.location.pathname.includes('/blog/');
  const basePath = isInsideBlogFolder ? '../' : '';
  const jsonPath = basePath + 'blog/posts.json'; 

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error("Gagal load data json");
    
    let posts = await response.json();

    // Logic Limit di Home
    if (blogContainer.classList.contains('home-limit')) {
      posts = posts.slice(0, 1);
    }
    
    let blogHTML = '';
    
    posts.forEach(post => {
      let finalLink = post.link;
      if (isInsideBlogFolder) {
         finalLink = '../' + post.link;
      }

      blogHTML += `
        <a href="${finalLink}" class="blog-card">
          <div class="blog-meta">
            <span class="material-icons" style="font-size: 14px;">calendar_today</span> ${post.date}
            <span>•</span>
            <span class="material-icons" style="font-size: 14px;">tag</span> ${post.tag}
          </div>
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <span class="read-more-link">Read Article <span class="material-icons" style="font-size: 16px;">arrow_forward</span></span>
        </a>
      `;
    });

    blogContainer.innerHTML = blogHTML;

  } catch (error) {
    console.error("Error loading blog:", error);
    blogContainer.innerHTML = '<p style="color:var(--text-muted); text-align:center;">Gagal memuat artikel.</p>';
  }
}

/* --- LOAD LAST WINNER (INDEX PAGE) --- */
function loadIndexWinner() {
    const displayElement = document.getElementById('lastLemburSummary');
    if (!displayElement) return; // Kalau gak ada elemennya (bukan di index), skip

    // Ambil dari LocalStorage browser
    const lastWinner = localStorage.getItem('lastLemburWinner');
    
    if (lastWinner) {
        displayElement.textContent = `Pemenang Terakhir: ${lastWinner}`;
        // Styling dikit biar highlight
        displayElement.style.color = '#fff';
        displayElement.style.textShadow = '0 0 5px rgba(255,255,255,0.8)';
    } else {
        displayElement.textContent = "Belum ada korban lembur";
    }
}

/* --- SPIN WHEEL LOGIC (SPIN PAGE) --- */
function initSpinWheel() {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return; // Only run if canvas exists (on spin page)

    const ctx = canvas.getContext('2d');
    const spinBtn = document.getElementById('spinBtn');
    const namesInput = document.getElementById('namesInput');
    let names = [];
    let currentAngle = 0;
    let isSpinning = false;
    
    const colors = ['#f44336', '#9c27b0', '#3f51b5', '#03a9f4', '#009688', '#8bc34a', '#ffeb3b', '#ff9800', '#795548'];

    function getNames() {
        let rawNames = namesInput.value.split('\n').filter(n => n.trim() !== '');
        if (rawNames.length > 9) {
            rawNames = rawNames.slice(0, 9);
        }
        return rawNames;
    }

    function drawWheel() {
        names = getNames();
        if (names.length === 0) return;
        const arc = 2 * Math.PI / names.length;
        const radius = canvas.width / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        names.forEach((name, i) => {
            const angle = i * arc;
            ctx.beginPath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius, angle, angle + arc);
            ctx.lineTo(radius, radius);
            ctx.fill();
            
            // Border antar slice
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            ctx.translate(radius, radius);
            ctx.rotate(angle + arc / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = "bold 24px Poppins";
            ctx.shadowColor="rgba(0,0,0,0.8)";
            ctx.shadowBlur=4;
            ctx.fillText(name, radius - 30, 10);
            ctx.restore();
        });
    }

    function spin() {
        if (isSpinning) return;
        names = getNames();
        if (names.length < 2) {
            alert("Minimal 2 orang dong ges!");
            return;
        }

        isSpinning = true;
        spinBtn.disabled = true;
        spinBtn.innerText = "LAGI MUTER...";

        // Putaran Random
        const randomSpin = Math.floor(Math.random() * 360) + (360 * 5); 
        currentAngle += randomSpin; 

        // Putar Canvas (Negative = Counter Clockwise)
        canvas.style.transform = `rotate(-${currentAngle}deg)`;

        setTimeout(() => {
            isSpinning = false;
            spinBtn.disabled = false;
            spinBtn.innerText = "PUTAR GES! 🎲";
            
            const degPerSlice = 360 / names.length;
            
            // Logic Pointer Fix (Counter Clockwise Rotation vs Static Pointer at Top)
            const targetRotation = (270 + currentAngle) % 360;
            
            // Hitung Index
            let index = Math.floor(targetRotation / degPerSlice);
            index = index % names.length;
            
            const yanglembur = names[index];
            
            // --- SAVE WINNER TO LOCAL STORAGE ---
            localStorage.setItem('lastLemburWinner', yanglembur);
            
            alert(`Mampus!! Si ${yanglembur} yang lembur! Awokawokaowkaowk`);

        }, 5000); 
    }

    // Init Draw
    drawWheel();
    
    // Listeners
    namesInput.addEventListener('input', drawWheel);
    spinBtn.addEventListener('click', spin);
}

/* --- GLOBAL INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  type(); 
  loadBlogPosts(); 
  loadIndexWinner(); // Load winner status on index
  initSpinWheel(); // Try initializing spin wheel
  
  // --- PWA SERVICE WORKER REGISTRATION ---
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Service Worker Registered!', reg))
      .catch((err) => console.log('Service Worker Gagal!', err));
  }
});
