class YouTubeHandler {
    static async fetchPlaylistVideos(playlistId) {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=60&playlistId=${playlistId}&key=${CONFIG.API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.items) {
                console.warn(`No videos found for playlist: ${playlistId}`);
                return [];
            }
            
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
    
static async function getAllVideos(playlistId) {
  let videos = [];
  let pageToken;
  
  while (true) {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.search = new URLSearchParams({
      part: "snippet",
      maxResults: "50",
      playlistId,
      key: CONFIG.API_KEY,
      pageToken: pageToken || ""
    });

    const response = await fetch(url);
    const data = await response.json();

    videos.push(...data.items);

    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }

  return videos;
}

} 