document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded and DOM ready.");

    const fileContainer = document.getElementById("file-container");
    const breadcrumbContainer = document.getElementById("breadcrumb");
    const backButton = document.getElementById("back-btn");

    let folderStack = [CONFIG.FOLDER_IDS.faculty_development]; // Root folder stack

    async function fetchDriveFiles(folderId) {
        console.log(`Fetching files from folder ID: ${folderId}`);

        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${CONFIG.API_KEY}&fields=files(id,name,mimeType,webViewLink,webContentLink)`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

            const data = await response.json();
            console.log("API Response Status:", response.status);
            console.log("Drive API Response Data:", data);

            if (!data.files || !Array.isArray(data.files)) {
                throw new Error("Invalid API response: 'files' missing.");
            }

            console.log("All fetched files:", data.files);
            displayFiles(data.files);
            updateBreadcrumb();
            updateBackButton();
        } catch (error) {
            console.error("Error fetching Drive files:", error);
            fileContainer.innerHTML = `<p class="error">Failed to load files. Check API key, folder ID, and network.</p>`;
        }
    }

    function displayFiles(files) {
        console.log("Displaying files:", files);
        fileContainer.innerHTML = ""; // Clear previous content

        files.forEach(file => {
            const fileCard = document.createElement("div");
            fileCard.classList.add("file-card");

            if (file.mimeType === "application/vnd.google-apps.folder") {
                fileCard.innerHTML = `
                    <div class="file-icon folder"></div>
                    <p>${file.name}</p>
                    <button class="open-folder-btn">📁 Open</button>
                `;
                fileCard.querySelector(".open-folder-btn").addEventListener("click", () => openFolder(file.id));
            } else if (file.mimeType === "application/pdf") {
                fileCard.innerHTML = `
                    <div class="file-icon pdf"></div>
                    <p>${file.name}</p>
                    <div class="file-actions">
                        <a href="${file.webViewLink}" target="_blank" class="view-btn">👁 View</a>
                        <a href="${file.webContentLink}" target="_blank" class="download-btn" download>⬇ Download</a>
                    </div>
                `;
            } else if (file.mimeType.startsWith("image/")) {
                fileCard.innerHTML = `
                    <img src="${file.webContentLink}" class="file-image" alt="${file.name}">
                    <p>${file.name}</p>
                    <div class="file-actions">
                        <a href="${file.webViewLink}" target="_blank" class="view-btn">👁 View</a>
                        <a href="${file.webContentLink}" target="_blank" class="download-btn" download>⬇ Download</a>
                    </div>
                `;
            }

            fileContainer.appendChild(fileCard);
        });

        console.log("Files successfully displayed.");
    }

    function openFolder(folderId) {
        console.log("Opening folder:", folderId);
        folderStack.push(folderId);
        fetchDriveFiles(folderId);
    }

    function updateBreadcrumb() {
        console.log("Updating breadcrumb...");
        breadcrumbContainer.innerHTML = "";

        folderStack.forEach((folderId, index) => {
            const breadcrumb = document.createElement("span");
            breadcrumb.textContent = index === 0 ? "Home" : `Folder ${index}`;
            breadcrumb.onclick = () => navigateToFolder(index);
            breadcrumbContainer.appendChild(breadcrumb);
            if (index < folderStack.length - 1) breadcrumbContainer.innerHTML += " / ";
        });

        console.log("Breadcrumb updated:", breadcrumbContainer.innerHTML);
    }

    function navigateToFolder(index) {
        console.log(`Breadcrumb clicked: Navigating to folder index ${index}`);
        folderStack = folderStack.slice(0, index + 1);
        fetchDriveFiles(folderStack[index]);
    }

    function updateBackButton() {
        console.log("Updating Back Button Visibility. Current stack:", folderStack);
        backButton.style.display = folderStack.length > 1 ? "block" : "none";
    }

    backButton.addEventListener("click", function () {
        console.log("Back button clicked.");
        if (folderStack.length > 1) {
            folderStack.pop();
            fetchDriveFiles(folderStack[folderStack.length - 1]);
        }
    });

    console.log("Fetching initial folder...");
    fetchDriveFiles(CONFIG.FOLDER_IDS.faculty_development);
});
