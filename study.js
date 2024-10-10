const apiKey = 'AIzaSyBgRGDCTkDdBdrYqxht2oFYRTeucUmAfFg'; // Your YouTube API Key
const pythonPlaylistId = 'PL5hA7O8RI2bPOSoX7l8zZIIuDQrc9b9wO';
const itPlaylistId = 'PLZ3xYAWT5a-nskfWOvHd_Fvh4RZsedu7G';

const studyData = {
    semester1: {
        'Python': {
            modules: [
                {
                    name: 'Python Playlist',
                    videos: [],
                    playlistId: pythonPlaylistId,
                    files: ['https://drive.google.com/file1', 'https://drive.google.com/file2']
                }
            ]
        },
        'IT Systems': {
            modules: [
                {
                    name: 'IT Systems Playlist',
                    videos: [],
                    playlistId: itPlaylistId,
                    files: ['https://drive.google.com/file5', 'https://drive.google.com/file6']
                },
                {
                    name: 'Unit I: Basics of Information System',
                    videos: [
                        { title: 'Importance of IT', videoId: 'Hbg7QsmPNCY' },
                        { title: 'Google Search Engine', videoId: 'ZyC59OE1f-4' }
                    ]
                },
                {
                    name: 'Unit II: Digital Logic',
                    videos: [
                        { title: 'Number Systems', videoId: 'V8FG6u17clQ' },
                        { title: 'Logic Gates', videoId: '47u7b2yh7s8' }
                    ]
                }
            ]
        }
    },
    semester2: {
        'Dummy Subject': {
            modules: [{ name: 'Module 1', videos: [] }]
        }
    },
    semester3: {
        'Dummy Subject': {
            modules: [{ name: 'Module 1', videos: [] }]
        }
    },
    semester4: {
        'Dummy Subject': {
            modules: [{ name: 'Module 1', videos: [] }]
        }
    },
    semester5: {
        'Dummy Subject': {
            modules: [{ name: 'Module 1', videos: [] }]
        }
    },
    semester6: {
        'Dummy Subject': {
            modules: [{ name: 'Module 1', videos: [] }]
        }
    }
};

async function fetchPlaylistVideos(playlistId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`);
    const data = await response.json();
    return data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.snippet.resourceId.videoId
    }));
}

function loadSubjects() {
    const semester = document.getElementById('semester').value;
    const subjectSelect = document.getElementById('subject');
    subjectSelect.innerHTML = `<option value="" selected disabled>Select Subject</option>`;

    if (studyData[semester]) {
        document.getElementById('subject-selection').style.display = 'block';
        Object.keys(studyData[semester]).forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
    } else {
        document.getElementById('subject-selection').style.display = 'none';
    }
}

function loadModules() {
    const semester = document.getElementById('semester').value;
    const subject = document.getElementById('subject').value;
    const moduleSelect = document.getElementById('module');
    moduleSelect.innerHTML = `<option value="" selected disabled>Select Module</option>`;

    if (studyData[semester] && studyData[semester][subject]) {
        document.getElementById('module-selection').style.display = 'block';
        studyData[semester][subject].modules.forEach(module => {
            const option = document.createElement('option');
            option.value = module.name;
            option.textContent = module.name;
            moduleSelect.appendChild(option);
        });
    } else {
        document.getElementById('module-selection').style.display = 'none';
    }
}

async function showMaterials() {
    const semester = document.getElementById('semester').value;
    const subject = document.getElementById('subject').value;
    const module = document.getElementById('module').value;
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = '';

    document.getElementById('materials-section').style.display = 'block';

    const selectedModule = studyData[semester][subject].modules.find(mod => mod.name === module);
    if (selectedModule.videos.length === 0 && selectedModule.playlistId) {
        selectedModule.videos = await fetchPlaylistVideos(selectedModule.playlistId);
    }

    selectedModule.videos.forEach(video => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'col-sm-6', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                    <a href="https://www.youtube.com/watch?v=${video.videoId}" class="btn btn-primary" target="_blank">Watch</a>
                </div>
            </div>
        `;
        videosGrid.appendChild(card);
    });
}
