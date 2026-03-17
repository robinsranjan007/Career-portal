import Job from "../models/Jobs.js";
import Company from "../models/Company.js";

export const createJob = async (req, res) => {
  try {
    const {
      jobPosition,
      jobDescription,
      jobSkills,
      jobExperience,
      salary,
      joblocation,
      jobstatus,
    } = req.body;
    const company = await Company.findOne({ user: req.user.id });

    if (
      !jobPosition ||
      !jobDescription ||
      !jobSkills ||
      !jobExperience ||
      !salary ||
      !joblocation ||
      !jobstatus ||
      !company
    ) {
      return res.status(400).json({
        message: "Field is missing",
        success: false,
      });
    }

    const JobCreated = await Job.create({
      jobPosition,
      jobDescription,
      jobSkills,
      jobExperience,
      salary,
      joblocation,
      jobstatus,
      company: company._id,
    });

    if (!JobCreated) {
      return res.status(404).json({
        success: false,
        message: "Job create failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Job created Successfully",
      data: JobCreated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};

export const getAllJob = async (req, res) => {
  try {
    const { search, location, experience, sort, page = 1, limit = 10 } = req.query

    // Filter object banao
    const filter = {}

    
      if (search) {
  filter.$or = [
    { jobPosition: { $regex: search, $options: 'i' } },
    { jobSkills: { $elemMatch: { $regex: search, $options: 'i' } } },  // array ke liye
  ]
}
    

    if (location) {
      filter.joblocation = { $regex: location, $options: 'i' }
    }

    if (experience) {
      filter.jobExperience = { $regex: experience, $options: 'i' }
    }

    // Sort object banao
    let sortOption = { createdAt: -1 } // default — newest first
    if (sort === 'oldest') sortOption = { createdAt: 1 }
    if (sort === 'salary_high') sortOption = { salary: -1 }
    if (sort === 'salary_low') sortOption = { salary: 1 }

    // Pagination
    const skip = (page - 1) * limit
    const total = await Job.countDocuments(filter)

    const jobs = await Job.find(filter)
      .populate("company", "companyName companyLogo companyLocation")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))

    return res.status(200).json({
      message: "jobs found successfully",
      success: true,
      data: jobs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate(
      "company",
      "companyName companyLogo companyLocation",
    );

    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "job found",
      success: true,
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { jobstatus, joblocation, salary, jobExperience, jobSkills, jobDescription, jobPosition } = req.body
    const { jobId } = req.params

    const job = await Job.findById(jobId)
    if (!job) return res.status(404).json({ success: false, message: "Job not found" })

    const company = await Company.findOne({ user: req.user.id })
    if (!company || job.company.toString() !== company._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" })
    }

    const updateData = { jobstatus, joblocation, salary, jobExperience, jobSkills, jobDescription, jobPosition }
    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true })

    if (!updatedJob) return res.status(404).json({ message: "update failed", success: false })

    return res.status(200).json({ message: "update Successfull", success: true, data: updatedJob })
  } catch (error) {
    return res.status(500).json({ message: "server Error", success: false, error: error.message })
  }
}

export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params

    const job = await Job.findById(jobId)
    if (!job) return res.status(404).json({ success: false, message: "Job not found" })

    const company = await Company.findOne({ user: req.user.id })
    if (!company || job.company.toString() !== company._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" })
    }

    await Job.findByIdAndDelete(jobId)
    return res.status(200).json({ message: "successfully deleted", success: true })
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false, error: error.message })
  }
}
export const getMyJobs = async (req, res) => {
  try {
    const company =await Company.findOne({ user: req.user.id });

    if (!company) {
      return res.status(400).json({
        message: "no company found",
        success: false,
      });
    }

    const jobs = await Job.find({ company: company._id }).populate("company","companyName companyLogo companyLocation");
    return res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
