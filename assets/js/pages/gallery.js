// gallery.js — FINAL (true smooth infinite auto-scroll, mobile-first)
// Preserves your working Drive fetch logic; only changes for smooth infinite scrolling

console.log("Gallery script loaded");

const apiKey  = 'AIzaSyBd34cP4KHFKN0WyNNiqhlQ2HSM8j2tD_E';
const folderId = '1vXU0cCwrYplFhmrGLu3MYuf1fVJeylWQ';

// Prefer inserting into #gallery-sections (from your index.html). Fallback to #dynamic-gallery.
const sectionsRoot =                                                                            
  document.getElementById('gallery-sections') ||
  document.getElementById('dynamic-gallery') ||
  document.body;                                                                                                                                                                                                  

// ---------- Helpers ---------------------------------------------------------

function buildDriveUcUrl(fileId) {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

function pickBestSrc(file) {
  const t = file.thumbnailLink || '';
  if (t) {
    return t.replace(/=s\d+/, '=s1024');
  }
  return buildDriveUcUrl(file.id);
}

function saneName(name) {
  return (name || '').trim() || 'image';
}

// ---------- Drive API fetchers ---------------------------------------------

async function fetchSubfolders(parentId) {
  const q = `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files` +
              `?q=${encodeURIComponent(q)}` +
              `&fields=files(id,name,modifiedTime)` +
              `&orderBy=modifiedTime desc` +
              `&pageSize=1000&key=${apiKey}`;
  const r = await fetch(url);
  if (!r.ok) {
    console.error("Failed to fetch subfolders:", r.status, r.statusText);
    return [];
  }
  const data = await r.json();
  // console.log(data)
  return Array.isArray(data.files) ? data.files : [];
}

async function fetchImages(folderId) {
  const q = `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files` +
              `?q=${encodeURIComponent(q)}` +
              `&fields=files(id,name,mimeType,thumbnailLink,modifiedTime)` +
              `&orderBy=name_natural` +
              `&pageSize=1000&key=${apiKey}`;
  const r = await fetch(url);
  if (!r.ok) {
    console.error(`Failed to fetch images for ${folderId}:`, r.status, r.statusText);
    return [];
  }
  const data = await r.json();
  // console.log(length(data.files))
  return Array.isArray(data.files) ? data.files : [];
}

// ---------- Infinite scroller util -----------------------------------------
// track: the scrolling element (must already contain original items, not clones)
// speed: pixels per second (lower = slower). default 20 (mobile-friendly).
// returns controls { pause(), resume() }
function initInfiniteScroller(track, speed = 20) {
  // Duplicate items to create seamless loop
  const originalChildren = Array.from(track.children);
  if (originalChildren.length === 0) return { pause: () => {}, resume: () => {} };

  // Clone each original child and append (so scrollWidth doubles)
  originalChildren.forEach(child => {
    const clone = child.cloneNode(true);
    track.appendChild(clone);
  });

  let loopWidth = track.scrollWidth / 2; // width of single content set
  let scrollPos = track.scrollLeft || 0;
  let lastTime = performance.now();
  let rafId = null;
  let paused = false;

  // Wait for images to load (first set) to measure accurate widths, else fallback after timeout
  const firstImgs = Array.from(track.querySelectorAll('img')).slice(0, originalChildren.length);
  let loaded = 0;
  const onImgLoaded = () => {
    loaded += 1;
    if (loaded >= firstImgs.length) {
      loopWidth = track.scrollWidth / 2;
      // ensure scrollPos is modulo loopWidth
      scrollPos = track.scrollLeft % loopWidth;
    }
  };
  if (firstImgs.length) {
    firstImgs.forEach(img => {
      if (img.complete) onImgLoaded();
      else {
        img.addEventListener('load', onImgLoaded, { once: true });
        img.addEventListener('error', onImgLoaded, { once: true });
      }
    });
  } else {
    // no images? set loopWidth small
    loopWidth = track.scrollWidth / 2 || 1;
  }

  // Animation loop using requestAnimationFrame for smooth motion
  function step(now) {
    if (paused) {
      lastTime = now;
      rafId = requestAnimationFrame(step);
      return;
    }
    const dt = (now - lastTime) / 1000; // seconds
    lastTime = now;
    scrollPos += speed * dt;
    // wrap smoothly
    if (loopWidth > 0) {
      if (scrollPos >= loopWidth) {
        scrollPos -= loopWidth;
      } else if (scrollPos < 0) {
        scrollPos += loopWidth;
      }
      // set the track scrollLeft to scrollPos (works with duplicated content)
      track.scrollLeft = scrollPos;
    }
    rafId = requestAnimationFrame(step);
  }

  // Start animation
  lastTime = performance.now();
  rafId = requestAnimationFrame(step);

  // Pause/resume helpers
  function pause() { paused = true; }
  function resume() { paused = false; }

  // Pause on interaction
  track.addEventListener('mouseenter', pause, { passive: true });
  track.addEventListener('mouseleave', resume, { passive: true });
  track.addEventListener('touchstart', pause, { passive: true });
  track.addEventListener('touchend', resume, { passive: true });

  // Recompute widths on resize
  let resizeTimer = null;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      loopWidth = track.scrollWidth / 2;
      // normalize scrollPos to new loop width
      scrollPos = track.scrollLeft % (loopWidth || 1);
    }, 120);
  };
  window.addEventListener('resize', onResize);

  return {
    pause: () => { pause(); },
    resume: () => { resume(); },
    destroy: () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
      track.removeEventListener('touchstart', pause);
      track.removeEventListener('touchend', resume);
    }
  };
}

