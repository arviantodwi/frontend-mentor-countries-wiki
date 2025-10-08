import { ThemeToggleButton } from '@/features/theme/components/ThemeToggleButton';
import type { PropsWithChildren } from 'react';
import { MenuBar } from './MenuBar';

export function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <MenuBar>
        <ThemeToggleButton />
      </MenuBar>

      {children}
    </main>
  );
}
