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
                        playlistId: CONFIG.PLAYLIST_IDS.enginnering_maths
                        // playlistId: '1xIFEVMpiB2wZvJL3KVRQKEdcecfUskLs'
                    }]
                },
                'Communication Skills': {
                    modules: [{
                        name: 'Communication Skills Resources',
                        files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.cse}`]
                    }]
                },
                'PYQ': {
                    modules: [
                        { name: 'CSE PYQ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_1.cse}`] },
                        { name: 'Python Programming PYQ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_1.python}`] },
                        { name: 'ITS PYQ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_1.it}`] },
                        { name: 'ECH PYQ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_1.ech}`] },
                        { name: 'Maths PYQ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_1.maths}`] }
                    ]
                }
            },
            semester2: {
                'Syllabus': {
                    modules: [{
                        name: 'Syllabus',
                        files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.syllabusS2}`],
                    }]
                },
                'PYQ': {
                    modules: [
                        { name: 'Advance Python', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_2.Advance_python}`] },
                        { name: 'enginnering  Maths ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_2.enginnering_maths_s2}`] },
                        { name: 'applied  Maths ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_2.Applied_maths_s2}`] },
                        { name: 'Modern physics', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_2.Modern_physics}`] },
                        { name: 'Enviromental Sustainability ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_2.enviromental_sustainability}`] }
                    ]
                },
                'Advanced Python': {
                    modules: [{
                        name: 'Advanced Python Playlist',
                        playlistId: CONFIG.PLAYLIST_IDS.advPython
                    }]
                },
                'Applied Mathematics': {
                    modules: [{
                        name: ' Tutorial book Playlist',
                        playlistId: CONFIG.PLAYLIST_IDS.enginnering_maths
                    },
                    {
                        name: 'Playlist by gtu',
                        playlistId: CONFIG.PLAYLIST_IDS.gtu_maths_2
                    },
                    {
                        name: 'notes-chapter-wise',
                        files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.Notes.Applied_maths}`],
                        description: 'Please note: These materials have not been provided or officially endorsed by the faculty of Government Polytechnic Gandhinagar.'
                    }]
                },
                'FSD': {
                    modules: [{
                        name: 'fundamental of software development',
                        playlistId: CONFIG.PLAYLIST_IDS.FSD
                    }]
                },
                'Enviromental-sustainability': {
                    modules: [{
                        name: 'Notes-english',
                        files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.Notes.english.ES}`],
                        description: 'Please note: These materials have not been provided or officially endorsed by the faculty of Government Polytechnic Gandhinagar.'
                    },
                    {
                        name: 'Notes-Gujarati',
                        files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.Notes.gujarati.ES}`],
                        description: 'Please note: These materials have not been provided or officially endorsed by the faculty of Government Polytechnic Gandhinagar.'
                    }]
                },
                'Modern-physics': {
                    modules: [{
                        name: 'Notes-english',
                        files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.Notes.english.MPH}`],
                        description: 'Please note: These materials have not been provided or officially endorsed by the faculty of Government Polytechnic Gandhinagar.'
                    },
                    {
                        name: 'Notes-Gujarati',
                        files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.Notes.gujarati.MPH}`],
                        description: 'Please note: These materials have not been provided or officially endorsed by the faculty of Government Polytechnic Gandhinagar.'
                    }]
                }
            },
            semester3: {
                'syllabus': {
                    modules: [{
                        name: 'Syllabus',
                        files: [`https://drive.google.com/drive/folders/${CONFIG.yr_2024_2025.sem3.syllabs}`],
                        description: 'Syllabus for Semester 3 for year 2024-2025 , recheck the syllabus through the gtu official sources  before exam as it may change.'
                    }]
                },
                'Digital - Marketing': {
                    modules: [{
                        name: 'Video Playlist',
                        playlistId: CONFIG.PLAYLIST_IDS.digital_markteting,
                        description: 'Digital Marketing Playlist for Semester 3, 2024-2025'
                    }]
                },
                'PYQ': {
                    modules: [
                        { name: 'Database management system ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_3.dbms}`] },
                        { name: 'Data structure with python  ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_3.dsp}`] },
                        { name: 'operating system ', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_3.os}`] },
                        // { name: 'digital marketing', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_3.edm}`] },
                        // { name: 'oopj', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_3.oopj}`] }
                    ]
                }
                // 'debugging':{
                //     modules :[
                //         {
                //             name: 'cideo Playlist',
                //             playlistId : CONFIG.PLAYLIST_IDS.debugging
                //         }
                //     ]
                // }

            },
            semester4: {
                'syllabus': {
                    modules: [{
                        name: 'Syllabus',
                        files: [`https://drive.google.com/drive/folders/${CONFIG.yr_2025_2026.sem4.syllabus}`],
                        description: 'Syllabus for Semester 4 for year 2025-2026 , recheck the syllabus through the gtu official sources  before exam as it may change.'
                    }]
                },
                'PYQ': {
                    modules: [
                        { name: 'Mobile Computing and Networks', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_4.mcn}`] },
                        { name: 'Fundamental of Machine Learning', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_4.fml}`] },
                        { name: 'Cyber Security and Digital Forensics', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_4.csdfs}`] },
                        { name: 'Data Mining and Warehousing', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_4.dmw}`] },
                        { name: 'Entrepreneurship & Start-up', files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_4.es}`] },
                    ]
                }
            },
            semester5: {
                'Machine Learning': {
                    modules: [{
                        name: 'Machine Learning Playlist',
                        playlistId: CONFIG.PLAYLIST_IDS.fundamentals_of_machine_learning
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

    cleanFilename(filename) {
        return filename.replace(/^\.pdf|^\.[a-zA-Z]+/, '');
    }
}


