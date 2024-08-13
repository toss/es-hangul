import { SandpackProps, SandpackProvider } from '@codesandbox/sandpack-react';
import { atomDark } from '@codesandbox/sandpack-themes';
import { baseTemplate } from './baseTemplate';
import { CustomPreset } from './CustomPreset';
import { SandpackLogLevel } from '@codesandbox/sandpack-client';
import { ThemeMode } from '../theme-mode/ThemeMode';

export function Sandpack({ files }: SandpackProps) {
  return (
    <ThemeMode>
      {theme => (
        <SandpackProvider
          template="vanilla-ts"
          theme={theme === 'dark' ? atomDark : undefined}
          files={{
            ...baseTemplate.files,
            ...files,
          }}
          customSetup={{
            dependencies: baseTemplate.dependencies,
            devDependencies: baseTemplate.devDependencies,
          }}
          options={{
            recompileDelay: 300,
            initMode: 'user-visible',
            initModeObserverOptions: { rootMargin: '1400px 0px' },
            bundlerURL: 'https://sandpack-bundler.codesandbox.io/',
            logLevel: SandpackLogLevel.None,
          }}
        >
          <CustomPreset />
        </SandpackProvider>
      )}
    </ThemeMode>
  );
}
