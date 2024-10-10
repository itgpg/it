const apiKey = 'AIzaSyBgRGDCTkDdBdrYqxht2oFYRTeucUmAfFg'; // Your YouTube API Key
const pythonPlaylistId = 'PL5hA7O8RI2bPOSoX7l8zZIIuDQrc9b9wO';
const itPlaylistId = 'PLZ3xYAWT5a-nskfWOvHd_Fvh4RZsedu7G';

let selectedSemester = null;
let selectedSubject = null;

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
        'Dummy Subject 1': {
            modules: [
                {
                    name: 'Module 1',
                    videos: [{ title: 'Video 1', videoId: 'dummyVideo1' }]
                },
                {
                    name: 'Module 2',
                    videos: [{ title: 'Video 2', videoId: 'dummyVideo2' }]
                }
            ]
        },
        // Add more subjects here as placeholders
    },
    semester3: {
        'Dummy Subject 2': {
            modules: [
                {
                    name: 'Module 1',
                    videos: [{ title: 'Video 1', videoId: 'dummyVideo3' }]
                },
                // Add more modules as placeholders
            ]
        }
    },
    semester4: {
        'Dummy Subject 3': {
            modules: [
                {
                    name: 'Module 1',
                    videos: [{ title: 'Video 1', videoId: 'dummyVideo4' }]
                }
            ]
        }
    },
    semester5: {
        'Dummy Subject 4': {
            modules: [
                {
                    name: 'Module 1',
                    videos: [{ title: 'Video 1', videoId: 'dummyVideo5' }]
                }
            ]
        }
    },
    semester6: {
        'Dummy Subject 5': {
            modules: [
                {
                    name: 'Module 1',
                    videos: [{ title: 'Video 1', videoId: 'dummyVideo6' }]
                }
            ]
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
        selectedSemester = semester;
    }
}

function loadModules() {
    const subject = document.getElementById('subject').value;
    const moduleSelect = document.getElementById('module');
    moduleSelect.innerHTML = `<option value="" selected disabled>Select Module</option>`;

    if (studyData[selectedSemester][subject]) {
        document.getElementById('module-selection').style.display = 'block';
        studyData[selectedSemester][subject].modules.forEach((module, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = module.name;
            moduleSelect.appendChild(option);
        });
        selectedSubject = subject;
    }
}

async function showMaterials() {
    const moduleIndex = document.getElementById('module').value;
    const module = studyData[selectedSemester][selectedSubject].modules[moduleIndex];
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = '';

    if (module.playlistId) {
        module.videos = await fetchPlaylistVideos(module.playlistId);
    }

    module.videos.forEach((video, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                    <button class="btn btn-primary" onclick="playVideo('${video.videoId}', ${index}, ${moduleIndex})">Watch</button>
                </div>
            </div>
        `;
        videosGrid.appendChild(card);
    });

    document.getElementById('materials-section').style.display = 'block';
}

let currentVideoIndex = null;
let currentModuleIndex = null;

function playVideo(videoId, index, moduleIndex) {
    currentVideoIndex = index;
    currentModuleIndex = moduleIndex;
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    videoModal.show();
}

document.getElementById('nextVideoBtn').addEventListener('click', () => {
    const module = studyData[selectedSemester][selectedSubject].modules[currentModuleIndex];
    currentVideoIndex = (currentVideoIndex + 1) % module.videos.length;
    playVideo(module.videos[currentVideoIndex].videoId, currentVideoIndex, currentModuleIndex);
});

document.getElementById('prevVideoBtn').addEventListener('click', () => {
    const module = studyData[selectedSemester][selectedSubject].modules[currentModuleIndex];
    currentVideoIndex = (currentVideoIndex - 1 + module.videos.length) % module.videos.length;
    playVideo(module.videos[currentVideoIndex].videoId, currentVideoIndex, currentModuleIndex);
});
