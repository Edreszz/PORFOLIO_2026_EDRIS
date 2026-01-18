   // Tab filtering functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const serviceCards = document.querySelectorAll('.service-card');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Get the tab value
                const tab = btn.getAttribute('data-tab');

                // Filter service cards with animations
                serviceCards.forEach(card => {
                    // Remove previous animation classes
                    card.classList.remove('filtered-in', 'filtered-out', 'active-match');
                    
                    if (tab === 'all') {
                        // Show all cards
                        card.classList.add('filtered-in');
                        card.style.pointerEvents = 'auto';
                        card.style.display = 'block';
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        if (categories.includes(tab)) {
                            // Matching card - show and prioritize to top
                            card.classList.add('active-match', 'filtered-in');
                            card.style.pointerEvents = 'auto';
                            card.style.display = 'block';
                        } else {
                            // Non-matching card - fade out
                            card.classList.add('filtered-out');
                            card.style.pointerEvents = 'none';
                        }
                    }
                });
            });
        });

        // Smooth scroll effect
        document.addEventListener('DOMContentLoaded', () => {
            // Add scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.service-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                observer.observe(card);
            });
        });

        // Button click handlers
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Add ripple effect
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                // Redirect based on button text (customize as needed)
                const btnText = this.innerText.toLowerCase();
                if (btnText.includes('hire')) {
                    window.location.href = 'hire.html';
                } else if (btnText.includes('download')) {
                    window.location.href = 'UpdatedResume.pdf';
                } else if (btnText.includes('portfolio')) {
                    window.location.href = 'project.html';
                } else if (btnText.includes('schedule')) {
                    window.location.href = 'hire.html';
                } else if (btnText.includes('inquiry')) {
                    window.location.href = 'contact.html';
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenuContainer = document.querySelector('.mobile-menu-container');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuContainer.classList.toggle('active');
            });
        }

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenuContainer.classList.remove('active');
            });
        }

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuContainer.classList.remove('active');
            });
        });