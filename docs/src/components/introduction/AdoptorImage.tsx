import { useIsDarkMode } from '@/hooks/use-is-dark-mode';
import { ImgHTMLAttributes } from 'react';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  lightSrc: string;
  darkSrc: string;
}

export function AdoptorImage(props: Props) {
  const isDarkMode = useIsDarkMode();
  return (
    <img
      src={isDarkMode ? props.darkSrc : props.lightSrc}
      {...props}
      style={{
        height: 80,
      }}
    />
  );
}
