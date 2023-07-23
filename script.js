const navigationLinks = document.querySelectorAll('.navigation a');
const sections = document.querySelectorAll('section');

function highlightNavigationLink() {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            const targetLink = document.querySelector(`.navigation a[href="#${section.id}"]`);

            navigationLinks.forEach(link => {
                link.style.fontWeight = 'normal'; // Reset font weight for all links
            });

            if (targetLink) {
                targetLink.style.fontWeight = 'bold'; // Set bold font weight for the corresponding link
            }
        }
    });
}

function scrollToSection(event) {
    event.preventDefault(); // Prevent default anchor link behavior

    const targetSection = document.querySelector(this.getAttribute('href'));
    targetSection.scrollIntoView({ behavior: 'smooth' });
}

navigationLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

window.addEventListener('scroll', highlightNavigationLink);
window.addEventListener('resize', highlightNavigationLink);

