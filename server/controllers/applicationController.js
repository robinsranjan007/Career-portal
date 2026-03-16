import Application from "../models/Application.js"; 

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applied = await Application.findOne({
      user: req.user.id,
      job: jobId,
    });

    if (applied) {
      return res.status(400).json({
        message: "already applied",
        success: false,
      });
    }

    const application = await Application.create({
      user: req.user.id,
      job: jobId,
      status: "active",
    });

    return res.status(200).json({
      message: "successfully applied",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};

export const getMyApplication = async (req, res) => {
  try {
  const application = await Application.find({ user: req.user.id }).populate({
  path: "job",
  populate: {
    path: "company",
    select: "companyName companyLogo"
  }
});

    if (!application) {
      return res.status(400).json({
        message: "not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All jobs applied",
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};

export const getJobApplication = async (req, res) => {
  try {
    const { jobId } = req.params;

    const jobApplications = await Application.find({ job: jobId }).populate(
      "user",
      "name email",
    );

    if (jobApplications.length === 0) {
      return res.status(400).json({
        message: "not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All users applied to this job",
      success: true,
      data: jobApplications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { status } = req.body;
    const { applicationId } = req.params;

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status: status },
      { new: true },
    );

    if (!updatedApplication) {
      return res.status(400).json({
        message: "not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "updated successfully",
      success: true,
      data: updatedApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: "not found", success: false });
    }

    if (application.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized", success: false });
    }

    await Application.findByIdAndDelete(applicationId);

    return res.status(200).json({
      message: "deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};