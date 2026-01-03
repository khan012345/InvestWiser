import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
}

const BASE_URL = 'https://investwise.app';
const SITE_NAME = 'InvestWise';

export function useSEO({ title, description, keywords, canonicalPath = '/', ogType = 'website' }: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const updateMeta = (selector: string, content: string, attribute = 'name') => {
      let meta = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${selector}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, selector);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const updateLink = (rel: string, href: string) => {
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Primary meta tags
    updateMeta('title', title);
    updateMeta('description', description);
    if (keywords) {
      updateMeta('keywords', keywords);
    }

    // Open Graph tags
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:url', `${BASE_URL}${canonicalPath}`, 'property');
    updateMeta('og:type', ogType, 'property');
    updateMeta('og:site_name', SITE_NAME, 'property');

    // Twitter tags
    updateMeta('twitter:title', title, 'property');
    updateMeta('twitter:description', description, 'property');
    updateMeta('twitter:url', `${BASE_URL}${canonicalPath}`, 'property');

    // Canonical URL
    updateLink('canonical', `${BASE_URL}${canonicalPath}`);

  }, [title, description, keywords, canonicalPath, ogType]);
}

// SEO configurations for each route
export const SEO_CONFIG = {
  'sip-calculator': {
    title: 'SIP Calculator - Calculate Mutual Fund Returns | InvestWise',
    description: 'Free SIP calculator to plan your systematic investment. Calculate future value of monthly investments with expected returns. Supports inflation adjustment and multi-currency.',
    keywords: 'SIP calculator, systematic investment plan, mutual fund SIP, monthly investment calculator, SIP returns calculator, investment planning tool',
    canonicalPath: '/sip-calculator',
  },
  'step-up-sip-calculator': {
    title: 'Step-Up SIP Calculator - Increase Your SIP Annually | InvestWise',
    description: 'Calculate returns with Step-Up SIP where you increase your investment annually. See how increasing your SIP by a percentage each year can boost your wealth significantly.',
    keywords: 'step up SIP calculator, increasing SIP, annual SIP increment, SIP top up calculator, progressive SIP, wealth building calculator',
    canonicalPath: '/step-up-sip-calculator',
  },
  'swp-calculator': {
    title: 'SWP Calculator - Systematic Withdrawal Plan | InvestWise',
    description: 'Plan your retirement income with SWP calculator. Calculate monthly withdrawals from your mutual fund corpus while your remaining investment continues to grow.',
    keywords: 'SWP calculator, systematic withdrawal plan, retirement income calculator, mutual fund withdrawal, pension planning, monthly income from investments',
    canonicalPath: '/swp-calculator',
  },
} as const;

export type SEOConfigKey = keyof typeof SEO_CONFIG;
