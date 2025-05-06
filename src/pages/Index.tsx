
import { useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateUserProfile } from "@/store/slices/userSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { User } from "@/types";

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<Partial<User>>(currentUser || {});
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <img
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt={currentUser.name}
                  className="h-20 w-20 rounded-full object-cover border-4 border-white shadow"
                />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">{currentUser.name}</h2>
                <p className="text-gray-600">{currentUser.position}</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-2 mt-4">
                  <Button type="submit">Save Changes</Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{currentUser.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p>{currentUser.phone || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p>{currentUser.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p>{currentUser.location}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Activity Summary</h3>
          <div className="space-y-4">
            <div className="p-4 bg-accent rounded-md">
              <h4 className="font-medium text-gray-800">Job Applications</h4>
              <p className="text-sm text-gray-600">You have reviewed 24 job applications this month.</p>
            </div>
            <div className="p-4 bg-accent rounded-md">
              <h4 className="font-medium text-gray-800">Your Job Posts</h4>
              <p className="text-sm text-gray-600">You have 5 active job posts receiving applications.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyProfile;
