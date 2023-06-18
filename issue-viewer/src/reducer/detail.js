import { Octokit } from "@octokit/rest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
  apis: [],
  currPost: null,
  setApiState: {
    loading: false,
    done: false,
    err: null,
  },
  setCurrPostState: {
    loading: false,
    done: false,
    err: null,
  },
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // setApi
    builder.addCase(setApi.pending, (state) => {
      state.setApiState.loading = true;
      state.setApiState.done = false;
      state.setApiState.err = null;
    });
    builder.addCase(setApi.fulfilled, (state, action) => {
      state.apis = action.payload;
      state.setApiState.loading = false;
      state.setApiState.done = true;
      state.setApiState.err = null;
    });
    builder.addCase(setApi.rejected, (state, action) => {
      state.setApiState.loading = false;
      state.setApiState.done = true;
      state.setApiState.err = action.payload;
    });
    // setCurrPosts
    builder.addCase(setCurrPost.pending, (state) => {
      state.setCurrPostState.loading = true;
      state.setCurrPostState.done = false;
      state.setCurrPostState.err = null;
    });
    builder.addCase(setCurrPost.fulfilled, (state, action) => {
      const flattened = state.apis.flat();
      const ans = flattened.find((api) => api.id === action.payload);
      state.currPost = ans || null;
      state.setCurrPostState.loading = false;
      state.setCurrPostState.done = true;
      state.setCurrPostState.err = null;
    });
    builder.addCase(setCurrPost.rejected, (state, action) => {
      state.setCurrPostState.loading = false;
      state.setCurrPostState.done = true;
      state.setCurrPostState.err = action.payload;
    });
    // resetCurrPosts
    builder.addCase(resetCurrPost.pending, (state) => {
      state.setCurrPostState.loading = true;
      state.setCurrPostState.done = false;
      state.setCurrPostState.err = null;
    });
    builder.addCase(resetCurrPost.fulfilled, (state, action) => {
      state.currPost = null;
      state.setCurrPostState.loading = false;
      state.setCurrPostState.done = true;
      state.setCurrPostState.err = null;
    });
    builder.addCase(resetCurrPost.rejected, (state, action) => {
      state.setCurrPostState.loading = false;
      state.setCurrPostState.done = true;
      state.setCurrPostState.err = action.payload;
    });
  },
});

export const setApi = createAsyncThunk(
  "api/setApi",
  async ({ limit, sort }) => {
    try {
      const octokit = new Octokit({});
      const pageCount = parseInt(200 / limit);
      const requests = Array.from({ length: pageCount }).map(async (_, i) => {
        const response = await octokit.request(
          "GET /repos/{owner}/{repo}/issues",
          {
            owner: "angular",
            repo: "angular-cli",
            per_page: limit,
            page: i + 1,
            sort,
          }
        );
        return response.data;
      });
      const data = await Promise.all(requests);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const setCurrPost = createAsyncThunk("api/setCurrPost", async (id) => {
  return id;
});

export const resetCurrPost = createAsyncThunk(
  "api/resetCurrPost",
  async () => {}
);
