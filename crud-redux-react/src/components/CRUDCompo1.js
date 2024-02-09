import React, { Component } from "react";

class CRUDCompo1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // JSON data array
      newItem: "", // New item input value
      selectedItem: null, // Selected item for editing
    };
  }

  componentDidMount() {
    // Simulating an API call to fetch the JSON data
    
      const jsonData = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
      ];
      this.setState({ data: jsonData });
   
  }

  handleInputChange = (e) => {
    this.setState({ newItem: e.target.value });
  };

  handleAddItem = () => {
    const { data, newItem } = this.state;
    if (newItem.trim() !== "") {
      const newItemObj = { id: Date.now(), name: newItem };
      this.setState({ data: [...data, newItemObj], newItem: "" });
    }
  };

  handleEditItem = (item) => {
    this.setState({ selectedItem: item });
  };

  handleUpdateItem = () => {
    const { data, selectedItem } = this.state;
    const updatedData = data.map((item) =>
      item.id === selectedItem.id ? selectedItem : item
    );
    this.setState({ data: updatedData, selectedItem: null });
  };

  handleDeleteItem = (itemId) => {
    const { data } = this.state;
    const updatedData = data.filter((item) => item.id !== itemId);
    this.setState({ data: updatedData });
  };

  render() {
    const { data, newItem, selectedItem } = this.state;

    return (
      <div>
        <h1>CRUD Operations</h1>

        <h2>Data List</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => this.handleEditItem(item)}>Edit</button>
              <button onClick={() => this.handleDeleteItem(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

        <h2>Add Item</h2>
        <input type="text" value={newItem} onChange={this.handleInputChange} />
        <button onClick={this.handleAddItem}>Add</button>

        {selectedItem && (
          <div>
            <h2>Edit Item</h2>
            <input
              type="text"
              value={selectedItem.name}
              onChange={(e) =>
                this.setState({
                  selectedItem: { ...selectedItem, name: e.target.value },
                })
              }
            />
            <button onClick={this.handleUpdateItem}>Update</button>
          </div>
        )}
      </div>
    );
  }
}
export default CRUDCompo1;
