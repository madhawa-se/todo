
import { todosSlice } from "@/store/slice/todo-slice";
import { configureStore, createSlice } from "@reduxjs/toolkit";

export const makeStore = () => {
    return configureStore({
        reducer: {
            todos: todosSlice.reducer,
        }
    });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']