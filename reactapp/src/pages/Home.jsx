import React from 'react';
import { Link } from 'react-router-dom';
import { UserGroupIcon, MapIcon, ChartBarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

function Home() {
  const features = [
    { 
      title: "Driver Management", 
      description: "Efficiently add, view, update, and manage all your drivers in one place.", 
      icon: UserGroupIcon, 
      color: "blue" 
    },
    { 
      title: "Real-time Tracking", 
      description: "Monitor your fleet in real-time with our live map feature.", 
      icon: MapIcon, 
      color: "indigo" 
    },
    { 
      title: "Analytics Dashboard", 
      description: "Gain valuable insights into your fleet's performance and efficiency.", 
      icon: ChartBarIcon, 
      color: "purple" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6 text-center">
      {/* Main Content Area */}
      <div className="max-w-4xl flex flex-1 flex-col w-full items-center justify-center space-y-20">
        
        {/* Hero Section */}
        <div className="animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg mb-6">
            <UserGroupIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            The Modern <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Taxi Fleet</span> Management Platform
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your operations from driver onboarding to performance analytics, all in one place.
          </p>
        </div>
        
        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.title} 
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-transparent hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  borderTopColor: `var(--color-${feature.color})` 
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-6">
                  <IconComponent className={`h-8 w-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
        
        {/* Call-to-Action */}
        <div className="animate-fade-in-up">
          <Link to="/login">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105">
              Admin Login
              <ArrowRightIcon className="h-5 w-5"/>
            </button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-8 mt-12">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} FleetPro. All rights reserved.
        </p>
      </footer>

      {/* CSS-in-JS for dynamic border colors */}
      <style>{`
        :root { 
          --color-blue: #3b82f6; 
          --color-indigo: #6366f1; 
          --color-purple: #8b5cf6; 
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Home;