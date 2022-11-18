import logo from "./logo.svg";

import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { BiBuilding } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";

function Jobs() {
  const [SerachField, setSerachField] = useState("");
  const [Jobs, setJobs] = useState([]);
  const [FilteredData, setFilteredData] = useState(Jobs);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://teknorix.jobsoid.com/api/v1/jobs")
      .then((data) => data.json())
      .then((res) => setJobs(res));
  }, []);

  console.log(Jobs, "Jobs");

  useEffect(() => {
    const filteredData = Jobs.filter((val) => {
      return val.title.toLocaleLowerCase().includes(SerachField);
    });

    setFilteredData(filteredData);
  }, [Jobs, SerachField]);

  const onSearchChange = (event) => {
    const SearchFieldText = event.target.value.toLocaleLowerCase();
    setSerachField(SearchFieldText);
  };

  let uniqueDepartment = [...new Set(Jobs.map((val) => val.department.title))];

  let uniquelocation = [...new Set(Jobs.map((val) => val.location.country))];

  let uniquefunction = [...new Set(Jobs.map((val) => val.function.title))];

  return (
    <div>
      <div
        style={{ margin: "4vw", backgroundColor: "#F0F0F0", padding: "20px" }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="text"
            class="form-control"
            onChange={onSearchChange}
            placeholder="Search for jobs"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div style={{ position: "relative" }}>
            <GoSearch
              style={{
                height: "20px",
                width: "20px",
                color: "green",
                position: "absolute",
                right: "15px",
                top: "9px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            padding: "20px",
          }}
        >
          <div class="dropdown">
            <button
              style={{ borderColor: "lightgray", borderWidth: "1px" }}
              class="btn  dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Department
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {uniqueDepartment.map((val) => {
                return (
                  <a class="dropdown-item" href="#">
                    {val}
                  </a>
                );
              })}
            </div>
          </div>

          <div class="dropdown">
            <button
              style={{ borderColor: "lightgray", borderWidth: "1px" }}
              class="btn  dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              placeholder="jhkjhjkhjkh"
            >
              Location
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {uniquelocation.map((val) => {
                return (
                  <a class="dropdown-item" href="#">
                    {val}
                  </a>
                );
              })}
            </div>
          </div>

          <div class="dropdown">
            <button
              style={{ borderColor: "lightgray", borderWidth: "1px" }}
              class="btn  dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              placeholder="jhkjhjkhjkh"
            >
              Function
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {uniquefunction.map((val) => {
                return (
                  <a class="dropdown-item" href="#">
                    {val}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          paddingLeft: "60px",
          paddingRight: "60px",
          flexDirection: "column",
        }}
      >
        {FilteredData.map((val) => {

          return (
            <div key={val.id}
              style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    textAlign: "left",
                    padding: "5px",
                    fontWeight: "bold",
                    fontSize: "22px",
                  }}
                >
                  {val.title}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingLeft: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BiBuilding />
                    <p style={{ fontSize: "17px", paddingLeft: "8px" }}>
                      {val.function.title}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingLeft: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GrLocation />
                    <p style={{ fontSize: "17px", paddingLeft: "8px" }}>
                      {val.location.country},{val.location.state}
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: "lightblue",
                      marginLeft: "10px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <p style={{ fontSize: "13px", fontWeight: "bold" }}>
                      {" "}
                      {val.type}
                    </p>
                  </div>
                </div>

                <div style={{ flexDirection: "row", display: "flex" }}>
                

                  <a href={`https://demo.jobsoid.com/JobDetails/${val.id}`} target="_blank"  style={{ marginRight: "30px" }} class="btn btn-outline-primary" role="button" aria-disabled="true">Apply</a>

                  <button type="button" class="btn btn-light"  onClick={() => navigate('/details',{state:{id:val.id}})}>
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Jobs;
