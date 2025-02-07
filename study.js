const apiKey = 'AIzaSyBgRGDCTkDdBdrYqxht2oFYRTeucUmAfFg';
const pythonFolderId = '1SPAJ_Azd-kVEc7l7rrerpmeQOeZJO2Xw';
const itFolderId = '1QvTM_Z80mrP7dTu9g9-dgGOdgtSzid-c';
const mathsFolderId = '1xIFEVMpiB2wZvJL3KVRQKEdcecfUskLs';
const cseFolderId = '1O7ToNX0DIfhrB3K1ytSbPBxm8GhMNpqR';
const echFolderId = '1JM5fS8mss8ViwNaO7sLpn4QF5btEX9WB';

const syllabusS2FolderId = '1qzlAm8Zi9RC11iwD2V2T0uU_8DMSlemE'; // Semester 2 Syllabus Folder

const studyData = {
    semester1: {
        'PYQ': {
            modules: [
                { name: 'CSE PYQ', files: [`https://drive.google.com/drive/folders/${cseFolderId}`] },
                { name: 'Python Programming PYQ', files: [`https://drive.google.com/drive/folders/${pythonFolderId}`] },
                { name: 'Introduction to IT System PYQ', files: [`https://drive.google.com/drive/folders/${itFolderId}`] },
                { name: 'Mathematics PYQ', files: [`https://drive.google.com/drive/folders/${mathsFolderId}`] },
                { name: 'Ech PYQ', files: [`https://drive.google.com/drive/folders/${echFolderId}`] }
            ]
        }
    },
    semester2: {
        'Syllabus': {
            modules: [
                { name: 'Syllabus', files: [`https://drive.google.com/drive/folders/${syllabusS2FolderId}`] }
            ]
        }
    },
    semester3: {

    },
    semester4: {
    
    },
    semester5: {
       
    },
    semester5: {
      
    },
    semester6: {
      
    },
};

// Fetch videos from YouTube playlist
async function fetchPlaylistVideos(playlistId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=100`);
    const data = await response.json();
    return data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.snippet.resourceId.videoId
    }));
}

// Fetch file names from Google Drive folder
async function fetchFileName(folderId) {
    try {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`);
        const fileData = await response.json();
        return fileData.files.map(file => ({
            fileName: file.name,
            fileId: file.id,
            fileUrl: `https://drive.google.com/file/d/${file.id}/view`
        }));
    } catch (error) {
        console.error("Error fetching file names from Google Drive:", error);
        return [];
    }
}

// Load subjects when semester is selected
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

// Load modules when subject is selected
function loadModules() {
    const semester = document.getElementById('semester').value;
    const subject = document.getElementById('subject').value;
    const moduleSelect = document.getElementById('module');

    moduleSelect.innerHTML = `<option value="" selected disabled>Select Module</option>`;

    if (studyData[semester] && studyData[semester][subject]) {
        const modules = studyData[semester][subject].modules;

        // If "Syllabus" is selected, auto-select and hide the module dropdown
        if (subject === 'Syllabus' && semester === 'semester2') {
            moduleSelect.innerHTML = `<option value="Syllabus" selected>Syllabus</option>`;
            document.getElementById('module-selection').style.display = 'none';
            showMaterials(); // Automatically show syllabus materials
        } else {
            document.getElementById('module-selection').style.display = 'block';

            modules.forEach(module => {
                const option = document.createElement('option');
                option.value = module.name;
                option.textContent = module.name;
                moduleSelect.appendChild(option);
            });
        }
    } else {
        document.getElementById('module-selection').style.display = 'none';
    }
}


// Show materials (videos or syllabus files)
async function showMaterials() {
    const semester = document.getElementById('semester').value;
    const subject = document.getElementById('subject').value;
    const module = document.getElementById('module').value;
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = '';

    if (!semester || !subject || !module) {
        return;
    }

    document.getElementById('materials-section').style.display = 'block';
    const selectedModule = studyData[semester][subject].modules.find(mod => mod.name === module);

    // Fetch and display videos
    if (selectedModule.videos && selectedModule.videos.length === 0 && selectedModule.playlistId) {
        selectedModule.videos = await fetchPlaylistVideos(selectedModule.playlistId);
    }

    selectedModule.videos?.forEach(video => {
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

    // Fetch and display files
    if (selectedModule.files) {
        for (const folderLink of selectedModule.files) {
            const folderId = folderLink.split('/').pop();
            const files = await fetchFileName(folderId);
            files.forEach(file => {
                const fileCard = document.createElement('div');
                fileCard.classList.add('col-md-4', 'col-sm-6', 'mb-4');
                fileCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${file.fileName}</h5>
                            <a href="${file.fileUrl}" class="btn btn-primary" target="_blank">View</a>
                            <a href="https://drive.google.com/uc?export=download&id=${file.fileId}" class="btn btn-success" target="_blank">Download</a>
                        </div>
                    </div>
                `;
                videosGrid.appendChild(fileCard);
            });
        }
    }
}
