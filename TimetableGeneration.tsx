import React, { useState } from 'react';
import { Play, Download, RefreshCw, Eye, CheckCircle, Clock } from 'lucide-react';

const TimetableGeneration: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedOptions, setGeneratedOptions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedOptions([]);
    
    // Simulate generation process
    const steps = [
      { progress: 20, message: 'Analyzing constraints...' },
      { progress: 40, message: 'Optimizing classroom allocation...' },
      { progress: 60, message: 'Resolving conflicts...' },
      { progress: 80, message: 'Generating alternatives...' },
      { progress: 100, message: 'Finalizing timetables...' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step.progress);
    }

    // Generate sample options
    const options = [
      {
        id: 1,
        name: 'Option A - Balanced Distribution',
        score: 95,
        conflicts: 0,
        utilization: 87,
        description: 'Optimal resource utilization with minimal conflicts'
      },
      {
        id: 2,
        name: 'Option B - Faculty Preference',
        score: 89,
        conflicts: 2,
        utilization: 82,
        description: 'Prioritizes faculty preferences with slight resource trade-off'
      },
      {
        id: 3,
        name: 'Option C - Student-Centric',
        score: 91,
        conflicts: 1,
        utilization: 85,
        description: 'Optimized for student convenience with compact scheduling'
      }
    ];

    setGeneratedOptions(options);
    setIsGenerating(false);
  };

  const mockTimetableData = [
    { time: '09:00-10:00', monday: 'CS301 - Room 101', tuesday: 'MATH201 - Room 205', wednesday: 'CS302 - Lab 1', thursday: 'PHY101 - Room 301', friday: 'CS301 - Room 101' },
    { time: '10:00-11:00', monday: 'CS302 - Lab 1', tuesday: 'CS301 - Room 101', wednesday: 'MATH201 - Room 205', thursday: 'CS302 - Lab 1', friday: 'PHY101 - Room 301' },
    { time: '11:00-12:00', monday: 'MATH201 - Room 205', tuesday: 'PHY101 - Room 301', wednesday: 'CS301 - Room 101', thursday: 'MATH201 - Room 205', friday: 'CS302 - Lab 1' },
    { time: '12:00-13:00', monday: 'LUNCH BREAK', tuesday: 'LUNCH BREAK', wednesday: 'LUNCH BREAK', thursday: 'LUNCH BREAK', friday: 'LUNCH BREAK' },
    { time: '13:00-14:00', monday: 'PHY101 - Room 301', tuesday: 'CS302 - Lab 1', wednesday: 'PHY101 - Room 301', thursday: 'CS301 - Room 101', friday: 'MATH201 - Room 205' },
    { time: '14:00-15:00', monday: 'CS301 - Room 101', tuesday: 'MATH201 - Room 205', wednesday: 'CS302 - Lab 1', thursday: 'PHY101 - Room 301', friday: 'CS301 - Room 101' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Timetable Generation</h1>
        <p className="text-gray-600 mt-1">Generate optimized timetables based on configured parameters</p>
      </div>

      {/* Generation Controls */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Generate New Timetable</h2>
            <p className="text-gray-600 text-sm mt-1">Create optimized scheduling options</p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Generate Timetable</span>
              </>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Generation Progress</span>
              <span className="text-sm font-medium text-gray-700">{generationProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${generationProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Generated Options */}
      {generatedOptions.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Generated Options</h2>
          <div className="grid gap-4">
            {generatedOptions.map((option) => (
              <div 
                key={option.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedOption === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{option.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-700">Score: {option.score}%</div>
                      <div className="text-xs text-gray-500">
                        {option.conflicts} conflicts • {option.utilization}% utilization
                      </div>
                    </div>
                    {selectedOption === option.id && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Generated 2 min ago</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                    <button className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timetable Preview */}
      {selectedOption && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Timetable Preview</h2>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                <CheckCircle className="h-4 w-4" />
                <span>Approve</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left font-medium text-gray-700">Time</th>
                  <th className="border border-gray-200 p-3 text-left font-medium text-gray-700">Monday</th>
                  <th className="border border-gray-200 p-3 text-left font-medium text-gray-700">Tuesday</th>
                  <th className="border border-gray-200 p-3 text-left font-medium text-gray-700">Wednesday</th>
                  <th className="border border-gray-200 p-3 text-left font-medium text-gray-700">Thursday</th>
                  <th className="border border-gray-200 p-3 text-left font-medium text-gray-700">Friday</th>
                </tr>
              </thead>
              <tbody>
                {mockTimetableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 p-3 font-medium text-gray-800">{row.time}</td>
                    <td className={`border border-gray-200 p-3 text-sm ${row.monday.includes('LUNCH') ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                      {row.monday}
                    </td>
                    <td className={`border border-gray-200 p-3 text-sm ${row.tuesday.includes('LUNCH') ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                      {row.tuesday}
                    </td>
                    <td className={`border border-gray-200 p-3 text-sm ${row.wednesday.includes('LUNCH') ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                      {row.wednesday}
                    </td>
                    <td className={`border border-gray-200 p-3 text-sm ${row.thursday.includes('LUNCH') ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                      {row.thursday}
                    </td>
                    <td className={`border border-gray-200 p-3 text-sm ${row.friday.includes('LUNCH') ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                      {row.friday}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableGeneration;