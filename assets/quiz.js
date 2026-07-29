/* do-math-errday — shared quiz component.
   Usage: <div class="quiz" data-quiz></div> then quiz(el, {question, options, answer, explanation})
   or declaratively: renderQuizzes([{el: '#q1', question, options: [...], answer: 0, explanation}])
   Options should be authored with equal word counts so formatting gives no clues. */

function quiz(el, { question, options, answer, explanation }) {
  el.classList.add('quiz');
  const q = document.createElement('div');
  q.className = 'question';
  q.textContent = question;
  el.appendChild(q);

  const expl = document.createElement('div');
  expl.className = 'explanation';
  expl.innerHTML = explanation;

  let answered = false;
  options.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerHTML = text;
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      btn.classList.add(i === answer ? 'correct' : 'incorrect');
      if (i !== answer) el.querySelectorAll('.option')[answer].classList.add('correct');
      expl.classList.add('visible');
    });
    el.appendChild(btn);
  });
  el.appendChild(expl);
}

function renderQuizzes(specs) {
  specs.forEach((s) => quiz(document.querySelector(s.el), s));
}
