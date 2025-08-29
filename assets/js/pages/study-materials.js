class StudyMaterialsPage {
    constructor() {
        this.studyData = new StudyData();
        this.ui = new UIManager();
        this.currentSemester = null;
        this.currentSubject = null;
        this.setupEventListeners();
        this.initializePage();
    }

    initializePage() {
        // Load first semester by default
        const firstSemester = this.studyData.getSemesters()[0];
        this.currentSemester = firstSemester; // Set current semester
        this.loadSemesterContent(firstSemester);
    }

    setupEventListeners() {
        // Semester card clicks
        const semesterCards = document.querySelectorAll('.semester-card');
        semesterCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                const semester = e.currentTarget.dataset.semester;
                // console.log('Semester clicked:', semester);  // Commented out
                this.handleSemesterChange(semester);
            });
        });

        // Subject tab clicks using event delegation
        const subjectTabsContainer = document.querySelector('.subject-tabs');
        if (subjectTabsContainer) {
            subjectTabsContainer.addEventListener('click', (e) => {
                const tab = e.target.closest('.subject-tab');
                if (tab) {
                    const subject = tab.dataset.subject;
                    // console.log('Subject clicked:', subject);  // Commented out
                    this.handleSubjectChange(subject);
                }
            });
        }

        // Module clicks using event delegation
        const subjectContent = document.querySelector('.subject-content');
        if (subjectContent) {
            subjectContent.addEventListener('click', (e) => {
                const button = e.target.closest('[data-action="view-module"]');
                if (button) {
                    const moduleCard = button.closest('.module-card');
                    if (moduleCard) {
                        const moduleName = moduleCard.dataset.module;
                        // console.log('Module clicked:', moduleName);  // Commented out
                        this.handleModuleClick(moduleName);
                    }
                }
            });
        }
    }

    handleSemesterChange(semester) {
        this.currentSemester = semester;
        // Clear materials when semester changes
        this.ui.clearMaterials();
        
        document.querySelectorAll('.semester-card').forEach(card => {
            card.classList.toggle('active', card.dataset.semester === semester);
        });

        this.loadSemesterContent(semester);
    }

    loadSemesterContent(semester) {
        const subjects = this.studyData.getSubjects(semester);
        this.ui.renderSubjectTabs(subjects);
        
        // Load first subject by default
        if (subjects.length > 0) {
            this.handleSubjectChange(subjects[0]);
        }
    }

    handleSubjectChange(subject) {
        this.currentSubject = subject;
        // Clear materials when subject changes
        this.ui.clearMaterials();
        
        document.querySelectorAll('.subject-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.subject === subject);
        });

        const modules = this.studyData.getModules(this.currentSemester, subject);
        // Ensure modules include the description field
        this.ui.renderModules(modules);
    }

    async handleModuleClick(moduleName) {
        if (!this.currentSemester || !this.currentSubject) return;

        const selectedModule = this.studyData.getModules(this.currentSemester, this.currentSubject)
            .find(m => m.name === moduleName);

        if (!selectedModule) return;

        try {
            if (selectedModule.playlistId) {
                // const videos = await YouTubeHandler.fetchPlaylistVideos(selectedModule.playlistId);
                const videos = await YouTubeHandler. (selectedModule.playlistId);
                const content = videos.map(video => YouTubeHandler.renderVideoCard(video)).join('');
                this.ui.showMaterials(content);
            } else if (selectedModule.files) {
                // Handle Google Drive folders
                const fileLinks = await Promise.all(selectedModule.files.map(async (file) => {
                    if (file.includes('drive.google.com/drive/folders/')) {
                        const folderId = file.split('/folders/')[1];
                        const files = await YouTubeHandler.fetchFileName(folderId);
                        return files.map(f => `
                            <div class="col-12 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${f.fileName}</h5>
                                        <a href="${f.fileUrl}" class="btn btn-primary" target="_blank">View File</a>
                                    </div>
                                </div>
                            </div>
                        `).join('');
                    }
                    return `
                        <div class="col-12 mb-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${selectedModule.name}</h5>
                                    <a href="${file}" class="btn btn-primary" target="_blank">View Material</a>
                                </div>
                            </div>
                        </div>
                    `;
                }));
                this.ui.showMaterials(fileLinks.join(''));
            }
        } catch (error) {
            console.error('Error handling module click:', error);
            this.ui.showMaterials(`<div class="alert alert-danger">Error loading content</div>`);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const studyMaterialsPage = new StudyMaterialsPage();
    // Make it globally accessible for debugging
    window.studyMaterialsPage = studyMaterialsPage;
});
