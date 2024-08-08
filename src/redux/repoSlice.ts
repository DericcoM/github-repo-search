import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Repo {
  id: number;
  name: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  description: string;
  license: {
    name: string;
  } | null;
}

interface RepoState {
  repos: Repo[];
  selectedRepo: Repo | null;
  sortField: keyof Repo | null;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
}

const initialState: RepoState = {
  repos: [],
  selectedRepo: null,
  sortField: null,
  sortOrder: 'asc',
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
};

export const fetchRepos = createAsyncThunk(
  'repos/fetchRepos',
  async (query: string) => {
    const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
    return response.data.items as Repo[];
  }
);

const repoSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setSelectedRepo(state, action: PayloadAction<Repo>) {
      state.selectedRepo = action.payload;
    },
    setSortField(state, action: PayloadAction<keyof Repo>) {
      if (state.sortField === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = action.payload;
        state.sortOrder = 'asc';
      }
      state.currentPage = 1; // Сброс на первую страницу при изменении сортировки
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.currentPage = 1; // Сброс на первую страницу при изменении размера страницы
    },
    sortAndPaginateRepos(state) {
      if (state.sortField) {
        state.repos.sort((a, b) => {
          const fieldA = a[state.sortField!];
          const fieldB = b[state.sortField!];

          if (typeof fieldA === 'number' && typeof fieldB === 'number') {
            return state.sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
          } else if (typeof fieldA === 'string' && typeof fieldB === 'string') {
            return state.sortOrder === 'asc'
              ? fieldA.localeCompare(fieldB)
              : fieldB.localeCompare(fieldA);
          } else {
            return 0;
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch repositories';
      });
  },
});

export const { setSelectedRepo, setSortField, setCurrentPage, setPageSize, sortAndPaginateRepos } = repoSlice.actions;

export default repoSlice.reducer;
