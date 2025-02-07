const facultyMembers = [
    {
        name: "Ms. Hiralben Ravindrakumar Patel",
        designation: "I/C HOD",
        qualification: "Post. Graduation",
        email: "hiralit@gmail.com"
    },
    {
        name: "Mr. Vipul Harshadray Punasanwala",
        designation: "Lecturer",
        qualification: "Post Graduation",
        email: "vhpunasanwala@yahoo.com"
    },
    {
        name: "Mr. ANSHUMAN Satishkumar PATEL",
        designation: "Lecturer",
        qualification: "Post. Graduation",
        email: "anshu_info@yahoo.co.in"
    },
    {
        name: "Mr. Hardik Jaswantbhai Patel",
        designation: "Lecturer",
        qualification: "Post. Graduation",
        email: "hardik_patel1984@yahoo.co.in"
    },
    {
        name: "Mr. Harishchandrasinh Anopsinh Jhala",
        designation: "Lecturer",
        qualification: "Graduation",
        email: "harish.polytech@gmail.com"
    },
    {
        name: "Ms. Lataben Jasvantdanji Gadhavi",
        designation: "Lecturer",
        qualification: "Post. Graduation",
        email: "latagpg@gmail.com"
    },
    {
        name: "Mr. Ankit Subhash Didwania",
        designation: "Lecturer",
        qualification: "Post. Graduation",
        email: "ankitdidwania.office@gmail.com"
    },
    {
        name: "Mr. Nareshkumar Dayabhai Sosa",
        designation: "Lecturer",
        qualification: "Post. Graduation",
        email: "ndsosa.gp@gmail.com"
    },
    {
        name: "Mr. Keyurbhai Arvindbhai Jani",
        designation: "Lecturer",
        qualification: "Post Graduate",
        email: "keyurjani.office@gmail.com"
    },
    {
        name: "Mr. Pramod Tripathi",
        designation: "Lecturer",
        qualification: "Post Graduate",
        email: "csharp.pramod@gmail.com"
    },
    {
        name: "Mr. Rahul P Joshi",
        designation: "Lecturer",
        qualification: "Post Graduate",
        email: "rah1985@gmail.com"
    },
    {
        name: "Mr. Panchal Esan Pramodbhai",
        designation: "Lecturer",
        qualification: "Doctorate",
        email: "panchal.esan@gmail.com"
    },
    {
        name: "MR. TUSHAR PARMAR",
        designation: "Lecturer",
        qualification: "Graduation",
        email: "trparmar07@gmail.com"
    },
    {
        name: "Chahan Rashikbhai Katara",
        designation: "Lecturer",
        qualification: "Post Graduation",
        email: "chahan88@gmail.com"
    },
    {
        name: "Mr. ARCHIT NARESHBHAI MEHTA",
        designation: "Lecturer",
        qualification: "Graduation",
        email: "ar_1810@yahoo.com"
    },
    {
        name: "Mr. KIRTIBHAI BABUBHAI JETHVA",
        designation: "Lecturer",
        qualification: "Graduation",
        email: "jethva_kirti@yahoo.co.in"
    },
    {
        name: "Mr. MOHAMMAD JUNED ABDULLABHAI JHULAHA",
        designation: "Lecturer",
        qualification: "Graduation",
        email: "agate.1984@gmail.com"
    }
];

class FacultyPage {
    constructor() {
        this.facultyContainer = document.querySelector('.faculty-members');
    }

    renderFacultyCard(faculty) {
        return `
            <div class="faculty-card">
                <div class="faculty-info">
                    <h3 class="faculty-name">${faculty.name}</h3>
                    <p class="faculty-designation">${faculty.designation}</p>
                    <div class="faculty-details">
                        <div class="detail-item">
                            <i class="fas fa-graduation-cap"></i>
                            <span>${faculty.qualification}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:${faculty.email}" class="faculty-email">${faculty.email}</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAllFaculty() {
        if (!this.facultyContainer) return;
        
        const facultyHTML = facultyMembers
            .map(faculty => this.renderFacultyCard(faculty))
            .join('');
        
        this.facultyContainer.innerHTML = facultyHTML;
    }

    init() {
        this.renderAllFaculty();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const facultyPage = new FacultyPage();
    facultyPage.init();
}); 