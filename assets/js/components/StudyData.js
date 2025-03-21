class StudyData {
    constructor() {
        // console.log('StudyData initialized');  // Commented out
        // Using your existing data structure
        this.data = {
            semester1: {
                'Python': { 
                    modules: [{ 
                        name: 'Python Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.python 
                    }] 
                },
                'IT Systems': { 
                    modules: [
                        { 
                            name: 'IT Systems Playlist', 
                            playlistId: CONFIG.PLAYLIST_IDS.it 
                        },
                        { 
                            name: 'IT System Chapter Wise Video Doc Link', 
                            files: ['https://drive.google.com/file/d/1Y-ISBbZla_wMdcuGb11Eo03sboCf5V0p/view?usp=sharing'] 
                        }
                    ] 
                },
                'PYQ': { 
                    modules: [
                        { 
                            name: 'CSE PYQ', 
                            files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.cse}`] 
                        },
                        { name: 'Python Programming PYQ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.python}`] },
                        { name: 'ITS PYQ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.it}`] },
                        { name: 'ECH PYQ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.ech}`] },
                        { name: 'Maths PYQ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.maths}`] }
                    ] 
                }
            },
            semester2: {
                'Syllabus': { 
                    modules: [{ 
                        name: 'Syllabus', 
                        files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.syllabusS2}`] 
                    }] 
                },
                'Advance Python': { 
                    modules: [{ 
                        name: 'Advance Python Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.advPython 
                    }] 
                },
                'Applied-maths': {
                    modules: [{ 
                        name: 'Applied Maths Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.enginnering_maths 
                    }]
                },
                
                'FSD': {
                    modules: [{ 
                        name: 'FSD', 
                        playlistId: CONFIG.PLAYLIST_IDS.FSD
                    }]
                },
            }
        };
        // console.log('Available semesters:', this.getSemesters());  // Commented out
    }

    getSemesters() {
        const semesters = Object.keys(this.data);
        // console.log('Getting semesters:', semesters);  // Commented out
        return semesters;
    }

    getSubjects(semester) {
        const subjects = Object.keys(this.data[semester] || {});
        // console.log(`Getting subjects for ${semester}:`, subjects);  // Commented out
        return subjects;
    }

    getModules(semester, subject) {
        const modules = this.data[semester]?.[subject]?.modules || [];
        // console.log(`Getting modules for ${semester} ${subject}:`, modules);  // Commented out
        return modules;
    }
} 