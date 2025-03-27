document.addEventListener("DOMContentLoaded", function () {
    const fileContainer = document.getElementById("file-container");
    const breadcrumbContainer = document.getElementById("breadcrumb");
    const backButton = document.getElementById("back-btn"); // Back button for navigation

    let folderStack = [CONFIG.FOLDER_IDS.faculty_development]; // Root folder stack

    async function fetchDriveFiles(folderId) {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${CONFIG.API_KEY}&fields=files(id,name,mimeType,webViewLink,webContentLink)`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

            const data = await response.json();
            if (!data.files || !Array.isArray(data.files)) {
                throw new Error("Invalid API response: 'files' missing.");
            }

            displayFiles(data.files);
            updateBreadcrumb();
            updateBackButton();
        } catch (error) {
            console.error("Error fetching Drive files:", error);
            fileContainer.innerHTML = `<p class="error">Failed to load files. Check API key, folder ID, and network.</p>`;
        }
    }

    function displayFiles(files) {
        fileContainer.innerHTML = ""; // Clear previous content

        if (!files.length) {
            fileContainer.innerHTML = `<p class="no-files">No files found in this folder.</p>`;
            return;
        }

        files.forEach(file => {
            const fileCard = document.createElement("div");
            fileCard.classList.add("file-card");

            if (file.mimeType === "application/vnd.google-apps.folder") {
                fileCard.innerHTML = `<div class="file-icon folder"></div><p>${file.name}</p>`;
                fileCard.onclick = () => {
                    folderStack.push(file.id);
                    fetchDriveFiles(file.id);
                };
            } 
            // Render only PDFs and images
            else if (file.mimeType === "application/pdf" || file.mimeType.startsWith("image/")) {
                fileCard.innerHTML = `
                    <div class="file-icon file"></div>
                    <p>${file.name}</p>
                    <div class="file-actions">
                        <a href="${file.webViewLink}" target="_blank" class="view-btn">👁 View</a>
                        <a href="${file.webContentLink}" target="_blank" class="download-btn" download>⬇ Download</a>
                    </div>
                `;
            } 
            // Exclude rendering other file types
            else {
                return;
            }

            fileContainer.appendChild(fileCard);
        });
    }

    function updateBreadcrumb() {
        breadcrumbContainer.innerHTML = ""; // Clear previous breadcrumbs
        folderStack.forEach((folderId, index) => {
            const breadcrumb = document.createElement("span");
            breadcrumb.textContent = index === 0 ? "Home" : `Folder ${index}`;
            breadcrumb.onclick = () => {
                folderStack = folderStack.slice(0, index + 1);
                fetchDriveFiles(folderStack[index]);
            };
            breadcrumbContainer.appendChild(breadcrumb);
            if (index < folderStack.length - 1) breadcrumbContainer.innerHTML += " / ";
        });
    }

    function updateBackButton() {
        if (folderStack.length > 1) {
            backButton.style.display = "block";
            backButton.onclick = () => {
                folderStack.pop(); // Go back to the previous folder
                fetchDriveFiles(folderStack[folderStack.length - 1]);
            };
        } else {
            backButton.style.display = "none"; // Hide back button if at root
        }
    }

    // Initial fetch
    fetchDriveFiles(CONFIG.FOLDER_IDS.faculty_development);
});
