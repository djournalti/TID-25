
const body = document.body;
const themeToggle = document.getElementById('themeToggle');

function applyTheme() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  body.classList.toggle('dark', isDark);
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

applyTheme();
