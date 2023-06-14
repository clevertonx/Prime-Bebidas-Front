const links = document.querySelectorAll('.links');

links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const targetId = link.getAttribute('href'); 
        const targetSection = document.querySelector(targetId); 

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop, 
                behavior: 'smooth' 
            });
        }
    });
});
