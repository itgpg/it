const apiKey = 'AIzaSyBgRGDCTkDdBdrYqxht2oFYRTeucUmAfFg';

const folderIds = {
    python: '1SPAJ_Azd-kVEc7l7rrerpmeQOeZJO2Xw',
    it: '1QvTM_Z80mrP7dTu9g9-dgGOdgtSzid-c',
    maths: '1xIFEVMpiB2wZvJL3KVRQKEdcecfUskLs',
    cse: '1O7ToNX0DIfhrB3K1ytSbPBxm8GhMNpqR',
    ech: '1JM5fS8mss8ViwNaO7sLpn4QF5btEX9WB',
    syllabusS2: '1qzlAm8Zi9RC11iwD2V2T0uU_8DMSlemE'
};
const pythonPlaylistId = 'PL5hA7O8RI2bPOSoX7l8zZIIuDQrc9b9wO';
const adv_pythonPlaylistId = 'PL5hA7O8RI2bMd6FrVKDz-VhKXNVezg_Ly';
const itPlaylistId = 'PLZ3xYAWT5a-nskfWOvHd_Fvh4RZsedu7G';
const NetworkingPlaylistId = 'PL5hA7O8RI2bMBGjSduDQRYUCrNViAEee1';

const studyData = {
    semester1: {
        'Python': { modules: [{ name: 'Python Playlist', playlistId: pythonPlaylistId }] },
        'IT Systems': { modules: [
            { name: 'IT Systems Playlist', playlistId: itPlaylistId },
            { name: 'IT System Chapter Wise Video Doc Link', files: ['https://drive.google.com/file/d/1Y-ISBbZla_wMdcuGb11Eo03sboCf5V0p/view?usp=sharing'] }
        ] },
        'PYQ': { modules: [
            { name: 'CSE PYQ', files: [`https://drive.google.com/drive/folders/${folderIds.cse}`] },
            { name: 'Python Programming PYQ', files: [`https://drive.google.com/drive/folders/${folderIds.python}`] },
            { name: 'its PYQ', files: [`https://drive.google.com/drive/folders/${folderIds.it}`] },
            { name: 'ECH PYQ', files: [`https://drive.google.com/drive/folders/${folderIds.ech}`] },
            { name: 'maths PYQ', files: [`https://drive.google.com/drive/folders/${folderIds.maths}`] },

        ] }
    },
    semester2: {
        'Syllabus': { modules: [{ name: 'Syllabus', files: [`https://drive.google.com/drive/folders/${folderIds.syllabusS2}`] }] },
        'Advance Python': { modules: [{ name: 'Advance Python Playlist', playlistId: adv_pythonPlaylistId }] },
    }
};

async function fetchPlaylistVideos(playlistId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`);
    const data = await response.json();
    return data.items?.map(item => ({
        title: item.snippet.title,
        videoId: item.snippet.resourceId.videoId
    })) || [];
}

async function fetchFileName(folderId) {
    try {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`);
        const fileData = await response.json();
        return fileData.files?.map(file => ({
            fileName: file.name,
            fileId: file.id,
            fileUrl: `https://drive.google.com/file/d/${file.id}/view`
        })) || [];
    } catch (error) {
        console.error("Error fetching Google Drive files:", error);
        return [];
    }
}

function loadSubjects() {
    const semester = document.getElementById('semester').value;
    const subjectSelect = document.getElementById('subject');
    subjectSelect.innerHTML = '<option value="" selected disabled>Select Subject</option>';
    
    if (studyData[semester]) {
        document.getElementById('subject-selection').style.display = 'block';
        Object.keys(studyData[semester]).forEach(subject => {
            subjectSelect.innerHTML += `<option value="${subject}">${subject}</option>`;
        });
    } else {
        document.getElementById('subject-selection').style.display = 'none';
    }
}

function loadModules() {
    const semester = document.getElementById('semester').value;
    const subject = document.getElementById('subject').value;
    const moduleSelect = document.getElementById('module');
    moduleSelect.innerHTML = '<option value="" selected disabled>Select Module</option>';
    
    if (studyData[semester]?.[subject]) {
        document.getElementById('module-selection').style.display = 'block';
        studyData[semester][subject].modules.forEach(module => {
            moduleSelect.innerHTML += `<option value="${module.name}">${module.name}</option>`;
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

    if (!semester || !subject || !module) return;

    document.getElementById('materials-section').style.display = 'block';
    const selectedModule = studyData[semester][subject].modules.find(m => m.name === module);

    if (selectedModule?.playlistId) {
        selectedModule.videos = await fetchPlaylistVideos(selectedModule.playlistId);
        selectedModule.videos.forEach(video => {
            videosGrid.innerHTML += `
                <div class="col-md-4 col-sm-6 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${video.title}</h5>
                            <a href="https://www.youtube.com/watch?v=${video.videoId}" class="btn btn-primary" target="_blank">Watch Video</a>
                        </div>
                    </div>
                </div>`;
        });
    }

    if (selectedModule?.files) { 
        for (const folderLink of selectedModule.files) {
            const folderId = folderLink.split('/').pop();
            const files = await fetchFileName(folderId);
            files.forEach(file => {
                videosGrid.innerHTML += `
                    <div class="col-md-4 col-sm-6 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${file.fileName}</h5>
                                <a href="${file.fileUrl}" class="btn btn-primary" target="_blank">View</a>
                                <a href="https://drive.google.com/uc?export=download&id=${file.fileId}" class="btn btn-success" target="_blank">Download</a>
                            </div>
                        </div>
                    </div>`;
            });
        }
    }
}
