
import { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  X,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  deleteJobPost,
  setFilters,
  setSelectedJob,
  setSort,
} from "@/store/slices/jobPostSlice";
import { setCurrentModal } from "@/store/slices/uiSlice";
import { JobPost, SortDirection } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import JobPostForm from "@/components/job-posts/JobPostForm";
import { toast } from "@/components/ui/sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Closed: "bg-red-100 text-red-800",
  Draft: "bg-gray-100 text-gray-800",
};

const ITEMS_PER_PAGE = 10;

const JobPosts = () => {
  const dispatch = useAppDispatch();
  const { items, filters, sort } = useAppSelector((state) => state.jobPosts);
  const { currentModal } = useAppSelector((state) => state.ui);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter options
  const jobTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"];
  const statusTypes = ["Active", "Closed", "Draft"];
  const departments = [...new Set(items.map((job) => job.department))];

  const handleSortChange = (column: string) => {
    const direction: SortDirection =
      sort.column === column && sort.direction === "asc" ? "desc" : "asc";
    dispatch(setSort({ column, direction }));
  };

  const handleEditJob = (id: string) => {
    const job = items.find((item) => item.id === id);
    if (job) {
      dispatch(setSelectedJob(job));
      dispatch(setCurrentModal("edit-job"));
    }
  };

  const handleOpenDeleteConfirmation = (id: string) => {
    setConfirmDeleteId(id);
  };

  const handleDeleteJob = () => {
    if (confirmDeleteId) {
      dispatch(deleteJobPost(confirmDeleteId));
      setConfirmDeleteId(null);
      toast.success("Job post deleted successfully");
    }
  };

  const handleAddNewJob = () => {
    dispatch(setSelectedJob(null));
    dispatch(setCurrentModal("add-job"));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFilters({
        ...filters,
        search: e.target.value,
      })
    );
    setCurrentPage(1); // Reset to first page on search
  };

  const handleFilterChange = (
    filterType: "status" | "type" | "department",
    value: string,
    isChecked: boolean
  ) => {
    const updatedValues = isChecked
      ? [...filters[filterType], value]
      : filters[filterType].filter((v) => v !== value);

    dispatch(
      setFilters({
        ...filters,
        [filterType]: updatedValues,
      })
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleClearFilters = () => {
    dispatch(
      setFilters({
        status: [],
        type: [],
        department: [],
        search: "",
      })
    );
    setCurrentPage(1); // Reset to first page on filter clear
  };

  // Apply filters and sorting
  const filteredJobs = items.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.department.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.location.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(job.status);
    const matchesType =
      filters.type.length === 0 || filters.type.includes(job.type);
    const matchesDepartment =
      filters.department.length === 0 ||
      filters.department.includes(job.department);

    return matchesSearch && matchesStatus && matchesType && matchesDepartment;
  });

  // Sort filtered jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const factor = sort.direction === "asc" ? 1 : -1;
    if (a[sort.column] < b[sort.column]) return -1 * factor;
    if (a[sort.column] > b[sort.column]) return 1 * factor;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = sortedJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    // Create an array for pagination display
    const pages = [];
    
    // Always show the first page
    pages.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          isActive={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Logic for showing ellipsis and middle pages
    if (totalPages > 5) {
      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      // Calculate range of page numbers to show
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    } else {
      // For small number of pages, show all
      for (let i = 2; i < totalPages; i++) {
        pages.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    // Always show the last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
  };

  const activeFiltersCount =
    (filters.status.length > 0 ? 1 : 0) +
    (filters.type.length > 0 ? 1 : 0) +
    (filters.department.length > 0 ? 1 : 0);

  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Job Posts</h2>
          <p className="text-gray-500">Manage your company's job postings</p>
        </div>
        <Button onClick={handleAddNewJob}>
          <Plus className="mr-1 h-4 w-4" /> Add New Job Post
        </Button>
      </div>

      <Card>
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search job posts..."
                className="pl-10"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-1 h-4 w-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="ml-1 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Status</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {statusTypes.map((status) => (
                          <div
                            key={status}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`status-${status}`}
                              checked={filters.status.includes(status)}
                              onCheckedChange={(checked) =>
                                handleFilterChange(
                                  "status",
                                  status,
                                  !!checked
                                )
                              }
                            />
                            <label
                              htmlFor={`status-${status}`}
                              className="text-sm"
                            >
                              {status}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Job Type</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {jobTypes.map((type) => (
                          <div
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`type-${type}`}
                              checked={filters.type.includes(type)}
                              onCheckedChange={(checked) =>
                                handleFilterChange("type", type, !!checked)
                              }
                            />
                            <label
                              htmlFor={`type-${type}`}
                              className="text-sm"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Department</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {departments.map((dept) => (
                          <div
                            key={dept}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`dept-${dept}`}
                              checked={filters.department.includes(dept)}
                              onCheckedChange={(checked) =>
                                handleFilterChange(
                                  "department",
                                  dept,
                                  !!checked
                                )
                              }
                            />
                            <label
                              htmlFor={`dept-${dept}`}
                              className="text-sm"
                            >
                              {dept}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleClearFilters}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Clear Filters
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("title")}
                  >
                    Title
                    {sort.column === "title" && (
                      <span className="ml-1">
                        {sort.direction === "asc" ? (
                          <ArrowUp className="inline h-3 w-3" />
                        ) : (
                          <ArrowDown className="inline h-3 w-3" />
                        )}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("department")}
                  >
                    Department
                    {sort.column === "department" && (
                      <span className="ml-1">
                        {sort.direction === "asc" ? (
                          <ArrowUp className="inline h-3 w-3" />
                        ) : (
                          <ArrowDown className="inline h-3 w-3" />
                        )}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("location")}
                  >
                    Location
                    {sort.column === "location" && (
                      <span className="ml-1">
                        {sort.direction === "asc" ? (
                          <ArrowUp className="inline h-3 w-3" />
                        ) : (
                          <ArrowDown className="inline h-3 w-3" />
                        )}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("postedDate")}
                  >
                    Posted Date
                    {sort.column === "postedDate" && (
                      <span className="ml-1">
                        {sort.direction === "asc" ? (
                          <ArrowUp className="inline h-3 w-3" />
                        ) : (
                          <ArrowDown className="inline h-3 w-3" />
                        )}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("status")}
                  >
                    Status
                    {sort.column === "status" && (
                      <span className="ml-1">
                        {sort.direction === "asc" ? (
                          <ArrowUp className="inline h-3 w-3" />
                        ) : (
                          <ArrowDown className="inline h-3 w-3" />
                        )}
                      </span>
                    )}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-gray-500">No job posts found</p>
                      <Button 
                        variant="link" 
                        onClick={handleClearFilters}
                        className="mt-2"
                      >
                        Clear filters
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-500">{job.type}</p>
                        </div>
                      </TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.postedDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColors[job.status as keyof typeof statusColors]
                          }
                          variant="outline"
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditJob(job.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDeleteConfirmation(job.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {renderPaginationItems()}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDeleteId !== null}
        onOpenChange={() => setConfirmDeleteId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteJob}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Post Form Modal */}
      <Dialog
        open={currentModal === "add-job" || currentModal === "edit-job"}
        onOpenChange={() => dispatch(setCurrentModal(null))}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentModal === "add-job" ? "Add New Job Post" : "Edit Job Post"}
            </DialogTitle>
          </DialogHeader>
          <JobPostForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobPosts;
