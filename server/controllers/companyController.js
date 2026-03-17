import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  try {
    const { companyDescription, companyLocation, companyLogo, companyName } =
      req.body;
    if (
      !companyDescription ||
      !companyLocation ||
      !companyLogo ||
      !companyName
    ) {
      return res.status(400).json({
        message: "Field is missing",
        success: false,
      });
    }

    const company = await Company.create({
      companyDescription,
      companyLocation,
      companyLogo,
      companyName,
      user: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "fail to create a company",
      });
    }

    return res.status(201).json({
      success: true,
      message: "company created Successfully",
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

export const getAllCompany = async (req, res) => {
  try {
    const company = await Company.find().populate("user", "name email");

    if (company.length === 0) {
      return res.status(404).json({
        success: false,
        message: "company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "company found",
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params

    const company = await Company.findById(companyId).populate("user", "name email")

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "company not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "company found",
      data: company,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    })
  }
}
export const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params
    const { companyDescription, companyLocation, companyLogo, companyName } = req.body

    const company = await Company.findById(companyId)
    if (!company) return res.status(404).json({ success: false, message: "company not found" })

    if (company.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" })
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { companyDescription, companyLocation, companyLogo, companyName },
      { new: true }
    )

    return res.status(200).json({ message: "update Successfull", success: true, data: updatedCompany })
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error", error: error.message })
  }
}

export const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params

    const company = await Company.findById(companyId)
    if (!company) return res.status(404).json({ success: false, message: "company not found" })

    if (company.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" })
    }

    await Company.findByIdAndDelete(companyId)
    return res.status(200).json({ message: "successfully deleted", success: true })
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error", error: error.message })
  }
}

export const getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user.id })
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" })
    }
    return res.status(200).json({ success: true, data: company })
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error", error: error.message })
  }
}