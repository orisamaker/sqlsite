// Curso gratuito de SQL - Lógica (diseño A). Contenido interactivo en contenido.js

const menuButton = document.getElementById('menuButton');
const mobileMenu = document.querySelector('.hidden.md\\:flex');

if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex', 'flex-col', 'absolute', 'top-16', 'right-4', 'bg-white', 'p-4', 'rounded-md', 'shadow-lg', 'border', 'border-slate-200');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'right-4', 'bg-white', 'p-4', 'rounded-md', 'shadow-lg', 'border', 'border-slate-200');
        }
    });
}

let userProgress = { completedModules: new Set(), quizScores: {}, currentModule: null };

// Solo interceptar clics en módulos si existe #lesson-content (p. ej. vista in-page).
// En la home no existe, así que los enlaces funcionan como enlaces normales.
if (typeof modules !== 'undefined' && document.getElementById('lesson-content')) {
    document.querySelectorAll('.module-item').forEach(el => {
        el.addEventListener('click', (e) => {
            const moduleId = el.getAttribute('data-module');
            if (moduleId && modules[moduleId]) {
                e.preventDefault();
                showModule(moduleId);
            }
        });
    });
}

function showModule(moduleId) {
    if (typeof modules === 'undefined') return;
    const module = modules[moduleId];
    const lessonContent = document.getElementById('lesson-content');
    if (!lessonContent) return;
    userProgress.currentModule = moduleId;
    lessonContent.innerHTML = '<h2 class="text-2xl font-bold mb-4 text-slate-800">' + module.title + '</h2>' + module.content;
    document.querySelectorAll('.module-item').forEach(item => {
        if (item.getAttribute('data-module') === moduleId) {
            item.classList.add('border-[#0c77f2]', 'bg-blue-50');
        } else {
            item.classList.remove('border-[#0c77f2]', 'bg-blue-50');
        }
    });
}

function renderQuizForm(quiz, title, container, moduleId) {
    if (!quiz || !Array.isArray(quiz) || !quiz.length) return;
    const safeTitle = title || 'Quiz';
    let quizHTML = '<h3 class="quiz-title">Quiz: ' + escapeHtml(safeTitle) + '</h3><form id="quizForm" class="quiz-form">';
    quiz.forEach((q, i) => {
        quizHTML += '<div class="quiz-question"><p class="quiz-question-text">' + (i + 1) + '. ' + escapeHtml(q.question) + '</p><div class="quiz-options">';
        (q.options || []).forEach((opt, j) => {
            quizHTML += '<label class="quiz-option"><input type="radio" name="q' + i + '" value="' + j + '"> <span>' + escapeHtml(opt) + '</span></label>';
        });
        quizHTML += '</div></div>';
    });
    quizHTML += '<button type="submit" class="btn-run"><span class="material-icons">check_circle</span> Enviar quiz</button></form>';
    container.innerHTML = quizHTML;
    document.getElementById('quizForm').addEventListener('submit', function(e) {
        e.preventDefault();
        checkQuiz(quiz, container, moduleId);
    });
}
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showQuiz(moduleId) {
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && typeof modules !== 'undefined' && modules[moduleId] && modules[moduleId].quiz) {
        renderQuizForm(modules[moduleId].quiz, modules[moduleId].title, lessonContent, moduleId);
    }
}

function checkQuiz(quiz, resultContainer, moduleId) {
    let score = 0;
    quiz.forEach((q, i) => {
        const sel = document.querySelector('input[name="q' + i + '"]:checked');
        if (sel && parseInt(sel.value) === q.correct) score++;
    });
    const pct = Math.round((score / quiz.length) * 100);
    if (moduleId != null) {
        userProgress.quizScores[moduleId] = pct;
        if (pct >= 70) userProgress.completedModules.add(moduleId);
        updateProgress();
    }
    const target = resultContainer || document.getElementById('lesson-content') || document.getElementById('quiz-container');
    if (!target) return;
    const passedClass = pct >= 70 ? 'quiz-result-pass' : 'quiz-result-fail';
    const quizSection = document.getElementById('quiz-section');
    const nextUrl = quizSection ? quizSection.getAttribute('data-next-url') : '';
    const nextTitle = quizSection ? quizSection.getAttribute('data-next-title') : '';
    let actionsHtml = '<div class="quiz-result-actions"><button type="button" class="btn-prev" onclick="location.reload()"><span class="material-icons">refresh</span> Reintentar quiz</button>';
    if (nextUrl) {
        actionsHtml += '<a href="' + nextUrl + '" class="btn-next"><span>' + (nextTitle ? nextTitle : 'Siguiente módulo') + '</span> <span class="material-icons">arrow_forward</span></a>';
    }
    actionsHtml += '</div>';
    target.innerHTML = '<div class="quiz-result ' + passedClass + '"><h3 class="quiz-title">Resultados del quiz</h3><p class="quiz-score">Has sacado ' + score + ' de ' + quiz.length + ' (' + pct + '%)</p>' + (pct >= 70 ? '<p class="quiz-result-msg">¡Enhorabuena! Puedes pasar al siguiente módulo.</p>' : '<p class="quiz-result-msg">Repasa el contenido e inténtalo de nuevo.</p>') + actionsHtml + '</div>';
}

// Inicializar quiz en página de módulo: prioridad a datos incrustados (quiz-data), luego contenido.js
(function initQuizSection() {
    const quizSection = document.getElementById('quiz-section');
    const quizContainer = document.getElementById('quiz-container');
    if (!quizSection || !quizContainer) return;
    const quizDataEl = document.getElementById('quiz-data');
    const quizTitleEl = document.getElementById('quiz-title');
    if (quizDataEl && quizTitleEl) {
        try {
            const quiz = JSON.parse(quizDataEl.textContent);
            const title = JSON.parse(quizTitleEl.textContent);
            if (Array.isArray(quiz) && quiz.length) renderQuizForm(quiz, title, quizContainer, null);
        } catch (e) { console.warn('Quiz inline parse error', e); }
        return;
    }
    const moduleKey = quizSection.getAttribute('data-module-key');
    if (typeof modules !== 'undefined' && moduleKey && modules[moduleKey] && modules[moduleKey].quiz) {
        renderQuizForm(modules[moduleKey].quiz, modules[moduleKey].title, quizContainer, moduleKey);
    }
})();

function updateProgress() {
    const total = typeof modules !== 'undefined' ? Object.keys(modules).length : 5;
    const done = userProgress.completedModules.size;
    const pct = total > 0 ? (done / total) * 100 : 0;
    const pe = document.getElementById('progress-percentage');
    const be = document.getElementById('progressBar');
    if (pe) pe.textContent = Math.round(pct) + '%';
    if (be) be.style.width = pct + '%';
}

// Consola SQL eliminada: sustituida por quizzes en cada módulo
