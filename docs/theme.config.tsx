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
