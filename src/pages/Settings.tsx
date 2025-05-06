
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");

  const handleSavePreferences = () => {
    // In a real app, this would save to a backend
    toast.success("Settings updated successfully");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications about job applications and updates
                  </p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications on your browser
                  </p>
                </div>
                <Switch 
                  id="push-notifications" 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-digest">Weekly Digest</Label>
                  <p className="text-sm text-gray-500">
                    Receive a weekly summary of job post performance
                  </p>
                </div>
                <Switch 
                  id="weekly-digest" 
                  checked={weeklyDigest} 
                  onCheckedChange={setWeeklyDigest}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="job-alerts">Job Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Get notified when job posts require attention
                  </p>
                </div>
                <Switch 
                  id="job-alerts" 
                  checked={jobAlerts} 
                  onCheckedChange={setJobAlerts}
                />
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Display Preferences</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="date-format">Date Format</Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Data Management</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Export Data</h4>
                <p className="text-sm text-gray-500 mb-2">
                  Download a copy of your job posts and application data
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Export Job Posts</Button>
                  <Button variant="outline" size="sm">Export Applications</Button>
                  <Button variant="outline" size="sm">Export All Data</Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-red-600">Danger Zone</h4>
                <p className="text-sm text-gray-500 mb-2">
                  These actions are destructive and cannot be undone
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="destructive" size="sm">Delete All Job Posts</Button>
                  <Button variant="destructive" size="sm">Delete Account</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSavePreferences}>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
