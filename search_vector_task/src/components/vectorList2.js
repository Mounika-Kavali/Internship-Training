import React, { Component } from "react";
import { Input } from "reactstrap";
import "./vectorList.css";
import { getData, getSearchedData } from "./../actions/vectorListAction2";
import { connect } from "react-redux";

class VectorList2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVector: "",
      searchContent: false,
      currentPage: 1,
      itemsPerPage: 3,
    };
  }

  componentDidMount() {
    //this.fetchData();
    this.props.getData();
  }

//   fetchData() {
//     this.props.getData();
//   }

  handlePageChange = (page) => {
    const { searchVector } = this.state;

    if (searchVector.trim() !== "") {
      this.setState({ currentPage: page }, () => {
        this.searchItems();
      });
    } else {
      this.setState({ currentPage: page }, () => {
        //this.fetchData();
        this.props.getData();
      });
    }
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const { searchVector } = this.state;
      if (searchVector.trim() !== "") {
        this.setState({searchContent:true,currentPage: 1, // Reset the currentPage to 1
         }, () => {
            this.searchItems();
          });
       
      } else {
        this.setState({ searchContent: false ,currentPage: 1,});
        //this.fetchData();
        this.props.getData();
      }
    }
  };

  searchItems = () => {
    const { searchVector } = this.state;
    this.props.getSearchedData(searchVector);
  };

  handleChange = (e) => {
    this.setState({ searchVector: e.target.value });
  };

  render() {
    const { searchContent, currentPage, itemsPerPage } = this.state;
    const { loading, data, searchData, error } = this.props;

    let displayData = searchContent ? searchData : data;
    const totalItems = displayData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = displayData.slice(startIndex, endIndex);

    return (
      <>
        <div>
          <Input
            placeholder="Search by ID, name, ph, email,..."
            className="searchBar"
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
          <hr />
          <div className="list">
            <div>
              {loading ? <p>Loading...</p> : error && <p>Error: {error}</p>}
            </div>
            {searchContent ? (
              <ul>
                <p>Matching Data</p>
                {paginatedData.map((item) => (
                  <li key={item.id}>
                    <div className="itemList">
                      <div className="itemDetails1">
                        <b>ID:</b> {item.id} <br />
                        <b>Name:</b> {item.name} <br />
                        <b>Email:</b> {item.email} <br />
                        <b>College:</b> {item.college} <br />
                      </div>
                      <div className="itemDetails2">
                        <b>Father Name:</b> {item.fname} <br />
                        <b>Mother Name:</b> {item.mname} <br />
                        <b>Mobile:</b> {item.ph} <br />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <p>General Data</p>
                {paginatedData.map((item) => (
                  <li key={item.id}>
                    <div className="itemList">
                      <div className="itemDetails1">
                        <b>ID:</b> {item.id} <br />
                        <b>Name:</b> {item.name} <br />
                        <b>Email:</b> {item.email} <br />
                        <b>College:</b> {item.college} <br />
                      </div>
                      <div className="itemDetails2">
                        <b>Father Name:</b> {item.fname} <br />
                        <b>Mother Name:</b> {item.mname} <br />
                        <b>Mobile:</b> {item.ph} <br />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => this.handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.vec.loading,
  data: state.vec.data,
  searchData: state.vec.searchData,
  error: state.vec.error,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => {
    dispatch(getData());
  },
  getSearchedData: (searchString) => {
    dispatch(getSearchedData(searchString));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VectorList2);
