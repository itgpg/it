const apiKey = 'AIzaSyBgRGDCTkDdBdrYqxht2oFYRTeucUmAfFg'; // Your YouTube API Key
const pythonPlaylistId = 'PL5hA7O8RI2bPOSoX7l8zZIIuDQrc9b9wO';
const itPlaylistId = 'PLZ3xYAWT5a-nskfWOvHd_Fvh4RZsedu7G';
const NetworkingPlaylistId = 'PL5hA7O8RI2bMBGjSduDQRYUCrNViAEee1';

const studyData = {
    semester1: {
        'Python': {
            modules: [
                {
                    name: 'Python Playlist',
                    videos: [],
                    playlistId: pythonPlaylistId,
                }
            ]
        },
        'IT Systems': {
            modules: [
                {
                    name: 'IT Systems Playlist',
                    videos: [],
                    playlistId: itPlaylistId,
                },
                {
                    name: 'IT System Chapter Wise Video Doc Link',
                    videos: [],
                    files: ['https://drive.google.com/file/d/1Y-ISBbZla_wMdcuGb11Eo03sboCf5V0p/view?usp=sharing']
                },
                {
                    name: 'IT System Networking Playlist',
                    videos: [],
                    playlistId: NetworkingPlaylistId,
                }
            ]
        },
        'PYQ': {
            modules: [
                {
                    name: 'CSE PYQ',
                    videos: [],
                    files: [
                        { fileId: '1Jvg6zTEkK72gXL7khiQX0kJ6hd2ETrAT', fileName: 'CSE PYQ 1' },
                        { fileId: '1l64u7hRYDqGqonHsEeaShEY9fyl52-r9', fileName: 'CSE PYQ 2' },
                        { fileId: '1mt4COljKJAPTzWraOWwkRwmXg52p5EGG', fileName: 'CSE PYQ 3' },
                        { fileId: '13hxYZ7MxTQ7HYrpx9Na-deDhjfTX8_04', fileName: 'CSE PYQ 4' }
                    ]
                },
                {
                    name: 'Python Programming PYQ',
                    videos: [],
                    files: [
                        { fileId: '1WWgNbYq6PEbweve9rtdjy1XDzbQ_ti9B', fileName: 'Python PYQ 1' },
                        { fileId: '1Sj4ncm28YKEVeBBAPUp-GdZtqmVuicC-', fileName: 'Python PYQ 2' },
                        { fileId: '1mXMha8rrlUBdKuOIPWdokaFhAfdLdc8C', fileName: 'Python PYQ 3' },
                        { fileId: '1ak506XD0UUqEixTzB_EZJlWk5la3-1uy', fileName: 'Python PYQ 4' }
                    ]
                },
                {
                    name: 'Introduction to IT System PYQ',
                    videos: [],
                    files: [
                        { fileId: '1icLk_hiX_gOoYmnfuWvv50gSsQkD1xwc', fileName: 'IT System PYQ 1' },
                        { fileId: '1BGhLUBIs4epya3dtDhkDp5jARViH6rIu', fileName: 'IT System PYQ 2' },
                        { fileId: '1R1GQngfDcTMMrEwfZvuO9NfTpA6pS7tB', fileName: 'IT System PYQ 3' },
                        { fileId: '1KA-4eBKLAzCa4UuSBbGEeIgGtoWGYBJf', fileName: 'IT System PYQ 4' }
                    ]
                },
                {
                    name: 'Mathematics PYQ',
                    videos: [],
                    files: [
                        { fileId: '1O5jtqxuoKIPVsKuVEQ9oOu6ODplEJXqx', fileName: 'Math PYQ 1' },
                        { fileId: '1BkLaHZVNHV3PUcODUYmFU9pS0Fu4KTqm', fileName: 'Math PYQ 2' },
                        { fileId: '1_WJ01FEX9uLrKUttd6UG6FuZuTje0b0j', fileName: 'Math PYQ 3' },
                        { fileId: '1cJQdSJQbQHWYOFA0QRsOrDK6C6OKCdhR', fileName: 'Math PYQ 4' }
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
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=100`);
    const data = await response.json();
    return data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.snippet.resourceId.videoId
    }));
}

async function fetchFileName(fileId) {
    try {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?key=${apiKey}`);
        const fileData = await response.json();
        return fileData.name || ''; // Return the file name if available, else an empty string
    } catch (error) {
        console.error("Error fetching file name from Google Drive:", error);
        return ''; // Return an empty string in case of error
    }
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
                    <a href="https://www.youtube.com/watch?v=${video.videoId}" class="btn btn-primary" target="_blank">Watch Video</a>
                </div>
            </div>
        `;
        videosGrid.appendChild(card);
    });

    // Add Files as cards
    if (selectedModule.files) {
        selectedModule.files.forEach(async file => {
            let fileName = await fetchFileName(file.fileId); // First try to get the file name from Google Drive
            if (!fileName) {
                fileName = file.fileName; // If no name from Drive, use the name provided in the code
            }
            const fileCard = document.createElement('div');
            fileCard.classList.add('col-md-4', 'col-sm-6', 'mb-4');
            fileCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${fileName}</h5>
                        <a href="https://drive.google.com/file/d/${file.fileId}/view" class="btn btn-primary" target="_blank">Open File</a>
                        <a href="https://drive.google.com/uc?id=${file.fileId}&export=download" class="btn btn-success" target="_blank">Download</a>
                    </div>
                </div>
            `;
            videosGrid.appendChild(fileCard);
        });
    }
}
