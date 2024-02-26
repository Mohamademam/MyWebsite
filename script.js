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

document.addEventListener("DOMContentLoaded", function() {
    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission
        // You can add your form validation here if needed

        // Get form data
        const formData = new FormData(event.target);

         // Extract name, email, and message from the form data
         const name = formData.get('name');
         const email = formData.get('email');
         const messageContent = formData.get('message');
        
         // Construct the message
         const message = `Name: ${name}\nEmail: ${email}\nMessage: ${messageContent}`;

        // Example: Send message to Telegram using fetch API
        fetch(`https://api.telegram.org/bot7131509309:AAEp5iO3_s9ceZJUU1sGCh81cUKzFENrawQ/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: 1244513755, // Replace with your bot's username or chat ID
                text: message
            })
        })
        .then(response => {
            // Handle response
            if (response.ok) {
                // If the response is successful, you can display a success message or perform any other actions
                console.log("Message sent to Telegram successfully");
                // Example: Reset the form
                event.target.reset();
            } else {
                // If there's an error in sending the message, you can display an error message or perform any other actions
                console.error("Failed to send message to Telegram");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Add event listener to the form submission
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", handleSubmit);
});
