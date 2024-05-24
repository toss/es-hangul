import Image from 'next/image';
import { ComponentProps } from 'react';

/**
 * 이 곳에 적용한 조직을 추가해주세요.
 */
export const adopterLogoImagePropsList = [
  { src: '/adopters/비바리퍼블리카.png', alt: '비바리퍼블리카', height: 80, width: 200 },
  { src: '/adopters/아임웹.png', alt: '아임웹', height: 80, width: 200 },
] as const satisfies Array<
  Pick<ComponentProps<typeof Image>, 'src' | 'alt'> & Required<Pick<ComponentProps<typeof Image>, 'width' | 'height'>>
>;

export const Adopters = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
    {adopterLogoImagePropsList.map(props => (
      <Image key={props.src} {...props} />
    ))}
  </div>
);
