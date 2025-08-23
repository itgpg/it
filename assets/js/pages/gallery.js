console.log("Gallery script loaded");

const apiKey = 'AIzaSyBd34cP4KHFKN0WyNNiqhlQ2HSM8j2tD_E';  
const folderId = "1-jLcnplBxED5CegDcRmUIC4p2BGa2gu7"; 
const gallery = document.getElementById('dynamic-gallery');

// ---- Helpers ---------------------------------------------------------------

function buildDriveMediaUrl(fileId) {
  // Preferred: direct media from Drive API (no viewer HTML)
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
}

function buildDriveUcUrl(fileId) {
  // Fallback: Google Drive "uc" viewer
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

function saneName(name) {
  return (name || '').toString().trim() || 'image';
}

// ---- Drive API fetchers ----------------------------------------------------

async function fetchSubfolders(parentId) {
  const q = `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)&orderBy=name_natural&pageSize=1000&key=${apiKey}`;
  console.log("Fetching subfolders:", url);
  const r = await fetch(url);
  if (!r.ok) {
    console.error("Failed to fetch subfolders:", r.status, r.statusText);
    return [];
  }
  const data = await r.json();
  console.log("Subfolders response:", data);
  return Array.isArray(data.files) ? data.files : [];
}

async function fetchImages(folderId) {
  // Use "mimeType contains 'image/'" to include jpg/png/webp/gif/etc.
  const q = `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType)&orderBy=name_natural&pageSize=1000&key=${apiKey}`;
  console.log(`Fetching images for ${folderId}:`, url);
  const r = await fetch(url);
  if (!r.ok) {
    console.error(`Failed to fetch images for ${folderId}:`, r.status, r.statusText);
    return [];
  }
  const data = await r.json();
  console.log(`Images response for ${folderId}:`, data);
  return Array.isArray(data.files) ? data.files : [];
}

// ---- UI renderers ----------------------------------------------------------

function createFolderSection(folderName, images) {
  const section = document.createElement('section');
  section.className = 'folder-section';
  section.style.marginBlock = '24px';

  const title = document.createElement('h2');
  title.textContent = folderName;
  title.style.fontSize = '1.25rem';
  title.style.margin = '0 0 12px 0';
  section.appendChild(title);

  const container = document.createElement('div');
  container.className = 'images-container';

  // Ensure container is visible even if site CSS is aggressive
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
  container.style.gap = '12px';
  container.style.alignItems = 'start';

  images.forEach(file => {
    const wrap = document.createElement('figure');
    wrap.style.margin = '0';
    wrap.style.borderRadius = '12px';
    wrap.style.overflow = 'hidden';
    wrap.style.boxShadow = '0 2px 12px rgba(0,0,0,.08)';
    wrap.style.background = '#f8f9fa';

    const img = document.createElement('img');
    img.alt = saneName(file.name);
    img.decoding = 'async';
    img.loading = 'lazy';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';

    // Try the direct media URL first; if it fails, fall back to uc URL
    const primaryUrl = buildDriveMediaUrl(file.id);
    const fallbackUrl = buildDriveUcUrl(file.id);
    img.src = primaryUrl;
    img.onerror = function () {
      // Only switch once to avoid loops
      if (img.src !== fallbackUrl) {
        console.warn('Primary image failed, switching to fallback:', primaryUrl, '→', fallbackUrl);
        img.src = fallbackUrl;
      } else {
        console.error('Both primary & fallback image URLs failed for:', file.id);
        // Hide broken image tile
        wrap.style.display = 'none';
      }
    };

    wrap.appendChild(img);
    container.appendChild(wrap);
  });

  section.appendChild(container);
  gallery.appendChild(section);
}

// ---- Main ------------------------------------------------------------------

async function loadGallery() {
  if (!gallery) {
    console.error('Gallery root element (#dynamic-gallery) not found.');
    return;
  }

  // Initial visible hint (removed once we start rendering)
  gallery.innerHTML = '<p style="margin:16px 0;color:#6c757d">Loading gallery…</p>';

  try {
    const subfolders = await fetchSubfolders(folderId);

    if (!subfolders.length) {
      gallery.innerHTML = '<p style="margin:16px 0;color:#6c757d">No gallery folders found.</p>';
      return;
    }

    // Clear the loading text before rendering
    gallery.innerHTML = '';

    for (const f of subfolders) {
      const images = await fetchImages(f.id);
      if (images.length) {
        createFolderSection(f.name, images);
      } else {
        console.warn(`No images in folder: ${f.name} (${f.id})`);
      }
    }
  } catch (err) {
    console.error('Error loading gallery:', err);
    gallery.innerHTML = '<p style="margin:16px 0;color:#dc3545">Failed to load gallery.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadGallery);



