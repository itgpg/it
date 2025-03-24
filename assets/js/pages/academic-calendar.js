document.addEventListener("DOMContentLoaded", function () {
    const semesters = {
        "2024": [
            { sem: "Semester 1", link: "" },
            { sem: "Semester 2", link: "https://drive.google.com/file/d/1qzxvlH_HqmwrfCY6Ct5KwclTC7to3Pcz/view?usp=sharing" },
            { sem: "Semester 3", link: "" },
            { sem: "Semester 4", link: "" },
            { sem: "Semester 5", link: "" },
            { sem: "Semester 6", link: "" }
        ]
    };

    const semesterContainer = document.getElementById("semesterCards");
    const yearDropdown = document.getElementById("yearDropdown");
    const yearItems = document.querySelectorAll("#yearList .dropdown-item");

    yearItems.forEach(item => {
        item.addEventListener("click", function () {
            const selectedYear = this.getAttribute("data-year");
            yearDropdown.innerText = selectedYear;
            loadSemesters(selectedYear);
        });
    });

    function loadSemesters(year) {
        semesterContainer.innerHTML = "";
        if (semesters[year]) {
            semesters[year].forEach(sem => {
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
                linkBtn.innerText = sem.link ? "View Calendar" : "Coming Soon";
                linkBtn.href = sem.link ? sem.link : "#";
                linkBtn.target = "_blank";
                linkBtn.disabled = !sem.link;

                cardBody.appendChild(title);
                cardBody.appendChild(linkBtn);
                card.appendChild(cardBody);
                col.appendChild(card);
                semesterContainer.appendChild(col);
            });
        }
    }

    // Load default year
    loadSemesters("2024");
});
