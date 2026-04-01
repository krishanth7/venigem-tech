document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const openBtn = document.getElementById('openRasModal');
    const closeBtn = document.getElementById('closeProductModal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
