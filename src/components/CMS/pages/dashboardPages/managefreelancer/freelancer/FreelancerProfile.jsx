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
  FaMapMarkerAlt,
  FaUserCheck,
  FaAward,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import { PiShieldCheck } from "react-icons/pi";

import {
  ArrowDownOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
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
  Statistic,
  Progress,
  Descriptions,
  Timeline,
  Rate,
} from "antd";
import { useLocation } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

const FreelancerProfile = () => {
const location = useLocation();
const params = new URLSearchParams(location.search);
const freelancerId = params.get("freelancerId");

  const navigate = useNavigate();
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

  // Purple theme configuration
  const theme = {
    primary: "#7e22ce",
    primaryLight: "#a855f7",
    primaryDark: "#6b21a8",
    secondary: "#f3e8ff",
    accent: "#c084fc",
    text: "#1f2937",
    textLight: "#6b7280",
    background: "#faf5ff",
    cardBg: "#ffffff",
  };

 const fetchFreelancer = async () => {
  setLoading(true);
  try {
    const response = await apiService.get(`/freelancer?freelancerId=${freelancerId}`);

    // backend returns: { success: true, freelancer }
    setFreelancer(response.freelancer);
  } catch (error) {
    console.error("Error fetching freelancer:", error);
    showToast("Failed to load freelancer details", "error");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchFreelancer();
}, [freelancerId]);
;

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
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: theme.background }}
      >
        <div className="text-center">
          <Spin size="large" style={{ color: theme.primary }} />
          <div className="mt-4">
            <Text style={{ color: theme.primary, fontSize: '16px' }}>
              Loading freelancer profile...
            </Text>
          </div>
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: theme.background }}
      >
        <Card className="text-center shadow-lg border-0">
          <div style={{ color: theme.primary, fontSize: '48px', marginBottom: '16px' }}>
            <FaUserCheck />
          </div>
          <Title level={3} style={{ color: theme.text }}>
            Freelancer Not Found
          </Title>
          <Text style={{ color: theme.textLight }}>
            The freelancer you're looking for doesn't exist or has been removed.
          </Text>
          <div className="mt-6">
            <Button 
              type="primary" 
              onClick={() => navigate(-1)}
              style={{ 
                background: theme.primary, 
                borderColor: theme.primary,
                padding: '8px 24px',
                height: 'auto'
              }}
            >
              <FaArrowLeft className="mr-2" />
              Back to Freelancers
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const fullName =
    `${freelancer.name?.first_name || ""} ${freelancer.name?.last_name || ""}`.trim();

  const statusConfig = {
    0: { color: "#f59e0b", label: "Pending", icon: <FaClock /> },
    1: { color: "#10b981", label: "Approved", icon: <FaRegCheckCircle /> },
    2: { color: "#ef4444", label: "Rejected", icon: <FaRegTimesCircle /> },
    3: { color: "#6b7280", label: "Suspended", icon: <PiShieldCheck  /> },
  };

  const currentStatus = statusConfig[freelancer.status_info?.status] || statusConfig[0];

  const documentTypeLabel = {
    resume: "Resume",
    portfolio: "Portfolio",
    identityProof: "Identity Proof",
    addressProof: "Address Proof",
    certificate: "Certificate",
  };

  // Stats for the header
  const stats = [
    {
      title: "Experience",
      value: freelancer.professional?.experience_years || 0,
      suffix: "years",
      icon: <FaAward style={{ color: theme.primary }} />,
    },
    {
      title: "Services",
      value: freelancer.services_offered?.length || 0,
      icon: <FaServicestack style={{ color: theme.primary }} />,
    },
    {
      title: "Languages",
      value: freelancer.languages?.length || 0,
      icon: <FaLanguage style={{ color: theme.primary }} />,
    },
    {
      title: "Portfolio",
      value: freelancer.portfolio?.length || 0,
      icon: <FaBox style={{ color: theme.primary }} />,
    },
  ];

  return (
    <div 
      className="min-h-screen p-6"
      style={{ background: theme.background }}
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Button
              icon={<FaArrowLeft />}
              onClick={() => navigate(-1)}
              style={{ 
                color: theme.primary, 
                borderColor: theme.primary,
                marginBottom: '16px'
              }}
            >
              Back to Freelancers
            </Button>
            <Title 
              level={1} 
              style={{ 
                color: theme.text,
                margin: 0
              }}
            >
              Freelancer Profile
            </Title>
            <Text style={{ color: theme.textLight }}>
              Complete details and management for {fullName}
            </Text>
          </div>
          
          <Badge
            count={currentStatus.label}
            style={{ 
              backgroundColor: currentStatus.color,
              fontSize: '12px',
              padding: '4px 12px'
            }}
          />
        </div>

        {/* Profile Header Card */}
        <Card 
          className="shadow-2xl border-0 mb-8"
          style={{ 
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
            color: 'white'
          }}
        >
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={6} className="text-center">
              <Avatar
                size={120}
                src={
                  freelancer.profile_image
                    ? `http://localhost:5000/${freelancer.profile_image}`
                    : undefined
                }
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: '4px solid rgba(255,255,255,0.3)'
                }}
              >
                <span style={{ fontSize: '36px', color: 'white' }}>
                  {fullName.charAt(0)}
                </span>
              </Avatar>
            </Col>
            
            <Col xs={24} md={10}>
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                {fullName || "N/A"}
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)', margin: '8px 0' }}>
                <FaEnvelope className="mr-2" />
                {freelancer.email}
              </Paragraph>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)', margin: '8px 0' }}>
                <FaPhone className="mr-2" />
                {freelancer.mobile?.number ? 
                  `${freelancer.mobile.country_code} ${freelancer.mobile.number}` : 
                  "--"
                }
                {freelancer.is_mobile_verified && (
                  <Badge 
                    count="Verified" 
                    style={{ 
                      backgroundColor: '#10b981',
                      marginLeft: '8px'
                    }} 
                  />
                )}
              </Paragraph>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)', margin: '8px 0' }}>
                <FaMapMarkerAlt className="mr-2" />
                {freelancer.location?.city || "--"}, {freelancer.location?.country || "--"}
              </Paragraph>
            </Col>
            
            <Col xs={24} md={8}>
              <Row gutter={[16, 16]}>
                {stats.map((stat, index) => (
                  <Col xs={12} key={index}>
                    <Statistic
                      title={
                        <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                          {stat.title}
                        </Text>
                      }
                      value={stat.value}
                      prefix={stat.icon}
                      valueStyle={{ color: 'white', fontSize: '24px' }}
                      suffix={stat.suffix}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Main Content Grid */}
      <Row gutter={[24, 24]}>
        {/* Left Column - Basic Info & Professional Details */}
        <Col xs={24} lg={8}>
          <Row gutter={[24, 24]}>
            {/* Basic Information */}
            <Col xs={24}>
              <Card
                className="shadow-lg border-0"
                style={{ background: theme.cardBg }}
                title={
                  <div style={{ color: theme.primary }}>
                    <FaBuilding className="mr-2" />
                    Basic Information
                  </div>
                }
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Email">
                    <Text strong>{freelancer.email}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Mobile">
                    <Text strong>
                      {freelancer.mobile?.number ? 
                        `${freelancer.mobile.country_code} ${freelancer.mobile.number}` : 
                        "--"
                      }
                    </Text>
                    {freelancer.is_mobile_verified && (
                      <Badge 
                        count="Verified" 
                        style={{ 
                          backgroundColor: '#10b981',
                          marginLeft: '8px'
                        }} 
                      />
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Languages">
                    <Space wrap>
                      {freelancer.languages?.map((lang, index) => (
                        <Tag 
                          key={index}
                          style={{ 
                            background: theme.secondary,
                            color: theme.primary,
                            border: `1px solid ${theme.primaryLight}`
                          }}
                        >
                          {lang}
                        </Tag>
                      )) || "--"}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            {/* Professional Details */}
            <Col xs={24}>
              <Card
                className="shadow-lg border-0"
                style={{ background: theme.cardBg }}
                title={
                  <div style={{ color: theme.primary }}>
                    <FaBriefcase className="mr-2" />
                    Professional Details
                  </div>
                }
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Experience">
                    <Text strong>
                      {freelancer.professional?.experience_years || 0} years
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Availability">
                    <Tag 
                      color="blue"
                      style={{ 
                        background: theme.secondary,
                        color: theme.primary
                      }}
                    >
                      {freelancer.professional?.availability || "Not specified"}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Bio">
                    <Paragraph 
                      style={{ 
                        color: theme.textLight,
                        fontStyle: freelancer.professional?.bio ? 'normal' : 'italic'
                      }}
                    >
                      {freelancer.professional?.bio || "No bio provided"}
                    </Paragraph>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            {/* Payment Information */}
            <Col xs={24}>
              <Card
                className="shadow-lg border-0"
                style={{ background: theme.cardBg }}
                title={
                  <div style={{ color: theme.primary }}>
                    <FaMoneyBill className="mr-2" />
                    Payment Information
                  </div>
                }
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Preferred Method">
                    <Text strong>
                      {freelancer.payment?.preferred_method || "Not specified"}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Advance Percentage">
                    <Text strong>
                      {freelancer.payment?.advance_percentage || 0}%
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="GST Number">
                    <Text strong>
                      {freelancer.payment?.gst_number || "Not provided"}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Right Column - Services & Documents */}
        <Col xs={24} lg={16}>
          <Row gutter={[24, 24]}>
            {/* Services Offered */}
           <Col xs={24}>
  <Card
    className="shadow-lg border-0"
    style={{ background: theme.cardBg }}
    title={
      <div style={{ color: theme.primary }}>
        <FaServicestack className="mr-2" />
        Services Offered ({freelancer.services_offered?.length || 0})
      </div>
    }
  >
    {freelancer.services_offered?.length > 0 ? (
      <List
        dataSource={freelancer.services_offered}
        renderItem={(service, index) => (
          <List.Item>
            <Card
              style={{
                width: "100%",
                border: `1px solid ${theme.secondary}`,
                background: theme.background,
              }}
              bodyStyle={{ padding: "16px" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  {/* Category */}
                  <Title level={5} style={{ color: theme.primary, margin: 0 }}>
                    {service.category?.name || "Unknown Category"}
                  </Title>

                  {/* ✅ Correct Subcategories */}
                  <Text style={{ color: theme.textLight }}>
                    {service.subcategories?.length
                      ? service.subcategories.map((s) => s.name).join(", ")
                      : "No subcategories"}
                  </Text>

                  {/* Description */}
                  <Paragraph style={{ margin: "8px 0", color: theme.text }}>
                    {service.description}
                  </Paragraph>

                  {/* Price Tag */}
                  {service.price_range && (
                    <Tag
                      style={{
                        background: theme.primary,
                        color: "white",
                        border: "none",
                      }}
                    >
                      {service.price_range} / {service.unit}
                    </Tag>
                  )}
                </div>

                {/* Images */}
                {service.images?.length > 0 && (
                  <div className="flex gap-2">
                    {service.images.slice(0, 2).map((img, i) => (
                      <Image
                        key={i}
                        width={60}
                        height={60}
                        src={`http://localhost:5000/${img}`}
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: `2px solid ${theme.secondary}`,
                        }}
                        preview={{
                          mask: <EyeOutlined style={{ color: "white" }} />,
                        }}
                      />
                    ))}

                    {/* +more images indicator */}
                    {service.images.length > 2 && (
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          background: theme.secondary,
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: theme.primary,
                          fontWeight: "bold",
                        }}
                      >
                        +{service.images.length - 2}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : (
      <Empty
        description="No services offered yet"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    )}
  </Card>
</Col>


            {/* Documents & Certificates */}
            <Col xs={24}>
              <Card
                className="shadow-lg border-0"
                style={{ background: theme.cardBg }}
                title={
                  <div style={{ color: theme.primary }}>
                    <FaIdCard className="mr-2" />
                    Documents & Certificates ({freelancer.documents?.length || 0})
                  </div>
                }
              >
                {freelancer.documents?.length > 0 ? (
                  <Row gutter={[16, 16]}>
                    {freelancer.documents.map((doc, index) => (
                      <Col xs={24} md={12} lg={8} key={doc._id || index}>
                        <Card
                          size="small"
                          style={{ 
                            border: `1px solid ${theme.secondary}`,
                            background: theme.background
                          }}
                          actions={[
                            <Tooltip title="Download">
                              <DownloadOutlined 
                                onClick={() => downloadDocument(doc.path)}
                                style={{ color: theme.primary }}
                              />
                            </Tooltip>,
                            <Tooltip title="Preview">
                              <EyeOutlined 
                                onClick={() => openImageModal(doc)}
                                style={{ color: theme.primary }}
                              />
                            </Tooltip>,
                            !doc.verified && (
                              <Tooltip title="Approve">
                                <CheckOutlined 
                                  onClick={() => openVerificationModal(doc._id, true)}
                                  style={{ color: '#10b981' }}
                                />
                              </Tooltip>
                            ),
                            !doc.verified && (
                              <Tooltip title="Reject">
                                <CloseOutlined 
                                  onClick={() => openVerificationModal(doc._id, false)}
                                  style={{ color: '#ef4444' }}
                                />
                              </Tooltip>
                            ),
                          ]}
                        >
                          <Card.Meta
                            title={
                              <Text strong style={{ color: theme.text }}>
                                {documentTypeLabel[doc.type] || doc.type}
                              </Text>
                            }
                            description={
                              <Space direction="vertical" size="small">
                                <Badge
                                  status={doc.verified ? "success" : "processing"}
                                  text={doc.verified ? "Verified" : "Pending Verification"}
                                />
                                {doc.uploaded_at && (
                                  <Text type="secondary" style={{ fontSize: '12px' }}>
                                    Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                                  </Text>
                                )}
                              </Space>
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty 
                    description="No documents uploaded"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
            </Col>

            {/* Portfolio Items */}
            {freelancer.portfolio?.length > 0 && (
              <Col xs={24}>
                <Card
                  className="shadow-lg border-0"
                  style={{ background: theme.cardBg }}
                  title={
                    <div style={{ color: theme.primary }}>
                      <FaBox className="mr-2" />
                      Portfolio ({freelancer.portfolio.length})
                    </div>
                  }
                >
                  <Row gutter={[16, 16]}>
                    {freelancer.portfolio.map((item, index) => (
                      <Col xs={24} md={12} key={index}>
                        <Card
                          hoverable
                          style={{ 
                            border: `1px solid ${theme.secondary}`,
                            background: theme.background
                          }}
                          cover={
                            item.images?.length > 0 ? (
                              <Image
                                alt={item.title}
                                src={`http://localhost:5000/${item.images[0]}`}
                                height={200}
                                style={{ objectFit: 'cover' }}
                                preview={false}
                              />
                            ) : null
                          }
                        >
                          <Card.Meta
                            title={item.title}
                            description={
                              <Space direction="vertical" size="small">
                                <Text type="secondary">
                                  {item.category?.name} → {item.subcategory?.name}
                                </Text>
                                <Paragraph 
                                  ellipsis={{ rows: 2 }}
                                  style={{ color: theme.textLight, margin: 0 }}
                                >
                                  {item.description}
                                </Paragraph>
                                {item.completed_at && (
                                  <Text type="secondary" style={{ fontSize: '12px' }}>
                                    Completed: {new Date(item.completed_at).toLocaleDateString()}
                                  </Text>
                                )}
                              </Space>
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      {/* Image Modal */}
      <Modal
        open={imageViewerOpen}
        onCancel={closeImageModal}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        {selectedDocument && (
          <Image
            src={`http://localhost:5000/${selectedDocument.path}`}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        )}
      </Modal>

      {/* Verification Modal */}
      <Modal
        open={verificationModalOpen}
        onCancel={() => setVerificationModalOpen(false)}
        footer={null}
        style={{ top: 20 }}
      >
        <Title level={4} style={{ color: theme.text }}>
          {isApproving ? "Approve" : "Reject"} Document
        </Title>
        <TextArea
          placeholder={isApproving ? "Optional comments..." : "Reason for rejection (required)"}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          style={{ marginBottom: '16px' }}
        />
        <TextArea
          placeholder="Suggestions for improvement (optional)"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          rows={3}
          style={{ marginBottom: '16px' }}
        />
        <div className="flex justify-end gap-3">
          <Button onClick={() => setVerificationModalOpen(false)}>
            Cancel
          </Button>
          <Button
            type={isApproving ? "primary" : "danger"}
            onClick={handleSubmitVerification}
            loading={verifyingDoc === selectedDocId}
            disabled={!isApproving && !reason.trim()}
            style={{
              background: isApproving ? theme.primary : '#ef4444',
              borderColor: isApproving ? theme.primary : '#ef4444'
            }}
          >
            {isApproving ? "Approve Document" : "Reject Document"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FreelancerProfile;