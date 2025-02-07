class YouTubeHandler {
    static async fetchPlaylistVideos(playlistId) {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${CONFIG.API_KEY}`
            );
            const data = await response.json();
            return data.items.map(item => ({
                title: item.snippet.title,
                videoId: item.snippet.resourceId.videoId
            }));
        } catch (error) {
            console.error('Error fetching playlist:', error);
            return [];
        }
    }

    static async fetchFileName(folderId) {
        try {
            const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${CONFIG.API_KEY}`);
            const data = await response.json();
            return data.files.map(file => ({
                fileName: file.name,
                fileId: file.id,
                fileUrl: `https://drive.google.com/file/d/${file.id}/view`
            }));
        } catch (error) {
            console.error('Error fetching files:', error);
            return [];
        }
    }

    static renderVideoCard(video) {
        return `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${video.title}</h5>
                        <a href="https://www.youtube.com/watch?v=${video.videoId}" 
                           class="btn btn-primary" 
                           target="_blank">
                           Watch Video
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
} 