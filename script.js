/* --- TYPING EFFECT (Index only) --- */
function initTyping() {
  const typingText = document.querySelector('.typing');
  if (!typingText) return;

  const text = 'Vern Kuato';
  let index = 0;

  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index++);
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (index > 0) {
      typingText.textContent = text.substring(0, --index);
      setTimeout(erase, 50);
    } else {
      setTimeout(type, 500);
    }
  }

  type();
}

/* --- DYNAMIC BLOG LOADING --- */
async function loadBlogPosts() {
  const blogContainer = document.querySelector('.blog-list');
  if (!blogContainer) return;

  const isInsideBlogFolder = window.location.pathname.includes('/blog/');
  const basePath = isInsideBlogFolder ? '../' : '';
  const jsonPath = basePath + 'blog/posts.json';

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error('Gagal load data');

    let posts = await response.json();
    if (blogContainer.classList.contains('home-limit')) posts = posts.slice(0, 1);

    blogContainer.innerHTML = posts.map(post => {
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

  } catch (error) {
    console.error('Error loading blog:', error);
    blogContainer.innerHTML = '<p style="color:var(--text-muted);text-align:center;">Gagal memuat artikel.</p>';
  }
}

/* --- LOAD LAST WINNER (Index only) --- */
function loadIndexWinner() {
  const displayElement = document.getElementById('lastLemburSummary');
  if (!displayElement) return;

  const lastWinner = localStorage.getItem('lastLemburWinner');
  if (lastWinner) {
    displayElement.textContent = `Pemenang Terakhir: ${lastWinner}`;
    displayElement.style.color = 'var(--primary-accent)';
    displayElement.style.textShadow = '0 0 8px rgba(255,145,0,0.6)';
  } else {
    displayElement.textContent = 'Belum ada korban lembur';
  }
}

/* --- GITHUB ACTIVITY --- */
async function loadGithubActivity() {
  const container = document.getElementById('githubActivity');
  if (!container) return;

  const GITHUB_USER = 'KuatoDev';
  const EVENT_LIMIT = 7;

  const eventConfig = {
    PushEvent:                  { icon: 'upload',        cls: 'icon-push',    label: 'Pushed to' },
    WatchEvent:                 { icon: 'star',          cls: 'icon-star',    label: 'Starred' },
    ForkEvent:                  { icon: 'call_split',    cls: 'icon-fork',    label: 'Forked' },
    PullRequestEvent:           { icon: 'merge',         cls: 'icon-pr',      label: 'Pull request on' },
    IssuesEvent:                { icon: 'bug_report',    cls: 'icon-issue',   label: 'Issue on' },
    CreateEvent:                { icon: 'add_circle',    cls: 'icon-create',  label: 'Created' },
    ReleaseEvent:               { icon: 'new_releases',  cls: 'icon-release', label: 'Released on' },
    DeleteEvent:                { icon: 'delete',        cls: 'icon-default', label: 'Deleted from' },
    PublicEvent:                { icon: 'public',        cls: 'icon-create',  label: 'Made public' },
    PullRequestReviewEvent:     { icon: 'rate_review',   cls: 'icon-pr',      label: 'Reviewed PR on' },
    IssueCommentEvent:          { icon: 'comment',       cls: 'icon-issue',   label: 'Commented on' },
    CommitCommentEvent:         { icon: 'comment',       cls: 'icon-push',    label: 'Commented on' },
  };

  function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60)    return `${diff}s ago`;
    if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`);
    if (!res.ok) throw new Error('API error');

    const events = await res.json();
    const filtered = events
      .filter(e => Object.keys(eventConfig).includes(e.type))
      .slice(0, EVENT_LIMIT);

    if (!filtered.length) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.9em;">Tidak ada activity terbaru.</p>';
      return;
    }

    container.innerHTML = filtered.map(e => {
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

  } catch (err) {
    console.error('GitHub Activity error:', err);
    container.innerHTML = '<p style="color:var(--text-muted);font-size:0.9em;padding:8px 0;">Gagal memuat GitHub activity.</p>';
  }
}


function initSpinWheel() {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const spinBtn = document.getElementById('spinBtn');
  const namesInput = document.getElementById('namesInput');
  let names = [];
  let currentAngle = 0;
  let isSpinning = false;

  const colors = ['#f44336','#9c27b0','#3f51b5','#03a9f4','#009688','#8bc34a','#ffeb3b','#ff9800','#795548'];

  function getNames() {
    return namesInput.value.split('\n').filter(n => n.trim() !== '').slice(0, 9);
  }

  function drawWheel() {
    names = getNames();
    if (names.length === 0) return;
    const arc = (2 * Math.PI) / names.length;
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
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px Poppins';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(name, radius - 30, 10);
      ctx.restore();
    });
  }

  function spin() {
    if (isSpinning) return;
    names = getNames();
    if (names.length < 2) { alert('Minimal 2 orang dong ges!'); return; }

    isSpinning = true;
    spinBtn.disabled = true;
    spinBtn.innerText = 'LAGI MUTER...';

    const spinDuration = Math.floor(Math.random() * 3000) + 7000;
    const extraSpins = Math.floor(Math.random() * 5) + 10;
    const randomSpin = Math.floor(Math.random() * 360) + (360 * extraSpins);
    currentAngle += randomSpin;

    canvas.style.transition = `transform ${spinDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
    canvas.style.transform = `rotate(-${currentAngle}deg)`;

    setTimeout(() => {
      isSpinning = false;
      spinBtn.disabled = false;
      spinBtn.innerText = 'PUTAR GES! 🎲';

      const degPerSlice = 360 / names.length;
      const targetRotation = (270 + currentAngle) % 360;
      const index = Math.floor(targetRotation / degPerSlice) % names.length;
      const yanglembur = names[index];

      localStorage.setItem('lastLemburWinner', yanglembur);

      const customMessages = {
        'ARIS':    `Ciyeee si Aris mau ngumpulin modal pulang kampung... 😏`,
        'ARY':     `Semangat!! Lemburan lebih gede daripada di Bluebird Riiiiiiii 🤪`,
        'DWI NUR': `Kasian si Dwi jadi korban lembur.. 🥺`,
        'SHOHIFDA':`Ehemmmm.... Mau nyari modal kawin lagi ya Sho?? 🤪`,
        'KUATO':   `Getol amat cari duit? Mau beli PCX Baru ya wat?🤣`,
        'ZULFIKAR':`Manusia yang gabisa sakit! Sikat lemburannya Zul!!!`,
        'SURYAMIN':`BOSS YAMIN LEMBUUUUURRRRRRRRRRR`,
      };

      const key = yanglembur.trim().toUpperCase();
      const message = customMessages[key] ?? `Mampus!! Si ${yanglembur} yang lembur! Awokawokaowkaowk`;
      alert(message);
    }, spinDuration);
  }

  drawWheel();
  namesInput.addEventListener('input', drawWheel);
  spinBtn.addEventListener('click', spin);
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  initTyping();
  loadBlogPosts();
  loadIndexWinner();
  loadGithubActivity();
  initSpinWheel();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('SW Registered:', reg))
      .catch(err => console.error('SW Error:', err));
  }
});
