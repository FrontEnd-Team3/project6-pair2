import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
  todos: [],
  setTodoState: {
    loading: false,
    done: false,
    err: null,
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // setPosts
    builder.addCase(setTodo.pending, (state) => {
      state.setTodoState.loading = true;
      state.setTodoState.done = false;
      state.setTodoState.err = null;
    });
    builder.addCase(setTodo.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.setTodoState.loading = false;
      state.setTodoState.done = true;
      state.setTodoState.err = null;
    });
    builder.addCase(setTodo.rejected, (state, action) => {
      state.setTodoState.loading = false;
      state.setTodoState.done = true;
      state.setTodoState.err = action.payload;
    });
  },
});

export const setTodo = createAsyncThunk("todo/setTodo", async () => {
  try {
    const pageCount = parseInt(200 / perPage);
    const requests = Array.from({ length: pageCount }).map(async (_, i) => {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/issues",
        {
          owner: "angular",
          repo: "angular-cli",
          per_page: perPage,
          page: i + 1,
          sort: "created",
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
});

// export const addTodo = createAsyncThunk(
//   "todo/addTodo",
//   async ({ title, content }) => {
//     try {
//       const response = await axios.post("/api/todo", { title, content });
//       const newTodo = response.data;
//       console.log("newTodo : ", newTodo);
//       return newTodo;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }
// );

// export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
//   return id;
// });

// export const editTodo = createAsyncThunk(
//   "todo/editTodo",
//   async ({ id, content }) => {
//     return { id, content };
//   }
// );
