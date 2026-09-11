/* Reusable quiz component.
   Usage:
     <div class="quiz" id="quiz1"></div>
     <script src="../assets/quiz.js"></script>
     <script>
       renderQuiz(document.getElementById("quiz1"), [
         { q: "…?", choices: ["a", "b", "c", "d"], answer: 2, explain: "…" },
       ]);
     </script>
   Immediate feedback per question; running score at the end. */

function renderQuiz(root, questions) {
  let answered = 0;
  let correct = 0;

  const scoreEl = document.createElement("p");
  scoreEl.className = "score";

  questions.forEach((item, qi) => {
    const box = document.createElement("div");
    box.className = "qq";

    const qt = document.createElement("div");
    qt.className = "qtext";
    qt.textContent = `${qi + 1}. ${item.q}`;
    box.appendChild(qt);

    const explain = document.createElement("div");
    explain.className = "explain";
    explain.style.display = "none";
    explain.textContent = item.explain || "";

    item.choices.forEach((choice, ci) => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.type = "button";
      btn.textContent = choice;
      btn.addEventListener("click", () => {
        if (box.classList.contains("answered")) return;
        box.classList.add("answered");
        answered += 1;
        if (ci === item.answer) {
          btn.classList.add("right");
          correct += 1;
        } else {
          btn.classList.add("wrong");
          box.querySelectorAll("button.choice")[item.answer].classList.add("right");
        }
        if (item.explain) explain.style.display = "block";
        scoreEl.textContent = `score: ${correct}/${answered}` +
          (answered === questions.length ? " — done" : "");
      });
      box.appendChild(btn);
    });

    box.appendChild(explain);
    root.appendChild(box);
  });

  root.appendChild(scoreEl);
}
