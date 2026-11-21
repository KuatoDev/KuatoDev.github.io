/* --- TYPING EFFECT (Index only) --- */
function initTyping() {
  const typingText = document.querySelector('.typing');
  if (!typingText) return;

  const text = 'Vern Kuato';
  let index = 0;
  let isErasing = false;

  // Clear initial fallback text if present
  typingText.textContent = '';

  function type() {
    if (!isErasing) {
      if (index < text.length) {
        typingText.textContent += text.charAt(index++);
        setTimeout(type, 100);
      } else {
        isErasing = true;
        setTimeout(type, 2000);
      }
    } else {
      if (index > 0) {
        typingText.textContent = text.substring(0, --index);
        setTimeout(type, 50);
      } else {
        isErasing = false;
        setTimeout(type, 500);
      }
    }
  }

  type();
}

/* --- DYNAMIC BLOG LOADING (With Zero-CLS Skeleton & Interactive Search/Filter) --- */
let allBlogPosts = [];
let activeTag = 'all';
let searchQuery = '';

function renderBlogSkeleton(container, count = 3) {
  container.innerHTML = Array(count).fill(0).map(() => `
    <div class="blog-card blog-skeleton-card">
      <div class="skeleton-shimmer skeleton-meta"></div>
      <div class="skeleton-shimmer skeleton-title"></div>
      <div class="skeleton-shimmer skeleton-desc-1"></div>
      <div class="skeleton-shimmer skeleton-desc-2"></div>
    </div>
  `).join('');
}

function renderArticlesList(container, posts, isInsideBlogFolder) {
  if (!posts || posts.length === 0) {
    container.innerHTML = `
      <div class="blog-empty">
        <span class="material-icons" aria-hidden="true">search_off</span>
        <h3>No matching articles</h3>
        <p>Try a different keyword or reset the category filter.</p>
      </div>`;
    return;
  }

  container.innerHTML = posts.map(post => {
    const finalLink = isInsideBlogFolder ? '../' + post.link : post.link;
    return `
      <a href="${finalLink}" class="blog-card">
        <div class="blog-meta">
          <span class="material-icons" style="font-size:14px;" aria-hidden="true">calendar_today</span> ${post.date}
          <span aria-hidden="true">•</span>
          <span class="material-icons" style="font-size:14px;" aria-hidden="true">tag</span> ${post.tag}
        </div>
        <h4>${post.title}</h4>
        <p>${post.description}</p>
        <span class="read-more-link">Read Article <span class="material-icons" style="font-size:16px;" aria-hidden="true">arrow_forward</span></span>
      </a>`;
  }).join('');
}

function filterAndRenderArticles(container, isInsideBlogFolder) {
  let filtered = allBlogPosts;

  if (activeTag !== 'all') {
    filtered = filtered.filter(p => p.tag && p.tag.toLowerCase() === activeTag.toLowerCase());
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p =>
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.tag && p.tag.toLowerCase().includes(q))
    );
  }

  renderArticlesList(container, filtered, isInsideBlogFolder);
}

function setupBlogControls(container, isInsideBlogFolder) {
  const searchInput = document.getElementById('blogSearchInput');
  const clearBtn = document.getElementById('blogSearchClear');
  const tagsContainer = document.getElementById('blogTagsContainer');

  if (!searchInput && !tagsContainer) return;

  // 1. Generate Tag Chips from posts
  if (tagsContainer && allBlogPosts.length > 0) {
    const uniqueTags = Array.from(new Set(allBlogPosts.map(p => p.tag).filter(Boolean)));
    const chipsHtml = ['<button class="tag-chip active" data-tag="all">All</button>']
      .concat(uniqueTags.map(t => `<button class="tag-chip" data-tag="${t}">${t}</button>`))
      .join('');
    tagsContainer.innerHTML = chipsHtml;

    tagsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.tag-chip');
      if (!chip) return;
      tagsContainer.querySelectorAll('.tag-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeTag = chip.getAttribute('data-tag') || 'all';
      filterAndRenderArticles(container, isInsideBlogFolder);
    });
  }

  // 2. Search Box Listener (with 200ms debounce)
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = searchQuery.length > 0 ? 'inline-flex' : 'none';
      }
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        filterAndRenderArticles(container, isInsideBlogFolder);
      }, 200);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        filterAndRenderArticles(container, isInsideBlogFolder);
      });
    }
  }
}

async function loadBlogPosts() {
  const blogContainer = document.querySelector('.blog-list');
  if (!blogContainer) return;

  const isHomeLimit = blogContainer.classList.contains('home-limit');
  const isInsideBlogFolder = Boolean(document.querySelector('link[href*="../style.css"]')) || window.location.pathname.includes('/blog/');
  const basePath = isInsideBlogFolder ? '../' : '';
  const jsonPath = basePath + 'blog/posts.json';

  // Render Zero-CLS skeleton placeholder immediately
  renderBlogSkeleton(blogContainer, isHomeLimit ? 1 : 3);

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error('Gagal load data');

    allBlogPosts = await response.json();

    if (isHomeLimit) {
      renderArticlesList(blogContainer, allBlogPosts.slice(0, 1), isInsideBlogFolder);
    } else {
      setupBlogControls(blogContainer, isInsideBlogFolder);
      renderArticlesList(blogContainer, allBlogPosts, isInsideBlogFolder);
    }

  } catch (error) {
    console.error('Error loading blog:', error);
    blogContainer.innerHTML = '<p style="color:var(--text-muted);text-align:center;">Failed to load articles.</p>';
  }
}

