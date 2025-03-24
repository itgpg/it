document.addEventListener("DOMContentLoaded", function () {
    if (!window.CONFIG || !window.CONFIG.API_KEY ) {
        console.error("❌ API key or academic calendar folder ID is missing from config.js");
        return;
    }

    const API_KEY = window.CONFIG.API_KEY;
    const PARENT_FOLDER_ID = "16a58BgCLN8h0SnGxjnYFGDdkfWqcuS49"; // Root folder containing year folders

    const yearDropdown = document.getElementById("yearDropdown");
    const yearList = document.getElementById("yearList");
    const calendarCards = document.getElementById("calendarCards");

    async function fetchYears() {
        const url = `https://www.googleapis.com/drive/v3/files?q='${PARENT_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id,name)`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayYearDropdown(data.files);
        } catch (error) {
            console.error("❌ Error fetching year folders:", error);
        }
    }

    function displayYearDropdown(years) {
        yearList.innerHTML = "";
        years.sort((a, b) => b.name.localeCompare(a.name)); // Sort years descending

        years.forEach(year => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.className = "dropdown-item";
            link.href = "#";
            link.textContent = year.name;
            link.setAttribute("data-id", year.id);
            link.addEventListener("click", function () {
                yearDropdown.innerText = year.name;
                fetchCalendarFiles(year.id);
            });

            listItem.appendChild(link);
            yearList.appendChild(listItem);
        });
    }

    async function fetchCalendarFiles(folderId) {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${API_KEY}&fields=files(id,name)`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayCalendarFiles(data.files);
        } catch (error) {
            console.error("❌ Error fetching academic calendar PDFs:", error);
        }
    }

    function displayCalendarFiles(files) {
        calendarCards.innerHTML = ""; // Clear previous content

        if (files.length === 0) {
            console.log("⚠️ No academic calendar found for this year.");
            return;
        }

        files.forEach(file => {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-3";

            const card = document.createElement("div");
            card.className = "card shadow-sm text-center";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const title = document.createElement("h5");
            title.className = "card-title";
            title.innerText = file.name;

            const viewBtn = document.createElement("a");
            viewBtn.className = "btn btn-outline-secondary btn-sm me-2";
            viewBtn.href = `https://drive.google.com/file/d/${file.id}/view`;
            viewBtn.target = "_blank";
            viewBtn.innerText = "View";

            const downloadBtn = document.createElement("a");
            downloadBtn.className = "btn btn-primary btn-sm";
            downloadBtn.href = `https://drive.google.com/uc?export=download&id=${file.id}`;
            downloadBtn.target = "_blank";
            downloadBtn.innerText = "Download";

            cardBody.appendChild(title);
            cardBody.appendChild(viewBtn);
            cardBody.appendChild(downloadBtn);
            card.appendChild(cardBody);
            col.appendChild(card);
            calendarCards.appendChild(col);
        });
    }

    fetchYears(); // Load available years on page load
});
