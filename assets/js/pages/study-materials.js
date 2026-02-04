class StudyMaterialsPage {
    constructor() {
        this.studyData = new StudyData();
        this.currentSemester = null;
        this.currentSubject = null;
        
        // Pagination
        this.allItems = [];
        this.displayedCount = 0;
        this.itemsPerPage = 12;
        
        // Cache elements
        this.subjectList = document.getElementById('subjectList');
        this.moduleGrid = document.getElementById('moduleGrid');
        this.modulesView = document.getElementById('modulesView');
        this.materialsView = document.getElementById('materialsView');
        this.materialsGrid = document.getElementById('materialsGrid');
        this.materialCount = document.getElementById('materialCount');
        this.loadMoreWrap = document.getElementById('loadMoreWrap');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.breadcrumbs = document.getElementById('breadcrumbs');
        this.currentSubjectTitle = document.getElementById('currentSubjectTitle');
        
        this.setupEventListeners();
        this.initializePage();
    }

    initializePage() {
        const firstSemester = this.studyData.getSemesters()[0];
        this.handleSemesterChange(firstSemester);
    }

    setupEventListeners() {
        // Semester tabs
        document.getElementById('semesterTabs')?.addEventListener('click', (e) => {
            const tab = e.target.closest('.semester-tab');
            if (tab) this.handleSemesterChange(tab.dataset.semester);
        });

        // Subject list
        this.subjectList?.addEventListener('click', (e) => {
            const item = e.target.closest('.subject-item');
            if (item) this.handleSubjectChange(item.dataset.subject);
        });

        // Module clicks
        this.moduleGrid?.addEventListener('click', (e) => {
            const card = e.target.closest('.module-card');
            if (card) this.handleModuleClick(card.dataset.module);
        });

        // Back button
        document.getElementById('backBtn')?.addEventListener('click', () => this.showModules());

        // Load more
        this.loadMoreBtn?.addEventListener('click', () => this.loadMore());

        // Search
        document.getElementById('searchInput')?.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Keyboard
        document.addEventListener('keydown', (e) => this.handleKeyboardNav(e));
    }

    handleSemesterChange(semester) {
        this.currentSemester = semester;
        this.showModules();
        
        document.querySelectorAll('.semester-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.semester === semester);
        });

        const subjects = this.studyData.getSubjects(semester);
        this.renderSubjectList(subjects);
        
        if (subjects.length > 0) {
            this.handleSubjectChange(subjects[0]);
        }
    }

    renderSubjectList(subjects) {
        this.subjectList.innerHTML = subjects.map((subject, i) => `
            <div class="subject-item ${i === 0 ? 'active' : ''}" data-subject="${subject}">
                <i class="fas fa-book"></i>
                <span>${subject}</span>
            </div>
        `).join('');
    }

    handleSubjectChange(subject) {
        this.currentSubject = subject;
        this.showModules();
        
        document.querySelectorAll('.subject-item').forEach(item => {
            item.classList.toggle('active', item.dataset.subject === subject);
        });

        if (this.currentSubjectTitle) {
            this.currentSubjectTitle.textContent = subject;
        }

        this.updateBreadcrumbs();
        const modules = this.studyData.getModules(this.currentSemester, subject);
        this.renderModules(modules);
    }

    renderModules(modules) {
        this.moduleGrid.innerHTML = modules.map(module => {
            const isPlaylist = !!module.playlistId;
            return `
                <div class="module-card ${isPlaylist ? 'is-playlist' : 'is-file'}" data-module="${module.name}">
                    <div class="module-header">
                        <div class="module-icon">
                            <i class="fas fa-${isPlaylist ? 'play-circle' : 'folder-open'}" 
                               style="color: ${isPlaylist ? '#ef4444' : '#10b981'};"></i>
                        </div>
                        <div class="module-info">
                            <h3 class="module-title">${module.name}</h3>
                            <span class="module-type">${isPlaylist ? 'Video Playlist' : 'Study Files'}</span>
                        </div>
                    </div>
                    <div class="module-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-${isPlaylist ? 'play' : 'external-link-alt'}"></i>
                            ${isPlaylist ? 'Watch' : 'Open'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    async handleModuleClick(moduleName) {
        const selectedModule = this.studyData.getModules(this.currentSemester, this.currentSubject)
            .find(m => m.name === moduleName);

        if (!selectedModule) return;

        this.showMaterials(moduleName);

        try {
            if (selectedModule.playlistId) {
                const videos = await YouTubeHandler.fetchPlaylistVideos(selectedModule.playlistId);
                this.allItems = videos.map(video => this.renderVideoItem(video));
            } else if (selectedModule.files) {
                const allFiles = [];
                for (const file of selectedModule.files) {
                    if (file.includes('drive.google.com/drive/folders/')) {
                        const folderId = file.split('/folders/')[1].split('?')[0];
                        const files = await YouTubeHandler.fetchFileName(folderId);
                        allFiles.push(...files.map(f => this.renderFileItem(f)));
                    } else {
                        allFiles.push(`
                            <a href="${file}" class="file-card" target="_blank" rel="noopener noreferrer">
                                <div class="file-icon"><i class="fas fa-folder-open"></i></div>
                                <div class="file-info">
                                    <div class="file-name">${selectedModule.name}</div>
                                    <div class="file-meta">Google Drive</div>
                                </div>
                            </a>
                        `);
                    }
                }
                this.allItems = allFiles;
            }
            this.displayItems();
        } catch (error) {
            console.error('Error:', error);
            this.materialsGrid.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>Failed to load content</p></div>`;
        }
    }

    renderVideoItem(video) {
        const thumb = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
        return `
            <div class="video-card">
                <a href="https://www.youtube.com/watch?v=${video.videoId}" class="video-thumbnail-link" target="_blank">
                    <div class="video-thumbnail">
                        <img src="${thumb}" alt="${video.title}" loading="lazy">
                        <div class="play-overlay"><i class="fas fa-play"></i></div>
                    </div>
                </a>
                <div class="video-info">
                    <h4 class="video-title">${video.title}</h4>
                    <a href="https://www.youtube.com/watch?v=${video.videoId}" class="video-action" target="_blank">
                        <i class="fas fa-play"></i>
                        <span>Watch Video</span>
                    </a>
                </div>
            </div>
        `;
    }

    renderFileItem(file) {
        const ext = file.fileName.split('.').pop().toLowerCase();
        const icons = { pdf: 'file-pdf', doc: 'file-word', docx: 'file-word', xls: 'file-excel', xlsx: 'file-excel', ppt: 'file-powerpoint', pptx: 'file-powerpoint', jpg: 'file-image', png: 'file-image', zip: 'file-archive', rar: 'file-archive' };
        const isDownloadable = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar'].includes(ext);
        const actionText = isDownloadable ? 'Download' : 'Open';
        const actionIcon = isDownloadable ? 'download' : 'external-link-alt';
        
        return `
            <div class="file-card">
                <div class="file-icon"><i class="fas fa-${icons[ext] || 'file'}"></i></div>
                <div class="file-info">
                    <div class="file-name">${file.fileName}</div>
                    <div class="file-meta">${ext.toUpperCase()} File</div>
                </div>
                <a href="${file.fileUrl}" class="file-action" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-${actionIcon}"></i>
                    <span>${actionText}</span>
                </a>
            </div>
        `;
    }

    displayItems() {
        const total = this.allItems.length;
        this.materialCount.textContent = `${total} items`;

        if (total === 0) {
            this.materialsGrid.innerHTML = `<div class="empty-state"><i class="fas fa-folder-open"></i><p>No materials found</p></div>`;
            this.loadMoreWrap.style.display = 'none';
            return;
        }

        this.displayedCount = Math.min(this.itemsPerPage, total);
        this.materialsGrid.innerHTML = this.allItems.slice(0, this.displayedCount).join('');

        if (this.displayedCount < total) {
            this.loadMoreWrap.style.display = 'block';
            this.loadMoreBtn.innerHTML = `<i class="fas fa-chevron-down"></i> Load More (${total - this.displayedCount} remaining)`;
        } else {
            this.loadMoreWrap.style.display = 'none';
        }
    }

    loadMore() {
        const total = this.allItems.length;
        const newCount = Math.min(this.displayedCount + this.itemsPerPage, total);
        this.materialsGrid.insertAdjacentHTML('beforeend', this.allItems.slice(this.displayedCount, newCount).join(''));
        this.displayedCount = newCount;

        if (this.displayedCount >= total) {
            this.loadMoreWrap.style.display = 'none';
        } else {
            this.loadMoreBtn.innerHTML = `<i class="fas fa-chevron-down"></i> Load More (${total - this.displayedCount} remaining)`;
        }
    }

    showModules() {
        this.modulesView.style.display = 'block';
        this.materialsView.style.display = 'none';
        this.updateBreadcrumbs();
    }

    showMaterials(title) {
        this.modulesView.style.display = 'none';
        this.materialsView.style.display = 'block';
        this.materialsGrid.innerHTML = '<div class="loading">Loading</div>';
        this.loadMoreWrap.style.display = 'none';
        this.allItems = [];
        this.displayedCount = 0;
    }

    updateBreadcrumbs() {
        const sem = this.currentSemester.replace('semester', 'Semester ');
        const parts = ['Study Materials', sem];
        if (this.currentSubject) parts.push(this.currentSubject);
        
        this.breadcrumbs.innerHTML = parts.map((p, i) => 
            `<span class="${i === parts.length - 1 ? 'current' : ''}">${p}</span>`
        ).join('<span class="separator">/</span>');
    }

    handleSearch(query) {
        query = query.toLowerCase().trim();
        if (!query) {
            const subjects = this.studyData.getSubjects(this.currentSemester);
            this.renderSubjectList(subjects);
            if (subjects.length) this.handleSubjectChange(subjects[0]);
            return;
        }

        const results = [];
        this.studyData.getSemesters().forEach(sem => {
            this.studyData.getSubjects(sem).forEach(sub => {
                if (sub.toLowerCase().includes(query)) results.push({ semester: sem, subject: sub, type: 'subject' });
                this.studyData.getModules(sem, sub).forEach(mod => {
                    if (mod.name.toLowerCase().includes(query)) results.push({ semester: sem, subject: sub, module: mod.name, type: 'module' });
                });
            });
        });

        this.moduleGrid.innerHTML = results.length ? results.map(r => `
            <div class="module-card is-file" data-semester="${r.semester}" data-subject="${r.subject}" data-search="true">
                <div class="module-header">
                    <div class="module-icon"><i class="fas fa-${r.type === 'subject' ? 'book' : 'file-alt'}" style="color: #10b981;"></i></div>
                    <div class="module-info">
                        <h3 class="module-title">${r.module || r.subject}</h3>
                        <span class="module-type">${r.semester.replace('semester', 'Sem ')} / ${r.subject}</span>
                    </div>
                </div>
            </div>
        `).join('') : `<div class="empty-state"><i class="fas fa-search"></i><p>No results for "${query}"</p></div>`;

        this.moduleGrid.querySelectorAll('[data-search="true"]').forEach(card => {
            card.onclick = () => {
                document.getElementById('searchInput').value = '';
                this.handleSemesterChange(card.dataset.semester);
                setTimeout(() => this.handleSubjectChange(card.dataset.subject), 100);
            };
        });
    }

    handleKeyboardNav(e) {
        // Skip if in input field
        if (e.target.tagName === 'INPUT') return;

        const key = e.key;

        // Escape - go back
        if (key === 'Escape') {
            if (this.materialsView.style.display !== 'none') {
                this.showModules();
                return;
            }
        }

        // Slash - focus search
        if (key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            document.getElementById('searchInput')?.focus();
            return;
        }

        // Arrow navigation
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) {
            e.preventDefault();

            // Left/Right - navigate semesters
            if (key === 'ArrowLeft' || key === 'ArrowRight') {
                const tabs = Array.from(document.querySelectorAll('.semester-tab'));
                const activeIdx = tabs.findIndex(t => t.classList.contains('active'));
                
                if (key === 'ArrowRight' && activeIdx < tabs.length - 1) {
                    tabs[activeIdx + 1].click();
                } else if (key === 'ArrowLeft' && activeIdx > 0) {
                    tabs[activeIdx - 1].click();
                }
                return;
            }

            // Up/Down - navigate subjects
            if (key === 'ArrowUp' || key === 'ArrowDown') {
                const items = Array.from(document.querySelectorAll('.subject-item'));
                const activeIdx = items.findIndex(i => i.classList.contains('active'));
                
                if (key === 'ArrowDown' && activeIdx < items.length - 1) {
                    this.handleSubjectChange(items[activeIdx + 1].dataset.subject);
                } else if (key === 'ArrowUp' && activeIdx > 0) {
                    this.handleSubjectChange(items[activeIdx - 1].dataset.subject);
                }
                return;
            }
        }

        // Enter - open first module
        if (key === 'Enter' && this.modulesView.style.display !== 'none') {
            const firstModule = document.querySelector('.module-card');
            if (firstModule) {
                this.handleModuleClick(firstModule.dataset.module);
            }
            return;
        }

        // Number keys 1-6 - quick semester switch
        if (['1', '2', '3', '4', '5', '6'].includes(key)) {
            const tab = document.querySelector(`[data-semester="semester${key}"]`);
            if (tab) tab.click();
            return;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => { window.studyMaterialsPage = new StudyMaterialsPage(); });
