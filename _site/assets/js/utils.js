class Utils {
    static setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    static toggleMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const menu = document.querySelector('.menu');
        
        if (menuToggle) {
            menuToggle.addEventListener('change', function() {
                menu.classList.toggle('active', this.checked);
            });
        }
    }

    static async loadDriveContent(folderId) {
        try {
            const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${CONFIG.API_KEYS.YOUTUBE}`);
            const data = await response.json();
            return data.files;
        } catch (error) {
            console.error('Error loading Drive content:', error);
            return [];
        }
    }
}
