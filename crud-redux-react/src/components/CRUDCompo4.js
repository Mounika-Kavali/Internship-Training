import React, { Component } from 'react';

class CRUDCompo4 extends Component {
  state = {
    data: [],
    formData: {
      id: '',
      name: '',
      email: '',
      phone: '',
    },
    editingItem: null,
  };

  componentDidMount() {
    // Fetch initial data from the API
    this.fetchData();
  }

  fetchData = () => {
    // Perform GET operation to fetch data from the API
    fetch('https://reqres.in/api/users')
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        this.setState({ data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  handleEditItem = (item) => {
    // Set the item as the editing item in the state
    this.setState({ editingItem: item });
  };

  handleSaveItem = (item) => {
    const { data } = this.state;
    console.log(data,"while saving data")
    // Find the index of the edited item in the data array
    const editedIndex = data.findIndex((dataItem) => dataItem.id === item.id);

    // Perform necessary update operation (e.g., PUT request) to save the changes
    fetch(`'https://reqres.in/api/users/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        // Update the item in the data array with the updated values
        const updatedData = [...data];
        updatedData[editedIndex] = updatedItem;

        // Update the state with the updated data and clear the editing state
        this.setState({ data: updatedData, editingItem: null });
        console.log('Data updated successfully:', updatedItem);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  handleDeleteItem = (item) => {
    const { data } = this.state;

    // Perform necessary delete operation (e.g., DELETE request) to remove the item
    fetch(`'https://reqres.in/api/users/${item.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the item from the data array
        const updatedData = data.filter((dataItem) => dataItem.id !== item.id);

        // Update the state with the updated data
        this.setState({ data: updatedData });
        console.log('Item deleted successfully:', item);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  handleAddItem = () => {
    const { formData } = this.state;

    // Perform necessary create operation (e.g., POST request) to add the new item
    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newItem) => {
        // Add the new item to the data array
        this.setState((prevState) => ({
          data: [...prevState.data, newItem],
          formData: {
            id: '',
            name: '',
            email: '',
            phone: '',
          },
        }));
        console.log('New item added successfully:', newItem);
      })
      .catch((error) => {
        console.error('Error adding new item:', error);
      });
  };

  handleChange = (e) => {
    const { formData } = this.state;

    // Update the form data state with the changed input value
    this.setState({
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const { data, formData, editingItem } = this.state;

    return (
        <>
      <div>
        <h1>CRUD 4-methods:</h1>
        <table style={{"border":"1px solid red"}}>
          <thead >
            <tr >
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {console.log(data,"data")}
            {data && data.data && data.data.map((item)  => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editingItem && editingItem.id === item.id ? (
                    <input
                      type="text"
                      name="name"
                      value={item.name}
                      onChange={(e) => this.handleChange(e, item)}
                    />
                  ) : (
                   <span>{item.first_name} {item.last_name}</span>
                  )}
                </td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  {editingItem && editingItem.id === item.id ? (
                    <button onClick={() => this.handleSaveItem(item)}>Save</button>
                  ) : (
                    <button onClick={() => this.handleEditItem(item)}>Edit</button>
                  )}
                  <button onClick={() => this.handleDeleteItem(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Add New Item</h2>
        <form onSubmit={this.handleAddItem}>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={this.handleChange}
          />
          <br />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={this.handleChange}
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={this.handleChange}
          />
          <br />
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">Add</button>
        </form>
      </div>
      </>
    );
  }
}

export default CRUDCompo4;
