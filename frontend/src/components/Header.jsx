import React, { useEffect, useState } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom';
import '../index.css';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { mobileItemVariants, mobileMenuVariants, linkVariants } from '../utils/animate';

const Header = () => {
  const location=useLocation()
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

useEffect(()=>{
  const path =location.pathname;
  if (path==='/') setActiveSection('home');
  else if (path==='/all-properties') setActiveSection('properties');
  else if (path==='/about') setActiveSection('about');
  else if (path==='/services') setActiveSection('services');
  else if (path==='/more') setActiveSection('more');
  else if (path==='/contact') setActiveSection('contact');
},[location])
  

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleCloseMenu = () => setIsOpen(false);
  const sections = [
      { name: 'home', path: '/' },
      {name: 'properties', path: '/all-properties' },
      { name: 'about', path: '/about' },
      { name: 'services', path: '/services' },
      { name: 'more', path: '/more' },
      { name: 'contact', path: '/contact' },
    ];
  const handleScroll = () => {
    
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const element = document.getElementById(section.name);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.name);
        }
      }
    });
  };

  const handleScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
      handleCloseMenu();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Navlinks = ({ mobile = false }) => (
    <ul
      className={`
        font-medium
        ${mobile
          ? 'flex flex-col space-y-6 py-6'
          : 'hidden md:flex md:space-x-10'}
      `}
    >
      {sections.map((section,index) => (
        <motion.li key={index} variants={mobile ? mobileItemVariants : undefined}>
          
           {['properties', 'about', 'services', 'more'].includes(section.name) ? (
  
  <Link
    to={section.path}
    className={`${
      mobile ? 'block py-2 text-[var(--light-gray)]' : 'text-[var(--text-dark)]'
    } transition-colors duration-300 ${
      activeSection === section.name
        ? 'text-[var(--accent)] font-semibold border-b-2 border-[var(--accent)]'
        : 'hover:text-[var(--accent)]'
    }`}
    onClick={handleCloseMenu}
  >
    {section.name.charAt(0).toUpperCase() + section.name.slice(1).replace('about', 'About Us')}
  </Link>
  
  ):(
          <HashLink
            smooth
            to={`/#${section.name}`}
            className={`${
              mobile ? 'block py-2 text-[var(--light-gray)]' : 'text-[var(--text-dark)]'
            } transition-colors duration-300 ${
              activeSection === section.name
                ? 'text-[var(--accent)] font-semibold border-b-2 border-[var(--accent)]'
                : 'hover:text-[var(--accent)]'
            }`}
            onClick={handleCloseMenu}
          >
            {section.name.charAt(0).toUpperCase() + section.name.slice(1).replace('about', 'About Us')}
          </HashLink>
        
      )}
        </motion.li>
      ))}
    </ul>
  );

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-[var(--white)] '>
      <div className='max-w-7xl mx-auto px-4 sm:px-6  lg:px-8 py-4'>
        <div className='flex items-center justify-between shadow-lg  bg-white h-10 rounded-2xl px-4'>
          <div className='flex-shrink-0'>
            <Link to ='/' className='text-[var(--primary)] font-bold text-2xl uppercase tracking-wide'>
              Real Estate
            </Link>
          </div>

          <nav className='flex-grow flex justify-center'>
            <Navlinks />
          </nav>

          <div className='hidden md:flex right-20 items-center absolute space-x-4'>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e)=>{
                e.preventDefault();
                handleScrollTo('contact');
              }}
              className='bg-[var(--primary)]  text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-[var(--primary)]/90 transition-all duration-300'
            >
              Contact Us
            </motion.a>
          </div>

          <div className='md:hidden'>
            <button
              onClick={handleToggle}
              className='text-[var(--primary)] p-2 rounded-md hover:bg-[var(--white)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors duration-300'
              aria-label='Toggle menu'
            >
              <HiOutlineMenuAlt3 className='size-6' />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.nav
          className='md:hidden bg-[var(--primary)]'
          initial='hidden'
          animate='visible'
          variants={mobileMenuVariants}
        >
          <div className='px-4 sm:px-6'>
            <Navlinks mobile />
            <motion.div className='pb-6' variants={mobileItemVariants}>
              <a
                href='#contact'
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('contact');
                }}
                className='block w-full text-center bg-[var(--white)] text-[var(--primary)] font-bold px-6 py-3 rounded-full hover:bg-[var(--white)]/90 transition-all duration-300'
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;