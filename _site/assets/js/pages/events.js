document.addEventListener('DOMContentLoaded', () => {
    const sortButtons = document.querySelectorAll('[data-sort]');
    
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sortType = button.dataset.sort;
            const container = document.getElementById('eventsContainer');
            const cards = Array.from(container.children);
            
            // Toggle active state
            sortButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            // Sort logic
            const sorted = cards.sort((a, b) => {
                const aDate = new Date(a.dataset.date).getTime();
                const bDate = new Date(b.dataset.date).getTime();
                return sortType === 'upcoming' ? aDate - bDate : bDate - aDate;
            });
            
            // Re-append sorted cards
            sorted.forEach(card => container.appendChild(card));
        });
    });
});
