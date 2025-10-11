import type { PropsWithChildren } from 'react';

export function MenuBar({ children }: PropsWithChildren) {
  return (
    <header
      className="w-full bg-accent px-20 py-6 shadow-[0_2px_4px_rgba(0,0,0,0.0562443)]"
      data-testid="header"
    >
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-extrabold text-primary-text">Where in the world?</h1>

        {children}
      </div>
    </header>
  );
}
