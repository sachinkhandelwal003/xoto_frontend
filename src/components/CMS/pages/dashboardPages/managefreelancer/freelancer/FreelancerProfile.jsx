import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../../../../../../manageApi/utils/custom.apiservice";
import { showToast } from "../../../../../../manageApi/utils/toast";
import {
  FaArrowLeft,
  FaFile,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaClock,
  FaStar,
  FaChartLine,
  FaUsers,
  FaBox,
  FaServicestack,
  FaInfoCircle,
  FaHistory,
  FaBriefcase,
  FaTools,
  FaRuler,
  FaLanguage,
  FaMoneyBill,
  FaIdCard,
  FaCertificate,
} from "react-icons/fa";
import { ArrowDownOutlined } from "@ant-design/icons";
import {
  Card,
  Modal,
  Button,
  Input,
  Spin,
  Avatar,
  Tag,
  Divider,
  List,
  Tooltip,
  Table,
  Collapse,
  Typography,
  Image,
  Space,
  Row,
  Col,
  Empty,
  Badge,
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifyingDoc, setVerifyingDoc] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
  const [reason, setReason] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
    fetchFreelancer();
  }, [id, token]);

  const fetchFreelancer = async () => {
    setLoading(true);
    try {
      // Fixed API endpoint as per your example
      const response = await apiService.get(`/freelancer?id=${id}`);
      setFreelancer(response.freelancer);
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to fetch freelancer details",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const openVerificationModal = (docId, approving) => {
    setSelectedDocId(docId);
    setIsApproving(approving);
    setReason("");
    setSuggestion("");
    setVerificationModalOpen(true);
  };

  const handleSubmitVerification = async () => {
    if (!isApproving && !reason.trim()) {
      showToast("Reason is required for rejection", "error");
      return;
    }

    setVerifyingDoc(selectedDocId);
    try {
      await apiService.put("/freelancer/document/verification/check", {
        freelancerId: id,
        documentId: selectedDocId,
        verified: isApproving,
        reason: reason.trim(),
        suggestion: suggestion.trim(),
      });
      showToast(
        `Document ${isApproving ? "approved" : "rejected"} successfully`,
        "success"
      );
      fetchFreelancer();
      setVerificationModalOpen(false);
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to update document",
        "error"
      );
    } finally {
      setVerifyingDoc(null);
    }
  };

  const downloadDocument = (path) => {
    window.open(`http://localhost:5000/${path}`, "_blank");
  };

  const openImageModal = (document) => {
    setSelectedDocument(document);
    setImageViewerOpen(true);
  };

  const closeImageModal = () => {
    setImageViewerOpen(false);
    setSelectedDocument(null);
  };

  const isImageFile = (filename) => {
    if (!filename) return false;
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".svg",
    ];
    return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };

  if (loading) {
    return (
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Loading freelancer details..." />
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Text type="danger">Freelancer not found</Text>
          <Button type="primary" onClick={() => navigate(-1)} className="mt-2">
            Back to Freelancers
          </Button>
        </div>
      </div>
    );
  }

  const fullName =
    `${freelancer.name?.first_name || ""} ${freelancer.name?.last_name || ""}`.trim();

  const statusColor = {
    0: "orange",
    1: "green",
    2: "red",
    3: "gray",
  };

  const statusLabel = {
    0: "Pending",
    1: "Approved",
    2: "Rejected",
    3: "Suspended",
  };

  const documentTypeLabel = {
    resume: "Resume",
    portfolio: "Portfolio",
    identityProof: "Identity Proof",
    addressProof: "Address Proof",
    certificate: "Certificate",
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <div className="mb-8 bg-white text-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Freelancer Profile
          </h1>
          <Button
            icon={<FaArrowLeft />}
            type="link"
            onClick={() => navigate(-1)}
          >
            Back to Freelancers
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Profile Header */}
        <Card className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 lg:col-span-3">
          <div className="flex items-center gap-6">
            <Avatar
              size={120}
              src={
                freelancer.profile_image
                  ? `http://localhost:5000/${freelancer.profile_image}`
                  : undefined
              }
              className="bg-teal-500"
            >
              {fullName.charAt(0)}
            </Avatar>
            <div>
              <Title level={2} className="m-0">
                {fullName || "N/A"}
              </Title>
              <Paragraph className="text-lg text-gray-600">
                {freelancer.email}
              </Paragraph>
              <Space>
                <Tag color={statusColor[freelancer.status_info?.status]}>
                  {statusLabel[freelancer.status_info?.status] || "Unknown"}
                </Tag>
                {freelancer.is_mobile_verified && (
                  <Tag color="green">Mobile Verified</Tag>
                )}
              </Space>
            </div>
          </div>
        </Card>

        {/* Basic Info */}
        <Card className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <Title level={4} className="text-teal-600 mb-4 flex items-center">
            <FaBuilding className="mr-2" /> Basic Information
          </Title>
          <Space direction="vertical" className="w-full">
            <div>
              <Text type="secondary">Email:</Text>{" "}
              <Paragraph>{freelancer.email}</Paragraph>
            </div>
            <div>
              <Text type="secondary">Mobile:</Text>{" "}
              <Paragraph>{freelancer.mobile || "--"}</Paragraph>
            </div>
            <div>
              <Text type="secondary">Languages:</Text>{" "}
              <Paragraph>{freelancer.languages?.join(", ") || "--"}</Paragraph>
            </div>
          </Space>
        </Card>

        {/* Professional Details */}
        <Card className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <Title level={4} className="text-teal-600 mb-4 flex items-center">
            <FaBriefcase className="mr-2" /> Professional Details
          </Title>
          <Space direction="vertical" className="w-full">
            <div>
              <Text type="secondary">Experience:</Text>{" "}
              <Paragraph>
                {freelancer.professional?.experience_years || 0} years
              </Paragraph>
            </div>
            <div>
              <Text type="secondary">Availability:</Text>{" "}
              <Paragraph>
                {freelancer.professional?.availability || "--"}
              </Paragraph>
            </div>
            <div>
              <Text type="secondary">Working Radius:</Text>{" "}
              <Paragraph>
                {freelancer.professional?.working_radius || "--"}
              </Paragraph>
            </div>
            <div>
              <Text type="secondary">Skills:</Text>{" "}
              <Paragraph>
                {freelancer.professional?.skills?.join(", ") || "--"}
              </Paragraph>
            </div>
            <div>
              <Text type="secondary">Bio:</Text>{" "}
              <Paragraph>{freelancer.professional?.bio || "--"}</Paragraph>
            </div>
          </Space>
        </Card>

        {/* Location */}
        <Card className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <Title level={4} className="text-teal-600 mb-4 flex items-center">
            <FaGlobe className="mr-2" /> Location
          </Title>
          <Space direction="vertical">
            <Text>
              {freelancer.location?.city || "--"},{" "}
              {freelancer.location?.state || "--"}
            </Text>
            <Text>
              {freelancer.location?.country || "--"} -{" "}
              {freelancer.location?.pincode || "--"}
            </Text>
          </Space>
        </Card>

        {/* Payment Details */}
        <Card className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <Title level={4} className="text-teal-600 mb-4 flex items-center">
            <FaMoneyBill className="mr-2" /> Payment Info
          </Title>
          <Space direction="vertical">
            <div>
              <Text type="secondary">Preferred Method:</Text>{" "}
              <Paragraph>
                {freelancer.payment?.preferred_method || "--"}
              </Paragraph>
            </div>
            <div>
              <Text type="secondary">Advance %:</Text>{" "}
              <Paragraph>
                {freelancer.payment?.advance_percentage || 0}%
              </Paragraph>
            </div>
            <div>
              <Text type="secondary">GST Number:</Text>{" "}
              <Paragraph>{freelancer.payment?.gst_number || "--"}</Paragraph>
            </div>
          </Space>
        </Card>

        {/* Services Offered */}
        <Card className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 lg:col-span-2">
          <Title level={4} className="text-teal-600 mb-4 flex items-center">
            <FaServicestack className="mr-2" /> Services Offered (
            {freelancer.services_offered?.length || 0})
          </Title>
          {freelancer.services_offered?.length > 0 ? (
            <List
              dataSource={freelancer.services_offered}
              renderItem={(service) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Text strong>
                        {service.category?.name || "Unknown Category"} →{" "}
                        {service.subcategory?.name || "Unknown Subcategory"}
                      </Text>
                    }
                    description={
                      <Space direction="vertical">
                        <Text>{service.description}</Text>
                        <Text type="secondary">
                          Price: {service.price_range} / {service.unit}
                        </Text>
                        {service.images?.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {service.images.map((img, i) => (
                              <Image
                                key={i}
                                width={60}
                                height={60}
                                src={`http://localhost:5000/${img}`}
                                className="object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty />
          )}
        </Card>

        {/* Portfolio */}
        <Card className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 lg:col-span-3">
          <Title level={4} className="text-teal-600 mb-4 flex items-center">
            <FaBox className="mr-2" /> Portfolio (
            {freelancer.portfolio?.length || 0})
          </Title>
          <Row gutter={16}>
            {freelancer.portfolio?.map((item, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card hoverable className="mb-4">
                  <Title level={5}>{item.title}</Title>
                  <Text type="secondary">
                    {item.category?.name} → {item.subcategory?.name}
                  </Text>
                  <Paragraph>{item.description}</Paragraph>
                  <Space direction="vertical" size="small">
                    <Text>Client: {item.client_name || "--"}</Text>
                    <Text>Area: {item.area || "--"}</Text>
                    <Text>Duration: {item.duration || "--"}</Text>
                    {item.completed_at && (
                      <Text>
                        Completed:{" "}
                        {new Date(item.completed_at).toLocaleDateString()}
                      </Text>
                    )}
                  </Space>
                  {item.images?.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {item.images.map((img, i) => (
                        <Image
                          key={i}
                          width={80}
                          src={`http://localhost:5000/${img}`}
                          className="rounded"
                        />
                      ))}
                    </div>
                  )}
                </Card>
              </Col>
            ))}
            {(!freelancer.portfolio || freelancer.portfolio.length === 0) && (
              <Empty />
            )}
          </Row>
        </Card>

        {/* Documents - All in one card */}
        <Card className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 lg:col-span-3">
          <Title level={4} className="text-teal-600 mb-4 flex items-center">
            <FaIdCard className="mr-2" /> Documents & Certificates
          </Title>
          <Row gutter={16}>
            {freelancer.documents?.map((doc, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card
                  title={documentTypeLabel[doc.type] || doc.type}
                  className="mb-4"
                >
                  <Space direction="vertical" className="w-full">
                    <Tag color={doc.verified ? "green" : "orange"}>
                      {doc.verified ? "Verified" : "Pending"}
                    </Tag>
                    {doc.reason && (
                      <Text type="danger">Reason: {doc.reason}</Text>
                    )}
                    {doc.suggestion && (
                      <Text type="secondary">Suggestion: {doc.suggestion}</Text>
                    )}
                    <Text type="secondary">
                      Uploaded: {new Date(doc.uploaded_at).toLocaleString()}
                    </Text>

                    {doc.path && isImageFile(doc.path) && (
                      <Image
                        src={`http://localhost:5000/${doc.path}`}
                        width="100%"
                        className="mt-3 rounded cursor-pointer"
                        onClick={() => openImageModal(doc)}
                      />
                    )}

                    <Space className="mt-3">
                      <Button
                        icon={<ArrowDownOutlined />}
                        onClick={() => downloadDocument(doc.path)}
                      >
                        Download
                      </Button>
                      {!doc.verified && (
                        <>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => openVerificationModal(doc._id, true)}
                          >
                            Approve
                          </Button>
                          <Button
                            danger
                            size="small"
                            onClick={() =>
                              openVerificationModal(doc._id, false)
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
            {(!freelancer.documents || freelancer.documents.length === 0) && (
              <Col span={24}>
                <Empty description="No documents uploaded" />
              </Col>
            )}
          </Row>
        </Card>

        {/* Gallery */}
        <Card className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 lg:col-span-3">
          <Title level={4} className="text-teal-600 mb-4 flex items-center">
            <FaGlobe className="mr-2" /> Gallery
          </Title>
          {freelancer.gallery?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {freelancer.gallery.map((img, i) => (
                <Image
                  key={i}
                  src={`http://localhost:5000/${img}`}
                  className="rounded-lg object-cover h-32"
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </Card>
      </div>

      {/* Image Modal */}
      <Modal
        open={imageViewerOpen}
        onCancel={closeImageModal}
        footer={null}
        width={800}
      >
        <Image
          src={`http://localhost:5000/${selectedDocument?.path}`}
          className="w-full"
        />
      </Modal>

      {/* Verification Modal */}
      <Modal
        open={verificationModalOpen}
        onCancel={() => setVerificationModalOpen(false)}
        footer={null}
      >
        <Title level={4}>{isApproving ? "Approve" : "Reject"} Document</Title>
        <TextArea
          placeholder="Reason (required for rejection)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          className="mb-3"
        />
        <TextArea
          placeholder="Suggestion (optional)"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          rows={3}
          className="mb-3"
        />
        <Space>
          <Button onClick={() => setVerificationModalOpen(false)}>
            Cancel
          </Button>
          <Button
            type={isApproving ? "primary" : "danger"}
            onClick={handleSubmitVerification}
            loading={verifyingDoc === selectedDocId}
          >
            {isApproving ? "Approve" : "Reject"}
          </Button>
        </Space>
      </Modal>
    </div>
  );
};

export default FreelancerProfile;
