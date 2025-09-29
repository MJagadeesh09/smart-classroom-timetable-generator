import React, { useState } from 'react';
import { Save, Plus, Trash2, Copy, Users, Building, BookOpen, Calendar } from 'lucide-react';

const ParameterInput: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [parameters, setParameters] = useState({
    basic: {
      classrooms: 24,
      batches: 12,
      maxClassesPerDay: 8,
      workingDays: 6
    },
    subjects: [
      { id: 1, name: 'Data Structures', code: 'CS301', credits: 4, classesPerWeek: 4, type: 'Theory' },
      { id: 2, name: 'Database Systems', code: 'CS302', credits: 3, classesPerWeek: 3, type: 'Theory' },
      { id: 3, name: 'Networks Lab', code: 'CS303', credits: 2, classesPerWeek: 2, type: 'Practical' }
    ],
    faculty: [
      { id: 1, name: 'Dr. Sarah Johnson', department: 'Computer Science', subjects: ['CS301', 'CS302'], maxHours: 20, avgLeaves: 2 },
      { id: 2, name: 'Prof. Michael Chen', department: 'Computer Science', subjects: ['CS302', 'CS303'], maxHours: 18, avgLeaves: 1 },
      { id: 3, name: 'Dr. Emily Davis', department: 'Mathematics', subjects: ['MATH201'], maxHours: 22, avgLeaves: 3 }
    ],
    constraints: {
      noBackToBack: true,
      lunchBreak: '12:00-13:00',
      specialSlots: [
        { subject: 'Assembly', time: 'Monday 09:00-10:00', fixed: true }
      ]
    }
  });

  const tabs = [
    { id: 'basic', label: 'Basic Settings', icon: Building },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'faculty', label: 'Faculty', icon: Users },
    { id: 'constraints', label: 'Constraints', icon: Calendar }
  ];

  const addSubject = () => {
    const newSubject = {
      id: Date.now(),
      name: '',
      code: '',
      credits: 3,
      classesPerWeek: 3,
      type: 'Theory'
    };
    setParameters({
      ...parameters,
      subjects: [...parameters.subjects, newSubject]
    });
  };

  const removeSubject = (id: number) => {
    setParameters({
      ...parameters,
      subjects: parameters.subjects.filter(subject => subject.id !== id)
    });
  };

  const addFaculty = () => {
    const newFaculty = {
      id: Date.now(),
      name: '',
      department: '',
      subjects: [],
      maxHours: 20,
      avgLeaves: 2
    };
    setParameters({
      ...parameters,
      faculty: [...parameters.faculty, newFaculty]
    });
  };

  const removeFaculty = (id: number) => {
    setParameters({
      ...parameters,
      faculty: parameters.faculty.filter(faculty => faculty.id !== id)
    });
  };

  const renderBasicSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Classrooms
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={parameters.basic.classrooms}
            onChange={(e) => setParameters({
              ...parameters,
              basic: { ...parameters.basic, classrooms: parseInt(e.target.value) }
            })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Batches
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={parameters.basic.batches}
            onChange={(e) => setParameters({
              ...parameters,
              basic: { ...parameters.basic, batches: parseInt(e.target.value) }
            })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Classes per Day
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={parameters.basic.maxClassesPerDay}
            onChange={(e) => setParameters({
              ...parameters,
              basic: { ...parameters.basic, maxClassesPerDay: parseInt(e.target.value) }
            })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Working Days per Week
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={parameters.basic.workingDays}
            onChange={(e) => setParameters({
              ...parameters,
              basic: { ...parameters.basic, workingDays: parseInt(e.target.value) }
            })}
          />
        </div>
      </div>
    </div>
  );

  const renderSubjects = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Subject Management</h3>
        <button
          onClick={addSubject}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Subject</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {parameters.subjects.map((subject) => (
          <div key={subject.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Subject Name</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={subject.name}
                  onChange={(e) => {
                    const updatedSubjects = parameters.subjects.map(s => 
                      s.id === subject.id ? { ...s, name: e.target.value } : s
                    );
                    setParameters({ ...parameters, subjects: updatedSubjects });
                  }}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Subject Code</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={subject.code}
                  onChange={(e) => {
                    const updatedSubjects = parameters.subjects.map(s => 
                      s.id === subject.id ? { ...s, code: e.target.value } : s
                    );
                    setParameters({ ...parameters, subjects: updatedSubjects });
                  }}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Credits</label>
                <input
                  type="number"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={subject.credits}
                  onChange={(e) => {
                    const updatedSubjects = parameters.subjects.map(s => 
                      s.id === subject.id ? { ...s, credits: parseInt(e.target.value) } : s
                    );
                    setParameters({ ...parameters, subjects: updatedSubjects });
                  }}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Classes/Week</label>
                <input
                  type="number"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={subject.classesPerWeek}
                  onChange={(e) => {
                    const updatedSubjects = parameters.subjects.map(s => 
                      s.id === subject.id ? { ...s, classesPerWeek: parseInt(e.target.value) } : s
                    );
                    setParameters({ ...parameters, subjects: updatedSubjects });
                  }}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                <select
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={subject.type}
                  onChange={(e) => {
                    const updatedSubjects = parameters.subjects.map(s => 
                      s.id === subject.id ? { ...s, type: e.target.value } : s
                    );
                    setParameters({ ...parameters, subjects: updatedSubjects });
                  }}
                >
                  <option value="Theory">Theory</option>
                  <option value="Practical">Practical</option>
                  <option value="Tutorial">Tutorial</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => removeSubject(subject.id)}
                  className="w-full bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFaculty = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Faculty Management</h3>
        <button
          onClick={addFaculty}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Faculty</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {parameters.faculty.map((faculty) => (
          <div key={faculty.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={faculty.name}
                  onChange={(e) => {
                    const updatedFaculty = parameters.faculty.map(f => 
                      f.id === faculty.id ? { ...f, name: e.target.value } : f
                    );
                    setParameters({ ...parameters, faculty: updatedFaculty });
                  }}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={faculty.department}
                  onChange={(e) => {
                    const updatedFaculty = parameters.faculty.map(f => 
                      f.id === faculty.id ? { ...f, department: e.target.value } : f
                    );
                    setParameters({ ...parameters, faculty: updatedFaculty });
                  }}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Subjects</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={faculty.subjects.join(', ')}
                  placeholder="CS301, CS302"
                  onChange={(e) => {
                    const updatedFaculty = parameters.faculty.map(f => 
                      f.id === faculty.id ? { ...f, subjects: e.target.value.split(',').map(s => s.trim()) } : f
                    );
                    setParameters({ ...parameters, faculty: updatedFaculty });
                  }}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Max Hours</label>
                <input
                  type="number"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={faculty.maxHours}
                  onChange={(e) => {
                    const updatedFaculty = parameters.faculty.map(f => 
                      f.id === faculty.id ? { ...f, maxHours: parseInt(e.target.value) } : f
                    );
                    setParameters({ ...parameters, faculty: updatedFaculty });
                  }}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Avg Leaves</label>
                <input
                  type="number"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={faculty.avgLeaves}
                  onChange={(e) => {
                    const updatedFaculty = parameters.faculty.map(f => 
                      f.id === faculty.id ? { ...f, avgLeaves: parseInt(e.target.value) } : f
                    );
                    setParameters({ ...parameters, faculty: updatedFaculty });
                  }}
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => removeFaculty(faculty.id)}
                  className="w-full bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConstraints = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Scheduling Constraints</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="noBackToBack"
              checked={parameters.constraints.noBackToBack}
              onChange={(e) => setParameters({
                ...parameters,
                constraints: { ...parameters.constraints, noBackToBack: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="noBackToBack" className="ml-2 text-sm text-gray-700">
              Prevent back-to-back classes for same faculty
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lunch Break Time
            </label>
            <input
              type="text"
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={parameters.constraints.lunchBreak}
              onChange={(e) => setParameters({
                ...parameters,
                constraints: { ...parameters.constraints, lunchBreak: e.target.value }
              })}
            />
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-3">Special Fixed Slots</h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          {parameters.constraints.specialSlots.map((slot, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div>
                <span className="font-medium">{slot.subject}</span>
                <span className="text-gray-500 ml-2">{slot.time}</span>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Fixed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return renderBasicSettings();
      case 'subjects':
        return renderSubjects();
      case 'faculty':
        return renderFaculty();
      case 'constraints':
        return renderConstraints();
      default:
        return renderBasicSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Parameter Configuration</h1>
          <p className="text-gray-600 mt-1">Configure scheduling parameters for timetable generation</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            <Copy className="h-4 w-4" />
            <span>Duplicate</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Save className="h-4 w-4" />
            <span>Save Parameters</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ParameterInput;