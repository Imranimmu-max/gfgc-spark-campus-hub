import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              About GFGC Chikkaballpur
            </h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-12">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src="/images/gfgc-college.jpg"
                    alt="GFGC Chikkaballpur Campus"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/600x400?text=GFGC+Chikkaballpur";
                    }}
                  />
                </div>
                <div className="p-6 md:w-1/2">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Government First Grade College, Chikkaballpur is committed to providing quality education
                    and empowering students with knowledge and skills for a successful future.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our institution offers a wide range of undergraduate programs in Arts, Science, and Commerce,
                    designed to prepare students for diverse career paths and further academic pursuits.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              About the Developer
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-12">
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                  This project was designed and developed by <strong>Imran</strong> as part of a personal initiative
                  to improve campus engagement and provide a modern digital platform for GFGC Chikkaballpur.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Built with ❤️ to enhance the college experience by providing easy access to information
                  about courses, campus facilities, and activities.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Technologies Used
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
                  <li>React.js for the frontend user interface</li>
                  <li>TypeScript for type-safe code</li>
                  <li>Tailwind CSS for styling</li>
                  <li>Node.js and Express for the backend</li>
                  <li>MongoDB for database storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
