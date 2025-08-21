import React from 'react';
import { Link } from 'react-router-dom';
import { UserGroupIcon, MapIcon, ChartBarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

function Home() {
  const features = [
    { title: "Driver Management", description: "Efficiently add, view, update, and manage all your drivers in one place.", icon: UserGroupIcon, color: "blue" },
    { title: "Real-time Tracking", description: "Monitor your fleet in real-time with our live map feature.", icon: MapIcon, color: "green" },
    { title: "Analytics Dashboard", description: "Gain valuable insights into your fleet's performance and efficiency.", icon: ChartBarIcon, color: "purple" }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
       {/* Main Content Area */}
      <div className="max-w-4xl flex flex-1 flex-col w-full items-center justify-center space-y-20">
        
        {/* Hero Section */}
        <div className="animate-fade-in-down">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            The Modern <span className="text-blue-600">Taxi Fleet</span> Management Platform
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your operations from driver onboarding to performance analytics, all in one place.
          </p>
        </div>
        
        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {features.map((feature, index) => (
            <div key={feature.title} 
                 className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border-t-4"
                 style={{ animationDelay: `${index * 150}ms`, borderTopColor: `var(--color-${feature.color})` }}
            >
              <div className="mb-4">
                <feature.icon className={`h-12 w-12 mx-auto text-${feature.color}-500`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Call-to-Action */}
        <div className="animate-fade-in-up">
          <Link to="/login">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all transform hover:scale-105">
              Admin Login
              <ArrowRightIcon className="h-5 w-5"/>
            </button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FleetPro. All rights reserved.
          </p>
      </footer>

      {/* CSS-in-JS for dynamic border colors */}
      <style>{`
        :root { --color-blue: #3b82f6; --color-green: #22c55e; --color-purple: #8b5cf6; }
      `}</style>
    </div>
  );
}

export default Home;