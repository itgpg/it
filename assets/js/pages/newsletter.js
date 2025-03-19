document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("newsletter-container");
    const folderId = CONFIG.FOLDER_IDS.newsletters;
    const apiKey = CONFIG.API_KEY;
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${apiKey}&fields=files(id,name,webViewLink,webContentLink)`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.files && data.files.length > 0) {
                data.files.forEach(file => {
                    const cardItem = document.createElement("div");
                    cardItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

                    cardItem.innerHTML = `
                        <div>
                            <h5 class="mb-1">${file.name}</h5>
                        </div>
                        <a href="${file.webContentLink}" class="btn btn-primary" target="_blank" download>Download</a>
                    `;
                    container.appendChild(cardItem);
                });
            } else {
                container.innerHTML = `<p class="text-muted">No newsletters found.</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching newsletters:", error);
            container.innerHTML = `<p class="text-danger">Failed to load newsletters.</p>`;
        });
});
