import React, { useState } from 'react';
import { 
  Save, 
  Bell, 
  Shield, 
  Users, 
  Clock, 
  Database,
  Mail,
  Key,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      instituteName: 'Modern University',
      timezone: 'Asia/Kolkata',
      academicYear: '2024-25',
      defaultClassDuration: 60,
      maxClassesPerDay: 8,
      workingDaysPerWeek: 6,
      autoSave: true,
      language: 'en'
    },
    notifications: {
      emailAlerts: true,
      conflictNotifications: true,
      approvalReminders: true,
      weeklyReports: true,
      maintainancealerts: false
    },
    security: {
      sessionTimeout: 30,
      requirePasswordChange: true,
      passwordExpiry: 90,
      twoFactorAuth: false,
      auditLogging: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30,
      cloudSync: true
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);

  const tabs = [
    { id: 'general', label: 'General', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'backup', label: 'Backup & Sync', icon: Database }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaveStatus('success');
    setIsSaving(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Institution Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution Name
            </label>
            <input
              type="text"
              value={settings.general.instituteName}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, instituteName: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Year
            </label>
            <input
              type="text"
              value={settings.general.academicYear}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, academicYear: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={settings.general.timezone}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, timezone: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (UTC+05:30)</option>
              <option value="Asia/Dubai">Asia/Dubai (UTC+04:00)</option>
              <option value="Europe/London">Europe/London (UTC+00:00)</option>
              <option value="America/New_York">America/New_York (UTC-05:00)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={settings.general.language}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, language: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Default Schedule Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Class Duration (minutes)
            </label>
            <input
              type="number"
              value={settings.general.defaultClassDuration}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, defaultClassDuration: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Classes Per Day
            </label>
            <input
              type="number"
              value={settings.general.maxClassesPerDay}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, maxClassesPerDay: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Working Days Per Week
            </label>
            <input
              type="number"
              value={settings.general.workingDaysPerWeek}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, workingDaysPerWeek: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Application Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoSave"
              checked={settings.general.autoSave}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, autoSave: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="autoSave" className="ml-2 text-sm text-gray-700">
              Enable auto-save for parameter changes
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Alerts</label>
              <p className="text-sm text-gray-500">Receive email notifications for important events</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.emailAlerts}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, emailAlerts: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Conflict Notifications</label>
              <p className="text-sm text-gray-500">Alert when scheduling conflicts are detected</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.conflictNotifications}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, conflictNotifications: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Approval Reminders</label>
              <p className="text-sm text-gray-500">Remind about pending timetable approvals</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.approvalReminders}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, approvalReminders: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Weekly Reports</label>
              <p className="text-sm text-gray-500">Send weekly scheduling performance reports</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.weeklyReports}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, weeklyReports: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Access Control</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Expiry (days)
            </label>
            <input
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, passwordExpiry: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Security Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Require Password Change</label>
              <p className="text-sm text-gray-500">Force users to change passwords on first login</p>
            </div>
            <input
              type="checkbox"
              checked={settings.security.requirePasswordChange}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, requirePasswordChange: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
              <p className="text-sm text-gray-500">Enable 2FA for enhanced security</p>
            </div>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, twoFactorAuth: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Audit Logging</label>
              <p className="text-sm text-gray-500">Log all user activities for security auditing</p>
            </div>
            <input
              type="checkbox"
              checked={settings.security.auditLogging}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, auditLogging: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Backup Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backup Frequency
            </label>
            <select
              value={settings.backup.backupFrequency}
              onChange={(e) => setSettings({
                ...settings,
                backup: { ...settings.backup, backupFrequency: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retention Period (days)
            </label>
            <input
              type="number"
              value={settings.backup.retentionPeriod}
              onChange={(e) => setSettings({
                ...settings,
                backup: { ...settings.backup, retentionPeriod: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Backup Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto Backup</label>
              <p className="text-sm text-gray-500">Automatically backup data at scheduled intervals</p>
            </div>
            <input
              type="checkbox"
              checked={settings.backup.autoBackup}
              onChange={(e) => setSettings({
                ...settings,
                backup: { ...settings.backup, autoBackup: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Cloud Synchronization</label>
              <p className="text-sm text-gray-500">Sync data to cloud storage for redundancy</p>
            </div>
            <input
              type="checkbox"
              checked={settings.backup.cloudSync}
              onChange={(e) => setSettings({
                ...settings,
                backup: { ...settings.backup, cloudSync: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Database className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Last Backup</h4>
            <p className="text-sm text-blue-700 mt-1">
              Successfully completed on January 15, 2024 at 3:30 AM
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700 mt-2 underline">
              View backup history
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-1">Configure application settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <p className="text-emerald-800">Settings saved successfully!</p>
          </div>
        </div>
      )}

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

export default SettingsPage;