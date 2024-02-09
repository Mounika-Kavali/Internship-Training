import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchItems } from "./../actions/TaskActions";
import { editFormData, updateData } from "./../actions/TaskActions";
// import "./Task.css";

class Task extends Component {
  state = {
    isClicked: false,
    formData: {}, // Track form data changes
  };

  handleClick = () => {
    this.setState((prevState) => ({
      isClicked: !prevState.isClicked,
    }));
    
  };

  componentDidMount() {
    this.props.fetchItems();
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("formDataaa:", name, value);
    this.props.editFormData(name, value);
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { formData, items } = this.props;
    console.log("formData:", formData);//edited name:value is present
    console.log("items:", items);
    const updatedData = items.map((item) => {
      const updatedItem = { ...item };

      Object.keys(updatedItem).forEach((key) => {
        //console.log(key, formData[key], updatedItem[key],"key");
        if (formData.hasOwnProperty(key) && formData[key] !== undefined) {
          updatedItem[key] = formData[key];
        }

        // console.log(
        //   updatedItem[key],
        //   "=",
        //   formData[key],
        //   "task.js updatedItem",-updatedItem
        // );
      });

      return updatedItem;
    });
    console.log("Updated Data:", updatedData);
    // Dispatch an action to update the data in the store
    this.props.updateData(updatedData);
  };
  render() {
    const { loading, error, items, formData ,updatedData} = this.props;
    
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          GENERATE
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {this.state.isClicked ? (
              <div style={{backgroundColor:"pink"}}>
                {updatedData.map((item, index) => (
                  <div key={index}>
                    {Object.entries(item).map(([key, value]) =>
                      key !== "is_editable" ? (
                        item.is_editable ? (
                          <div key={key} className="record">
                            <label key={key}>{key}:</label>
                            <input
                              type="text"
                              id={key}
                              name={key}
                              value={
                                formData && formData.hasOwnProperty(key)
                                  ? formData[key]
                                  : value
                              }
                              readOnly={!item.is_editable}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        ) : (
                          <div key={key} className="record">
                            <label htmlFor={key}>{key}:</label>
                            <input
                              className="inputField"
                              type="text"
                              id={key}
                              name={key}
                              value={
                                formData && formData.hasOwnProperty(key)
                                  ? formData[key]
                                  : value
                              }
                              readOnly={item.is_editable}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        )
                      ) : null
                    )}
                  </div>
                ))}
                <button type="button" onClick={this.handleSubmit}>
                  UPDATE
                </button>
              </div>
            ) : null}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  
  return {
    loading: state.editItem.loading,
    items: state.editItem.data,
    error: state.editItem.error,
    updatedData: state.editItem.items,
    formData: state.editItem.formData, // edited key:value data is present here
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => dispatch(fetchItems()),
    editFormData: (name, value) => dispatch(editFormData(name, value)),
    updateData: (items) => dispatch(updateData(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
