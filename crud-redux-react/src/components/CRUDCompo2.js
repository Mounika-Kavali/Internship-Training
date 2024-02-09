import React, { Component } from 'react';

class CrudCompo2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      formData: {
        id: '',
        name: '',
        email: '',
        phone: '',
      },
      selectedItem: null,
    };
  }

  componentDidMount() {
    // Simulating an API call to fetch the JSON data
    setTimeout(() => {
      const jsonData = [
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
          phone: '1234567890',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'janesmith@example.com',
          phone: '9876543210',
        },
        // Rest of the JSON data objects...
      ];
      this.setState({ data: jsonData });
    }, 1000); // Delayed by 1 second to simulate an API call
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleAddItem = () => {
    const { data, formData } = this.state;
    if (formData.name.trim() !== '') {
      const newItem = { ...formData, id: Date.now() };
      this.setState((prevState) => ({
        data: [...prevState.data, newItem],
        formData: {
          id: '',
          name: '',
          email: '',
          phone: '',
        },
      }));
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
    const { data, formData, selectedItem } = this.state;

    return (
      <div>
        <h1>CRUD2</h1>

        <h2>Data List</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <strong>Name:</strong> {item.name}
              <br />
              <strong>Email:</strong> {item.email}
              <br />
              <strong>Phone:</strong> {item.phone}
              <br />
              <button onClick={() => this.handleEditItem(item)}>Edit</button>
              <button onClick={() => this.handleDeleteItem(item.id)}>
                Delete
              </button>
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
              value={formData.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="button" onClick={this.handleAddItem}>
            Add
          </button>
        </form>

        {selectedItem && (
          <div>
            <h2>Edit Item</h2>
            <form>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={selectedItem.name}
                  onChange={(e) =>
                    this.setState({
                      selectedItem: {
                        ...selectedItem,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={selectedItem.email}
                  onChange={(e) =>
                    this.setState({
                      selectedItem: {
                        ...selectedItem,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={selectedItem.phone}
                  onChange={(e) =>
                    this.setState({
                      selectedItem: {
                        ...selectedItem,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <button type="button" onClick={this.handleUpdateItem}>
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default CrudCompo2;


