import React, { Component } from "react";

class Table extends Component {
  state = {
    data: [
      { id: 1, name: "Item 1", isChecked: false },
      { id: 2, name: "Item 2", isChecked: false },
      { id: 3, name: "Item 3", isChecked: false },
    ],
    selectAll: false,
    checkedData: [],
  };

  handleSelectAll = (e) => {
    const { data } = this.state;
    const { checked } = e.target;
    const updatedData = data.map((item) => ({
      ...item,
      isChecked: true,
    }));
    this.setState({ data: updatedData, selectAll: true }, () => {
      if (true) {
        const selectedData = this.getSelectedData();
        console.log("Selected Data:", selectedData);
      }
    });
  };

  handleCheckboxChange = (id) => {
    const { data } = this.state;
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    const selectAll = updatedData.every((item) => item.isChecked);
    this.setState({ data: updatedData, selectAll });
  };

  handleSubmit = () => {
    const selectedData = this.getSelectedData();
    console.log("Checked Data:", selectedData);
  };

  getSelectedData = () => {
    const { data } = this.state;
    return data.filter((item) => item.isChecked);
  };

  render() {
    const { data, selectAll } = this.state;

    return (
      <div>
        <table style={{borderCollapse:"collapse",border:"1px solid black",margin:"10%"}}>
          <thead>
            <tr>
              <th style={{borderCollapse:"collapse",border:"1px solid black"}}>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={this.handleSelectAll}
                />
              </th>
              <th>SELECT ALL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} style={{borderCollapse:"collapse",border:"1px solid black"}}>
                <td style={{borderCollapse:"collapse",border:"1px solid black"}}>
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => this.handleCheckboxChange(item.id)}
                  />
                </td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Table;
