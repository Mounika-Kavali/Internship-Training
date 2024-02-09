import React, { Component } from "react";
// fetch("https://localhost:7141/api/ChildDetails/Get-Deleted-Child-Info")
class CRUDTask extends React.Component {
  state = {
    data: null,
    editingItemId: null,
    updatedAge: null,
  };

  componentDidMount() {
    // Fetch the data from the API
    fetch("https://localhost:7141/api/ChildDetails/Get-Deleted-Child-Info")
      .then((response) => response.json())
      .then((data) => this.setState({ data }))
      .catch((error) => console.error('Error fetching data:', error));
  }

  handleEditClick = (itemId, age,e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({ editingItemId: itemId, updatedAge: age });
  };

  handleBlur = () => {
    const { data, editingItemId, updatedAge } = this.state;

    // Find the edited item in the data array
    const editedItem = data.find((item) => item.id === editingItemId);

    // Perform necessary update operation (e.g., PUT request) to save the changes
    fetch(`API_URL/${editingItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...editedItem, age: updatedAge }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        // Update the item in the data array with the updated values
        const updatedData = data.map((item) =>
          item.id === editingItemId ? { ...item, age: updatedItem.age } : item
        );

        // Update the state with the updated data and clear the editing state
        this.setState({ data: updatedData, editingItemId: null, updatedAge: null });
        console.log('Data updated successfully:', updatedItem);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  render() {
    const { data, editingItemId, updatedAge } = this.state;

    if (!data) {
      return <div>Loading...</div>;
    }

    return (
      <div onClick={this.handleClickOutside}>
        {data.map((item) => (
          <div key={item.id}>
            <span>grade:</span>
            {editingItemId === item.id ? (
              <input
                type="text"
                value={updatedAge}
                onChange={(e) => this.setState({ updatedAge: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                onBlur={this.handleBlur}
                autoFocus 
              />
            ) : (
              <span onClick={() => this.handleEditClick(item.id, item.age)}>
                 {item.age}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
}
 export default CRUDTask;
