// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Audio Context for the click sound
let audioCtx;
function playClickSound() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

function startQuiz() {
    playClickSound();
    // Hide hero section and footer
    document.getElementById('hero').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    
    // Show quiz section
    document.getElementById('quiz').style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function enableNextStateBtn() {
    const select = document.getElementById('state-select');
    const btn = document.getElementById('btn-state-next');
    if (select.value !== "") {
        btn.style.display = 'inline-block';
    }
}

let currentStep = 1;
const totalSteps = 6;

function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function nextStep(step) {
    playClickSound();
    const current = document.getElementById(`step-${currentStep}`);
    current.classList.remove('active');
    
    currentStep = step;
    updateProgressBar();
    
    const next = document.getElementById(`step-${currentStep}`);
    next.classList.add('active');
}

function finishQuiz() {
    playClickSound();
    const current = document.getElementById(`step-${currentStep}`);
    current.classList.remove('active');
    
    // Get the selected state
    const state = document.getElementById('state-select').value;
    
    // Show loading state
    const loading = document.getElementById('quiz-loading');
    loading.classList.add('active');
    
    const loadingTitle = loading.querySelector('h3');
    const loadingText = loading.querySelector('p');

    // Dynamic loading sequence (Increased to ~10s total)
    loadingTitle.innerText = "Iniciando Processamento...";
    loadingText.innerText = "Conectando aos servidores de dados agrícolas...";

    setTimeout(() => {
        loadingTitle.innerText = "Analisando seu Perfil...";
        loadingText.innerText = "Cruzando respostas com padrões de sucesso no agro...";
    }, 2500);

    setTimeout(() => {
        loadingTitle.innerText = "Pesquisando sua Região...";
        loadingText.innerText = `Verificando volume de safras e demanda em ${state}...`;
    }, 5000);

    setTimeout(() => {
        loadingTitle.innerText = "Calculando Potencial...";
        loadingText.innerText = "Quase pronto! Gerando relatório de faturamento estimado...";
    }, 7500);
    
    // Show results after 10 seconds
    setTimeout(() => {
        loading.classList.remove('active');
        
        // Populate personalized result
        const resultText = document.getElementById('result-text');
        const urgencyText = document.getElementById('urgency-text');
        
        resultText.innerHTML = `Com base no seu perfil e na alta demanda em <strong>${state}</strong>, você pode faturar entre <strong>R$ 1.500 e R$ 7.000/mês</strong> com serviços de drone agrícola.`;
        
        urgencyText.innerHTML = `Atualmente, faltam profissionais qualificados em <strong>${state}</strong> para atender à crescente demanda do campo, o que torna sua oportunidade de lucro imediato ainda maior.`;
        
        const result = document.getElementById('quiz-result');
        result.classList.add('active');
        updateProgressBar();
    }, 10000);
}

function showOffers() {
    playClickSound();
    // Hide quiz result
    document.getElementById('quiz-wrapper').style.display = 'none';
    
    // Show offers, preview video, feedbacks, faq and footer
    const solutionBridge = document.getElementById('solution-bridge');
    const previewSection = document.getElementById('preview-video');
    solutionBridge.style.display = 'block';
    previewSection.style.display = 'block';
    document.getElementById('feedbacks').style.display = 'block';
    document.getElementById('offers').style.display = 'block';
    document.getElementById('faq').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);

    // Initialize scroll animations
    const animElements = document.querySelectorAll('.scroll-animate-up, .scroll-animate-left, .scroll-animate-right');
    animElements.forEach(el => {
        observer.observe(el);
    });

    // Manually activate the first section if it's already in view
    setTimeout(() => {
        solutionBridge.classList.add('active');
        previewSection.classList.add('active');
    }, 100);
}

function toggleFaq(element) {
    playClickSound();
    const item = element.parentElement;
    item.classList.toggle('active');
    
    const icon = element.querySelector('.faq-icon');
    icon.innerText = item.classList.contains('active') ? '-' : '+';
}

// Header behavior on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.padding = '1rem 0';
    } else {
        header.style.background = 'linear-gradient(to bottom, #0B3D2E, transparent)';
        header.style.padding = '1.5rem 0';
    }
});

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    const animElements = document.querySelectorAll('.scroll-animate-up, .scroll-animate-left, .scroll-animate-right');
    animElements.forEach(el => {
        observer.observe(el);
    });
});
