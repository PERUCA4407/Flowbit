// Script principal
document.addEventListener('DOMContentLoaded', function() {
    // Toggle do menu hambúrguer
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Toggle do tema
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // Navegação suave e indicação de seção ativa - removido para páginas separadas

    // Validação e envio do formulário
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validação básica
        if (!name || !email || !message) {
            showFeedback('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFeedback('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        // Simulação de envio (substitua por sua lógica real)
        showFeedback('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

        // Limpar formulário
        contactForm.reset();
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFeedback(message, type) {
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.style.display = 'block';

        setTimeout(() => {
            formFeedback.style.display = 'none';
        }, 5000);
    }

    // Microinterações nos cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon i');

        card.addEventListener('mouseenter', function() {
            icon.style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', function() {
            icon.style.transform = 'scale(1)';
        });
    });

    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos cards e seções
    document.querySelectorAll('.service-card, .about-content, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Funcionalidade dos modais
    const profileLink = document.getElementById('profile-link');
    const settingsLink = document.getElementById('settings-link');
    const profileModal = document.getElementById('profile-modal');
    const settingsModal = document.getElementById('settings-modal');
    const closeProfile = document.getElementById('close-profile');
    const closeSettings = document.getElementById('close-settings');
    const themeSelect = document.getElementById('theme-select');

    // Abrir modal de perfil
    profileLink.addEventListener('click', function(e) {
        e.preventDefault();
        profileModal.style.display = 'block';
    });

    // Abrir modal de configurações
    settingsLink.addEventListener('click', function(e) {
        e.preventDefault();
        settingsModal.style.display = 'block';
        // Definir valor atual do tema no select
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        themeSelect.value = currentTheme;
    });

    // Fechar modais
    closeProfile.addEventListener('click', function() {
        profileModal.style.display = 'none';
    });

    closeSettings.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    // Fechar modal clicando fora
    window.addEventListener('click', function(e) {
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // Alterar tema via select
    themeSelect.addEventListener('change', function() {
        const selectedTheme = themeSelect.value;
        if (selectedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
});