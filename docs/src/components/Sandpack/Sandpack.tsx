import { SandpackProps, SandpackProvider } from '@codesandbox/sandpack-react';
import { atomDark } from '@codesandbox/sandpack-themes';
import { baseTemplate } from './baseTemplate';
import { CustomPreset } from './CustomPreset';
import { useIsDarkMode } from '@/hooks/use-is-dark-mode';
import { SandpackLogLevel } from '@codesandbox/sandpack-client';

export function Sandpack({ files }: SandpackProps) {
  const isDarkMode = useIsDarkMode();

  return (
    <SandpackProvider
      template="vanilla-ts"
      theme={isDarkMode ? atomDark : undefined}
      files={{
        ...baseTemplate.files,
        ...files,
      }}
      customSetup={{
        dependencies: baseTemplate.dependencies,
        devDependencies: baseTemplate.devDependencies,
      }}
      options={{
        initMode: 'user-visible',
        initModeObserverOptions: { rootMargin: '1400px 0px' },
        bundlerURL: 'https://sandpack-bundler.codesandbox.io/',
        logLevel: SandpackLogLevel.None,
      }}
    >
      <CustomPreset />
    </SandpackProvider>
  );
}
