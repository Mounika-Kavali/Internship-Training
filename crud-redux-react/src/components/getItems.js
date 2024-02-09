import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteItem } from "./../actions/deleteItemAction";
import { fetchItems } from "../actions/getItemsActions";
import { updateItem } from "./../actions/editItemAction";
import { FaTrash, FaEdit } from "react-icons/fa";

class getItems extends Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  // handleDelete = (childID) => {
  //   console.log("handleDelete()");
  //   const { items } = this.props;

  //   // Find the index of the item to be deleted
  //   const deleteIndex = items.findIndex((item) => item.childID === childID);
  //   console.log(deleteIndex);
  //   if (deleteIndex !== -1) {
  //     // Create a new array without the deleted item
  //     console.log(...items, "itemsss");

  //     // Remove the object from the array using splice
  //     const updatedItems = [items.splice(deleteIndex, 1)];
  //     console.log(updatedItems);
  //     // Update the state with the new items array
  //     this.setState({ items: updatedItems });
  //   }
  // };
  handleDelete = (childID) => {
    console.log(childID, "handleDelete()");
    this.props.deleteItem(childID);
    this.props.fetchItems();
  };
  handleEdit = (id) => {
    console.log("handleEdit()");
    const { items } = this.props;
    this.props.updateItem(id, items);
    console.log(items, "ALL ITEMS");
  };
  render() {
    const { loading, error, items } = this.props;

    return (
      <div>
        <h1>Get Items List</h1>
        {loading ? (
          <p>Loading...!</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.childID}>
                <p style={{ display: "flex" }}>
                  Name:{item.firstName} {item.lastName}- {item.type_of_child}
                  <br />
                  key:{item.childID}
                  <div style={{ margin: " 0 20px" }}>
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={() => this.handleEdit(item.childID)}
                    />
                  </div>
                  <div>
                    <FaTrash
                      style={{ cursor: "pointer" }}
                      onClick={this.handleDelete(item.childID)}
                    />
                  </div>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.items.loading,
    items: state.items.data,
    error: state.items.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => dispatch(fetchItems()),
    deleteItem: (itemId) => dispatch(deleteItem(itemId)),
    updateItem: (childID) => dispatch(updateItem(childID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(getItems);
