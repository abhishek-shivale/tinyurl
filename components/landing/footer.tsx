import { Link as LinkIcon, Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'API', href: '#' },
      { label: 'Documentation', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <LinkIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">TinyLink</span>
            </div>
            <p className="text-primary/60 text-sm mb-6 max-w-sm">
              Making the web more accessible, one short link at a time. Simplify your URLs and track their performance with our powerful platform.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-primary/60 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="font-semibold text-primary mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary/60 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary/60">
          <div>
            © {new Date().getFullYear()} TinyLink. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <span className="text-red-500">❤</span>
            <span>by the TinyLink team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}