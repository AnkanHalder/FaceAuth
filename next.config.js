/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
 
    webpack(config) {
      config.resolve.fallback = {
  
        ...config.resolve.fallback,  
  
        fs: false, // the solution
      };
      
      return config;
    },
  };