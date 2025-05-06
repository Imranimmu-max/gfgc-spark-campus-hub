
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About GFGC</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Government First Grade College, Chikkaballpur is committed to providing quality education
              and empowering students with knowledge and skills for a successful future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-college-600 dark:text-gray-400 dark:hover:text-college-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-college-600 dark:text-gray-400 dark:hover:text-college-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-college-600 dark:text-gray-400 dark:hover:text-college-400">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Courses', 'Gallery', 'About Us'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-gray-600 hover:text-college-600 dark:text-gray-300 dark:hover:text-college-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-college-600 dark:text-college-400" />
                <span>Government First Grade College, Chikkaballpur District, Karnataka, India - 562101</span>
              </p>
              <p className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Mail size={18} className="mr-2 flex-shrink-0 text-college-600 dark:text-college-400" />
                <span>info@gfgcchikkaballpur.edu.in</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Spark Campus Hub | Government First Grade College, Chikkaballpur. All rights reserved.
          </p>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Designed & Developed by Imran
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
