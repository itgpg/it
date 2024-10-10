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
    if (selectedModule.videos.length === 0) {
        selectedModule.videos = await fetchPlaylistVideos(selectedModule.playlistId);
    }

    selectedModule.videos.forEach((video, index) => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'col-sm-6');
        card.innerHTML = `
            <div class="card" onclick="playVideo('${video.videoId}', ${index})">
                <img src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg" class="card-img-top" alt="${video.title}">
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                </div>
            </div>`;
        videosGrid.appendChild(card);
    });
}

let currentVideoIndex = null;
let currentModule = null;

function playVideo(videoId, index) {
    currentVideoIndex = index;
    const semester = document.getElementById('semester').value;
    const subject = document.getElementById('subject').value;
    const module = document.getElementById('module').value;

    currentModule = studyData[semester][subject].modules.find(mod => mod.name === module);

    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    videoModal.show();
}

document.getElementById('prevVideoBtn').addEventListener('click', () => {
    if (currentVideoIndex > 0) {
        playVideo(currentModule.videos[currentVideoIndex - 1].videoId, currentVideoIndex - 1);
    }
});

document.getElementById('nextVideoBtn').addEventListener('click', () => {
    if (currentVideoIndex < currentModule.videos.length - 1) {
        playVideo(currentModule.videos[currentVideoIndex + 1].videoId, currentVideoIndex + 1);
    }
});

// Stop video playback when the modal is closed
const videoModalElement = document.getElementById('videoModal');
videoModalElement.addEventListener('hidden.bs.modal', () => {
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = ""; // Clear the video source to stop playback
});