// ---------- UI renderers ----------------------------------------------------

function createFolderSection(folderName, folderId, images) {
  const section = document.createElement('section');
  section.className = 'gallery-section';
  section.style.marginBlock = '24px'; 

  const title = document.createElement('h2');
  title.textContent = folderName;
  title.style.fontSize = '1.25rem';
  title.style.margin = '0 0 12px 0';
  section.appendChild(title);

  const carouselContainer = document.createElement('div');
  carouselContainer.style.position = 'relative';
  carouselContainer.style.overflow = 'hidden';

  const track = document.createElement('div');
  track.id = `carousel-${folderId}`;
  track.style.display = 'flex';
  track.style.gap = '12px';
  track.style.alignItems = 'stretch';
  track.style.overflowX = 'auto';
  track.style.scrollBehavior = 'smooth';
  track.style.scrollSnapType = 'x mandatory';
  track.style.padding = '4px 4px 8px 4px';
  track.style.webkitOverflowScrolling = 'touch';
  track.style.msOverflowStyle = 'none';
  track.style.scrollbarWidth = 'none';

  // build original items (only originals, clones will be added by initInfiniteScroller)
  images.forEach(file => {
    const item = document.createElement('div');
    item.style.flex = '0 0 auto';
    item.style.width = window.innerWidth < 480 ? '150px' : '220px';
    item.style.scrollSnapAlign = 'start';
    item.style.borderRadius = '12px';
    item.style.overflow = 'hidden';
    item.style.boxShadow = '0 2px 12px rgba(0,0,0,.08)';
    item.style.background = '#f8f9fa';

    const img = document.createElement('img');
    img.alt = saneName(file.name);
    img.decoding = 'async';
    img.loading = 'lazy';
    img.style.width = '100%';
    img.style.height = window.innerWidth < 480 ? '120px' : '200px';
    img.style.objectFit = 'cover';
    img.style.display = 'block';

    const initialSrc = pickBestSrc(file);
    const fallbackSrc = buildDriveUcUrl(file.id);
    img.src = initialSrc;

    img.onerror = function () {
      if (img.src !== fallbackSrc) {
        img.src = fallbackSrc;
      } else {
        item.style.display = 'none';
        console.error('Image failed for file id:', file.id);
      }
    };

    item.appendChild(img);
    track.appendChild(item);
  });

  // Buttons
  const makeButton = (txt, side) => {
    const btn = document.createElement('button');
    btn.textContent = txt;
    btn.style.position = 'absolute';
    btn.style.top = '50%';
    btn.style.transform = 'translateY(-50%)';
    btn.style.background = 'rgba(0,0,0,.4)';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.padding = '8px 12px';
    btn.style.cursor = 'pointer';
    btn.style.borderRadius = '999px';
    btn.style.zIndex = '2';
    btn.style[side] = '8px';
    btn.setAttribute('aria-label', txt === '‹' ? 'Scroll left' : 'Scroll right');
    return btn;
  };

  const btnLeft = makeButton('‹', 'left');
  const btnRight = makeButton('›', 'right');

  carouselContainer.appendChild(track);
  carouselContainer.appendChild(btnLeft);
  carouselContainer.appendChild(btnRight);
  section.appendChild(carouselContainer);
  sectionsRoot.appendChild(section);

  // Initialize infinite scroller with comfortable speed (pixels per second)
  // Use slower speed for mobile devices
  const mobileSpeed = 14; // px/s for small screens
  const desktopSpeed = 22; // px/s for larger screens
  const speed = window.innerWidth < 480 ? mobileSpeed : desktopSpeed;
  const controls = initInfiniteScroller(track, speed);

  // Manual nav: move by 60% of visible width
  btnLeft.addEventListener('click', () => {
    controls.pause();
    track.scrollBy({ left: -Math.max(200, track.clientWidth * 0.6), behavior: 'smooth' });
    // resume after short delay
    setTimeout(() => controls.resume(), 1400);
  });
  btnRight.addEventListener('click', () => {
    controls.pause();
    track.scrollBy({ left: Math.max(200, track.clientWidth * 0.6), behavior: 'smooth' });
    setTimeout(() => controls.resume(), 1400);
  });
}

// ---------- Main ------------------------------------------------------------

async function loadGallery() {
  if (!sectionsRoot) {
    console.error('Gallery container not found.');
    return;
  }

  sectionsRoot.innerHTML = '<p style="margin:16px 0;color:#6c757d">Loading gallery…</p>';

  try {
    const subfolders = await fetchSubfolders(folderId);

    if (!subfolders.length) {
      sectionsRoot.innerHTML = '<p style="margin:16px 0;color:#6c757d">No gallery folders found.</p>';
      return;
    }

    sectionsRoot.innerHTML = '';

    for (const f of subfolders) {
      const images = await fetchImages(f.id);
      if (images.length) {
        createFolderSection(f.name, f.id, images);
      } else {
        console.warn(`No images in folder: ${f.name} (${f.id})`);
      }
    }
  } catch (err) {
    console.error('Error loading gallery:', err);
    sectionsRoot.innerHTML = '<p style="margin:16px 0;color:#dc3545">Failed to load gallery.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadGallery);
