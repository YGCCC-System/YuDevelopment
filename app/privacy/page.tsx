import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Yu Development — Privacy Policy',
};

const sections: LegalSection[] = [
  {
    heading: 'Overview',
    body: [
      'Yu Development, LLC (“Yu Development,” “we,” “us,” or “our”) respects your privacy. This Privacy Policy explains what information we collect through our website, how we use it, and the choices you have. By using this website, you agree to the practices described below.',
    ],
  },
  {
    heading: 'Information We Collect',
    body: [
      'We collect information you provide directly to us and information collected automatically as you use the site:',
      [
        'Information you submit — such as your name, email address, phone number, and any message you send through our contact form.',
        'Automatically collected data — such as your IP address, browser type, device information, and pages viewed, gathered through cookies and similar technologies.',
      ],
    ],
  },
  {
    heading: 'How We Use Your Information',
    body: [
      'We use the information we collect to:',
      [
        'Respond to your inquiries and communicate with you about our projects and services.',
        'Operate, maintain, and improve our website and its performance.',
        'Comply with legal obligations and protect the rights and safety of Yu Development and others.',
      ],
    ],
  },
  {
    heading: 'How We Share Information',
    body: [
      'We do not sell your personal information. We may share it with trusted service providers who help us operate the website and manage inquiries (for example, our form and hosting providers), and where required by law or to protect our legal rights.',
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'Our website may use cookies and similar technologies to remember your preferences and understand how the site is used. You can control cookies through your browser settings; disabling them may affect how the site functions.',
    ],
  },
  {
    heading: 'Data Retention & Security',
    body: [
      'We retain personal information only for as long as needed to fulfill the purposes described in this policy or as required by law. We use reasonable technical and organizational measures to protect your information, though no method of transmission over the internet is completely secure.',
    ],
  },
  {
    heading: 'Your Choices',
    body: [
      'You may request access to, correction of, or deletion of the personal information you have provided to us by contacting us at services@yudevelopment.com. You may also opt out of receiving communications from us at any time.',
    ],
  },
  {
    heading: 'Contact Us',
    body: [
      'If you have questions about this Privacy Policy, contact us at services@yudevelopment.com or 470-380-7339, Atlanta, Georgia.',
    ],
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="July 6, 2026" sections={sections} />;
}
