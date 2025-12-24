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

/* --- DYNAMIC BLOG LOADING --- */
async function loadBlogPosts() {
  const blogContainer = document.querySelector('.blog-list');
  if (!blogContainer) return;

  try {
    // 1. Bersihkan dulu isinya biar gak dobel (Hapus text Loading)
    blogContainer.innerHTML = '<p style="color: var(--text-muted); width: 100%; text-align: center;">Mengambil data...</p>';

    // 2. Tentukan path JSON yang benar (Cek apakah kita di dalam folder atau root)
    // Kalau URL mengandung 'blog/', berarti kita di dalam folder, harus mundur (../)
    const isInsideFolder = window.location.pathname.includes('/blog/');
    const jsonPath = isInsideFolder ? '../blog/posts.json' : 'blog/posts.json';

    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error("File JSON tidak ditemukan");
    
    let posts = await response.json();

    // 3. Cek Limit (Index vs Blog Page)
    if (blogContainer.classList.contains('home-limit')) {
      posts = posts.slice(0, 1); // Cuma 1 artikel buat Home
    }
    
    // 4. Render HTML
    let blogHTML = '';
    posts.forEach(post => {
      // Fix link kalau kita lagi di dalam folder
      const linkPath = isInsideFolder && !post.link.startsWith('http') ? '../' + post.link : post.link;

      blogHTML += `
        <a href="${linkPath}" class="blog-card">
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

    // 5. Masukkan ke container (Loading otomatis hilang ketimpa ini)
    blogContainer.innerHTML = blogHTML;

  } catch (error) {
    console.error("Error:", error);
    // Tampilkan pesan error kalau gagal
    blogContainer.innerHTML = `
      <div style="text-align: center; width: 100%; color: var(--text-muted);">
        <span class="material-icons" style="font-size: 40px; display: block; margin-bottom: 10px;">error_outline</span>
        <p>Gagal memuat artikel.</p>
        <small style="opacity: 0.7;">(Pastikan buka via Live Server / GitHub Pages, bukan klik file langsung)</small>
      </div>
    `;
  }
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  if (typingText) type(); 
  loadBlogPosts(); 
});
