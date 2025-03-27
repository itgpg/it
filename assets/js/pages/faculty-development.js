document.addEventListener("DOMContentLoaded", function () {
    const fileContainer = document.getElementById("file-container");
    const breadcrumbContainer = document.getElementById("breadcrumb");
    const backButton = document.getElementById("back-btn");

    let folderStack = [CONFIG.FOLDER_IDS.faculty_development]; // Root folder stack

    async function fetchDriveFiles(folderId) {
        console.log(`Fetching files for folder: ${folderId}`);
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${CONFIG.API_KEY}&fields=files(id,name,mimeType,webViewLink,webContentLink)`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch files`);

            const data = await response.json();
            console.log("API Response:", data);

            if (!data.files || !Array.isArray(data.files)) throw new Error("Invalid API response");

            fileContainer.innerHTML = "";
            data.files.forEach(file => {
                console.log("Processing file:", file.name);
                const fileItem = document.createElement("div");
                fileItem.classList.add("file-item");

                fileItem.innerHTML = `
                    <a href="${file.webViewLink}" target="_blank" class="file-link">
                        <span class="${file.mimeType.includes("image") ? "file-image" : "file-pdf"}"></span>
                        ${file.name}
                    </a>
                `;

                fileContainer.appendChild(fileItem);
            });

            updateBreadcrumb();
            updateBackButton();
        } catch (error) {
            console.error("Error fetching files:", error);
            fileContainer.innerHTML = `<p class="error">Failed to load files. Please try again later.</p>`;
        }
    }

    function updateBreadcrumb() {
        breadcrumbContainer.innerHTML = "";
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
        backButton.style.display = folderStack.length > 1 ? "block" : "none";
    }

    backButton.addEventListener("click", function () {
        if (folderStack.length > 1) {
            folderStack.pop();
            fetchDriveFiles(folderStack[folderStack.length - 1]);
        }
    });

    fetchDriveFiles(CONFIG.FOLDER_IDS.faculty_development);
});
