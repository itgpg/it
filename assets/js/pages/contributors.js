document.addEventListener("DOMContentLoaded", function () {
    console.log("Contributors page loaded.");
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".contributors-section");

    const revealOnScroll = () => {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            if (sectionTop < viewportHeight - 100) {
                section.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});
