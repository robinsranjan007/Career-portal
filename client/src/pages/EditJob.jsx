import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function EditJob() {


const {jobId} = useParams()
const [job, setJobs] = useState({
 
  jobPosition: "",
  jobDescription: "",
  jobSkills: "",
  jobExperience: "",
  salary: "",
  joblocation: "",
  jobstatus: ""
});


useEffect(()=>{

const getJobDetails=async()=>{

try {
  
} catch (error) {
  
}

}


},[])


  return (
    <div>EditJob

      <form >
        <div>
 

  <div>
    <label>Job Position</label>
    <input type="text" />
  </div>

  <div>
    <label>Job Description</label>
    <input type="text" />
  </div>

  <div>
    <label>Job Skills</label>
    <input type="text" />
  </div>

  <div>
    <label>Job Experience</label>
    <input type="text" />
  </div>

  <div>
    <label>Salary</label>
    <input type="text" />
  </div>

  <div>
    <label>Job Location</label>
    <input type="text" />
  </div>

  <div>
    <label>Job Status</label>
    <input type="text" />
  </div>
</div>
      </form>
    </div>
  )
}

export default EditJob