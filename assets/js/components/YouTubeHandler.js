class YouTubeHandler {
    static async fetchPlaylistVideos(playlistId) {
        let allVideos = [];
        let nextPageToken = "";

        try {
            do {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${CONFIG.API_KEY}&pageToken=${nextPageToken}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.items && data.items.length > 0) {
                    allVideos = allVideos.concat(
                        data.items.map(item => ({
                            title: item.snippet.title,
                            videoId: item.snippet.resourceId.videoId
                        }))
                    );
                }

                nextPageToken = data.nextPageToken || "";
            } while (nextPageToken);

            return allVideos;
        } catch (error) {
            console.error("Error fetching playlist:", error);
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
        const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
        return `
            <a href="https://www.youtube.com/watch?v=${video.videoId}" 
               class="material-card video-card" 
               target="_blank"
               rel="noopener noreferrer">
                <div class="video-thumbnail">
                    <img src="${thumbnailUrl}" alt="${video.title}" loading="lazy">
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                </div>
            </a>
        `;
    }

    
// static async getAllVideos(playlistId) {
//   let videos = [];
//   let pageToken;
  
//   while (true) {
//     const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
//     url.search = new URLSearchParams({
//       part: "snippet",
//       maxResults: "50",
//       playlistId,
//       key: CONFIG.API_KEY,
//       pageToken: pageToken || ""
//     });

//     const response = await fetch(url);
//     const data = await response.json();

//     videos.push(...data.items);

//     if (!data.nextPageToken) break;
//     pageToken = data.nextPageToken;
//   }

//   return videos;
// }

} 