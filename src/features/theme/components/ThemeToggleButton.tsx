import { useThemeStore } from '../hooks/useThemeStore';
import { getNextTheme, type Theme } from '../utils/helper';

const iconClassName = 'aspect-square w-5';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeStore();

  const nextTheme = getNextTheme(theme);

  function renderButtonLabel(mode: Theme) {
    // prettier-ignore
    if (mode === 'dark') {
      return <><MoonIcon className={iconClassName} data-testid="moon-icon" /> Dark Mode</>
    } else if (mode === 'light') {
      return <><SunIcon className={iconClassName} data-testid="sun-icon" /> Light Mode</>
    } else {
      return <><MoonSunIcon className={iconClassName} data-testid="moon-sun-icon" /> Match System</>
    }
  }

  return (
    <button
      className="inline-flex h-8 cursor-pointer flex-row items-center gap-2 font-semibold text-primary-text"
      onClick={toggleTheme}
    >
      {renderButtonLabel(nextTheme)}
    </button>
  );
}

type SVGProps = React.SVGProps<SVGSVGElement>;

const MoonIcon = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </svg>
);

const SunIcon = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonSunIcon = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2v2" />
    <path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" />
    <path d="M16 12a4 4 0 0 0-4-4" />
    <path d="m19 5-1.256 1.256" />
    <path d="M20 12h2" />
  </svg>
);
