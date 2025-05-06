
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";

const Security = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionNotificationsEnabled, setSessionNotificationsEnabled] = useState(true);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Password update logic would go here
    toast.success("Password updated successfully");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(
      !twoFactorEnabled
        ? "Two-factor authentication enabled"
        : "Two-factor authentication disabled"
    );
  };

  const toggleSessionNotifications = () => {
    setSessionNotificationsEnabled(!sessionNotificationsEnabled);
    toast.success(
      !sessionNotificationsEnabled
        ? "Session notifications enabled"
        : "Session notifications disabled"
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Password Management</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                  </p>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <Button type="submit">Update Password</Button>
              </div>
            </form>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Add an extra layer of security to your account
                </p>
                <p className="text-xs text-gray-500">
                  Require a verification code in addition to your password when signing in.
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={toggleTwoFactor}
              />
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Session & Login Activity</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    New login notifications
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive email notifications when your account is accessed from a new device.
                  </p>
                </div>
                <Switch
                  checked={sessionNotificationsEnabled}
                  onCheckedChange={toggleSessionNotifications}
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Login Activity</h4>
                <div className="border rounded-md divide-y">
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">San Francisco, US</p>
                      <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Current
                    </span>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">San Francisco, US</p>
                      <p className="text-xs text-gray-500">Yesterday, 2:15 PM</p>
                    </div>
                    <span className="text-xs text-gray-500">Chrome on Mac</span>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">New York, US</p>
                      <p className="text-xs text-gray-500">May 2, 2023</p>
                    </div>
                    <span className="text-xs text-gray-500">Safari on iPhone</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-3">
                  View All Login Activity
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Security;
