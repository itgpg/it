document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = CONFIG.API_KEY;
    const ROOT_FOLDER_ID = CONFIG.FOLDER_IDS.facultyDevelopment;
    const fileContainer = document.getElementById("file-container");
    const breadcrumbContainer = document.getElementById("breadcrumb");

    let folderStack = [ROOT_FOLDER_ID];

    async function fetchDriveFiles(folderId) {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id, name, mimeType, webViewLink, webContentLink)`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            displayFiles(data.files);
        } catch (error) {
            console.error("Error fetching Drive files:", error);
            fileContainer.innerHTML = `<p class="error">Failed to load files.</p>`;
        }
    }

    function displayFiles(files) {
        fileContainer.innerHTML = "";

        if (folderStack.length > 1) {
            const backButton = document.createElement("button");
            backButton.innerText = "🔙 Back";
            backButton.classList.add("back-btn");
            backButton.onclick = () => {
                folderStack.pop();
                fetchDriveFiles(folderStack[folderStack.length - 1]);
                updateBreadcrumb();
            };
            fileContainer.appendChild(backButton);
        }

        files.forEach(file => {
            const fileCard = document.createElement("div");
            fileCard.classList.add("file-card");

            if (file.mimeType === "application/vnd.google-apps.folder") {
                fileCard.innerHTML = `<div class="file-icon folder"></div><p>${file.name}</p>`;
                fileCard.onclick = () => {
                    folderStack.push(file.id);
                    fetchDriveFiles(file.id);
                    updateBreadcrumb();
                };
            } else {
                fileCard.innerHTML = `
                    <div class="file-icon file"></div>
                    <p>${file.name}</p>
                    <div class="file-actions">
                        <a href="${file.webViewLink}" target="_blank" class="view-btn">👁 View</a>
                        <a href="${file.webContentLink}" download class="download-btn">⬇ Download</a>
                    </div>
                `;
            }
            fileContainer.appendChild(fileCard);
        });

        updateBreadcrumb();
    }

    function updateBreadcrumb() {
        breadcrumbContainer.innerHTML = "📂 ";
        breadcrumbContainer.innerHTML += folderStack.length > 1 ? `<span class="breadcrumb-item">Faculty Development</span>` : `<span class="breadcrumb-item root">Home</span>`;
    }

    fetchDriveFiles(ROOT_FOLDER_ID);
});
