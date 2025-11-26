// src/pages/admin/VendorB2CProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import { showToast } from '../../../../../manageApi/utils/toast';
import {
  FiArrowLeft,
  FiDownload,
  FiZoomIn,
  FiCheck,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiTag,
  FiClock,
  FiFileText,
  FiShield,
  FiCreditCard,
  FiPackage,
  FiStar,
  FiTrendingUp,
  FiCalendar,
  FiInfo,
  FiEye,
  FiArrowRight 
} from 'react-icons/fi';
import { Button, Card, Spin, Avatar, Tag, Modal, Input, Divider, Space, Tooltip, Image, Row, Col } from 'antd';

const { TextArea } = Input;

const VendorB2CProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [verificationModal, setVerificationModal] = useState({
    open: false,
    docId: null,
    approving: false,
    reason: '',
    suggestion: '',
  });

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    fetchVendor();
  }, [id, token]);

  const fetchVendor = async () => {
    setLoading(true);
    try {
      const res = await apiService.get(`/vendor/b2c?vendorId=${id}`);
      setVendor(res.vendor);
    } catch (err) {
      showToast('Failed to load vendor profile', 'error');
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const openVerification = (docId, approving) => {
    setVerificationModal({
      open: true,
      docId,
      approving,
      reason: '',
      suggestion: '',
    });
  };

  const submitVerification = async () => {
    if (!verificationModal.approving && !verificationModal.reason.trim()) {
      showToast('Reason is required for rejection', 'error');
      return;
    }

    try {
      await apiService.put('/vendor/b2c/document/verification/check', {
        vendor_id: id,
        documentId: verificationModal.docId,
        verified: verificationModal.approving,
        reason: verificationModal.reason,
        suggestion: verificationModal.suggestion,
      });
      showToast(`Document ${verificationModal.approving ? 'approved' : 'rejected'}`, 'success');
      setVerificationModal({ ...verificationModal, open: false });
      fetchVendor();
    } catch (err) {
      showToast(err.response?.data?.message || 'Update failed', 'error');
    }
  };

  const downloadDoc = (path) => {
    window.open(`https://kotiboxglobaltech.online/api/${path}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!vendor) return null;

  const docs = [
    { type: 'identity_proof', label: 'Identity Proof', icon: <FiUser /> },
    { type: 'address_proof', label: 'Address Proof', icon: <FiMapPin /> },
    { type: 'gst_certificate', label: 'GST Certificate', icon: <FiFileText /> },
  ].map(item => ({
    ...item,
    data: vendor.documents?.[item.type] || null,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="text"
                icon={<FiArrowLeft className="text-2xl" />}
                onClick={() => navigate(-1)}
                className="hover:bg-purple-100 rounded-full p-3"
              />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5C039B] to-[#8B3DFF] bg-clip-text text-transparent">
                  {vendor.store_details?.store_name || 'B2C Vendor Profile'}
                </h1>
                <p className="text-gray-600">Complete vendor information & verification</p>
              </div>
            </div>
            <Tag 
              color={
                vendor.status_info?.status === 1 ? 'green' : 
                vendor.status_info?.status === 2 ? 'red' : 'orange'
              } 
              className="text-lg px-4 py-2 font-semibold"
            >
              {vendor.status_info?.status === 0 ? 'Pending' : 
               vendor.status_info?.status === 1 ? 'Approved' : 'Rejected'}
            </Tag>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile & Basic Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-br from-[#5C039B] to-[#8B3DFF] p-8 text-white text-center">
                <Avatar
                  size={120}
                  src={vendor.store_details?.logo ? `https://kotiboxglobaltech.online/api/${vendor.store_details.logo}` : null}
                  icon={<FiUser />}
                  className="ring-8 ring-white/30 shadow-2xl"
                />
                <h2 className="text-2xl font-bold mt-4">{vendor.full_name}</h2>
                <p className="opacity-90">{vendor.email}</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FiMail className="text-purple-600 text-lg" />
                  <span className="text-gray-700">{vendor.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FiPhone className="text-purple-600 text-lg" />
                  <span className="text-gray-700">{vendor.mobile}</span>
                  {vendor.is_mobile_verified && (
                    <Tag color="green" className="ml-auto">Verified</Tag>
                  )}
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FiGlobe className="text-purple-600 text-lg" />
                  <span className="text-gray-700">
                    {vendor.store_details?.website || 'No website'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Verification Status Card */}
            <Card 
              title={
                <span className="flex items-center gap-2 text-purple-800 font-semibold">
                  <FiShield className="text-purple-600" /> 
                  Verification Status
                </span>
              } 
              className="shadow-xl rounded-3xl"
            >
              <div className="space-y-4">
                {docs.map(doc => (
                  <div key={doc.type} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm flex items-center gap-2 font-medium">
                      {doc.icon} {doc.label}
                    </span>
                    <Tag 
                      color={doc.data?.verified ? 'green' : 'orange'} 
                      className="font-semibold"
                    >
                      {doc.data?.verified ? 'Verified' : 'Pending'}
                    </Tag>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Store Information Section */}
            <Card className="shadow-xl rounded-3xl border-0">
              <div className="flex items-center gap-2 mb-6">
                <FiPackage className="text-purple-600 text-xl" />
                <h3 className="text-xl font-bold text-purple-800">Store Information</h3>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Store Name
                    </label>
                    <p className="text-gray-800 font-semibold">
                      {vendor.store_details?.store_name || '—'}
                    </p>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Store Type
                    </label>
                    <p className="text-gray-800 font-semibold">
                      {vendor.store_details?.store_type || '—'}
                    </p>
                  </div>
                </Col>
                <Col xs={24}>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Store Address
                    </label>
                    <p className="text-gray-800 font-semibold">
                      {vendor.store_details?.store_address || '—'}
                    </p>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Pincode
                    </label>
                    <p className="text-gray-800 font-semibold">
                      {vendor.store_details?.pincode || '—'}
                    </p>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Bank & Registration Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bank Details Card */}
              <Card 
                title={
                  <span className="flex items-center gap-2 text-purple-800 font-semibold">
                    <FiCreditCard className="text-purple-600" />
                    Bank Details
                  </span>
                } 
                className="shadow-xl rounded-3xl border-0"
              >
                <Space direction="vertical" className="w-full space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Account Number
                    </label>
                    <p className="text-gray-800 font-semibold">
                      {vendor.bank_details?.bank_account_number || '—'}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      IFSC Code
                    </label>
                    <p className="text-gray-800 font-semibold">
                      {vendor.bank_details?.ifsc_code || '—'}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Account Holder
                    </label>
                    <p className="text-gray-800 font-semibold">
                      {vendor.bank_details?.account_holder_name || '—'}
                    </p>
                  </div>
                </Space>
              </Card>

              {/* Registration Details Card */}
              <Card 
                title={
                  <span className="flex items-center gap-2 text-purple-800 font-semibold">
                    <FiFileText className="text-purple-600" />
                    Registration Details
                  </span>
                } 
                className="shadow-xl rounded-3xl border-0"
              >
                <Space direction="vertical" className="w-full space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      PAN Number
                    </label>
                    <p className="text-gray-800 font-semibold">
                      {vendor.registration?.pan_number || '—'}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      GSTIN
                    </label>
                    <p className="text-gray-800 font-semibold">
                      {vendor.registration?.gstin || '—'}
                    </p>
                  </div>
                </Space>
              </Card>
            </div>
          </div>
        </div>

        {/* Full Width Verification Documents Section - Bottom */}
        <div className="mt-12">
          <Card className="shadow-2xl rounded-3xl border border-purple-200 p-8 bg-gradient-to-r from-white to-purple-50">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-2xl">
                  <FiFileText className="text-white text-3xl" />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-purple-800 tracking-wide">
                    Verification Documents
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Review and verify vendor documents for approval
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-700">
                  {docs.filter(d => d.data?.verified).length} / {docs.length}
                </div>
                <div className="text-sm text-gray-500">Documents Verified</div>
              </div>
            </div>

            {/* Horizontal Scrollable Row */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-8 pb-6 min-w-max">
                {docs.map((doc) => {
                  const d = doc.data;
                  const isImage = d?.path && /\.(jpg|jpeg|png|webp)$/i.test(d.path);
                  const fileUrl = d?.path ? `https://kotiboxglobaltech.online/api/${d.path}` : null;

                  return (
                    <div
                      key={doc.type}
                      className="flex-shrink-0  bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 p-6 text-white text-center relative">
                        <div className="text-6xl mb-4 opacity-90">{doc.icon}</div>
                        <h4 className="text-xl font-bold tracking-wide">{doc.label}</h4>
                        <div className="absolute top-4 right-4">
                          {d ? (
                            <Tag
                              color={d.verified ? "green" : "orange"}
                              className="px-4 py-1 font-bold text-sm rounded-full shadow-lg"
                            >
                              {d.verified ? "✓ Verified" : "⏳ Pending"}
                            </Tag>
                          ) : (
                            <Tag color="red" className="px-4 py-1 font-bold text-sm rounded-full">
                              Missing
                            </Tag>
                          )}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-5">
                        {/* Document Preview */}
                        {d ? (
                          isImage ? (
                            <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
                              <Image
                                src={fileUrl}
                                alt={doc.label}
                                className="w-full h-64 object-cover rounded-2xl transition-transform group-hover:scale-110 duration-500"
                                preview={false}
                                onClick={() => setImagePreview(fileUrl)}
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                                <div className="text-center">
                                  <FiZoomIn className="text-white text-4xl mb-2" />
                                  <p className="text-white font-semibold">Click to Preview</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                              <FiFileText className="text-7xl text-gray-400 mb-4" />
                              <p className="text-gray-600 font-medium text-lg">PDF Document</p>
                              <p className="text-gray-500 text-sm mt-2">Click to download</p>
                            </div>
                          )
                        ) : (
                          <div className="h-64 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-red-300">
                            <FiFileText className="text-7xl text-red-400 mb-4" />
                            <p className="text-red-600 font-bold text-lg">Document Not Uploaded</p>
                            <Button className="mt-4 rounded-xl bg-purple-600 text-white hover:bg-purple-700 font-medium">
                              Request Upload
                            </Button>
                          </div>
                        )}

                        {/* Reason & Suggestion */}
                        {d?.reason && (
                          <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                            <p className="text-red-700 text-sm font-semibold">
                              <span className="font-bold">Rejection Reason:</span> {d.reason}
                            </p>
                          </div>
                        )}
                        
                        {d?.suggestion && (
                          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                            <p className="text-blue-700 text-sm font-semibold">
                              <span className="font-bold">Suggestion:</span> {d.suggestion}
                            </p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 pt-3">
                          {d && (
                            <Button
                              icon={<FiDownload />}
                              block
                              size="large"
                              className="rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 font-medium h-12 text-base"
                              onClick={() => downloadDoc(d.path)}
                            >
                              Download Document
                            </Button>
                          )}

                          {d && !d.verified && (
                            <div className="grid grid-cols-2 gap-3">
                              <Button
                                type="primary"
                                icon={<FiCheck />}
                                size="large"
                                className="rounded-xl bg-green-600 hover:bg-green-700 font-medium h-12 text-base"
                                onClick={() => openVerification(d._id, true)}
                              >
                                Approve
                              </Button>
                              <Button
                                danger
                                icon={<FiX />}
                                size="large"
                                className="rounded-xl font-medium h-12 text-base"
                                onClick={() => openVerification(d._id, false)}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scroll Hint */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-3 text-purple-600 text-sm font-medium bg-purple-100 px-4 py-2 rounded-full">
                <FiArrowLeft className="animate-pulse" />
                <span>Scroll horizontally to view all documents</span>
                <FiArrowRight className="animate-pulse" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Full Image Preview Modal */}
      <Image.PreviewGroup
        preview={{
          visible: !!imagePreview,
          onVisibleChange: (vis) => !vis && setImagePreview(null),
          current: 0,
        }}
      >
        <Image src={imagePreview} style={{ display: 'none' }} />
      </Image.PreviewGroup>

      {/* Document Verification Modal */}
      <Modal
        open={verificationModal.open}
        title={
          <div className="flex items-center gap-3">
            {verificationModal.approving ? (
              <>
                <div className="bg-green-100 p-2 rounded-full">
                  <FiCheck className="text-green-600 text-xl" />
                </div>
                <span className="text-green-600 font-semibold text-lg">Approve Document</span>
              </>
            ) : (
              <>
                <div className="bg-red-100 p-2 rounded-full">
                  <FiX className="text-red-600 text-xl" />
                </div>
                <span className="text-red-600 font-semibold text-lg">Reject Document</span>
              </>
            )}
          </div>
        }
        onCancel={() => setVerificationModal({ ...verificationModal, open: false })}
        footer={null}
        className="rounded-2xl"
        width={600}
      >
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {verificationModal.approving ? "Comment (Optional)" : "Reason for Rejection *"}
            </label>
            <Input
              placeholder={
                verificationModal.approving 
                  ? "Add any notes or comments..." 
                  : "Please provide reason for rejection"
              }
              value={verificationModal.reason}
              onChange={(e) => setVerificationModal({ ...verificationModal, reason: e.target.value })}
              status={!verificationModal.approving && !verificationModal.reason ? 'error' : ''}
              className="rounded-lg p-3 text-base"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suggestion for Vendor (Optional)
            </label>
            <TextArea
              placeholder="Provide suggestions to help vendor improve their submission..."
              rows={4}
              value={verificationModal.suggestion}
              onChange={(e) => setVerificationModal({ ...verificationModal, suggestion: e.target.value })}
              className="rounded-lg p-3 text-base"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button 
              onClick={() => setVerificationModal({ ...verificationModal, open: false })}
              className="px-8 py-3 rounded-lg text-base font-medium"
              size="large"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              danger={!verificationModal.approving}
              onClick={submitVerification}
              disabled={!verificationModal.approving && !verificationModal.reason.trim()}
              className={`px-8 py-3 rounded-lg font-semibold text-base ${
                verificationModal.approving 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
              size="large"
            >
              {verificationModal.approving ? 'Approve Document' : 'Reject Document'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VendorB2CProfile;