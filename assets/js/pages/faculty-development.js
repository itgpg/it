document.addEventListener("DOMContentLoaded", function () {
    const fileContainer = document.getElementById("file-container");
    const breadcrumbContainer = document.getElementById("breadcrumb");
    const backButton = document.getElementById("back-btn");

    let folderStack = [CONFIG.FOLDER_IDS.faculty_development]; // Root folder stack

    async function fetchDriveFiles(folderId) {
        const url = `https://www.googleapis.com/drive/v3/files?q='${CONFIG.FOLDER_IDS.faculty_development}'+in+parents&key=${CONFIG.API_KEY}&fields=files(id,name,mimeType,webViewLink,webContentLink)`;

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

        // Filter only PDF and Image files
        const allowedFiles = files.filter(file =>
            file.mimeType.includes("pdf") || file.mimeType.includes("image")
        );

        if (!allowedFiles.length) {
            fileContainer.style.display = "none"; // Hide the folder if no PDFs or images
            return;
        } else {
            fileContainer.style.display = "block"; // Show if there are valid files
        }

        allowedFiles.forEach(file => {
            const fileCard = document.createElement("div");
            fileCard.classList.add("file-card");

            fileCard.innerHTML = `
                <div class="file-icon ${file.mimeType.includes("image") ? "image" : "pdf"}"></div>
                <p>${file.name}</p>
                <div class="file-actions">
                    <a href="${file.webViewLink}" target="_blank" class="view-btn">👁 View</a>
                    <a href="${file.webContentLink}" target="_blank" class="download-btn" download>⬇ Download</a>
                </div>
            `;

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
        } else {
            backButton.style.display = "none";
        }
    }

    backButton.addEventListener("click", function () {
        if (folderStack.length > 1) {
            folderStack.pop(); // Go back one level
            fetchDriveFiles(folderStack[folderStack.length - 1]);
        }
    });

    // Initial Fetch
    fetchDriveFiles(CONFIG.FOLDER_IDS.faculty_development);
});
