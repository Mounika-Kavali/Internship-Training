import React, { Component } from 'react'
import { connect } from 'react-redux';
import {deleteStudent,getStudents,addStudent,updateStudent} from '../actions/CRUDwithJSON-Actions'

export class CRUDwithJSON extends Component {
    constructor(props) {
        super(props);
        this.state = {
          studentForm: false,
          isEdit: false,
          formData: {
            id: '', // Let the server generate the ID automatically
            name: '',
            age: '',
            roll: '',
            email: '',
            address: {
              city: '',
              pincode: '',
            },
          }
        };
      }
      handleChange = (event) => {
        const { name, value } = event.target;
       
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            [name]: value,
          },
        }));
      
      }

    handleAdd=()=>{
        this.setState({ studentForm: true,isEdit: false });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ studentForm: false ,isEdit: false});
        this.props.addStudent(this.state.formData);
         // Clear the form after submitting
    this.setState({
        formData: {
          id: '', 
          name: '',
          age: '',
          roll: '',
          email: '',
          address: {
            city: '',
            pincode: '',
          },
        },
    });
    };

    handleEdit=(editStudent)=>{
        this.setState({ studentForm: true,isEdit: true,formData: editStudent });
        
    }
    handleUpdate=()=>{
       
        this.props.updateStudent(this.state.formData);
        this.setState({ studentForm: false,isEdit: false });
    }
    handleDelete = (studentId) => {
       
        this.props.deleteStudent(studentId);
        this.props.getStudents();
    };
    componentDidMount=()=>{
        this.props.getStudents();
    }
      render() {
        const { students } = this.props;
        const { formData } = this.state;
        
        return (
          <div>
            <h1>Students List</h1>
            <button onClick={this.handleAdd}>Add Student</button>
       
            <table style={{ borderCollapse: 'collapse',margin:"20px" }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid blue' }}>NAME</th>
              <th style={{ border: '1px solid blue' }}>AGE</th>
              <th style={{ border: '1px solid blue' }}>ADDRESS</th>
              <th style={{ border: '1px solid blue' }}>EMAIL</th>
              <th style={{ border: '1px solid blue' }}>PINCODE</th>
              <th style={{ border: '1px solid blue' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td  style={{ border: '1px solid black' }} >{student.name}</td>
                <td  style={{ border: '1px solid black' }}>{student.age}</td>
                <td  style={{ border: '1px solid black' }}>{student.address.city}</td>
                <td  style={{ border: '1px solid black' }}>{student.email}</td>
                <td  style={{ border: '1px solid black' }}>{student.address.pincode}</td>
                <td style={{ border: '1px solid black' }}>
                  <button onClick={() => this.handleDelete(student.id)}>Delete</button>&nbsp;
                  <button onClick={() => this.handleEdit(student)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.studentForm &&
        <div>
           <form onSubmit={this.handleSubmit} >
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={this.handleChange} /><br/><br/>
          </label>
          <label>
            Age:
            <input type="text" name="age" value={formData.age} onChange={this.handleChange} /><br/><br/>
          </label>
          <label>
            Roll:
            <input type="text" name="roll" value={formData.roll} onChange={this.handleChange} /><br/><br/>
          </label>
          <label>
            Email:
            <input type="text" name="email" value={formData.email} onChange={this.handleChange} /><br/><br/>
          </label>
          <label>
            City:
            <input type="text" name="address.city" value={formData.address.city} onChange={this.handleChange} /><br/><br/>
          </label>
          <label>
            Pincode:
            <input
              type="text"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={this.handleChange}
            />
          </label>
          <br/><br/>
          {this.state.isEdit?
           <button onClick={this.handleUpdate}>UPDATE</button>
          :
          <button type="submit">SAVE</button>}
        </form>   
        </div>}
       
        </div>
        );
      }
}

const mapStateToProps = (state) => ({
    students: state.studentsReducer.students,
  });
  
  const mapDispatchToProps = {
    deleteStudent,
    getStudents,
    addStudent,
    updateStudent,
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(CRUDwithJSON);
