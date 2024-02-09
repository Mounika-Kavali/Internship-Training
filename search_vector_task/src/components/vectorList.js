import React, { Component } from "react";
import { Input } from "reactstrap";
import "./vectorList.css";
import { getData, getSearchedData } from "./../actions/vectorListAction";
import { connect } from "react-redux";

class vectorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVector: "",
      searchContent: false,
      currentPage: 1,
      itemsPerPage: 3,
      totalDataLength: 0 ,
      totalSearchLength:0,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    this.props.getData(startIndex, itemsPerPage);
  }

handlePageChange = (page) => {
    const { searchVector } = this.state;
  
    if (searchVector.trim() !== "") {
      this.setState({ currentPage: 1 }, () => {
        this.searchItems();
      });
    } else {
      this.setState({ currentPage: page }, () => {
        this.fetchData();
      });
    }
  };
  

  // this.handleKeyPress();
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
        const { searchVector } = this.state;
        if (searchVector.trim() !== "") { // Check if searchVector is not empty
          this.setState({ searchContent: true });
          this.searchItems();
        }else {
            const { currentPage, itemsPerPage } = this.state;
            const startIndex = (currentPage - 1) * itemsPerPage;
            this.props.getData(startIndex, itemsPerPage);
          }

    }
  };


  searchItems = () => {
    
    const { searchVector, itemsPerPage,currentPage } = this.state;

    console.log(currentPage,"currentPageeee")
    const startIndex = (currentPage - 1) * itemsPerPage;
    this.props.getSearchedData(searchVector, startIndex, itemsPerPage);
  };
  
handleChange = (e) => {
    console.log(this.state.searchVector, "searchVector");
    this.setState({ searchVector: e.target.value });
  };

  render() {
    const { loading, error, data,totalDataLength,totalSearchLength, searchData } = this.props;
    const { currentPage, itemsPerPage, searchContent,searchVector } = this.state;

    // Calculate pagination values

    const startItemIndex = (currentPage - 1) * itemsPerPage;
    const endItemIndex = startItemIndex + itemsPerPage;
    // const currentItems = data.slice(startItemIndex, endItemIndex);
    // console.log(currentItems,"currentItems")
    const totalPages = searchVector ? Math.ceil(totalSearchLength / itemsPerPage) : Math.ceil(totalDataLength / itemsPerPage);
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
            {searchContent && searchData && searchData.length > 0 && (
              <ul>
                {searchData.map((item) => (
                  <li key={item.id}>
                    <div className="itemList">
                      <div className="itemDetails1">
                        <b>ID:</b>
                        {item.id}
                        <br />
                        <b>Name:</b>
                        {item.name} <br />
                        <b>Email:</b>
                        {item.email}
                        <br />
                        <b>College:</b>
                        {item.college}
                        <br />
                      </div>
                      <div className="itemDetails2">
                        <b>Father Name:</b>
                        {item.fname}
                        <br />
                        <b>Mother Name:</b>
                        {item.mname}
                        <br />
                        <b>Mobile:</b>
                        {item.ph}
                        <br />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="list">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : data && data.length > 0  ? (
              <ul>
                {data.map((item) => (
                  <li key={item.id}>
                    <div className="itemList">
                      <div className="itemDetails1">
                        <b>ID:</b>
                        {item.id}
                        <br />
                        <b>Name:</b>
                        {item.name} <br />
                        <b>Email:</b>
                        {item.email}
                        <br />
                        <b>College:</b>
                        {item.college}
                        <br />
                      </div>
                      <div className="itemDetails2">
                        <b>Father Name:</b>
                        {item.fname}
                        <br />
                        <b>Mother Name:</b>
                        {item.mname}
                        <br />
                        <b>Mobile:</b>
                        {item.ph}
                        <br />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
            {/* Render pagination */}
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
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {

  return {
    loading: state.items.loading,
    data: state.items.data,
    searchData: state.items.searchData,
    totalDataLength: state.items.totalDataLength,
    totalSearchLength:state.items.totalSearchLength,
    error: state.items.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getData: (startIndex, itemsPerPage) => {
    dispatch(getData(startIndex, itemsPerPage));
  },
  getSearchedData: (searchVector, startIndex, itemsPerPage) => {
    dispatch(getSearchedData(searchVector, startIndex, itemsPerPage));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(vectorList);
