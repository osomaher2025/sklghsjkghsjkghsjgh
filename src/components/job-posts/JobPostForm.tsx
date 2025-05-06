
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelector";
import { addJobPost, updateJobPost } from "@/store/slices/jobPostSlice";
import { setCurrentModal } from "@/store/slices/uiSlice";
import { JobPost } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JobPostForm = () => {
  const dispatch = useAppDispatch();
  const { selectedJob } = useAppSelector((state) => state.jobPosts);
  const isEditing = !!selectedJob;
  
  const [formData, setFormData] = useState<Partial<JobPost>>({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    experience: "",
    closingDate: "",
    status: "Active",
  });

  useEffect(() => {
    if (selectedJob) {
      setFormData(selectedJob);
    }
  }, [selectedJob]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split("T")[0];
    
    if (isEditing && selectedJob) {
      dispatch(
        updateJobPost({
          ...selectedJob,
          ...formData,
        })
      );
      toast.success("Job post updated successfully");
    } else {
      const newJobPost: JobPost = {
        id: uuidv4(),
        title: formData.title || "",
        department: formData.department || "",
        location: formData.location || "",
        type: formData.type as JobPost["type"] || "Full-time",
        experience: formData.experience || "",
        postedDate: today,
        closingDate: formData.closingDate || "",
        status: formData.status as JobPost["status"] || "Active",
        applicants: 0,
      };
      
      dispatch(addJobPost(newJobPost));
      toast.success("New job post created successfully");
    }
    
    dispatch(setCurrentModal(null));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            name="department"
            value={formData.department || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ""}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Job Type</Label>
          <Select
            value={formData.type || "Full-time"}
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Temporary">Temporary</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="experience">Experience Level</Label>
          <Input
            id="experience"
            name="experience"
            value={formData.experience || ""}
            onChange={handleInputChange}
            placeholder="e.g., 3+ years, Senior level"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="closingDate">Closing Date</Label>
          <Input
            id="closingDate"
            name="closingDate"
            type="date"
            value={formData.closingDate || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status || "Active"}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Enter job description..."
          className="resize-none"
        />
      </div>
      
      <div className="flex justify-end gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => dispatch(setCurrentModal(null))}
        >
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Job Post" : "Create Job Post"}
        </Button>
      </div>
    </form>
  );
};

export default JobPostForm;
