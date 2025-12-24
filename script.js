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

/* --- DYNAMIC BLOG LOADING (JSON) --- */
async function loadBlogPosts() {
  const blogContainer = document.querySelector('.blog-list');
  
  // Cek apakah elemen .blog-list ada di halaman ini (biar ga error di halaman lain)
  if (!blogContainer) return;

  try {
    // 1. Ambil data dari posts.json
    const response = await fetch('blog/posts.json');
    if (!response.ok) throw new Error("Gagal load JSON");
    
    const posts = await response.json();

    // 2. Ambil cuma 3 artikel terbaru (biar halaman depan ga kepanjangan)
    const latestPosts = posts.slice(0, 3);
    
    // 3. Generate HTML untuk setiap artikel
    let blogHTML = '';
    
    latestPosts.forEach(post => {
      blogHTML += `
        <a href="${post.link}" class="blog-card">
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

    // 4. Masukkan ke dalam HTML
    blogContainer.innerHTML = blogHTML;

  } catch (error) {
    console.error("Error loading blog posts:", error);
    // Fallback kalau error: Tampilkan pesan manual atau kosongkan
    blogContainer.innerHTML = '<p style="color:var(--text-muted)">Gagal memuat artikel terbaru.</p>';
  }
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  if (typingText) type(); // Jalankan Typing Effect
  loadBlogPosts(); // Jalankan Blog Loader
});
