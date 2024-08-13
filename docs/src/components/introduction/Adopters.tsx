import Image from 'next/image';
import { ComponentProps } from 'react';
import { ThemeMode } from '../theme-mode/ThemeMode';

/**
 * 이 곳에 적용한 조직을 추가해주세요.
 */
export const adopterLogoImagePropsList = [
  {
    src: '/adopters/비바리퍼블리카.png',
    darkSrc: '/adopters/비바리퍼블리카_darkmode.png',
    alt: '비바리퍼블리카',
    height: 80,
    width: 262.6,
  },
  {
    src: '/adopters/아임웹.png',
    darkSrc: '/adopters/아임웹_darkmode.png',
    alt: '아임웹',
    height: 80,
    width: 367,
  },
] as const satisfies Array<
  Pick<ComponentProps<typeof Image>, 'src' | 'alt'> &
    Required<Pick<ComponentProps<typeof Image>, 'width' | 'height'>> & {
      darkSrc: string;
    }
>;

export const Adopters = () => {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {adopterLogoImagePropsList.map(({ darkSrc, src, alt, ...props }) => (
        <ThemeMode key={src}>
          {(theme) => (
            <Image
              src={theme === 'dark' ? darkSrc : src}
              alt={alt}
              {...props}
            />
          )}
        </ThemeMode>
      ))}
    </div>
  );
};
