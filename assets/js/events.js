document.addEventListener('DOMContentLoaded', () => {
    const filterYear = document.getElementById('filterYear');
    const filterType = document.getElementById('filterType');
    const searchInput = document.getElementById('searchInput');
    
    function filterEvents() {
        const year = filterYear.value;
        const type = filterType.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        document.querySelectorAll('.event-card').forEach(card => {
            const cardYear = card.querySelector('.event-dates').textContent.slice(-4);
            const isPast = card.classList.contains('past-event');
            const title = card.querySelector('.event-card-title').textContent.toLowerCase();
            
            const yearMatch = year === 'all' || cardYear === year;
            const typeMatch = type === 'all' || 
                            (type === 'upcoming' && !isPast) || 
                            (type === 'past' && isPast);
            const searchMatch = title.includes(searchTerm);
            
            card.style.display = (yearMatch && typeMatch && searchMatch) ? 'block' : 'none';
        });
    }

    [filterYear, filterType, searchInput].forEach(element => {
        element.addEventListener('input', filterEvents);
    });
}); 