const facultyMembers = [
    {
        name: "Ms. Hiralben Ravindrakumar Patel",
        designation: "I/C HOD",
        qualification: "Post. Graduation",
        email: "hiralit@gmail.com",
        shortName:"HRP"
    },
    {
        name: "Mr. Nareshkumar Dayabhai Sosa",
        designation: "Lecturer",
        qualification: "Post. Graduation",
        email: "ndsosa.gp@gmail.com",
        shortName:"NDS"
    },
    {
        name: "Mr. Vipul Harshadray Punasanwala",
        designation: "Lecturer",
        qualification: "Post Graduation",
        email: "vhpunasanwala@yahoo.com",
        shortName:"VHP"
    },
    {
        name: "Dr. ANSHUMAN Satishkumar PATEL",
        designation: "Lecturer",
        qualification: "Doctorate",
        email: "anshu_info@yahoo.co.in",
        shortName:"ASP"
    },
    {
        name: "Mr. Hardik Jaswantbhai Patel",
        designation: "Lecturer",
        qualification: "Post. Graduation",
        email: "hardik_patel1984@yahoo.co.in",
        shortName:"HJP"
    },
    {
        name: "Mr. Harishchandrasinh Anopsinh Jhala",
        designation: "Lecturer",
        qualification: "Graduation",
        email: "harish.polytech@gmail.com",
        shortName:"HAJ"
    },
    {
        name: "Dr. Lataben Jasvantdanji Gadhavi",
        designation: "Lecturer",
        qualification: "Doctorate",
        email: "latagpg@gmail.com",
        shortName:"LJG"
    },
    {
        name: "Mr. Ankit Subhash Didwania",
        designation: "Lecturer",
        qualification: "Post. Graduation",
        email: "ankitdidwania.office@gmail.com",
        shortName:"ASD"
    },
   
    {
        name: "Dr. Keyurbhai Arvindbhai Jani",
        designation: "Lecturer",
        qualification: "Doctorate",
        email: "keyurjani.office@gmail.com",
        shortName:"KAJ"
    },
    {
        name: "Mr. Pramod Tripathi",
        designation: "Lecturer",
        qualification: "Post Graduate",
        email: "csharp.pramod@gmail.com",
        shortName:"PKT"
    },
    {
        name: "Mr. Rahul P Joshi",
        designation: "Lecturer",
        qualification: "Post Graduate",
        email: "rah1985@gmail.com",
        shortName:"RPJ"
    },
    {
        name: "Dr. Panchal Esan Pramodbhai",
        designation: "Lecturer",
        qualification: "Doctorate",
        email: "panchal.esan@gmail.com",
        shortName:"EPP"
    },
    {
        name: "MR. TUSHAR PARMAR",
        designation: "Lecturer",
        qualification: "Graduation",
        email: "trparmar07@gmail.com",
        shortName:"TRP"
    },
    {
        name: "Chahan Rashikbhai Katara",
        designation: "Lecturer",
        qualification: "Post Graduation",
        email: "chahan88@gmail.com",
        shortName:"CRK"
    },
    {
        name: "Mr. ARCHIT NARESHBHAI MEHTA",
        designation: "Lecturer",
        qualification: "Graduation",
        email: "ar_1810@yahoo.com",
        shortName:"ANM"
    },
    {
        name: "Mr. KIRTIBHAI BABUBHAI JETHVA",
        designation: "Lecturer",
        qualification: "Graduation",
        email: "jethva_kirti@yahoo.co.in",
        shortName:"KBJ"
    },
    {
        name: "Mr. MOHAMMAD JUNED ABDULLABHAI JHULAHA",
        designation: "Lecturer",
        qualification: "Graduation",
        email: "agate.1984@gmail.com",
        shortName:"MJA"
    }
];

class FacultyPage {
    constructor() {
        this.facultyContainer = document.querySelector('.faculty-members');
    }
    //resconstrue the image atch fetche let the images be faetced fromsam dir but with this formar {faculty_shortname.jpeg or faculty_shortname_png}
    renderFacultyCard(faculty) {
            return `
            <div class="faculty-card">
                <div class="faculty-image">
                    <img src="../../assets/images/faculty_imgs/${faculty.shortName.toLowerCase()}.jpeg" alt="${faculty.name}" 
                         onerror="this.src='../../assets/images/faculty_imgs/default_png.png'">
                </div>
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
