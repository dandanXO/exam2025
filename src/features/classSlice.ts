import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Student {
  id: number;
  name: string;
  score: number;
}

interface ClassroomState {
  id: string;
  className: string;
  students: Student[];
}

const initialState: ClassroomState = {
  id: '',
  className: '',
  students: [],
};

export const classSlice = createSlice({
  name: 'classroom',
  initialState,
  reducers: {
    setClassroomData: (state, action: PayloadAction<ClassroomState>) => {
      return action.payload;
    },
    incrementScore: (state, action: PayloadAction<number>) => {
      const student = state.students.find(s => s.id === action.payload);
      if (student) student.score += 1;
    },
    decrementScore: (state, action: PayloadAction<number>) => {
      const student = state.students.find(s => s.id === action.payload);
      if (student) student.score -= 1;
    },
  },
});

export const { setClassroomData, incrementScore, decrementScore } = classSlice.actions;

export default classSlice.reducer;
