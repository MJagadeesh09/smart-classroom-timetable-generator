import React, { useState } from 'react';
import { Calendar, Lock, User, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (name: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.username && credentials.password) {
      onLogin(credentials.username);
    }
    
    setIsLoading(false);
  };

  const features = [
    { icon: CheckCircle, text: 'Automated timetable generation' },
    { icon: CheckCircle, text: 'Resource optimization' },
    { icon: CheckCircle, text: 'Multi-department support' },
    { icon: CheckCircle, text: 'Conflict resolution' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding and features */}
        <div className="hidden lg:block space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">TimetableGen</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Intelligent scheduling solution for higher education institutions
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2">Optimize Your Scheduling</h3>
            <p className="text-gray-600 text-sm">
              Generate optimal timetables considering classroom capacity, faculty availability, 
              and student requirements with our advanced algorithms.
            </p>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center space-x-2 mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">TimetableGen</h1>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to your administrator account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="username"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Demo credentials: Any username/password combination
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;