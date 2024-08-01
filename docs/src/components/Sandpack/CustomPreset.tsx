import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  useLoadingOverlayState,
  useSandpackNavigation,
} from '@codesandbox/sandpack-react';
import { RefreshButton } from './RefreshButton';
import { useRef } from 'react';
import { Loading } from './Loading';

export function CustomPreset() {
  const ref = useRef<{ reset: () => void }>(null);
  const { refresh } = useSandpackNavigation();
  const state = useLoadingOverlayState();

  const handleRefresh = () => {
    refresh();
    ref.current?.reset();
  };

  return (
    <SandpackLayout>
      <SandpackCodeEditor showRunButton={false} />
      <SandpackConsole
        ref={ref}
        standalone
        showResetConsoleButton={state !== 'LOADING'}
        actionsChildren={state === 'LOADING' ? <Loading /> : <RefreshButton onRefresh={handleRefresh} />}
      />
    </SandpackLayout>
  );
}
