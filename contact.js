document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = document.getElementById('loadingSpinner');
    const successAlert = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission payload for demo

            // Switch to loading state
            submitBtn.disabled = true;
            spinner.classList.remove('hidden');
            btnText.innerHTML = 'Sending...';

            // Hide any previous success alert
            successAlert.classList.add('hidden');

            // Simulate a network request delay (1.5 seconds)
            setTimeout(() => {
                // Reset button
                submitBtn.disabled = false;
                spinner.classList.add('hidden');
                btnText.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';

                // Show success alert
                successAlert.classList.remove('hidden');

                // Reset form fields
                contactForm.reset();

                // Optionally hide the success alert automatically after 5 seconds
                setTimeout(() => {
                    successAlert.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
});
