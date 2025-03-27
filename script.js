document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("trade-quiz-app");
    const questions = itqpData.questions.sort(() => 0.5 - Math.random());
    let current = 0;
    let score = 0;

    // Create progress wrapper with label and bar
    const progressWrapper = document.createElement("div");
    progressWrapper.className = "itqp-progress-wrapper";

    const progressText = document.createElement("div");
    progressText.className = "itqp-progress-bar-text";
    progressText.textContent = `Progress: ${current + 1} / ${questions.length}`;

    const progressBar = document.createElement("div");
    progressBar.className = "itqp-progress-bar";

    const progressFill = document.createElement("div");
    progressFill.className = "itqp-progress-bar-fill";
    progressBar.appendChild(progressFill);

    progressWrapper.appendChild(progressText);
    progressWrapper.appendChild(progressBar);

    const card = document.createElement("div");
    card.className = "itqp-question-card";

    app.appendChild(progressWrapper);
    app.appendChild(card);

    renderQuestion(current);

    function renderQuestion(index) {
        const q = questions[index];
        app.style.backgroundImage = `url('${q.image}')`;
        card.innerHTML = '<h2>' + q.question + '</h2>';

        const answersDiv = document.createElement("div");
        answersDiv.className = "itqp-answers";

        q.answers.forEach((a) => {
            const btn = document.createElement("button");
            btn.textContent = a;
            btn.onclick = () => {
                const isCorrect = a === q.correct;
                if (isCorrect) score++;
                showFeedback(isCorrect, q.explanation);
            };
            answersDiv.appendChild(btn);
        });

        card.appendChild(answersDiv);
        updateProgress();
    }

    function showFeedback(isCorrect, explanation) {
        card.innerHTML += `<div class="itqp-feedback">${isCorrect ? "Correct!" : "Incorrect."} ${explanation}</div>`;
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next";
        nextBtn.className = "itqp-next-button";
        nextBtn.onclick = () => {
            current++;
            if (current < questions.length) {
                renderQuestion(current);
            } else {
                showResults();
            }
        };
        card.appendChild(nextBtn);
    }

    function updateProgress() {
        progressFill.style.width = ((current / questions.length) * 100) + "%";
        progressText.textContent = `Progress: ${current + 1} / ${questions.length}`;
    }

    function showResults() {
        app.style.backgroundImage = '';
        app.innerHTML = "";
        const result = document.createElement("div");
        result.className = "itqp-result-screen";
        result.innerHTML = "<h2>Your Score: " + score + " / " + questions.length + "</h2>";

        const logo = document.createElement("img");
        logo.src = "https://thecuriouseconomist.com/wp-content/uploads/2025/02/cropped-Logo.webp";
        logo.className = "itqp-logo-below-result";

        app.appendChild(result);
        app.appendChild(logo);
    }
});
