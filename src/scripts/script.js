document.addEventListener('DOMContentLoaded', function () {
    fetch('../includes/template/template.html') 
        .then(response => response.text())
        .then(data => {
            document.querySelector('.header-placeholder').innerHTML = data;
        })
        .catch(error => console.log('Error loading template:', error));
});

window.addEventListener('scroll', function () {
    const footer = document.querySelector('.footer'); // Select the footer
    const scrollPosition = window.scrollY + window.innerHeight; // Current scroll position
    const documentHeight = document.documentElement.scrollHeight; // Total page height

    // Show footer if the user has scrolled to the bottom
    if (scrollPosition >= documentHeight - 1) {
        footer.style.bottom = '0'; // Make the footer visible
    } else {
        footer.style.bottom = '-100px'; // Hide the footer
    }
});



console.log('Script loaded');