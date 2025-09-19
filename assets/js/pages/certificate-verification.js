// assets/js/pages/certificate-verification.js
'use strict';
/* Certificate Verification (Drive lookup) - simplified, debug-enabled
   - Expects Jekyll page certificate-verification.html
   - Uses Drive REST API (apiKey) and folder hierarchy:
     ROOT_FOLDER → MM (month) → YYYY (year) → files named like GPGMMYYYYNNN.pdf
*/

const CONFIG = {
  API_KEY: 'AIzaSyBd34cP4KHFKN0WyNNiqhlQ2HSM8j2tD_E',
  ROOT_FOLDER_ID: '1HRuMCr20_SyYzre3OruHqLWknWIIc_tW'
};

console.log('Certificate Verification script loaded');

document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const elements = {
    formCard: document.getElementById('formCard'),
    form: document.getElementById('certificateForm'),
    certificateId: document.getElementById('certificateId'),
    verifyBtn: document.getElementById('verifyBtn'),
    loadingState: document.getElementById('loadingState'),
    certificateResult: document.getElementById('certificateResult'),
    certificateNotFound: document.getElementById('certificateNotFound'),
    errorState: document.getElementById('errorState'),
    foundCertId: document.getElementById('foundCertId'),
    workshopName: document.getElementById('workshopName'),
    workshopDate: document.getElementById('workshopDate'),
    viewBtn: document.getElementById('viewBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    exampleBadges: document.querySelectorAll('.example-badge'),
    tryAgainBtns: document.querySelectorAll('.try-again-btn')
  };

  let currentCertificate = null;

  // UI helpers
  function hideAllStates() {
    elements.formCard.classList.add('d-none');
    elements.loadingState.classList.add('d-none');
    elements.certificateResult.classList.add('d-none');
    elements.certificateNotFound.classList.add('d-none');
    elements.errorState.classList.add('d-none');
  }

  function showState(state) {
    hideAllStates();
    switch (state) {
      case 'form':
        elements.formCard.classList.remove('d-none');
        break;
      case 'loading':
        elements.loadingState.classList.remove('d-none');
        break;
      case 'result':
        elements.certificateResult.classList.remove('d-none');
        break;
      case 'notfound':
        elements.certificateNotFound.classList.remove('d-none');
        break;
      case 'error':
        elements.errorState.classList.remove('d-none');
        break;
      default:
        elements.formCard.classList.remove('d-none');
    }
  }

  function setButtonLoading(loading) {
    if (!elements.verifyBtn) return;
    if (loading) {
      elements.verifyBtn.classList.add('loading');
      elements.verifyBtn.disabled = true;
    } else {
      elements.verifyBtn.classList.remove('loading');
      elements.verifyBtn.disabled = false;
    }
  }

  // Validation & parsing
  function validateCertificateId(id) {
    return /^GPG\d{2}\d{4}\d{3}$/.test(id);
  }

  function parseCertificateId(id) {
    const m = id.match(/^GPG(\d{2})(\d{4})(\d{3})$/);
    if (!m) return null;
    return { month: m[1], year: m[2], id: m[3], full: id };
  }

  // Drive search helper (encodes query)
  async function searchInFolder(folderId, searchQuery) {
    const q = `'${folderId}' in parents and name contains '${searchQuery}' and trashed=false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType,webViewLink,webContentLink,thumbnailLink,modifiedTime)&key=${CONFIG.API_KEY}`;
    console.log(`[SEARCH] Folder ID: ${folderId}, Query: "${searchQuery}"`);
    console.log(`[SEARCH] URL: ${url}`);
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      if (!resp.ok) {
        console.error('[SEARCH ERROR]', data);
        throw new Error(data.error?.message || `HTTP ${resp.status}`);
      }
      const files = Array.isArray(data.files) ? data.files : [];
      console.log(`[SEARCH RESULT] Found ${files.length} items`);
      files.forEach(f => console.log(`   - ${f.name} (ID: ${f.id}, mimeType: ${f.mimeType})`));
      return files;
    } catch (err) {
      console.error('[SEARCH EXCEPTION]', err);
      throw err;
    }
  }

  // Core finder with fallback: try full id first, then suffix
  async function findCertificateByPath(certId) {
    console.log(`[FIND] Looking for certificate ID: ${certId}`);
    const parsed = parseCertificateId(certId);
    if (!parsed) throw new Error('Invalid certificate ID format');

    console.log(`[PARSED] Month: ${parsed.month} , Year: ${parsed.year} , ID: ${parsed.id}`);

    // Step 1: month folder under root
    console.log(`[STEP 1] Searching month folder (${parsed.month}) inside ROOT_FOLDER (${CONFIG.ROOT_FOLDER_ID})`);
    const monthFolders = await searchInFolder(CONFIG.ROOT_FOLDER_ID, parsed.month);
    if (!monthFolders.length) throw new Error(`No certificates found for month ${parsed.month}`);
    const monthFolder = monthFolders[0];
    console.log(`[FOUND] Month folder: ${monthFolder.name} ID: ${monthFolder.id}`);

    // Step 2: year folder under month
    console.log(`[STEP 2] Searching year folder (${parsed.year}) inside month folder (${monthFolder.id})`);
    const yearFolders = await searchInFolder(monthFolder.id, parsed.year);
    if (!yearFolders.length) throw new Error(`No certificates found for ${parsed.month}/${parsed.year}`);
    const yearFolder = yearFolders[0];
    console.log(`[FOUND] Year folder: ${yearFolder.name} ID: ${yearFolder.id}`);

    // Step 3: file search: try full code first, then suffix fallback
    console.log(`[STEP 3] Searching certificate file (${parsed.full}) inside year folder (${yearFolder.id})`);
    let certificateFiles = await searchInFolder(yearFolder.id, parsed.full);

    if (!certificateFiles.length) {
      console.log(`[STEP 3 - FALLBACK] No match for full id; trying numeric suffix (${parsed.id})`);
      certificateFiles = await searchInFolder(yearFolder.id, parsed.id);
    }

    if (!certificateFiles.length) {
      throw new Error(`Certificate ${certId} not found`);
    }

    console.log(`[FOUND] Certificate file: ${certificateFiles[0].name} (ID: ${certificateFiles[0].id})`);
    return { file: certificateFiles[0], parsed };
  }

  // Update UI with file info
  function updateCertificateDetails(certData) {
    const { file, parsed } = certData;
    elements.foundCertId.textContent = parsed.full;
    elements.workshopName.textContent = file.name || parsed.full;
    elements.workshopDate.textContent = file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

    currentCertificate = {
      id: file.id,
      name: file.name,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`,
      webViewLink: file.webViewLink || null,
      webContentLink: file.webContentLink || null
    };
  }

  // View certificate handler
  function viewCertificate() {
    if (!currentCertificate) {
      console.error('No certificate selected for viewing');
      return;
    }
    if (currentCertificate.webViewLink) {
      // Open in new tab
      window.open(currentCertificate.webViewLink, '_blank');
      console.log('Certificate opened for viewing:', currentCertificate.name);
    } else {
      // Fallback to download URL if webViewLink is not available
      window.open(currentCertificate.downloadUrl, '_blank');
      console.log('Certificate opened for viewing (fallback):', currentCertificate.name);
    }
  }

  // Download handler
  function downloadCertificate() {
    if (!currentCertificate) {
      console.error('No certificate selected for download');
      return;
    }
    const link = document.createElement('a');
    link.href = currentCertificate.downloadUrl;
    link.target = '_blank';
    link.download = currentCertificate.name || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Certificate downloaded:', currentCertificate.name);
  }

  // Reset/try again
  function resetForm() {
    currentCertificate = null;
    elements.certificateId.value = '';
    elements.certificateId.classList.remove('is-invalid');
    setButtonLoading(false);
    showState('form');
    elements.certificateId.focus();
  }

  // Event bindings
  elements.form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const raw = (elements.certificateId.value || '').trim().toUpperCase();

    if (!validateCertificateId(raw)) {
      elements.certificateId.classList.add('is-invalid');
      return;
    }

    elements.certificateId.classList.remove('is-invalid');
    setButtonLoading(true);
    showState('loading');

    try {
      const certData = await findCertificateByPath(raw);
      updateCertificateDetails(certData);
      showState('result');
    } catch (err) {
      console.error('Certificate verification failed:', err);
      if (err.message && err.message.toLowerCase().includes('not found')) {
        showState('notfound');
      } else {
        showState('error');
      }
    } finally {
      setButtonLoading(false);
    }
  });

  // View certificate button
  elements.viewBtn.addEventListener('click', viewCertificate);

  // Download button
  elements.downloadBtn.addEventListener('click', downloadCertificate);

  // Example badges fill input
  elements.exampleBadges.forEach(b => {
    b.addEventListener('click', () => {
      elements.certificateId.value = b.textContent.trim();
      elements.certificateId.focus();
    });
  });

  // Try again buttons
  elements.tryAgainBtns.forEach(btn => {
    btn.addEventListener('click', resetForm);
  });

  // Keyboard: Enter key on input will submit — already handled by form submit
  // Initialize UI
  showState('form');
  console.log('Initializing Certificate Verification...');
});
