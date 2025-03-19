document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("newsletter-container");
    const folderId = CONFIG.FOLDER_IDS.newsletters;
    const apiKey = CONFIG.API_KEY;

    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'` +
                `&key=${apiKey}&fields=files(id,name,webViewLink,webContentLink)` +
                `&supportsAllDrives=true&includeItemsFromAllDrives=true`;

    console.log("Fetching newsletters from:", url);

    fetch(url)
        .then(response => {
            console.log("Raw API Response:", response);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Parsed API JSON Response:", data);

            if (data.files && data.files.length > 0) {
                console.log(`Found ${data.files.length} PDF(s). Rendering...`);
                data.files.forEach(file => {
                    console.log(`Rendering file: ${file.name}`, file);

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
                console.warn("No PDF newsletters found or permission issue.");
                container.innerHTML = `<p class="text-muted">No newsletters found.</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching newsletters:", error);
            container.innerHTML = `<p class="text-danger">Failed to load newsletters. Check console for details.</p>`;
        });
});
