import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animate';
import { useNavigate } from 'react-router-dom';
import BlogImg1 from '../assets/im1.jpg';
import BlogImg2 from '../assets/im2.jpg';
import BlogImg3 from '../assets/im3.jpg';

const More = () => {
  const navigate = useNavigate();

  const blogPosts = [
    { id: 'post1', title: "Why Choose Us for Your Real Estate Needs", excerpt: "Discover the advantages...", image: BlogImg1, date: "March 15, 2025" },
    { id: 'post2', title: "Top Tips for First-Time Home Buyers", excerpt: "Learn essential advice...", image: BlogImg2, date: "March 10, 2025" },
    { id: 'post3', title: "Maximizing Your Property’s Value", excerpt: "Explore strategies...", image: BlogImg3, date: "March 5, 2025" },
  ];

  const handlePostClick = (postId) => {
    console.log(`Blog post ${postId} clicked!`);
    navigate(`/blog/${postId}`); // Placeholder for blog post navigation
  };

  return (
    <section id='more' className='py-20 bg-[var(--light-gray)]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          variants={fadeIn('up', 0.1)}
          initial='hidden'
          animate='show'
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-center mb-12'
        >
          <h1 className='text-4xl md:text-5xl font-bold text-[var(--primary)] mb-4'>
            Learn More <span className='text-[var(--accent)]'>About Us</span>
          </h1>
          <p className='text-[var(--text-dark)] max-w-2xl mx-auto text-lg opacity-80'>
            Explore our insights and expertise to understand why we’re the best choice for your real estate journey.
          </p>
        

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={fadeIn('up', 0.2 + index * 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.3 }}
              className='relative group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer'
              onClick={() => handlePostClick(post.id)}
            >
              <img
                src={post.image}
                alt={post.title}
                className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.05]'
              />
              <button className='absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <FaRegHeart className='text-[var(--secondary)] hover:text-[var(--accent)] text-xl' />
              </button>
              <div className='p-6'>
                <p className='text-sm text-[var(--text-dark)] opacity-70 mb-2'>{post.date}</p>
                <h2 className='text-xl font-semibold text-[var(--primary)] mb-3 truncate'>{post.title}</h2>
                <p className='text-[var(--text-dark)] opacity-80 text-sm line-clamp-2'>{post.excerpt}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePostClick(post.id);
                  }}
                  className='mt-4 flex items-center text-[var(--secondary)] hover:text-[var(--accent)] font-semibold transition-colors duration-300'
                >
                  Read More <MdArrowOutward className='ml-2 text-xl' />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='text-center mt-16'>
          <motion.h3
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className='text-2xl font-semibold text-[var(--primary)] mb-4'
          >
            Ready to Work With Us?
          </motion.h3>
          <motion.p
            variants={fadeIn('up', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className='text-[var(--text-dark)] max-w-xl mx-auto opacity-80 mb-6'
          >
            Contact our team today to experience the benefits of our expertise firsthand.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')} // Updated to navigate to Contact page
            className='bg-[var(--secondary)] text-white px-8 py-3 rounded-full hover:bg-[var(--accent)] transition-colors duration-300 shadow-md'
          >
            Get in Touch
          </motion.button>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default More;