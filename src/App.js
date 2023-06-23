
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './App.css';
import TransactionTable from './Components/TransactionTable';
import { useEffect, useState } from 'react';

function App() {
  //States
  const [searchTermInput, setSearchTermInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [BranchSelect, setBranchSelect] = useState('All');
  const [BranchOptions, setBranchOptions] = useState([
    { value: "All", title: "All" },
    { value: "Thane", title: "Thane" },
    { value: "Navi Mumbai", title: "Navi Mumbai" },
    { value: "Mumbai", title: "Mumbai" },
  ])

  const [AccTypeSelect, setAccTypeSelect] = useState('All');
  const [accTypeOptions, setAccTypeOptions] = useState([
    { value: "All", title: "All" },
    { value: "Full", title: "Full" },
    { value: "Short", title: "Short" }
  ])
  const [StatusSelect, setStatusSelect] = useState('All');
  const [StatusOptions, setStatusOptions] = useState([
    { value: "All", title: "All" },
    { value: "Pending", title: "Pending" },
    { value: "Approved", title: "Approved" },
    { value: "Rejected", title: "Rejected" }
  ])
  const [TotalDataCount, setTotalDataCount] = useState(0);

  //Handle functions
  const handleSelectbranch = (e) => {
    console.log("branch select", e.target.value);
    setBranchSelect(e.target.value)
  }
  const handleSelectType = (e) => {
    console.log("Type select", e.target.value);
    setAccTypeSelect(e.target.value)
  }
  const handleSelectStatus = (e) => {
    console.log("status select", e.target.value);
    setStatusSelect(e.target.value)
  }
  const handleFromDate = (e) => {
    console.log("from date", e.target.value);
    setFromDate(e.target.value)
  }
  const handleToDate = (e) => {
    console.log("from date", e.target.value);
    setToDate(e.target.value)
  }

  //useEffect 
  useEffect(() => {
    //debounce fucntion to delay search 
    const searchDelay = setTimeout(() => {
      setSearchTerm(searchTermInput)
    }, 1000)
    return () => clearTimeout(searchDelay)//clear timing function on component unmount
  }, [searchTermInput])

  return (
    <div className="App">
      <Container className='pt-3'>
        <Row>
          <Col>
            <div>
              Total ({TotalDataCount})
            </div>
          </Col>
        </Row>
        <Row className='py-3'>
          <Col md={10}>
            <div className='d-flex gap-2'>

              <Form.Group >
                <Form.Label>From</Form.Label>
                <Form.Control type="date" name="fromDate" id="fromDate" value={FromDate} onChange={(e) => handleFromDate(e)} />
              </Form.Group>
              <Form.Group >
                <Form.Label>To</Form.Label>
                <Form.Control type="date" name="toDate" id="todate" value={ToDate} onChange={(e) => handleToDate(e)} min={FromDate} />
              </Form.Group>
              <Form.Group >
                <Form.Label>Branch</Form.Label>

                <Form.Select value={BranchSelect} onChange={handleSelectbranch}>
                  {
                    BranchOptions.map((branch, index) => {
                      return (
                        <option key={index} value={branch.value}>{branch.title}</option>
                      )
                    })
                  }
                </Form.Select>
              </Form.Group>
              <Form.Group >
                <Form.Label>Type</Form.Label>
                <Form.Select value={AccTypeSelect} onChange={handleSelectType}>
                  {
                    accTypeOptions.map((acctype, index) => {
                      return (
                        <option key={index} value={acctype.value}>{acctype.title}</option>
                      )
                    })
                  }
                </Form.Select>
              </Form.Group>
              <Form.Group >
                <Form.Label>Status</Form.Label>

                <Form.Select value={StatusSelect} onChange={handleSelectStatus}>
                  {
                    StatusOptions.map((status, index) => {
                      return (
                        <option key={index} value={status.value}>{status.title}</option>
                      )
                    })
                  }
                </Form.Select>
              </Form.Group>
            </div>



          </Col>
          <Col md={2}>
            <div>

              <Form.Control
                type="search"
                placeholder="Search Id"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearchTermInput(e.target.value)}
              />


            </div>
          </Col>
        </Row>
      </Container>
      <TransactionTable searchFilter={searchTerm} branchFilter={BranchSelect} typeFilter={AccTypeSelect} statusFilter={StatusSelect} filterFromDate={FromDate} filterToDate={ToDate} totalCount={setTotalDataCount}></TransactionTable>
    </div>
  );
}

export default App;
