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
    
            const data = await response.json();  // ✅ Correctly define `data` before using it
            console.log("API Response Status:", response.status);
            console.log("Drive API Response Data:", data);  // ✅ Log full response
    
            if (!data.files || !Array.isArray(data.files)) {
                throw new Error("Invalid API response: 'files' missing.");
            }
    
            console.log("All fetched files:", data.files);
            data.files.forEach(file => console.log(`File: ${file.name}, MIME Type: ${file.mimeType}`));
    
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
        
        const fileContainer = document.getElementById("file-container");
        fileContainer.innerHTML = "";  // Clear previous content
    
        // Categorize files manually based on extension
        const categories = {
            "PDFs": [],
            "Images": [],
            "Folders": [],
            "Others": []
        };
    
        files.forEach(file => {
            const fileName = file.name.toLowerCase();
    
            if (file.mimeType === "application/vnd.google-apps.folder") {
                categories["Folders"].push(file);
            } else if (fileName.endsWith(".pdf")) {
                categories["PDFs"].push(file);
            } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")) {
                categories["Images"].push(file);
            } else {
                categories["Others"].push(file);
            }
        });
    
        console.log("Categorized files:", categories);
    
        // Render categories
        Object.entries(categories).forEach(([category, fileList]) => {
            if (fileList.length > 0) {
                const section = document.createElement("div");
                section.classList.add("file-section");
                section.innerHTML = `<h3>${category}</h3>`;
                
                fileList.forEach(file => {
                    const fileElement = document.createElement("div");
                    fileElement.classList.add("file-item");
                    fileElement.innerHTML = `
                        <a href="${file.webViewLink}" target="_blank">${file.name}</a>
                    `;
                    section.appendChild(fileElement);
                });
    
                fileContainer.appendChild(section);
            }
        });
    
        // If no files, show message
        if (fileContainer.innerHTML === "") {
            fileContainer.innerHTML = `<p>No files available.</p>`;
        }
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
