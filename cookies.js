/* ============================================================ 
   COOKIE CONSENT LOGIC - VENIGEM ADVANCED TECHNOLOGIES 
   ============================================================ */

const cookieConsent = {
    storageKey: 'venigem_cookie_consent',

    init: function() {
        if (!localStorage.getItem(this.storageKey)) {
            // Delay the appearance slightly for a better UX
            setTimeout(() => this.showCard(), 2000);
        }
    },

    showCard: function() {
        const card = document.createElement('div');
        card.id = 'cookieConsentCard';
        card.className = 'cookie-consent-card';
        
        card.innerHTML = `
            <div class="cookie-header">
                <div class="cookie-icon">
                    <i class="fa-solid fa-cookie-bite"></i>
                </div>
                <h3>Cookie Preferences</h3>
            </div>
            <div class="cookie-content">
                <p>We use essential cookies to enhance your experience and ensure our engineering systems perform optimally. By continuing, you agree to our <a href="privacy-policy.html">Privacy Policy</a>.</p>
            </div>
            <div class="cookie-actions">
                <button class="cookie-btn cookie-btn-settings" id="cookieDecline">Reject All</button>
                <button class="cookie-btn cookie-btn-accept" id="cookieAccept">Accept All</button>
            </div>
        `;

        document.body.appendChild(card);

        // Force reflow and show
        setTimeout(() => card.classList.add('show'), 100);

        // Event listeners
        const acceptBtn = document.getElementById('cookieAccept');
        const declineBtn = document.getElementById('cookieDecline');

        acceptBtn.addEventListener('click', () => this.handleConsent('accepted'));
        declineBtn.addEventListener('click', () => this.handleConsent('rejected'));
    },

    handleConsent: function(status) {
        localStorage.setItem(this.storageKey, status);
        const card = document.getElementById('cookieConsentCard');
        if (card) {
            card.classList.remove('show');
            card.classList.add('hide');
            setTimeout(() => card.remove(), 600);
        }
    }
};

// Start logic when DOM is ready
document.addEventListener('DOMContentLoaded', () => cookieConsent.init());
