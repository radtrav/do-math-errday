/* do-math-errday — shared code-challenge component.
   Runs entirely client-side: the textarea's contents become a real function
   via `new Function`, called against test cases, pass/fail rendered inline.
   Usage: <div class="code-challenge" data-challenge></div> then
   renderCodeChallenges([{ el, title, prompt, fnName, starter, solution, tests }])
   tests: [{ args: [...], expected, label }] */

function codeChallenge(el, spec) {
  el.classList.add('widget', 'code-challenge');

  const h4 = document.createElement('h4');
  h4.textContent = spec.title;
  el.appendChild(h4);

  const prompt = document.createElement('div');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML = spec.prompt;
  el.appendChild(prompt);

  const editor = document.createElement('textarea');
  editor.className = 'challenge-editor';
  editor.spellcheck = false;
  editor.rows = spec.starter.split('\n').length + 1;
  editor.value = spec.starter;
  editor.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const { selectionStart: s, selectionEnd: en } = editor;
    editor.value = editor.value.slice(0, s) + '  ' + editor.value.slice(en);
    editor.selectionStart = editor.selectionEnd = s + 2;
  });
  el.appendChild(editor);

  const controls = document.createElement('div');
  controls.className = 'challenge-controls';
  const runBtn = document.createElement('button');
  runBtn.className = 'primary';
  runBtn.textContent = 'Run tests';
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  const revealBtn = document.createElement('button');
  revealBtn.textContent = 'Reveal solution';
  controls.append(runBtn, resetBtn, revealBtn);
  el.appendChild(controls);

  const output = document.createElement('div');
  output.className = 'challenge-output';
  el.appendChild(output);

  const solutionWrap = document.createElement('div');
  solutionWrap.className = 'challenge-solution';
  solutionWrap.style.display = 'none';
  const solutionPre = document.createElement('pre');
  const solutionCode = document.createElement('code');
  solutionCode.className = 'language-typescript';
  solutionCode.textContent = spec.solution;
  solutionPre.appendChild(solutionCode);
  solutionWrap.appendChild(solutionPre);
  el.appendChild(solutionWrap);

  function showError(message) {
    output.innerHTML = '';
    const errDiv = document.createElement('div');
    errDiv.className = 'challenge-error';
    errDiv.textContent = message;
    output.appendChild(errDiv);
  }

  function runTests() {
    output.innerHTML = '';
    let fn;
    try {
      fn = new Function(`${editor.value}\n;return typeof ${spec.fnName} === 'function' ? ${spec.fnName} : undefined;`)();
    } catch (err) {
      showError(`Syntax error: ${err.message}`);
      return;
    }
    if (typeof fn !== 'function') {
      showError(`Define a function named "${spec.fnName}".`);
      return;
    }

    let passed = 0;
    spec.tests.forEach((t) => {
      const row = document.createElement('div');
      let ok, display;
      try {
        const actual = fn(...t.args);
        ok = typeof t.expected === 'number'
          ? Math.abs(actual - t.expected) < 1e-9
          : JSON.stringify(actual) === JSON.stringify(t.expected);
        display = JSON.stringify(actual);
      } catch (err) {
        ok = false;
        display = `threw: ${err.message}`;
      }
      row.className = 'challenge-test ' + (ok ? 'pass' : 'fail');
      row.innerHTML = `<span class="label">${ok ? '✓' : '✗'} ${t.label}</span>` +
        `<span class="actual">${display}${ok ? '' : ' (expected ' + JSON.stringify(t.expected) + ')'}</span>`;
      output.appendChild(row);
      if (ok) passed++;
    });

    const summary = document.createElement('div');
    summary.className = 'challenge-summary' + (passed === spec.tests.length ? ' all-pass' : '');
    summary.textContent = passed === spec.tests.length
      ? `🎉 All ${passed}/${spec.tests.length} tests passed.`
      : `${passed}/${spec.tests.length} tests passed.`;
    output.appendChild(summary);
  }

  runBtn.addEventListener('click', runTests);
  resetBtn.addEventListener('click', () => { editor.value = spec.starter; output.innerHTML = ''; });
  revealBtn.addEventListener('click', () => {
    const showing = solutionWrap.style.display !== 'none';
    solutionWrap.style.display = showing ? 'none' : 'block';
    revealBtn.textContent = showing ? 'Reveal solution' : 'Hide solution';
    if (!showing && window.Prism) Prism.highlightElement(solutionCode);
  });
}

function renderCodeChallenges(specs) {
  specs.forEach((s) => codeChallenge(document.querySelector(s.el), s));
}
