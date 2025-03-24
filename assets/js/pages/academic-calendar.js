document.addEventListener("DOMContentLoaded", function () {
    // Ensure CONFIG and API_KEY exist
    if (!window.CONFIG || !window.CONFIG.API_KEY) {
        console.error("Google Drive API Key is missing from config.js");
        return;
    }

    const API_KEY = window.CONFIG.API_KEY; // Fetch API key from config.js
    const FOLDER_ID = "16a58BgCLN8h0SnGxjnYFGDdkfWqcuS49"; // Academic Calendar Folder ID

    async function fetchDriveFiles() {
        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const files = data.files.filter(file => file.mimeType === "application/pdf");

            organizeFilesByYear(files);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    }

    function organizeFilesByYear(files) {
        const semesters = {};

        files.forEach(file => {
            const match = file.name.match(/(\d{4})_Semester_(\d+)/);
            if (match) {
                const year = match[1];
                const sem = `Semester ${match[2]}`;
                if (!semesters[year]) semesters[year] = [];
                semesters[year].push({ sem, link: `https://drive.google.com/file/d/${file.id}/view` });
            }
        });

        populateYearDropdown(semesters);
    }

    function populateYearDropdown(semesters) {
        const yearDropdown = document.getElementById("yearDropdown");
        const yearList = document.getElementById("yearList");
        yearList.innerHTML = "";

        Object.keys(semesters).sort().reverse().forEach(year => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.className = "dropdown-item";
            link.href = "#";
            link.textContent = year;
            link.addEventListener("click", function () {
                yearDropdown.innerText = year;
                displaySemesters(semesters[year]);
            });

            listItem.appendChild(link);
            yearList.appendChild(listItem);
        });

        // Load latest year by default
        if (Object.keys(semesters).length > 0) {
            const latestYear = Object.keys(semesters).sort().reverse()[0];
            yearDropdown.innerText = latestYear;
            displaySemesters(semesters[latestYear]);
        }
    }

    function displaySemesters(semesters) {
        const semesterContainer = document.getElementById("semesterCards");
        semesterContainer.innerHTML = "";

        semesters.forEach(sem => {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-3";
            
            const card = document.createElement("div");
            card.className = "card shadow-sm text-center";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const title = document.createElement("h5");
            title.className = "card-title";
            title.innerText = sem.sem;

            const linkBtn = document.createElement("a");
            linkBtn.className = "btn btn-primary";
            linkBtn.innerText = "View Calendar";
            linkBtn.href = sem.link;
            linkBtn.target = "_blank";

            cardBody.appendChild(title);
            cardBody.appendChild(linkBtn);
            card.appendChild(cardBody);
            col.appendChild(card);
            semesterContainer.appendChild(col);
        });
    }

    fetchDriveFiles();
});
