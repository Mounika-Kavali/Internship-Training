import React, { Component } from "react";

class CRUDCompo3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editingItem: null,
      formData: {
        id: "",
        name: "",
        email: "",
        phone: "",
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/students") // Replace with your API URL
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({ data: jsonData });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  handleEditItem = (item) => {
    this.setState({ editingItem: item });
  };

  handleSaveItem = (item) => {
    const { data } = this.state;

    // Find the index of the edited item in the data array
    const editedIndex = data.findIndex((dataItem) => dataItem.id === item.id);

    // Update the item in the data array with the edited values
    const updatedData = [...data];
    updatedData[editedIndex] = item;

    // Perform necessary update operation (e.g., API call) to save the changes
    console.log("Updated item:", item);
    // Example: Update the item in the JSON data in the backend using an API call

    // Update the state with the updated data and clear the editing state
    this.setState({ data: updatedData, editingItem: null },() => {
        // Display the updated data after saving
        console.log('Updated data:', updatedData);
    });
  };
  handleAddItem = () => {
    const { formData, data } = this.state;

    // Create a new item with the form data
    const newItem = {
      id: Date.now(), // Generate a unique ID (can be replaced with your logic)
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    // Perform necessary create operation (e.g., API call) to add the new item
    console.log("New item:", newItem);
    // Example: Add the new item to the JSON data in the backend using an API call

    // Update the state by adding the new item to the data array
    this.setState((prevState) => ({
      data: [...prevState.data, newItem],
      formData: {
        id: "",
        name: "",
        email: "",
        phone: "",
      },
    }));
  };

  handleDeleteItem = (item) => {
    // Perform necessary delete operation for the item
    console.log("Deleted item:", item);
    // Example: Delete the item from the JSON data in the backend using an API call

    // Update the state by removing the deleted item from the data array
    this.setState((prevState) => ({
      data: prevState.data.filter((dataItem) => dataItem.id !== item.id),
    }));
  };

  render() {
    const { data, editingItem } = this.state;

    return (
      <div>
        <h1>CRUD 3</h1>

        <h2>Data List-INLINE EDITING</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {editingItem && editingItem.id === item.id ? (
                <div>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) =>
                      this.setState({
                        editingItem: {
                          ...editingItem,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                  <button onClick={() => this.handleSaveItem(editingItem)}>
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <strong>Name:</strong> {item.name}
                  <button onClick={() => this.handleEditItem(item)}>
                    Edit
                  </button>
                  <button onClick={() => this.handleDeleteItem(item)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <h2>Add Item</h2>
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.formData.name}
              onChange={(e) =>
                this.setState({
                  formData: {
                    ...this.state.formData,
                    name: e.target.value,
                  },
                })
              }
            />
          </div>
          <button type="button" onClick={this.handleAddItem}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default CRUDCompo3;
