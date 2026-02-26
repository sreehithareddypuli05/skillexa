import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Github, Youtube } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Courses', to: '/courses' },
    { label: 'Services', to: '/services' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  Courses: [
    { label: 'Python', to: '/courses' },
    { label: 'Full Stack Dev', to: '/courses' },
    { label: 'DSA', to: '/courses' },
    { label: 'Java', to: '/courses' },
  ],
  Services: [
    { label: 'Resume Building', to: '/services' },
    { label: 'Portfolio Sites', to: '/services' },
    { label: 'LinkedIn Optimization', to: '/services' },
    { label: 'Startup Support', to: '/services' },
  ],
};

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-2xl text-white">Skill<span className="text-blue-400">exa</span></span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-500 max-w-xs">
              Empowering students and professionals with cutting-edge skills, career support, and business services for a transformed future.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:hello@skillexa.com" className="hover:text-blue-400 transition-colors">hello@skillexa.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:+917000000000" className="hover:text-blue-400 transition-colors">+91 70000 00000</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{section}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-gray-800 my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Skillexa. All rights reserved. Built with ❤️ for students.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 hover:scale-110">
                <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}