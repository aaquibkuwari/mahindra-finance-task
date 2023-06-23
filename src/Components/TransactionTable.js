import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import crossicon from '../icons/cross-circle-svgrepo-com.svg';
import sorticon from '../icons/sort-svgrepo-com.svg'
import Swal from 'sweetalert2';

const TransactionTable = (props) => {
  const { searchFilter, branchFilter, typeFilter, statusFilter, filterFromDate, filterToDate, totalCount } = props

  const [transactionDataOrignal, setTransactionDataOrignal] = useState([]) //this state is to maintain the original  data
  const [transactionDataTable, setTransactionDataTable] = useState([]) //this state is to reflect the changed data in table
  // const [transactionDataTableRefresh, setTransactionDataTableRefresh] = useState([])
  const [Sorttoggle, setSortToggle] = useState(true)//true for ascending and false for descending order
  const getTransactionData = () => {

    // get the data fron json file located in public folder
    fetch('./data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (DataJson) {
        console.log(DataJson);
        setTransactionDataTable(DataJson) // set json data in state
        setTransactionDataOrignal(DataJson)
        totalCount(DataJson.length)
      });
  }



  //Search functionality
  const filterBySearch = () => {
    var updatedList = [...transactionDataOrignal];
    if (searchFilter == '') {
      setTransactionDataTable(updatedList)
    }
    updatedList = updatedList.filter((item) => {
      return item.id.toString().toLowerCase().indexOf(searchFilter.toString().toLowerCase()) !== -1;
    });
    setTransactionDataTable(updatedList);
  };

  //filter by option parameters
  const filterByParameter = () => {
    var updatedList = [...transactionDataOrignal];
    if (
      branchFilter == "All" && typeFilter == "All" && statusFilter == "All"

    ) {
      console.log("filter parameters: ", branchFilter, updatedList);

      setTransactionDataTable(updatedList)
    }

    if (branchFilter == "All" && typeFilter != "All" && statusFilter == "All") {
      updatedList = updatedList.filter((item) => {
        return (
          item.type.toLowerCase() == typeFilter.toLowerCase()
        );
      });
      setTransactionDataTable(updatedList);
    }
    if (branchFilter != "All" && typeFilter == "All" && statusFilter == "All") {
      updatedList = updatedList.filter((item) => {
        return (
          item.branch.toLowerCase() == branchFilter.toLowerCase()
        );
      });
      setTransactionDataTable(updatedList);
    }
    if (branchFilter == "All" && typeFilter == "All" && statusFilter != "All") {
      updatedList = updatedList.filter((item) => {
        return (
          item.status.toLowerCase() == statusFilter.toLowerCase()
        );
      });
      setTransactionDataTable(updatedList);
    }
    if (branchFilter != "All" && typeFilter != "All" && statusFilter == "All") {
      updatedList = updatedList.filter((item) => {
        return (
          item.branch.toLowerCase() == branchFilter.toLowerCase() &&
          item.type.toLowerCase() == typeFilter.toLowerCase()
        );
      });
      setTransactionDataTable(updatedList);
    }
    if (branchFilter != "All" && typeFilter == "All" && statusFilter != "All") {
      updatedList = updatedList.filter((item) => {
        return (
          item.branch.toLowerCase() == branchFilter.toLowerCase() &&
          item.status.toLowerCase() == statusFilter.toLowerCase()
        );
      });
      setTransactionDataTable(updatedList);
    }
    if (branchFilter == "All" && typeFilter != "All" && statusFilter != "All") {
      updatedList = updatedList.filter((item) => {
        return (
          item.type.toLowerCase() == typeFilter.toLowerCase() &&
          item.status.toLowerCase() == statusFilter.toLowerCase()
        );
      });
      setTransactionDataTable(updatedList);
    }
    if (branchFilter != "All" && typeFilter != "All" && statusFilter != "All") {
      updatedList = updatedList.filter((item) => {
        return (
          item.type.toLowerCase() == typeFilter.toLowerCase() &&
          item.branch.toLowerCase() == branchFilter.toLowerCase() &&
          item.status.toLowerCase() == statusFilter.toLowerCase()
        );
      });
      setTransactionDataTable(updatedList);
    }
  };

  //Date filter function
  const filterByDate = () => {
    var updatedList = [...transactionDataOrignal];
    const filteredData = updatedList.filter((item) => {
      const itemDate = new Date(item.transactionDate);
      const fromdate = new Date(filterFromDate)
      const todate = new Date(filterToDate)

      return itemDate >= fromdate && itemDate <= todate;
    });
    console.log("filtered data of date range", filteredData);
    setTransactionDataTable(filteredData);
  }
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(id)

      }
    })
  }
  const deleteRecord = (id) => {
    const newData = [...transactionDataTable];
    const filteredData = newData.filter(data => data.id !== id)
    setTransactionDataTable(filteredData);
    Swal.fire(
      'Deleted!',
      'Record has been deleted.',
      'success'
    )
  }
  const handleSortingDate = () => {

    console.log('sort toggle', Sorttoggle);
    const newData = [...transactionDataTable];
    if (Sorttoggle) {

      const sortedData = newData.sort((a, b) => new Date(a.transactionDate) - new Date(b.transactionDate))
      setTransactionDataTable(sortedData);
      setSortToggle(!Sorttoggle)
    } else {
      const sortedData = newData.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
      setTransactionDataTable(sortedData);
      setSortToggle(!Sorttoggle)
    }
  }
  useEffect(() => {
    getTransactionData();
  }, [])
  useEffect(() => {
    // console.log("filterdata called", searchFilter);
    filterBySearch()
  }, [searchFilter])

  useEffect(() => {
    // console.log("filterdata called", branchFilter, typeFilter);
    filterByParameter()
  }, [branchFilter, typeFilter, statusFilter])
  useEffect(() => {
    // console.log("filter date", filterFromDate, filterToDate);
    filterByDate()
  }, [filterFromDate, filterToDate])



  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            <Table striped bordered hover size='sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE <Button variant='light' onClick={() => handleSortingDate()}><img src={sorticon} alt="" style={{ width: "16px" }} /></Button></th>
                  <th>BRANCH</th>
                  <th>TYPE</th>
                  <th>AMOUNT (IN RUPEES)</th>
                  <th>BANK</th>
                  <th>REQUESTED BY (EMPLOYEE CODE)</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  transactionDataTable.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.transactionDate}</td>
                        <td>{data.branch}</td>
                        <td>{data.type}</td>
                        <td>{data.amount}</td>
                        <td>{data.bankName}</td>
                        <td>{data.requestedBy}
                          <div>
                            {data.employeeCode}
                          </div></td>
                        <td>{data.status}</td>
                        <td><Button variant='light' onClick={() => handleDelete(data.id)}><img src={crossicon} alt="" style={{ width: '25px' }} /></Button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default TransactionTable