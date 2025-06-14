document.getElementById('quiz-form').addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const answer = document.querySelector('input[name="answer"]:checked').value;
  const score = answer === '4' ? 1 : 0;

  const res = await fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score }),
  });

  const text = await res.text();
  alert(text);
});
