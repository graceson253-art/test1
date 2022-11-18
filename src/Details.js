import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import { GoSearch } from "react-icons/go";
import { BiBuilding } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { AiFillFacebook ,AiFillLinkedin,AiFillTwitterCircle} from "react-icons/ai";

const Details = () => {

  const [Jobs, setJobs] = useState([]);

    const location = useLocation();
    console.log(location.state.id)
    console.log(location.state.data,"data")
    const [JobDetails, setJobDetails] = useState([]);
    useEffect(() => {
        fetch(`https://teknorix.jobsoid.com/api/v1/jobs/${location.state.id}`)
          .then((data) => data.json())
          
          .then((res) => setJobDetails(res));
      }, []);
      console.log(JobDetails)

      const sanitizedData = () => ({
        __html: DOMPurify.sanitize(JobDetails.description)
      })
    

      useEffect(() => {
        fetch("https://teknorix.jobsoid.com/api/v1/jobs")
          .then((data) => data.json())
          .then((res) => setJobs(res));
      }, []);
    
  return <div style={{margin:"40px",flexDirection:"row",display:"flex",justifyContent:"center"}}>

  <div  style={{width:"60vw"}}>
  <h1 style={{fontWeight:"bold"}}>Development Department At teknorix Systems Goa</h1>

  <h1  style={{fontWeight:"bold",fontSize:"30px",paddingTop:"10px"}}>Looking for {JobDetails.title}</h1>

  <div
      dangerouslySetInnerHTML={sanitizedData()}
    />
  </div>





<div  style={{ display:"flex",flexDirection:"column" ,alignItems:"center"}}>
  <div  style={{width:"20vw",height:"57vh",backgroundColor:"#F0F3FB",marginLeft:"7vw",display:"flex"}}>
  <div style={{marginLeft:"20px",paddingTop:"20px"}}>
  <h1 style={{fontWeight:"bold"}}>OTHER JOBS OPENINGS</h1>
  <div style={{width:"50px",height:"5px",backgroundColor:"blue",marginTop:"2px",borderRadius:"20px",display:"inline-block"}}/>


      {Jobs.slice(0,5).map((val)=>{
        return(
          <div style={{paddingBottom:"20px"}}>
          <p  style={{display:"flex",fontWeight:"bold",fontSize:"15px"}}>
          {val.title}
          
          </p>



          <div style={{ flexDirection: "row", display: "flex",paddingTop:"2px" }}>
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
                    <p style={{ fontSize: "12px", paddingLeft: "8px" }}>
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
                    <p style={{ fontSize: "12px", paddingLeft: "8px" }}>
                      {val.location.country},{val.location.state}
                    </p>
                  </div>

                 
                </div>
          
          </div>
        )
      })}

  
  </div>
  
  
  </div>



  <div>

  <p  style={{paddingTop:"24px",fontWeight:"bold"}}>SHARE JOB OPENINGS</p>
  <div style={{width:"50px",height:"5px",backgroundColor:"blue",marginTop:"2px",borderRadius:"20px",display:"inline-block"}}/>


  <div  style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
  <div style={{height:"35px",width:"35px",borderWidth:"2px",borderColor:"gray",boxSizing:"border-box",borderRadius:"35px",alignItems:"center",justifyContent:"center",display:"flex"}}>
  <AiFillFacebook size={20}/>
  </div>

  <div style={{height:"35px",width:"35px",borderWidth:"2px",borderColor:"gray",boxSizing:"border-box",borderRadius:"35px",alignItems:"center",justifyContent:"center",display:"flex"}}>
  <AiFillLinkedin size={20}/>
  </div>


  <div style={{height:"35px",width:"35px",borderWidth:"2px",borderColor:"gray",boxSizing:"border-box",borderRadius:"35px",alignItems:"center",justifyContent:"center",display:"flex"}}>
  <AiFillTwitterCircle size={20}/>
  </div>
  
  
  </div>
  
  
  
  
  </div>











  </div>
  
  </div>;
};

export default Details;
