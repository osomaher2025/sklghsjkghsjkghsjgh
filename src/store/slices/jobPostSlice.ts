
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, JobPost, SortState } from '@/types';
import { generateMockJobPosts } from '@/utils/mockData';

interface JobPostState {
  items: JobPost[];
  selectedJob: JobPost | null;
  loading: boolean;
  error: string | null;
  filters: FilterState;
  sort: SortState;
}

const initialState: JobPostState = {
  items: generateMockJobPosts(15),
  selectedJob: null,
  loading: false,
  error: null,
  filters: {
    status: [],
    type: [],
    department: [],
    search: '',
  },
  sort: {
    column: 'postedDate',
    direction: 'desc',
  },
};

const jobPostSlice = createSlice({
  name: 'jobPosts',
  initialState,
  reducers: {
    setSelectedJob: (state, action: PayloadAction<JobPost | null>) => {
      state.selectedJob = action.payload;
    },
    addJobPost: (state, action: PayloadAction<JobPost>) => {
      state.items.unshift(action.payload);
    },
    updateJobPost: (state, action: PayloadAction<JobPost>) => {
      const index = state.items.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteJobPost: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((job) => job.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload;
    },
    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },
  },
});

export const { 
  setSelectedJob, 
  addJobPost, 
  updateJobPost, 
  deleteJobPost, 
  setFilters, 
  setSort 
} = jobPostSlice.actions;

export default jobPostSlice.reducer;
