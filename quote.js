document.addEventListener('DOMContentLoaded', () => {
    // --- Auto-select Service from URL Parameter ---
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam) {
        let targetValue = '';
        if (serviceParam === 'ras') {
            targetValue = "Recirculating Aquaculture Systems (RAS)";
        } else if (serviceParam === 'ro') {
            targetValue = "Reverse osmosis (RO)";
        }

        if (targetValue) {
            const targetCheckbox = document.querySelector(`input[name="services"][value="${targetValue}"]`);
            if (targetCheckbox) {
                targetCheckbox.checked = true;
                const card = targetCheckbox.closest('.service-card');
                if(card) card.classList.add('active');
            }
        }
    }

    const quoteForm = document.getElementById('quoteForm');
    const submitBtn = document.getElementById('submitQuoteBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = document.getElementById('quoteSpinner');
    const successMessage = document.getElementById('quoteSuccessMessage');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission payload for demo

            // Validate Checkboxes - ensure at least one service is selected
            const services = document.querySelectorAll('input[name="services"]:checked');
            if (services.length === 0) {
                alert("Please select at least one Service / Solution.");
                return;
            }

            // Switch to loading state
            submitBtn.disabled = true;
            spinner.classList.remove('hidden');
            btnText.innerHTML = 'Processing request...';

            // Simulate a network request delay (2 seconds)
            setTimeout(() => {
                // Show success screen overlay
                successMessage.classList.remove('hidden');

                // Reset button background logic invisibly
                submitBtn.disabled = false;
                spinner.classList.add('hidden');
                btnText.innerHTML = 'Submit Request <i class="fa-solid fa-arrow-right-long"></i>';

                // Reset form fields behind the success screen
                quoteForm.reset();

            }, 2000);
        });
    }
});
