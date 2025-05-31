import { useState } from 'react';
import { Save, RefreshCw, Lock, Bell, DollarSign, Percent, Clock } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const PlatformSettings = () => {
  const [settings, setSettings] = useState([
    {
      title: 'Transaction Limits',
      description: 'Configure maximum transaction amounts and daily limits',
      icon: <DollarSign size={20} />,
      fields: [
        { id: 'max-single-transaction', label: 'Maximum Single Transaction (₹)', type: 'number', value: 50000 },
        { id: 'max-daily-limit', label: 'Maximum Daily Limit (₹)', type: 'number', value: 100000 },
        { id: 'max-weekly-limit', label: 'Maximum Weekly Limit (₹)', type: 'number', value: 500000 },
        { id: 'min-transaction', label: 'Minimum Transaction Amount (₹)', type: 'number', value: 100 },
      ]
    },
    {
      title: 'Fee Configuration',
      description: 'Set transaction fees and agent commissions',
      icon: <Percent size={20} />,
      fields: [
        { id: 'transaction-fee', label: 'Transaction Fee (%)', type: 'number', value: 1.5 },
        { id: 'agent-commission', label: 'Agent Commission (%)', type: 'number', value: 2.5 },
        { id: 'withdrawal-fee', label: 'Withdrawal Fee (₹)', type: 'number', value: 25 },
        { id: 'large-transaction-fee', label: 'Large Transaction Fee (%)', type: 'number', value: 1.0 },
      ]
    },
    {
      title: 'Security Settings',
      description: 'Configure security and verification requirements',
      icon: <Lock size={20} />,
      fields: [
        { id: 'otp-verification', label: 'OTP Verification', type: 'toggle', value: true },
        { id: 'two-factor', label: 'Two-Factor Authentication', type: 'toggle', value: true },
        { id: 'session-timeout', label: 'Session Timeout (minutes)', type: 'number', value: 30 },
        { id: 'encryption-level', label: 'Encryption Level', type: 'select', options: ['Standard', 'Advanced', 'Military-Grade'], value: 'Advanced' },
      ]
    },
    {
      title: 'Notification Settings',
      description: 'Configure alert thresholds and notification preferences',
      icon: <Bell size={20} />,
      fields: [
        { id: 'large-transaction-alert', label: 'Large Transaction Alert Threshold (₹)', type: 'number', value: 25000 },
        { id: 'suspicious-activity', label: 'Suspicious Activity Alerts', type: 'toggle', value: true },
        { id: 'admin-notifications', label: 'Admin Email Notifications', type: 'toggle', value: true },
        { id: 'agent-notifications', label: 'Agent SMS Notifications', type: 'toggle', value: true },
      ]
    },
  ]);

  const systemStats = [
    { label: 'System Uptime', value: '99.98%' },
    { label: 'Last Deployment', value: '2025-04-10 14:30:22' },
    { label: 'Active Users Today', value: '8,452' },
    { label: 'Transaction Success Rate', value: '99.76%' },
  ];

  const handleInputChange = (sectionIndex, fieldIndex, value) => {
    const newSettings = [...settings];
    newSettings[sectionIndex].fields[fieldIndex].value = value;
    setSettings(newSettings);
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleRestartServices = () => {
    toast.info('System services restart initiated. This may take a few moments.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Platform Settings</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<RefreshCw size={18} />} onClick={handleRestartServices}>
            Restart Services
          </Button>
          <Button variant="primary" leftIcon={<Save size={18} />} onClick={handleSaveSettings}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Clock size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settings.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <div className="flex items-start mb-6">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-3">
                {section.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                <p className="text-gray-500">{section.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {section.fields.map((field, fieldIndex) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <label htmlFor={field.id} className="font-medium text-gray-700">
                    {field.label}
                  </label>

                  {field.type === 'toggle' ? (
                    <div className="flex items-center">
                      <button
                        type="button"
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          field.value ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                        onClick={() => handleInputChange(sectionIndex, fieldIndex, !field.value)}
                      >
                        <span
                          className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                            field.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <span className="ml-3 text-sm text-gray-500">
                        {field.value ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  ) : field.type === 'select' ? (
                    <select
                      id={field.id}
                      className="input-field"
                      value={field.value}
                      onChange={(e) => handleInputChange(sectionIndex, fieldIndex, e.target.value)}
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      className="input-field"
                      value={field.value}
                      onChange={(e) =>
                        handleInputChange(
                          sectionIndex,
                          fieldIndex,
                          field.type === 'number' ? Number(e.target.value) : e.target.value
                        )
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlatformSettings;
