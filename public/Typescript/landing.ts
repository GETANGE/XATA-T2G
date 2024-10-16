
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e: Event) => {
            e.preventDefault();
            alert('Welcome to Rada Safi! Sign up feature coming soon.');
        });
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const targetId = (e.target as HTMLAnchorElement).getAttribute('href')?.substring(1);
            alert(`Navigating to ${targetId} section`);
        });
    });
});