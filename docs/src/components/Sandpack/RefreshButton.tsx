import { RefreshIcon, RoundedButton } from '@codesandbox/sandpack-react';

export function RefreshButton({ onRefresh }: { onRefresh: () => void }) {
  return (
    <RoundedButton onClick={onRefresh}>
      <RefreshIcon />
    </RoundedButton>
  );
}
