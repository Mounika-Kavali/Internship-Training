import axios from "axios";

export const addStudent = (formData) => {
    return (dispatch, getState) => {
        dispatch(addStudentRequest());
        // Generate the new student ID based on the previous ids in the state
        const students = getState().studentsReducer.students;
        const nextId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    
        // Update the formData with the generated id
        const newStudentData = { ...formData, id: nextId };
        axios
        .post("http://localhost:7000/students/", newStudentData)
        .then((response) => {
          const newStudentData = response.data;
          dispatch(addStudentSuccess(newStudentData ));
          dispatch(getStudents()); // Refresh items list
        })
        .catch((error) => {
          //console.log(error,"ERROR")
          const errorMessage = error.message;
          dispatch(addStudentFailure(errorMessage));
        });
    
    }
};

export const updateStudent = (formData) => {
   
    return (dispatch) => {
      dispatch(updateStudentRequest());
      axios
        .put(`http://localhost:7000/students/${formData.id}`, formData)
        .then((response) => {
          const updatedStudent  = response.data;
         
          dispatch(updateStudentSuccess(updatedStudent ));
        })
        .catch((error) => {
          //console.log(error,"ERROR")
          const errorMessage = error.message;
          dispatch(updateStudentFailure(errorMessage));
        });
    };
  };

  export const deleteStudent = (stuID) => {
    return (dispatch) => {
      dispatch(deleteStudentRequest());
      axios
        .delete("http://localhost:7000/students/"+stuID)
        .then((response) => {
          const items = response.data;
          dispatch(deleteStudentSuccess(items));
        })
        .catch((error) => {
          //console.log(error,"ERROR")
          const errorMessage = error.message;
          dispatch(deleteStudentFailure(errorMessage));
        });
    };
  };

  export const getStudents = () => {
    return (dispatch) => {
      dispatch(getStudentRequest());
      axios
        .get("http://localhost:7000/students")
        .then((response) => {
          const items = response.data;
          dispatch(getStudentSuccess(items));
        })
        .catch((error) => {
          //console.log(error,"ERROR")
          const errorMessage = error.message;
          dispatch(getStudentFailure(errorMessage));
        });
    };
  };

// define your action creators:
export const addStudentRequest = () => {
      return {
        type: 'ADD_STUDENT_REQUEST',
      };
};
export const addStudentSuccess = (student) => {
     return {
     type: "ADD_STUDENT_SUCCESS",
     payload: student,
   };
};
export const addStudentFailure = (error) => {
      return {
        type: "ADD_STUDENT_FAILURE",
        payload: error,
      };
};
//UPDATE
export const updateStudentRequest = () => {
    return {
      type: 'UPDATE_STUDENT_REQUEST',
    };
};
export const updateStudentSuccess = (student) => {
   return {
   type: "UPDATE_STUDENT_SUCCESS",
   payload: student,
 };
};
export const updateStudentFailure = (error) => {
    return {
      type: "UPDATE_STUDENT_FAILURE",
      payload: error,
    };
};

//DELETE
export const deleteStudentRequest = () => {
    return {
      type: 'DELETE_STUDENT_REQUEST',
    };
};
export const deleteStudentSuccess = (student) => {
   return {
   type: "DELETE_STUDENT_SUCCESS",
   payload: student,
 };
};
export const deleteStudentFailure = (error) => {
    return {
      type: "DELETE_STUDENT_FAILURE",
      payload: error,
    };
};

//GET
export const getStudentRequest = () => {
    return {
      type: 'GET_STUDENTS_REQUEST',
    };
};
export const getStudentSuccess = (studentList) => {
   return {
   type: "GET_STUDENTS_SUCCESS",
   payload: studentList,
 };
};
export const getStudentFailure = (error) => {
    return {
      type: "GET_STUDENTS_FAILURE",
      payload: error,
    };
};

  

  
