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
                    name:'IT system Chapter wise playlist',
                    videos: [],
                    files:['https://drive.google.com/file/d/1Y-ISBbZla_wMdcuGb11Eo03sboCf5V0p/view?usp=sharing']
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
    videosGrid.innerHTML = ''; // Clear previous content

    if (!semester || !subject || !module) {
        return; // Don't proceed if no valid selection
    }

    document.getElementById('materials-section').style.display = 'block'; // Show the materials section

    // Find the selected module in the data
    const selectedModule = studyData[semester][subject].modules.find(mod => mod.name === module);

    // Fetch videos if there's a playlist and no videos are loaded
    if (selectedModule.videos.length === 0 && selectedModule.playlistId) {
        selectedModule.videos = await fetchPlaylistVideos(selectedModule.playlistId);
    }

    // Add YouTube videos as cards
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

    // Add Google Drive links as cards
    if (selectedModule.files && selectedModule.files.length > 0) {
        selectedModule.files.forEach(file => {
            const fileCard = document.createElement('div');
            fileCard.classList.add('col-md-4', 'col-sm-6', 'mb-4');
            fileCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Resource Link</h5>
                        <a href="${file}" class="btn btn-secondary" target="_blank">View Resource</a>
                    </div>
                </div>
            `;
            videosGrid.appendChild(fileCard);
        });
    }
}
