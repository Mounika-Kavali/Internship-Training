const initialState = {
    students: [], // Initialize with an empty array of students
  };
  
  const studentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_STUDENT_SUCCESS':
        return {
          ...state,
          students: [...state.students, action.payload],
        };
        case 'UPDATE_STUDENT_SUCCESS':
            const editedStudents = state.students.map((student) =>
              student.id === action.payload.id ? action.payload : student
            );
            return {
              ...state,
              students: editedStudents,
            };
        case 'DELETE_STUDENT_SUCCESS':
            // Filter out the deleted student from the students array
            const updatedStudents = state.students.filter((student) => student.id !== action.payload.id);
            return {
              ...state,
              students: updatedStudents,
            };

        case 'GET_STUDENTS_SUCCESS':
        return {
          ...state,
          students:action.payload ,
        };
      default:
        return state;
    }
  };
  
  export default studentsReducer;
  