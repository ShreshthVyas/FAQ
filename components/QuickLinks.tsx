// components/QuickLinks.js

import Link from 'next/link';
import { motion } from 'framer-motion';

const QuickLinks = () => {
  const links = [
    { href: 'https://www.cbsupportindia.in/details/50', label: 'Chromebook Security' },
    { href: 'https://www.cbsupportindia.in/details/55', label: 'Chromebook Setup' },
    { href: 'https://www.cbsupportindia.in/details/29', label: 'Chromebook Perks' },
    { href: 'https://www.cbsupportindia.in/details/35', label: 'Chromebook Office' },
    { href: 'https://www.cbsupportindia.in/details/58', label: 'M365 On Chromebook' },
  ];

  return (
    <div className="mt-16 flex flex-wrap justify-center space-x-4">
         <div className="text-white text-lg mb-2">Quick Links-</div>
      {links.map((link) => (
        <motion.div
          key={link.href}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-blue-500"
        >
          <Link href={link.href} className="text-lg hover:underline">
           
              {link.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickLinks;
