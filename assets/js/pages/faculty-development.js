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
            console.log(`API Response Status: ${response.status}`);

            if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

            const data = await response.json();
            console.log("Drive API Response Data:", data);

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
        console.log("Displaying files:", files);

        fileContainer.innerHTML = ""; // Clear previous content

        // Filter only PDFs and images
        const allowedFiles = files.filter(file =>
            file.mimeType.includes("pdf") || file.mimeType.includes("image")
        );

        console.log("Filtered files (PDFs & Images):", allowedFiles);

        if (!allowedFiles.length) {
            console.log("No valid files found, hiding folder.");
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

        console.log("Files successfully displayed.");
    }

    function updateBreadcrumb() {
        console.log("Updating breadcrumb...");

        breadcrumbContainer.innerHTML = ""; // Clear previous breadcrumbs
        folderStack.forEach((folderId, index) => {
            const breadcrumb = document.createElement("span");
            breadcrumb.textContent = index === 0 ? "Home" : `Folder ${index}`;
            breadcrumb.onclick = () => {
                console.log(`Breadcrumb clicked: Navigating to folder index ${index}`);
                folderStack = folderStack.slice(0, index + 1);
                fetchDriveFiles(folderStack[index]);
            };
            breadcrumbContainer.appendChild(breadcrumb);
            if (index < folderStack.length - 1) breadcrumbContainer.innerHTML += " / ";
        });

        console.log("Breadcrumb updated:", breadcrumbContainer.innerHTML);
    }

    function updateBackButton() {
        console.log("Updating Back Button Visibility. Current stack:", folderStack);

        if (folderStack.length > 1) {
            backButton.style.display = "block";
        } else {
            backButton.style.display = "none";
        }

        console.log("Back Button visibility updated.");
    }

    backButton.addEventListener("click", function () {
        console.log("Back button clicked.");
        if (folderStack.length > 1) {
            folderStack.pop(); // Go back one level
            console.log("Navigating to previous folder:", folderStack[folderStack.length - 1]);
            fetchDriveFiles(folderStack[folderStack.length - 1]);
        }
    });

    // Initial Fetch
    console.log("Fetching initial folder...");
    fetchDriveFiles(CONFIG.FOLDER_IDS.faculty_development);
});
