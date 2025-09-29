import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  MessageCircle, 
  Download,
  AlertTriangle,
  User,
  Calendar
} from 'lucide-react';

interface TimetableRequest {
  id: number;
  title: string;
  department: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'review';
  conflicts: number;
  utilization: number;
  priority: 'high' | 'medium' | 'low';
  comments?: string;
}

const ReviewApproval: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState('');

  const [timetableRequests, setTimetableRequests] = useState<TimetableRequest[]>([
    {
      id: 1,
      title: 'Computer Science - Semester 5 Timetable',
      department: 'Computer Science',
      submittedBy: 'Dr. Sarah Johnson',
      submittedAt: '2024-01-15 10:30 AM',
      status: 'pending',
      conflicts: 0,
      utilization: 95,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Mathematics - Semester 3 Timetable',
      department: 'Mathematics',
      submittedBy: 'Prof. Michael Chen',
      submittedAt: '2024-01-14 02:15 PM',
      status: 'review',
      conflicts: 2,
      utilization: 87,
      priority: 'medium',
      comments: 'Please resolve conflicts with Physics lab sessions'
    },
    {
      id: 3,
      title: 'Physics - Semester 1 Timetable',
      department: 'Physics',
      submittedBy: 'Dr. Emily Davis',
      submittedAt: '2024-01-13 11:45 AM',
      status: 'approved',
      conflicts: 0,
      utilization: 92,
      priority: 'high'
    },
    {
      id: 4,
      title: 'Chemistry - Semester 4 Timetable',
      department: 'Chemistry',
      submittedBy: 'Prof. Robert Wilson',
      submittedAt: '2024-01-12 09:20 AM',
      status: 'rejected',
      conflicts: 5,
      utilization: 78,
      priority: 'low',
      comments: 'Too many conflicts with existing schedules. Please regenerate.'
    }
  ]);

  const statusColors = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    review: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const priorityColors = {
    high: 'bg-red-50 text-red-600 border-red-200',
    medium: 'bg-amber-50 text-amber-600 border-amber-200',
    low: 'bg-emerald-50 text-emerald-600 border-emerald-200'
  };

  const filteredRequests = filterStatus === 'all' 
    ? timetableRequests 
    : timetableRequests.filter(request => request.status === filterStatus);

  const handleApprove = (id: number) => {
    setTimetableRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: 'approved' as const }
          : request
      )
    );
  };

  const handleReject = (id: number, comment: string) => {
    setTimetableRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: 'rejected' as const, comments: comment }
          : request
      )
    );
    setShowCommentModal(false);
    setComment('');
  };

  const handleReview = (id: number) => {
    setTimetableRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: 'review' as const }
          : request
      )
    );
  };

  const mockTimetablePreview = [
    { time: '09:00-10:00', monday: 'CS301 - Room 101', tuesday: 'MATH201 - Room 205', wednesday: 'CS302 - Lab 1', thursday: 'PHY101 - Room 301', friday: 'CS301 - Room 101' },
    { time: '10:00-11:00', monday: 'CS302 - Lab 1', tuesday: 'CS301 - Room 101', wednesday: 'MATH201 - Room 205', thursday: 'CS302 - Lab 1', friday: 'PHY101 - Room 301' },
    { time: '11:00-12:00', monday: 'MATH201 - Room 205', tuesday: 'PHY101 - Room 301', wednesday: 'CS301 - Room 101', thursday: 'MATH201 - Room 205', friday: 'CS302 - Lab 1' },
    { time: '12:00-13:00', monday: 'LUNCH BREAK', tuesday: 'LUNCH BREAK', wednesday: 'LUNCH BREAK', thursday: 'LUNCH BREAK', friday: 'LUNCH BREAK' },
    { time: '13:00-14:00', monday: 'PHY101 - Room 301', tuesday: 'CS302 - Lab 1', wednesday: 'PHY101 - Room 301', thursday: 'CS301 - Room 101', friday: 'MATH201 - Room 205' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Review & Approval</h1>
        <p className="text-gray-600 mt-1">Review and approve submitted timetable requests</p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Timetable Requests</h2>
            <p className="text-gray-600 text-sm mt-1">Manage pending and completed requests</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div 
              key={request.id}
              className={`bg-white rounded-xl border shadow-sm p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedRequest === request.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-100'
              }`}
              onClick={() => setSelectedRequest(request.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{request.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{request.submittedBy}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{request.submittedAt}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[request.status]}`}>
                    {request.status.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[request.priority]}`}>
                    {request.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-xs text-gray-500">Conflicts</span>
                  <div className="flex items-center space-x-2">
                    {request.conflicts === 0 ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    )}
                    <span className="font-medium">{request.conflicts}</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Utilization</span>
                  <div className="font-medium">{request.utilization}%</div>
                </div>
              </div>

              {request.comments && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <MessageCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <p className="text-sm text-amber-800">{request.comments}</p>
                  </div>
                </div>
              )}

              {request.status === 'pending' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(request.id);
                    }}
                    className="flex items-center space-x-1 bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 transition-colors"
                  >
                    <CheckCircle className="h-3 w-3" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReview(request.id);
                    }}
                    className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="h-3 w-3" />
                    <span>Review</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCommentModal(true);
                    }}
                    className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="h-3 w-3" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timetable Preview */}
        {selectedRequest && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Timetable Preview</h3>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                    <Eye className="h-4 w-4" />
                    <span>Full View</span>
                  </button>
                  <button className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-2 text-left font-medium text-gray-700">Time</th>
                      <th className="border border-gray-200 p-2 text-left font-medium text-gray-700">Mon</th>
                      <th className="border border-gray-200 p-2 text-left font-medium text-gray-700">Tue</th>
                      <th className="border border-gray-200 p-2 text-left font-medium text-gray-700">Wed</th>
                      <th className="border border-gray-200 p-2 text-left font-medium text-gray-700">Thu</th>
                      <th className="border border-gray-200 p-2 text-left font-medium text-gray-700">Fri</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTimetablePreview.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-2 font-medium text-gray-800 text-xs">{row.time}</td>
                        <td className={`border border-gray-200 p-2 text-xs ${row.monday.includes('LUNCH') ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                          {row.monday}
                        </td>
                        <td className={`border border-gray-200 p-2 text-xs ${row.tuesday.includes('LUNCH') ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                          {row.tuesday}
                        </td>
                        <td className={`border border-gray-200 p-2 text-xs ${row.wednesday.includes('LUNCH') ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                          {row.wednesday}
                        </td>
                        <td className={`border border-gray-200 p-2 text-xs ${row.thursday.includes('LUNCH') ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                          {row.thursday}
                        </td>
                        <td className={`border border-gray-200 p-2 text-xs ${row.friday.includes('LUNCH') ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                          {row.friday}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Analysis */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-medium text-emerald-800 mb-2">Strengths</h4>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• High resource utilization (95%)</li>
                    <li>• No scheduling conflicts</li>
                    <li>• Balanced faculty workload</li>
                  </ul>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 mb-2">Suggestions</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Consider lab session grouping</li>
                    <li>• Optimize break timings</li>
                    <li>• Review room assignments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rejection Reason</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowCommentModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedRequest!, comment)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewApproval;