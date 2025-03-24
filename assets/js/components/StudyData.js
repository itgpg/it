class StudyData {
    constructor() {
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
                'Mathematics 1': {
                    modules: [{ 
                        name: 'Mathematics 1 Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.maths1 
                    }]
                },
                'Communication Skills': {
                    modules: [{ 
                        name: 'Communication Skills Resources', 
                        files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.communication_skills}`] 
                    }]
                },
                'PYQ': { 
                    modules: [
                        { name: 'CSE PYQ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.cse}`] },
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
                'Advanced Python': { 
                    modules: [{ 
                        name: 'Advanced Python Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.advPython 
                    }] 
                },
                'Applied Mathematics': {
                    modules: [{ 
                        name: 'Applied Mathematics Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.engineering_maths 
                    }]
                },
                'FSD': {
                    modules: [{ 
                        name: 'Full Stack Development', 
                        playlistId: CONFIG.PLAYLIST_IDS.FSD
                    }]
                },
                'Digital Electronics': {
                    modules: [{ 
                        name: 'Digital Electronics Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.digital_electronics 
                    }]
                }
            },
            semester3: {
                'Data Structures': { 
                    modules: [{ 
                        name: 'Data Structures Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.data_structures 
                    }] 
                },
                'Object-Oriented Programming (OOP)': { 
                    modules: [{ 
                        name: 'OOP in C++ Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.oop 
                    }] 
                },
                'Database Management Systems (DBMS)': {
                    modules: [{ 
                        name: 'DBMS Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.dbms 
                    }]
                },
                'Operating Systems': {
                    modules: [{ 
                        name: 'Operating Systems Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.os 
                    }]
                }
            },
            semester4: {
                'Software Engineering': { 
                    modules: [{ 
                        name: 'Software Engineering Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.software_engineering 
                    }] 
                },
                'Computer Networks': { 
                    modules: [{ 
                        name: 'Computer Networks Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.computer_networks 
                    }] 
                },
                'Web Development': {
                    modules: [{ 
                        name: 'Web Development Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.web_dev 
                    }]
                },
                'Cybersecurity Fundamentals': {
                    modules: [{ 
                        name: 'Cybersecurity Basics', 
                        playlistId: CONFIG.PLAYLIST_IDS.cybersecurity 
                    }]
                }
            },
            semester5: {
                'Machine Learning': { 
                    modules: [{ 
                        name: 'Machine Learning Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.machine_learning 
                    }] 
                },
                'Artificial Intelligence': { 
                    modules: [{ 
                        name: 'Artificial Intelligence Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.ai 
                    }] 
                },
                'Cloud Computing': {
                    modules: [{ 
                        name: 'Cloud Computing Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.cloud 
                    }]
                },
                'Mobile App Development': {
                    modules: [{ 
                        name: 'Mobile App Development', 
                        playlistId: CONFIG.PLAYLIST_IDS.mobile_dev 
                    }]
                }
            },
            semester6: {
                'Blockchain Technology': { 
                    modules: [{ 
                        name: 'Blockchain Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.blockchain 
                    }] 
                },
                'Big Data & Analytics': { 
                    modules: [{ 
                        name: 'Big Data Analytics Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.big_data 
                    }] 
                },
                'Internet of Things (IoT)': {
                    modules: [{ 
                        name: 'IoT Playlist', 
                        playlistId: CONFIG.PLAYLIST_IDS.iot 
                    }]
                },
                'Capstone Project': {
                    modules: [{ 
                        name: 'Project Guidelines & Resources', 
                        files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.project}`] 
                    }]
                }
            }
        };
    }

    getSemesters() {
        return Object.keys(this.data);
    }

    getSubjects(semester) {
        return Object.keys(this.data[semester] || {});
    }

    getModules(semester, subject) {
        return this.data[semester]?.[subject]?.modules || [];
    }
}
