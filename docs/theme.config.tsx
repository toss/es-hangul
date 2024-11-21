import { ThemeMode } from '@/components/theme-mode/ThemeMode';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { DocsThemeConfig } from 'nextra-theme-docs';
import { useConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  project: {
    link: 'https://github.com/toss/es-hangul',
  },
  chat: {
    link: 'https://discord.gg/vGXbVjP2nY',
    icon: (
      <svg
        width="24px"
        height="24px"
        viewBox="0 -28.5 256 256"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <path
            d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
            fill="#5865F2"
            fillRule="nonzero"
          />
        </g>
      </svg>
    ),
  },
  docsRepositoryBase: 'https://github.com/toss/es-hangul/tree/main/docs',
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – es-hangul',
      };
    }
  },
  logo: (
    <ThemeMode>
      {theme => (
        <Image src={theme === 'dark' ? '/logo-white.png' : '/logo.png'} alt="logo" width="120" height="48" priority />
      )}
    </ThemeMode>
  ),
  head: function useHead() {
    const { title } = useConfig();

    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="description" content="한글을 다루는 모던한 방법" />
        <meta name="og:description" content="한글을 다루는 모던한 방법" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={'/og.png'} />
        <meta name="twitter:site:domain" content="es-hangul.slash.page" />
        <meta name="twitter:url" content="es-hangul.slash.page" />
        <meta name="og:title" content={title ? title + ' – es-hangul' : 'es-hangul'} />
        <meta name="og:image" content={'/og.png'} />
        <meta name="apple-mobile-web-app-title" content="Nextra" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-dark.png" type="image/png" media="(prefers-color-scheme: dark)" />
      </>
    );
  },
  editLink: {
    text: function EditLinkText() {
      const { locale } = useRouter();

      switch (locale) {
        case 'ko':
          return '이 페이지를 수정하기 →';
        case 'en':
        default:
          return 'Edit this page →';
      }
    },
  },
  feedback: {
    content: function FeedbackContent() {
      const { locale } = useRouter();

      switch (locale) {
        case 'ko':
          return '이 페이지를 피드백하기 →';
        case 'en':
        default:
          return 'Add feedback on this page →';
      }
    },
  },
  search: {
    placeholder: function usePlaceholder() {
      const { locale } = useRouter();

      switch (locale) {
        case 'en':
        default:
          return `Search...`;
        case 'ko':
          return '검색어를 입력하세요...';
      }
    },
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div>
          <a
            className="flex items-center gap-1 text-current"
            target="_blank"
            rel="noopener noreferrer"
            title="toss homepage"
            href="https://toss.im"
          >
            <span>Powered by</span>
            <ThemeMode>
              {theme => (
                <Image
                  src={theme === 'dark' ? '/toss-logo-white.png' : '/toss-logo-gray.png'}
                  alt="Toss"
                  width="64"
                  height="32"
                />
              )}
            </ThemeMode>
          </a>
        </div>
        <p className="mt-6 text-xs">© {new Date().getFullYear()} Viva Republica, Inc.</p>
      </div>
    ),
  },
  toc: {
    backToTop: true,
  },
  i18n: [
    { locale: 'en', text: 'English' },
    { locale: 'ko', text: '한국어' },
  ],
};

export default config;
