"use client";
import React, { useState } from 'react';
import {
  ChevronRight,
  Settings as SettingsIcon,
  Link,
  Globe,
  Rocket,
  CreditCard,
  Users
} from 'lucide-react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('general');

  const settingsSections = [
    {
      id: 'general',
      icon: <SettingsIcon className="w-5 h-5" />,
      title: 'General Settings',
      description: 'Manage your account preferences'
    },
    {
      id: 'domains',
      icon: <Globe className="w-5 h-5" />,
      title: 'Domains',
      description: 'Custom domains for your links'
    },
    {
      id: 'links',
      icon: <Link className="w-5 h-5" />,
      title: 'Links',
      description: 'Manage and track your shortened links'
    },
    {
      id: 'upgrade',
      icon: <Rocket className="w-5 h-5" />,
      title: 'Upgrade',
      description: 'Unlock pro features'
    },
    {
      id: 'billing',
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Billing',
      description: 'Manage your subscription'
    },
    {
      id: 'team',
      icon: <Users className="w-5 h-5" />,
      title: 'Team',
      description: 'Invite and manage team members'
    }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'general':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-medium mb-2">Profile Information</h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">Update your personal details</p>
                  <button className="text-blue-500 hover:underline">
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-medium mb-2">Preferences</h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">Customize your experience</p>
                  <button className="text-blue-500 hover:underline">
                    Manage Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'domains':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Domains</h2>
            <div className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Custom Domains</h3>
                <button className="text-blue-500 hover:underline">
                  Add Domain
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>dub.sh</span>
                  <span className="text-green-500">Verified</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>yourdomain.com</span>
                  <span className="text-yellow-500">Pending</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-6">Select a section</div>;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r p-6">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>
        <div className="space-y-2">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition ${
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <div className="flex items-center space-x-3">
                {section.icon}
                <div className="text-left">
                  <p className="font-medium">{section.title}</p>
                  <p className="text-xs text-gray-500">{section.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsPage;