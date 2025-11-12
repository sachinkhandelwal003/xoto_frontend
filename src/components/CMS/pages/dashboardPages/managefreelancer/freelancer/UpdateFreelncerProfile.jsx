// components/freelancer/UpdateFreelancerProfile.jsx
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { showToast } from "../../../../../../manageApi/utils/toast";
import {
  FiEdit2,
  FiSave,
  FiUpload,
  FiTrash2,
  FiPlus,
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiFileText,
  FiGlobe,
  FiCheck,
} from "react-icons/fi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

const UpdateFreelancerProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [freelancer, setFreelancer] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // ✅ Dummy freelancer data
  const dummyFreelancer = {
    _id: "1",
    email: "alex.johnson@example.com",
    name: {
      first_name: "Alex",
      last_name: "Johnson",
    },
    mobile: "+1 (555) 123-4567",
    profile_image: "",
    is_mobile_verified: true,

    professional: {
      experience_years: 8,
      bio: "Experienced landscape designer with 8+ years in residential and commercial projects. Specialized in sustainable designs and modern tropical themes.",
      skills: [
        "Landscape Design",
        "Irrigation Systems",
        "Plant Selection",
        "Project Management",
        "3D Visualization",
      ],
      working_radius: "50km",
      availability: "Full-time",
    },

    location: {
      city: "Dubai",
      state: "Dubai",
      country: "UAE",
      pincode: "12345",
    },

    languages: ["English", "Arabic", "Hindi"],

    services_offered: [
      {
        _id: "s1",
        category: "6909a3b797c3a7739b4e3e86",
        subcategory: "6909b9146b8aa6018b482101",
        description:
          "Complete garden design and installation with sustainable practices",
        price_range: "$5,000 - $50,000",
        unit: "per project",
        images: [],
        is_active: true,
      },
      {
        _id: "s2",
        category: "6909a3b797c3a7739b4e3e87",
        subcategory: "6909b9146b8aa6018b482102",
        description: "Professional irrigation system design and installation",
        price_range: "$2,000 - $15,000",
        unit: "per system",
        images: [],
        is_active: true,
      },
    ],

    portfolio: [
      {
        _id: "p1",
        title: "Luxury Villa Garden Makeover",
        category: "6909a3b797c3a7739b4e3e86",
        subcategory: "6909b9146b8aa6018b482101",
        description:
          "Complete transformation of a 2000 sqm villa garden with water features and exotic plants",
        images: [],
        area: "2000 sqm",
        duration: "3 months",
        client_name: "Mr. Al Rashid",
        completed_at: "2024-06-15",
        featured: true,
      },
    ],

    gallery: [
      "https://example.com/gallery/image1.jpg",
      "https://example.com/gallery/image2.jpg",
    ],

    payment: {
      preferred_method: "Bank Transfer",
      advance_percentage: 30,
      gst_number: "GST123456789",
    },

    documents: [
      {
        type: "resume",
        path: "/documents/resume.pdf",
        verified: true,
        uploaded_at: "2024-01-15",
      },
      {
        type: "identityProof",
        path: "/documents/id.pdf",
        verified: true,
        uploaded_at: "2024-01-15",
      },
      {
        type: "addressProof",
        path: "/documents/address.pdf",
        verified: false,
        uploaded_at: "2024-01-20",
      },
    ],

    status_info: {
      status: 1,
      approved_at: "2024-01-10",
      approved_by: "Admin User",
    },

    meta: {
      agreed_to_terms: true,
      portal_access: true,
      created_at: "2024-01-01",
      updated_at: "2024-11-01",
    },
  };

  // ✅ Dummy categories data
  const dummyCategories = [
    { _id: "6909a3b797c3a7739b4e3e86", name: "Landscape Design" },
    { _id: "6909a3b797c3a7739b4e3e87", name: "Irrigation Systems" },
    { _id: "6909a3b797c3a7739b4e3e88", name: "Garden Maintenance" },
  ];

  const dummySubcategories = [
    {
      _id: "6909b9146b8aa6018b482101",
      name: "Residential Gardens",
      category: "6909a3b797c3a7739b4e3e86",
    },
    {
      _id: "6909b9146b8aa6018b482102",
      name: "Commercial Landscaping",
      category: "6909a3b797c3a7739b4e3e86",
    },
    {
      _id: "6909b9146b8aa6018b482103",
      name: "Drip Irrigation",
      category: "6909a3b797c3a7739b4e3e87",
    },
    {
      _id: "6909b9146b8aa6018b482104",
      name: "Sprinkler Systems",
      category: "6909a3b797c3a7739b4e3e87",
    },
  ];

  useEffect(() => {
    // Simulate API call delay
    setLoading(true);
    setTimeout(() => {
      setFreelancer(dummyFreelancer);
      setFormData(dummyFreelancer);
      setCategories(dummyCategories);
      setSubcategories(dummySubcategories);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleEdit = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleDirectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...(formData[section] || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const addArrayItem = (section, template = {}) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), template],
    }));
  };

  const removeArrayItem = (section, index) => {
    const updated = [...(formData[section] || [])];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const handleSkillsChange = (skillsString) => {
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    setFormData((prev) => ({
      ...prev,
      professional: { ...prev.professional, skills: skillsArray },
    }));
  };

  const handleLanguagesChange = (languagesString) => {
    const languagesArray = languagesString
      .split(",")
      .map((lang) => lang.trim())
      .filter((lang) => lang);
    setFormData((prev) => ({ ...prev, languages: languagesArray }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulate file upload
    showToast(`File ${file.name} selected for upload`, "info");

    setFormData((prev) => ({
      ...prev,
      _tempFiles: {
        ...prev._tempFiles,
        [type]: { file, preview: URL.createObjectURL(file) },
      },
    }));
  };

  const saveSection = async (section) => {
    // Simulate API call
    showToast(`${section.replace(/_/g, " ")} updated successfully!`, "success");
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <Avatar
                sx={{ width: 100, height: 100 }}
                className="border-4 border-white shadow-lg"
              >
                <FiUser size={40} />
              </Avatar>
              <div className="flex-1">
                <Typography variant="h4" className="font-bold text-gray-900">
                  {formData.name?.first_name} {formData.name?.last_name}
                </Typography>
                <Typography variant="h6" className="text-gray-600 mb-2">
                  Professional Landscape Designer
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <Chip
                    label={`${formData.professional?.experience_years || 0} years experience`}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={
                      formData.professional?.availability || "Not specified"
                    }
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={
                      formData.status_info?.status === 1
                        ? "Verified"
                        : "Pending"
                    }
                    color={
                      formData.status_info?.status === 1 ? "success" : "warning"
                    }
                    size="small"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader
            title={
              <div className="flex items-center">
                <FiUser className="mr-2" />
                Basic Information
              </div>
            }
            action={
              <Button
                onClick={() =>
                  editMode.basic ? saveSection("basic") : toggleEdit("basic")
                }
                startIcon={editMode.basic ? <FiSave /> : <FiEdit2 />}
                variant={editMode.basic ? "contained" : "outlined"}
                size="small"
              >
                {editMode.basic ? "Save" : "Edit"}
              </Button>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.name?.first_name || ""}
                  onChange={(e) =>
                    handleChange("name", "first_name", e.target.value)
                  }
                  disabled={!editMode.basic}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.name?.last_name || ""}
                  onChange={(e) =>
                    handleChange("name", "last_name", e.target.value)
                  }
                  disabled={!editMode.basic}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile"
                  value={formData.mobile || ""}
                  onChange={(e) => handleDirectChange("mobile", e.target.value)}
                  disabled={!editMode.basic}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={freelancer.email || ""}
                  disabled
                  helperText="Email cannot be changed"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Languages (comma separated)"
                  value={(formData.languages || []).join(", ")}
                  onChange={(e) => handleLanguagesChange(e.target.value)}
                  disabled={!editMode.basic}
                  helperText="Separate languages with commas"
                />
                <Box sx={{ mt: 1 }}>
                  {(formData.languages || []).map((lang, index) => (
                    <Chip
                      key={index}
                      label={lang}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Professional Details */}
        <Card>
          <CardHeader
            title={
              <div className="flex items-center">
                <FiBriefcase className="mr-2" />
                Professional Details
              </div>
            }
            action={
              <Button
                onClick={() =>
                  editMode.professional
                    ? saveSection("professional")
                    : toggleEdit("professional")
                }
                startIcon={editMode.professional ? <FiSave /> : <FiEdit2 />}
                variant={editMode.professional ? "contained" : "outlined"}
                size="small"
              >
                {editMode.professional ? "Save" : "Edit"}
              </Button>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Experience (Years)"
                  type="number"
                  value={formData.professional?.experience_years || ""}
                  onChange={(e) =>
                    handleChange(
                      "professional",
                      "experience_years",
                      e.target.value
                    )
                  }
                  disabled={!editMode.professional}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={!editMode.professional}>
                  <InputLabel>Availability</InputLabel>
                  <Select
                    value={formData.professional?.availability || ""}
                    onChange={(e) =>
                      handleChange(
                        "professional",
                        "availability",
                        e.target.value
                      )
                    }
                    label="Availability"
                  >
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Project-based">Project-based</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Working Radius"
                  value={formData.professional?.working_radius || ""}
                  onChange={(e) =>
                    handleChange(
                      "professional",
                      "working_radius",
                      e.target.value
                    )
                  }
                  disabled={!editMode.professional}
                  helperText="e.g., 50km, City-wide, etc."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Professional Bio"
                  value={formData.professional?.bio || ""}
                  onChange={(e) =>
                    handleChange("professional", "bio", e.target.value)
                  }
                  disabled={!editMode.professional}
                  helperText="Describe your expertise and experience"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills (comma separated)"
                  value={(formData.professional?.skills || []).join(", ")}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  disabled={!editMode.professional}
                  helperText="Separate skills with commas"
                />
                <Box sx={{ mt: 1 }}>
                  {(formData.professional?.skills || []).map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card>
          <CardHeader
            title={
              <div className="flex items-center">
                <FiMapPin className="mr-2" />
                Location Information
              </div>
            }
            action={
              <Button
                onClick={() =>
                  editMode.location
                    ? saveSection("location")
                    : toggleEdit("location")
                }
                startIcon={editMode.location ? <FiSave /> : <FiEdit2 />}
                variant={editMode.location ? "contained" : "outlined"}
                size="small"
              >
                {editMode.location ? "Save" : "Edit"}
              </Button>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.location?.city || ""}
                  onChange={(e) =>
                    handleChange("location", "city", e.target.value)
                  }
                  disabled={!editMode.location}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  value={formData.location?.state || ""}
                  onChange={(e) =>
                    handleChange("location", "state", e.target.value)
                  }
                  disabled={!editMode.location}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={formData.location?.country || ""}
                  onChange={(e) =>
                    handleChange("location", "country", e.target.value)
                  }
                  disabled={!editMode.location}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  value={formData.location?.pincode || ""}
                  onChange={(e) =>
                    handleChange("location", "pincode", e.target.value)
                  }
                  disabled={!editMode.location}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Services Offered */}
        <Card>
          <CardHeader
            title={
              <div className="flex items-center">
                <FiBriefcase className="mr-2" />
                Services Offered
              </div>
            }
            action={
              <div className="flex gap-2">
                {editMode.services && (
                  <Button
                    onClick={() =>
                      addArrayItem("services_offered", {
                        category: "",
                        subcategory: "",
                        description: "",
                        price_range: "",
                        unit: "",
                        images: [],
                        is_active: true,
                      })
                    }
                    startIcon={<FiPlus />}
                    variant="outlined"
                    size="small"
                  >
                    Add Service
                  </Button>
                )}
                <Button
                  onClick={() =>
                    editMode.services
                      ? saveSection("services_offered")
                      : toggleEdit("services")
                  }
                  startIcon={editMode.services ? <FiSave /> : <FiEdit2 />}
                  variant={editMode.services ? "contained" : "outlined"}
                  size="small"
                >
                  {editMode.services ? "Save" : "Edit"}
                </Button>
              </div>
            }
          />
          <CardContent>
            <div className="space-y-4">
              {(formData.services_offered || []).map((service, index) => (
                <Card key={index} variant="outlined" sx={{ p: 3 }}>
                  <div className="flex justify-between items-start mb-4">
                    <Typography variant="h6" className="font-semibold">
                      Service {index + 1}
                    </Typography>
                    {editMode.services && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          removeArrayItem("services_offered", index)
                        }
                        color="error"
                      >
                        <FiTrash2 />
                      </IconButton>
                    )}
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth disabled={!editMode.services}>
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={service.category || ""}
                          onChange={(e) =>
                            handleArrayChange(
                              "services_offered",
                              index,
                              "category",
                              e.target.value
                            )
                          }
                          label="Category"
                        >
                          {categories.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth disabled={!editMode.services}>
                        <InputLabel>Subcategory</InputLabel>
                        <Select
                          value={service.subcategory || ""}
                          onChange={(e) =>
                            handleArrayChange(
                              "services_offered",
                              index,
                              "subcategory",
                              e.target.value
                            )
                          }
                          label="Subcategory"
                        >
                          {subcategories
                            .filter((sub) => sub.category === service.category)
                            .map((sub) => (
                              <MenuItem key={sub._id} value={sub._id}>
                                {sub.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Service Description"
                        value={service.description || ""}
                        onChange={(e) =>
                          handleArrayChange(
                            "services_offered",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        disabled={!editMode.services}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Price Range"
                        value={service.price_range || ""}
                        onChange={(e) =>
                          handleArrayChange(
                            "services_offered",
                            index,
                            "price_range",
                            e.target.value
                          )
                        }
                        disabled={!editMode.services}
                        helperText="e.g., $100-$500, $50/hour"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Unit"
                        value={service.unit || ""}
                        onChange={(e) =>
                          handleArrayChange(
                            "services_offered",
                            index,
                            "unit",
                            e.target.value
                          )
                        }
                        disabled={!editMode.services}
                        helperText="e.g., per hour, per project, per sqm"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={service.is_active !== false}
                            onChange={(e) =>
                              handleArrayChange(
                                "services_offered",
                                index,
                                "is_active",
                                e.target.checked
                              )
                            }
                            disabled={!editMode.services}
                          />
                        }
                        label="This service is currently available"
                      />
                    </Grid>
                  </Grid>
                </Card>
              ))}
              {(formData.services_offered || []).length === 0 && (
                <Card variant="outlined" sx={{ p: 4, textAlign: "center" }}>
                  <Typography color="textSecondary">
                    No services added yet. Add your first service to get
                    started!
                  </Typography>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader
            title={
              <div className="flex items-center">
                <FiDollarSign className="mr-2" />
                Payment Details
              </div>
            }
            action={
              <Button
                onClick={() =>
                  editMode.payment
                    ? saveSection("payment")
                    : toggleEdit("payment")
                }
                startIcon={editMode.payment ? <FiSave /> : <FiEdit2 />}
                variant={editMode.payment ? "contained" : "outlined"}
                size="small"
              >
                {editMode.payment ? "Save" : "Edit"}
              </Button>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Payment Method"
                  value={formData.payment?.preferred_method || ""}
                  onChange={(e) =>
                    handleChange("payment", "preferred_method", e.target.value)
                  }
                  disabled={!editMode.payment}
                  helperText="e.g., Bank Transfer, UPI, Cash, etc."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Advance Percentage"
                  type="number"
                  value={formData.payment?.advance_percentage || ""}
                  onChange={(e) =>
                    handleChange(
                      "payment",
                      "advance_percentage",
                      e.target.value
                    )
                  }
                  disabled={!editMode.payment}
                  helperText="Percentage required as advance (0-100)"
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="GST Number"
                  value={formData.payment?.gst_number || ""}
                  onChange={(e) =>
                    handleChange("payment", "gst_number", e.target.value)
                  }
                  disabled={!editMode.payment}
                  helperText="Your business GST registration number"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader
            title={
              <div className="flex items-center">
                <FiFileText className="mr-2" />
                Documents
              </div>
            }
            action={
              <Button
                onClick={() =>
                  editMode.documents
                    ? saveSection("documents")
                    : toggleEdit("documents")
                }
                startIcon={editMode.documents ? <FiSave /> : <FiEdit2 />}
                variant={editMode.documents ? "contained" : "outlined"}
                size="small"
              >
                {editMode.documents ? "Save" : "Edit"}
              </Button>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              {["resume", "identityProof", "addressProof", "certificate"].map(
                (type) => {
                  const doc = (formData.documents || []).find(
                    (d) => d.type === type
                  );
                  return (
                    <Grid item xs={12} sm={6} key={type}>
                      <Card variant="outlined" sx={{ p: 3 }}>
                        <div className="flex items-center justify-between mb-3">
                          <Typography
                            variant="subtitle1"
                            className="capitalize font-semibold"
                          >
                            {type.replace(/([A-Z])/g, " $1").trim()}
                          </Typography>
                          {doc?.verified && (
                            <Chip
                              icon={<FiCheck />}
                              label="Verified"
                              color="success"
                              size="small"
                            />
                          )}
                        </div>

                        {doc ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Typography variant="body2" color="textSecondary">
                                Uploaded:{" "}
                                {new Date(doc.uploaded_at).toLocaleDateString()}
                              </Typography>
                            </div>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<FiFileText />}
                              onClick={() =>
                                showToast(`Viewing ${type} document`, "info")
                              }
                            >
                              View Document
                            </Button>
                          </div>
                        ) : (
                          <Typography
                            color="textSecondary"
                            variant="body2"
                            className="mb-3"
                          >
                            Not uploaded
                          </Typography>
                        )}

                        {editMode.documents && (
                          <div className="mt-3">
                            <input
                              type="file"
                              accept="image/*,.pdf,.doc,.docx"
                              onChange={(e) => handleFileChange(e, type)}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              className="mt-1 block"
                            >
                              Accepted: PDF, DOC, Images (Max: 10MB)
                            </Typography>
                          </div>
                        )}
                      </Card>
                    </Grid>
                  );
                }
              )}
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateFreelancerProfile;
