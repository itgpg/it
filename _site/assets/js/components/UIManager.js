class UIManager {
    constructor() {
        this.materialsSection = document.getElementById('materials-section');
        this.videosGrid = document.getElementById('videosGrid');
        this.semesterCards = document.querySelector('.semester-cards');
        this.subjectTabs = document.querySelector('.subject-tabs');
        this.subjectContent = document.querySelector('.subject-content');
    }

    renderSubjectTabs(subjects) {
        this.subjectTabs.innerHTML = subjects.map((subject, index) => `
            <div class="subject-tab ${index === 0 ? 'active' : ''}" 
                 data-subject="${subject}">
                ${subject}
            </div>
        `).join('');
    }

    renderModules(modules) {
        this.subjectContent.innerHTML = `
            <div class="module-grid">
                ${modules.map(module => this.renderModuleCard(module)).join('')}
            </div>
        `;
    }

    renderModuleCard(module) {
        const isPlaylist = !!module.playlistId;
        return `
            <div class="module-card" data-module="${module.name}">
                <h3 class="module-title">${module.name}</h3>
                <div class="module-type">
                    <i class="fas fa-${isPlaylist ? 'play-circle' : 'file-alt'}"></i>
                    <span>${isPlaylist ? 'Video Playlist' : 'Study Material'}</span>
                </div>
                <div class="module-actions">
                    <button class="btn btn-primary" data-action="view-module">
                        ${isPlaylist ? 'Watch Videos' : 'View Material'}
                    </button>
                </div>
            </div>
        `;
    }

    showMaterials(content) {
        if (this.materialsSection && this.videosGrid) {
            this.materialsSection.style.display = 'block';
            this.videosGrid.innerHTML = content;
        }
    }

    clearMaterials() {
        if (this.materialsSection && this.videosGrid) {
            this.materialsSection.style.display = 'none';
            this.videosGrid.innerHTML = '';
        }
    }

    // ... rest of the methods remain same
} 