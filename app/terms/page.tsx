import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Yu Development — Terms of Use',
};

const sections: LegalSection[] = [
  {
    heading: 'Acceptance of Terms',
    body: [
      'These Terms of Use (“Terms”) govern your access to and use of the Yu Development, LLC (“Yu Development,” “we,” “us,” or “our”) website. By accessing or using this website, you agree to be bound by these Terms. If you do not agree, please do not use the site.',
    ],
  },
  {
    heading: 'Use of the Website',
    body: [
      'You may use this website for lawful, personal, and informational purposes only. You agree not to:',
      [
        'Use the site in any way that violates applicable laws or regulations.',
        'Attempt to gain unauthorized access to any part of the site or its systems.',
        'Interfere with or disrupt the operation, security, or availability of the site.',
        'Copy, reproduce, or redistribute site content without our prior written permission.',
      ],
    ],
  },
  {
    heading: 'Intellectual Property',
    body: [
      'All content on this website — including text, graphics, logos, images, and the Yu Development name and marks — is the property of Yu Development or its licensors and is protected by intellectual property laws. You may not use our content or trademarks without prior written consent.',
    ],
  },
  {
    heading: 'No Investment or Professional Advice',
    body: [
      'Information on this website is provided for general informational purposes only and does not constitute investment, financial, legal, or professional advice, nor an offer or solicitation to buy or sell any security or interest. You should consult your own advisors before making decisions based on any information here.',
    ],
  },
  {
    heading: 'Third-Party Links',
    body: [
      'Our website may contain links to third-party websites for your convenience. We do not control and are not responsible for the content, policies, or practices of those sites, and linking does not imply our endorsement.',
    ],
  },
  {
    heading: 'Disclaimer of Warranties',
    body: [
      'This website is provided on an “as is” and “as available” basis, without warranties of any kind, whether express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, Yu Development shall not be liable for any indirect, incidental, or consequential damages arising out of or related to your use of, or inability to use, this website.',
    ],
  },
  {
    heading: 'Changes to These Terms',
    body: [
      'We may update these Terms from time to time. Changes are effective when posted, and the “last updated” date reflects the most recent revision. Your continued use of the site constitutes acceptance of the updated Terms.',
    ],
  },
  {
    heading: 'Contact Us',
    body: [
      'Questions about these Terms may be directed to services@yudevelopment.com or 470-380-7339, Atlanta, Georgia.',
    ],
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms of Use" updated="July 6, 2026" sections={sections} />;
}
