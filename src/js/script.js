document.addEventListener('DOMContentLoaded', () => {
    const introAudio = document.getElementById('intro-audio');
    const finalAudio = document.getElementById('final-audio');
    const fadeToBlack = document.getElementById('fade-to-black');
    const finalQuote = document.getElementById('final-quote');
    const preScreen = document.getElementById('pre-screen');
    const startButton = document.getElementById('start-button');

    // Só inicia depois de clicar
    startButton.addEventListener('click', () => {
        preScreen.style.display = "none";
        if (introAudio) {
            introAudio.muted = false;
            introAudio.play().catch(err => console.log("Erro ao iniciar intro:", err));
        }
    });

    // Configuração do Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Aumentado para garantir que detecte melhor
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Verifica se é a seção final
                if (entry.target.id === 'final') {
                    console.log("Seção final detectada! Iniciando sequência...");
                    startFinalSequence();
                    observer.unobserve(entry.target); // Para de observar após ativar
                }
            }
        });
    }, observerOptions);

    // Observa todos os elementos animáveis
    const elementsToAnimate = document.querySelectorAll('.animatable');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Observa especificamente a seção final
    const finalSection = document.getElementById('final');
    if (finalSection) {
        observer.observe(finalSection);
    }

    function startFinalSequence() {
    console.log("Sequência final iniciada!");
    
    // Para a intro se ainda estiver tocando
    if (introAudio && !introAudio.paused) {
        introAudio.pause();
        introAudio.currentTime = 0;
    }

    // Toca a música final
    if (finalAudio) {
        finalAudio.play().catch(err => console.log("Áudio final bloqueado:", err));
    }

    // Espera 8 segundos antes de ativar o fade
    setTimeout(() => {
        if (fadeToBlack) {
            console.log("Ativando fade to black...");
            fadeToBlack.classList.add('active');

            // Mostra a citação final após mais 4 segundos
            setTimeout(() => {
                if (finalQuote) {
                    console.log("Mostrando citação final...");
                    finalQuote.classList.add('show');
                }
            }, 4000);
        }
    }, 6000); // ⬅️ delay de 8 segundos
}


    // Função de debug para testar manualmente
    window.testFinalSequence = startFinalSequence;
    
    // Log para debug
    console.log("Script carregado. Elementos encontrados:");
    console.log("fadeToBlack:", fadeToBlack);
    console.log("finalQuote:", finalQuote);
    console.log("finalSection:", finalSection);
});