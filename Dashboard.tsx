import React from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Building
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { icon: Building, label: 'Active Classrooms', value: '24', change: '+2', color: 'blue' },
    { icon: Users, label: 'Faculty Members', value: '156', change: '+5', color: 'emerald' },
    { icon: BookOpen, label: 'Subjects', value: '89', change: '+3', color: 'amber' },
    { icon: Calendar, label: 'Active Timetables', value: '8', change: '+1', color: 'purple' }
  ];

  const recentActivities = [
    { id: 1, action: 'Timetable generated', department: 'Computer Science', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'Parameters updated', department: 'Mathematics', time: '4 hours ago', status: 'info' },
    { id: 3, action: 'Conflict resolved', department: 'Physics', time: '6 hours ago', status: 'warning' },
    { id: 4, action: 'New faculty added', department: 'Chemistry', time: '1 day ago', status: 'success' }
  ];

  const upcomingDeadlines = [
    { task: 'Review pending timetables', department: 'All Departments', deadline: '2 days', priority: 'high' },
    { task: 'Update faculty schedules', department: 'Engineering', deadline: '1 week', priority: 'medium' },
    { task: 'Room capacity verification', department: 'Sciences', deadline: '2 weeks', priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your scheduling system.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600 border-blue-100',
            emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            amber: 'bg-amber-50 text-amber-600 border-amber-100',
            purple: 'bg-purple-50 text-purple-600 border-purple-100'
          };

          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const statusColors = {
                  success: 'text-emerald-600 bg-emerald-50',
                  info: 'text-blue-600 bg-blue-50',
                  warning: 'text-amber-600 bg-amber-50'
                };

                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusColors[activity.status as keyof typeof statusColors]}`}>
                      {activity.status === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : activity.status === 'warning' ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.department}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Deadlines</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => {
                const priorityColors = {
                  high: 'bg-red-50 text-red-600 border-red-200',
                  medium: 'bg-amber-50 text-amber-600 border-amber-200',
                  low: 'bg-emerald-50 text-emerald-600 border-emerald-200'
                };

                return (
                  <div key={index} className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{deadline.task}</h4>
                        <p className="text-sm text-gray-500 mt-1">{deadline.department}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[deadline.priority as keyof typeof priorityColors]}`}>
                          {deadline.priority.toUpperCase()}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">{deadline.deadline}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
            <Calendar className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-800">Generate New Timetable</h3>
            <p className="text-sm text-gray-600">Create optimized schedules</p>
          </button>
          
          <button className="p-4 text-left rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200">
            <Users className="h-6 w-6 text-emerald-600 mb-2" />
            <h3 className="font-medium text-gray-800">Manage Faculty</h3>
            <p className="text-sm text-gray-600">Update faculty information</p>
          </button>
          
          <button className="p-4 text-left rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200">
            <TrendingUp className="h-6 w-6 text-amber-600 mb-2" />
            <h3 className="font-medium text-gray-800">View Reports</h3>
            <p className="text-sm text-gray-600">Analyze scheduling metrics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;