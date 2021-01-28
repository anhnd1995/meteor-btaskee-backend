/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  InputGroup,
  InputGroupAddon,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Label,
  Col,
} from "reactstrap";

// Import mock data
import api from "../../../api/api";
import { useHistory, useLocation } from "react-router-dom";


//Import custom hook
import useViewport from '../../utils/customHooks/useViewport'
import changeDateFormat from '../../utils/changeDateFormat'

// Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown, faSearch, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {faCalendarAlt} from "@fortawesome/free-regular-svg-icons";

// Import components
import MergedCalendar from "../../components/Calendar/MergedCalendar";
import Rating from "../../components/Rating/Rating";
import useOuterClick from "../../utils/customHooks/useOuterClick";
import { Link } from "react-router-dom";
import Status from "../../components/Status/Status";

export default function Tables() {
  // State variables
  const [tableData, setTableData] = useState([]);
  const [numPage, setNumPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalUser, setTotalUser] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [fieldSorted, setFieldSorted] = useState("");
  const [sortDirection, setsortDirection] = useState("desc");
  const [searchInput, setSearchInput] = useState("");
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterSort, setFilterSort] = useState("desc")
  const [filterField, setFilterField] = useState("");


  const history = useHistory();
  //get the current location


  // Click to view bTasker info
  const handleRowClick = (row) => {
    history.push({
      pathname: `/admin/bTasker/bTasker/${row.id}`,
      bTasker: row,
    });
  }

  const calendarRef = useOuterClick(e => {
    // Close notifiction when click outside
    setToggleCalendar(false);
  });

  // custom hook viewport
  const { width } = useViewport();
  const breakpoint = 991.5;

  // Fetch data based on page number and item per page on initial render

  async function getbTaskerList() {
    const response = await Promise.all([
      api.get(
        `/bTasker-user?page=1&limit=10&sortBy=${fieldSorted}&order=${sortDirection}`
      ),
      api.get("/bTasker-user"),
    ]);

    setDataToTable(response);
    setTotalUser(response[1].data.length);
  }

  // Sort, Search and Pagination request
  async function tableFunction() {
    const response = await Promise.all([
      api.get(
        `/bTasker-user?page=${pageNumber}&limit=${itemPerPage}&sortBy=${fieldSorted}&order=${sortDirection}&search=${searchInput}`
      ),
      api.get(`/bTasker-user?search=${searchInput}`),
    ]);
    setDataToTable(response);
  }

  // Filter by Date request
  async function filterByDate(startDate, endDate) {
    const response = await api.get(`/bTasker-user`);
    let filteredData = response.data.filter((item) => {
      let createdDate = new Date(item.createAt.slice(0, 19));
      return createdDate >= startDate && createdDate <= endDate;
    });
    setTableData(filteredData);
    setNumPage(1);
  }

  // Set new data to render
  async function setDataToTable(response) {
    const itemList = await response[0].data;
    const totalItem = await response[1].data.length;
    // Calculate number of page
    let numOfPage = await Math.ceil(totalItem / itemPerPage);
    setNumPage(numOfPage);
    setTableData(itemList);
  }

  // Initial render
  useEffect(() => {
    getbTaskerList();
  }, []);

  // Render on change request
  useEffect(() => {
    tableFunction();
  }, [pageNumber, itemPerPage, fieldSorted, sortDirection, searchInput]);

  // Handle sort event
  const hadleSortEvent = (e) => {
    const fieldName = e.target.getAttribute("data-name");
    const resetActiveCol = document.querySelectorAll("thead th");
    resetActiveCol.forEach((col) => col.classList.remove("text-primary"));
    e.target.classList.add("text-primary");
    if (!isFiltered) {
      fieldName && setFieldSorted(fieldName);
      sortDirection === "asc"
        ? setsortDirection("desc")
        : setsortDirection("asc");
    } else {
      let sortTable = [];
      setFilterField(fieldName);
      if (filterSort === "asc") {
        sortTable = tableData.sort((a, b) => {
          var x = a[fieldName].toLowerCase();
          var y = b[fieldName].toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return 0;
        })
        setFilterSort("desc");
        setTableData([...sortTable]);
      }
      else {

        sortTable = tableData.sort((a, b) => {
          var x = a[fieldName].toLowerCase();
          var y = b[fieldName].toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        })
        setFilterSort("asc");
        setTableData([...sortTable]);
      }
    }
  };

  // Handle search event
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const renderPagination = (numOfPage) => {
    return [...Array(numOfPage)].map((e, index) => (
      <PaginationItem
        key={index}
        className={pageNumber === index + 1 ? "active" : ""}
      >
        <PaginationLink
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            setPageNumber(index + 1);
          }}
        >
          {index + 1} <span className="sr-only">(current)</span>
        </PaginationLink>
      </PaginationItem>
    ));
  };


  // Render created date 
  const renderCreatedDate = (date) => {
    const [getDate, getTime] = changeDateFormat(date);
    return (
      <td className="bTasker__created-date">
        <p className="font-weight-bold">{getDate}</p>
        <p className="font-weight-bold">{getTime}</p>
      </td>
    )
  }

  // Rendering data to tables
  const renderTableContent = (user) => {
    return user.map((row) => {
      if (width > breakpoint) {
        return (
          <tr className="bTasker" key={row.id} onClick={() => { handleRowClick(row) }}>
            <td className="bTasker__name">
              <div className="avatar"></div>
              <div className="name-rating">
                <p>{row.name}</p>
                <Rating rating={row.rating} />
              </div>
            </td>
            <td className="bTasker__service">{row.service}</td>
            <Status status={row.status} width={width} breakpoint={breakpoint} />
            <td className="bTasker__id">{row.id}</td>
            {renderCreatedDate(row.createAt)}
            <td className="bTasker__referal-code">{row.referalCode}</td>
            <td className="bTasker__friend-code">{row.friendCode}</td>
          </tr>
        );
      }
      else {
        return (
          <Container key={row.id} onClick={() => { handleRowClick(row) }}>
            <Row className="align-items-center text-center p-3 my-2 bTasker__user">
              <Col xs={3}><div className="avatar avatar-lg"></div></Col>
              <Col xs={8} className="text-left px-1">
                <p className="name">{row.name}</p>
                <div className="rating"><Rating rating={row.rating} /> ({row.rating}.00)</div>
                <p className="points py-1">234 points</p>
                <Status status={row.status} width={width} breakpoint={breakpoint} />
              </Col>
              <Col xs={1} className="p-0">
                <FontAwesomeIcon icon={faAngleRight} />
              </Col>
            </Row>
          </Container>
        )
      }
    });
  };

  // Toggle Calendar
  const handleToggleCalendar = (e) => {
    e.stopPropagation();
    setToggleCalendar(!toggleCalendar);
  };

  // Receive start/ end date from Calendar component
  const receiveDateFilter = (startDate, endDate) => {
    filterByDate(startDate, endDate);
    setIsFiltered(true);
  };

  // Desktop view
  const desktopTable = () => {
    return (
      <Card>
        <CardHeader className="border-0">
          {/* Change to dynamic name */}
          <Row>
            <h3 className="mb-0 col-md-5 page-title text-dark font-weight-bold">bTasker ({totalUser}) </h3>
          </Row>
          <InputGroup className="offset-md-9 col-md-3 d-flex">
            <FontAwesomeIcon icon={faSearch} className="align-middile" size="lg" />
            <Input name="search" placeholder="Search" className="form__field" onBlur={handleSearch} />
          </InputGroup>
        </CardHeader>
        <Table className="align-items-center table-flush">
          <thead className="thead-light pb-5">
            <tr>
              <th
                scope="col"
                data-name="name"
                className="fixed "
                onClick={(e) => {
                  hadleSortEvent(e);
                }}
              >
                Name
                      <i
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {((fieldSorted === "name" && sortDirection === "desc") || (filterField === "name" && filterSort === "desc")) ? <FontAwesomeIcon icon={faAngleUp} /> :
                    <FontAwesomeIcon icon={faAngleDown} />}
                </i>
              </th>
              <th
                scope="col"
                data-name="service"
                className="fixed "
                onClick={(e) => {
                  hadleSortEvent(e);
                }}
              >
                Service{" "}
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {((fieldSorted === "service" && sortDirection === "desc") || (filterField === "service" && filterSort === "desc"))
                    ? <FontAwesomeIcon icon={faAngleUp} />
                    : <FontAwesomeIcon icon={faAngleDown} />}
                </i>
              </th>
              <th
                scope="col"
                data-name="status"
                className="fixed "
                onClick={(e) => {
                  hadleSortEvent(e);
                }}
              >
                Status{" "}
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {((fieldSorted === "status" && sortDirection === "desc") || (filterField === "status" && filterSort === "desc"))
                    ? <FontAwesomeIcon icon={faAngleUp} />
                    : <FontAwesomeIcon icon={faAngleDown} />}
                </i>
              </th>
              <th
                scope="col"
                data-name="id"
                className="fixed "
                onClick={(e) => {
                  hadleSortEvent(e);
                }}
              >
                ID{" "}
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {((fieldSorted === "id" && sortDirection === "desc") || (filterField === "id" && filterSort === "desc"))
                    ? <FontAwesomeIcon icon={faAngleUp} />
                    : <FontAwesomeIcon icon={faAngleDown} />}
                </i>
              </th>
              <th
                scope="col"
                data-name="createAt"
                className="fixed "
                onClick={(e) => {
                  hadleSortEvent(e);
                  console.log(fieldSorted, sortDirection)
                }}
              >
                Created at
                      <i
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {((fieldSorted === "createAt" && sortDirection === "desc") || (filterField === "createAt" && filterSort === "desc"))
                    ? <FontAwesomeIcon icon={faAngleUp} />
                    : <FontAwesomeIcon icon={faAngleDown} />}
                </i>
                {/* <i
                  className="px-sm-0 px-md-1 ni ni-calendar-grid-58 text-gray"
                  onClick={handleToggleCalendar}
                ></i> */}
                <FontAwesomeIcon icon={faCalendarAlt} onClick={handleToggleCalendar}/>
                {toggleCalendar ? (
                  <div ref={calendarRef}>
                    <MergedCalendar receiveDateFilter={receiveDateFilter} />
                  </div>
                ) : (
                    ""
                  )}
              </th>
              <th
                scope="col"
                data-name="referalCode"
                className="fixed "
                onClick={(e) => {
                  hadleSortEvent(e);
                }}
              // style={{zIndex:0}}
              >
                Referral Code{" "}
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {((fieldSorted === "referalCode" && sortDirection === "desc") || (filterField === "referalCode" && filterSort === "desc"))
                    ? <FontAwesomeIcon icon={faAngleUp} />
                    : <FontAwesomeIcon icon={faAngleDown} />}
                </i>
              </th>
              <th
                scope="col"
                data-name="friendCode"
                className="fixed "
                onClick={(e) => {
                  hadleSortEvent(e);
                }}
              // style={{zIndex:0}}
              >
                Friend Code{" "}
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {((fieldSorted === "friendCode" && sortDirection === "desc") || (filterField === "friendCode" && filterSort === "desc"))
                    ? <FontAwesomeIcon icon={faAngleUp} />
                    : <FontAwesomeIcon icon={faAngleDown} />}
                </i>
              </th>
            </tr>
          </thead>
          <tbody>{tableData && renderTableContent(tableData)}</tbody>
        </Table>
        <CardFooter className="py-4">
          <nav aria-label="...">
            <Pagination
              className="pagination justify-content-end mb-0"
              listClassName="justify-content-end mb-0"
            >
              <PaginationItem
                className={pageNumber === 1 ? "disabled" : ""}
              >
                <PaginationLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setPageNumber(pageNumber - 1);
                  }}
                  tabIndex="-1"
                >
                  <i className="fas fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
              {numPage && renderPagination(numPage)}
              <PaginationItem
                className={pageNumber === numPage ? "disabled" : ""}
              >
                <PaginationLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setPageNumber(pageNumber + 1);
                  }}
                >
                  <i className="fas fa-angle-right" />
                  <span className="sr-only">Next</span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        </CardFooter>
      </Card>
    )
  }

  // Mobile view
  const mobileTable = () => {
    return (
      <Card className="bTasker-mobile-card">
        <CardHeader className="border-0">
          {/* Change to dynamic name */}
          <Row className="align-items-center">
            <h3 className="mb-0 col-6 page-title">bTasker ({totalUser}) </h3>
            <InputGroup className="col-6 d-flex">
              <Input name="search" placeholder="Search" className="form__field col-9 ml-0 mt-3" onBlur={handleSearch} />
              <FontAwesomeIcon icon={faSearch} className="align-middile" size="lg" />
            </InputGroup>
          </Row>
        </CardHeader>
        {tableData && renderTableContent(tableData)}
        <CardFooter className="py-4">
          <nav aria-label="...">
            <Pagination
              className="pagination justify-content-end mb-0"
              listClassName="justify-content-end mb-0"
            >
              <PaginationItem
                className={pageNumber === 1 ? "disabled" : ""}
              >
                <PaginationLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setPageNumber(pageNumber - 1);
                  }}
                  tabIndex="-1"
                >
                  <i className="fas fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
              {numPage && renderPagination(numPage)}
              <PaginationItem
                className={pageNumber === numPage ? "disabled" : ""}
              >
                <PaginationLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setPageNumber(pageNumber + 1);
                  }}
                >
                  <i className="fas fa-angle-right" />
                  <span className="sr-only">Next</span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        </CardFooter>

      </Card>
    )
  }

  return (
    <>
      {/* <Header /> */}
      {/* Page content */}
      <Container className="table-wrapper" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            {width < breakpoint ? mobileTable() : desktopTable()}
          </div>
        </Row>
      </Container>
    </>
  );
}