/* --- GITHUB ACTIVITY (With Cache & Rate-Limit Shield) --- */
async function loadGithubActivity() {
  const container = document.getElementById('githubActivity');
  if (!container) return;

  // Zero-CLS skeleton placeholder if empty
  if (!container.querySelector('.github-event') && !container.querySelector('.github-skeleton')) {
    container.innerHTML = `
      <div class="github-skeleton skeleton-shimmer"></div>
      <div class="github-skeleton skeleton-shimmer"></div>
      <div class="github-skeleton skeleton-shimmer"></div>
    `;
  }

  const GITHUB_USER = 'KuatoDev';
  const EVENT_LIMIT = 7;
  const CACHE_KEY = 'kuato_github_activity';
  const CACHE_TTL = 15 * 60 * 1000; // 15 menit

  const eventConfig = {
    PushEvent:              { icon: 'upload',        cls: 'icon-push',    label: 'Pushed to' },
    WatchEvent:             { icon: 'star',          cls: 'icon-star',    label: 'Starred' },
    ForkEvent:              { icon: 'call_split',    cls: 'icon-fork',    label: 'Forked' },
    PullRequestEvent:       { icon: 'merge',         cls: 'icon-pr',      label: 'Pull request on' },
    IssuesEvent:            { icon: 'bug_report',    cls: 'icon-issue',   label: 'Issue on' },
    CreateEvent:            { icon: 'add_circle',    cls: 'icon-create',  label: 'Created' },
    ReleaseEvent:           { icon: 'new_releases',  cls: 'icon-release', label: 'Released on' },
    DeleteEvent:            { icon: 'delete',        cls: 'icon-default', label: 'Deleted from' },
    PublicEvent:            { icon: 'public',        cls: 'icon-create',  label: 'Made public' },
    PullRequestReviewEvent: { icon: 'rate_review',   cls: 'icon-pr',      label: 'Reviewed PR on' },
    IssueCommentEvent:      { icon: 'comment',       cls: 'icon-issue',   label: 'Commented on' },
    CommitCommentEvent:     { icon: 'comment',       cls: 'icon-push',    label: 'Commented on' },
  };

  function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60)    return `${diff}s ago`;
    if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  function renderEvents(events) {
    if (!events || !events.length) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.9em;padding:8px 0;">No recent activity.</p>';
      return;
    }

    container.innerHTML = events.map(e => {
      const cfg = eventConfig[e.type] || { icon: 'code', cls: 'icon-default', label: 'Activity on' };
      const repo = e.repo.name.replace(`${GITHUB_USER}/`, '');
      const repoUrl = `https://github.com/${e.repo.name}`;
      return `
        <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="github-event">
          <div class="github-event-icon ${cfg.cls}">
            <span class="material-icons" aria-hidden="true">${cfg.icon}</span>
          </div>
          <div class="github-event-body">
            <div class="github-event-action">${cfg.label}</div>
            <div class="github-event-repo">${repo}</div>
            <div class="github-event-time">${timeAgo(e.created_at)}</div>
          </div>
        </a>`;
    }).join('');
  }

  // 1. Coba ambil dari Cache (Instant Load)
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && Array.isArray(parsed.data)) {
        renderEvents(parsed.data);
        // Jika cache masih sangat baru (< 15 menit), tak perlu fetch ulang
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          return;
        }
      }
    }
  } catch (e) {
    console.warn('Gagal membaca cache GitHub:', e);
  }

  // 2. Fetch fresh data dari GitHub API
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`);
    if (res.status === 403) {
      console.warn('GitHub API rate limit reached, keeping cached data.');
      if (!container.querySelector('.github-event')) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.9em;padding:8px 0;">GitHub activity temporarily unavailable (rate limited).</p>';
      }
      return;
    }
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const rawEvents = await res.json();
    const filtered = rawEvents
      .filter(e => Object.keys(eventConfig).includes(e.type))
      .slice(0, EVENT_LIMIT);

    renderEvents(filtered);

    // Simpan ke cache
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: filtered
      }));
    } catch (e) {
      // localStorage quota
    }

  } catch (err) {
    console.error('GitHub Activity error:', err);
    // Jika belum pernah render dari cache, tampilkan pesan fallback
    if (!container.querySelector('.github-event')) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.9em;padding:8px 0;">Failed to load GitHub activity.</p>';
    }
  }
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  initTyping();
  loadBlogPosts();
  loadGithubActivity();

  // Update footer year if present
  const yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Register Service Worker with safe context detection
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(reg => console.log('SW Registered with scope:', reg.scope))
      .catch(err => {
        // Fallback for non-root local file serving environments
        const isSubdir = Boolean(document.querySelector('link[href*="../style.css"]')) || window.location.pathname.includes('/blog/');
        const swUrl = isSubdir ? '../sw.js' : './sw.js';
        navigator.serviceWorker.register(swUrl)
          .then(r => console.log('SW Fallback registered:', r.scope))
          .catch(e => console.error('SW Registration Error:', e));
      });
  }
});
