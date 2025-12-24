/* --- TYPING EFFECT --- */
const typingText = document.querySelector('.typing');
const text = 'Vern Kuato';
let index = 0;

function type() {
  if (index < text.length) {
    if(typingText) typingText.textContent += text.charAt(index);
    index++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (index > 0) {
    if(typingText) typingText.textContent = text.substring(0, index - 1);
    index--;
    setTimeout(erase, 50);
  } else {
    setTimeout(type, 500);
  }
}

/* --- DYNAMIC BLOG LOADING (FINAL) --- */
async function loadBlogPosts() {
  const blogContainer = document.querySelector('.blog-list');
  
  if (!blogContainer) return; 

  // Path Detection: Cek apakah kita di dalam folder 'blog/' atau di root
  const isInsideFolder = window.location.pathname.includes('/blog/');
  // Kalau di dalam folder, mundur (../). Kalau di root, masuk (blog/).
  const jsonPath = isInsideFolder ? '../blog/posts.json' : 'blog/posts.json';

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error("Gagal load data");
    
    let posts = await response.json();

    // LOGIKA LIMIT:
    // Index.html punya class 'home-limit' -> Ambil 1
    // Blog.html TIDAK punya class 'home-limit' -> Ambil Semua
    if (blogContainer.classList.contains('home-limit')) {
      posts = posts.slice(0, 1);
    }
    
    let blogHTML = '';
    
    posts.forEach(post => {
      // Fix Link kalau user lagi buka artikel di dalam folder
      // Kalau link di JSON "blog/article-1.html", kita harus ubah jadi "../blog/article-1.html" atau "../article-1.html" tergantung struktur
      // Sederhananya: Kalau di dalam folder, mundur dulu (../) sebelum akses link
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

    blogContainer.innerHTML = blogHTML;

  } catch (error) {
    console.error(error);
    blogContainer.innerHTML = '<p style="color:var(--text-muted); text-align:center;">Gagal memuat artikel.</p>';
  }
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  if (typingText) type(); 
  loadBlogPosts(); 
});
