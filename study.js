const apiKey = 'AIzaSyBgRGDCTkDdBdrYqxht2oFYRTeucUmAfFg'; // Replace with your YouTube API Key
const pythonPlaylistId = 'PL5hA7O8RI2bPOSoX7l8zZIIuDQrc9b9wO'; // Python Playlist
const itPlaylistId = 'PLZ3xYAWT5a-nskfWOvHd_Fvh4RZsedu7G'; // IT Systems Playlist
let currentVideoIndex = 0;
let currentPlaylistVideos = [];

// Function to fetch playlist videos from YouTube
async function fetchPlaylistVideos(playlistId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`);
    const data = await response.json();
    return data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.snippet.resourceId.videoId
    }));
}

// Function to display videos in a grid
function displayVideos(videos) {
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = ''; // Clear previous videos
    videos.forEach((video, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="card">
                <img src="https://img.youtube.com/vi/${video.videoId}/0.jpg" class="card-img-top" alt="${video.title}">
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                </div>
            </div>
        `;
        col.onclick = () => openVideo(index); // Open video on click
        videosGrid.appendChild(col);
    });
}

// Function to open video in modal
function openVideo(index) {
    currentVideoIndex = index;
    const video = currentPlaylistVideos[index];
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1`;
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    videoModal.show();
}

// Function to show next video
function showNextVideo() {
    if (currentVideoIndex < currentPlaylistVideos.length - 1) {
        openVideo(currentVideoIndex + 1);
    }
}

// Function to show previous video
function showPreviousVideo() {
    if (currentVideoIndex > 0) {
        openVideo(currentVideoIndex - 1);
    }
}

// Event listeners for buttons
document.getElementById('showPythonVideos').onclick = async () => {
    currentPlaylistVideos = await fetchPlaylistVideos(pythonPlaylistId);
    displayVideos(currentPlaylistVideos);
};

document.getElementById('showITSystemsVideos').onclick = async () => {
    currentPlaylistVideos = await fetchPlaylistVideos(itPlaylistId);
    displayVideos(currentPlaylistVideos);
};

document.getElementById('nextVideoBtn').onclick = showNextVideo;
document.getElementById('prevVideoBtn').onclick = showPreviousVideo;

// Close video modal and stop video from playing
document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = ''; // Stop the video by resetting the source
});

// Optionally, load a default playlist on page load
window.onload = async () => {
    currentPlaylistVideos = await fetchPlaylistVideos(pythonPlaylistId); // Default to Python on load
    displayVideos(currentPlaylistVideos);
};
