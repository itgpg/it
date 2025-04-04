console.log("✅ newsletter.js loaded");

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM fully loaded");

  if (typeof CONFIG === 'undefined') {
    console.error("❌ CONFIG is not defined");
    return;
  }

  const container = document.getElementById("newsletter-container");

  // ✅ Stop execution if container doesn't exist
  if (!container) {
    console.error("❌ newsletter-container not found in the DOM");
    return;
  }

  const folderId = CONFIG.FOLDER_IDS.newsletters;
  const apiKey = CONFIG.API_KEY;

  const url = `https://www.googleapis.com/drive/v3/files?q='${encodeURIComponent(folderId)}'+in+parents+and+mimeType='application/pdf'&key=${apiKey}&fields=files(id,name,webViewLink,webContentLink)&supportsAllDrives=true&includeItemsFromAllDrives=true`;

  console.log("📡 Fetching newsletters from:", url);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("✅ API Response received:", data);

      if (data.files && data.files.length > 0) {
        container.innerHTML = ""; // ✅ Clear loading text

        data.files.forEach(file => {
          const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
          const viewUrl = file.webViewLink;

          const cardItem = document.createElement("div");
          cardItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "flex-wrap");

          cardItem.innerHTML = `
            <div class="mb-2 mb-md-0">
              <h5 class="mb-1">${file.name}</h5>
            </div>
            <div>
              <a href="${viewUrl}" class="btn btn-outline-secondary btn-sm me-2" target="_blank">View</a>
              <a href="${downloadUrl}" class="btn btn-primary btn-sm" target="_blank" download>Download</a>
            </div>
          `;
          container.appendChild(cardItem);
        });
      } else {
        console.warn("⚠️ No newsletters found");
        container.innerHTML = `<p class="text-muted">No newsletters found.</p>`;
      }
    })
    .catch(error => {
      console.error("❌ Error fetching newsletters:", error);
      container.innerHTML = `<p class="text-danger">Failed to load newsletters. Check console for details.</p>`;
    });
});
