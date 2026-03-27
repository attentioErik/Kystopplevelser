// Inline script to prevent flash of wrong theme
// Runs before React hydration
export default function ThemeScript() {
  const script = `
    (function() {
      var stored = localStorage.getItem('kyst-theme');
      if (stored === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else if (stored === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
