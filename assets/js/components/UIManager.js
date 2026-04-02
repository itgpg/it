class UIManager {
    constructor() {
        this.breadcrumbs = document.getElementById('breadcrumbs');
    }

    updateBreadcrumbs(semester, subject) {
        if (!this.breadcrumbs) return;
        
        const semesterNum = semester.replace('semester', 'Semester ');
        let parts = ['Study Materials', semesterNum];
        
        if (subject) {
            parts.push(subject);
        }
        
        this.breadcrumbs.innerHTML = parts.map((part, i) => 
            `<span class="${i === parts.length - 1 ? 'current' : ''}">${part}</span>`
        ).join('<span class="separator">/</span>');
    }
}