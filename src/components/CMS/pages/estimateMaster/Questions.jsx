import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, Select, Button, Upload, Modal, message,
  Typography, Divider, Space, Empty, Spin, Popconfirm, Input, Image, Form, Row, Col, Avatar
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, EditOutlined,
  AppstoreOutlined, UploadOutlined, FileImageOutlined,
  PictureOutlined, LoadingOutlined, EyeOutlined
} from '@ant-design/icons';
import { apiService } from '../../../../manageApi/utils/custom.apiservice';

const { Title, Text } = Typography;
const { Meta } = Card;

const THEME = {
  primary: "#722ed1",
  bgLight: "#f9f0ff",
  border: "#efdbff"
};

const BASE_URL = 'https://xoto.ae/api';
const API_PREFIX = '/estimate/master/category';

const TypesGallery = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [questionType, setQuestionType] = useState("text");
  const [options, setOptions] = useState([""]);
  const [form] = Form.useForm();

  // Modal States
  const [editModal, setEditModal] = useState({ open: false, imageId: '', title: '', type: '' });
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');


  // const createEstimateQuestion = async (values) => {
  //   try {
  //     const payload = {
  //       question: values.question,
  //       options: [
  //         { title: values.option1 },
  //         { title: values.option2 },
  //         { title: values.option3 },
  //         { title: values.option4 }
  //       ]
  //     };

  //     await apiService.post(
  //       `${API_PREFIX}/types/${selectedType}/question/moodboard`,
  //       payload
  //     );

  //     message.success('Question created successfully');

  //     setQuestionModalOpen(false);
  //     form.resetFields();

  //     // 🔁 Refresh questions list
  //     fetchGallery(selectedType);

  //   } catch (err) {
  //     message.error('Failed to create question');
  //   }
  // };



  const createEstimateQuestion = async (values) => {
    try {
      const payload = {
        question: values.question,
        questionType: values.questionType,
        options: values.options?.map((opt, index) => ({
          title: opt.title,
          order: index + 1
        })) || []
      };

      await apiService.post(
        `${API_PREFIX}/types/${selectedType}/question/moodboard`,
        payload
      );

      message.success("Question created successfully");

      setQuestionModalOpen(false);
      form.resetFields();
      setQuestionType("text");
      setOptions([""]);

      // 🔁 Refresh questions list
      fetchGallery(selectedType);

    } catch (err) {
      message.error("Failed to create question");
    }
  };



  // 1. Fetch Categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await apiService.get(API_PREFIX);
        setCategories(res.categories || res.data || []);
      } catch (err) { message.error("Failed to load categories"); }
    };
    fetchCats();
  }, []);

  // 2. Cascade Fetching Logic
  const handleCatChange = async (val) => {
    setSelectedCat(val); setSelectedSub(null); setSelectedType(null); setGallery(null);
    try {
      const res = await apiService.get(`${API_PREFIX}/${val}/subcategories`);
      setSubcategories(res.data || []);
    } catch (err) { message.error("Failed to load subcategories"); }
  };

  const handleSubChange = async (val) => {
    setSelectedSub(val); setSelectedType(null); setGallery(null);
    try {
      const res = await apiService.get(`${API_PREFIX}/${selectedCat}/subcategories/${val}/types`);
      setTypes(res.data || []);
    } catch (err) { message.error("Failed to load types"); }
  };

  const fetchGallery = useCallback(async (typeId) => {
    if (!typeId) return;
    setLoading(true);
    try {
      const res = await apiService.get(`${API_PREFIX}/types/${typeId}/questions`);
      setGallery(res.data || null);
    } catch (err) { setGallery(null); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (selectedType) fetchGallery(selectedType); }, [selectedType, fetchGallery]);

  // 3. Image Actions
  const handleUpload = async ({ file, type }) => {
    const formData = new FormData();
    const endpoint = type === 'preview' ? 'preview' : 'moodboard';
    formData.append(type === 'preview' ? 'previewImage' : 'moodboardImages', file);

    setActionLoading(true);
    try {
      await apiService.post(`${API_PREFIX}/types/${selectedType}/gallery/${endpoint}`, formData);
      message.success(`${type} image uploaded successfully`);
      fetchGallery(selectedType);
    } catch (err) { message.error("Upload failed"); }
    finally { setActionLoading(false); }
  };

  const deleteQuestion = async (questionId) => {
    try {
      await apiService.post(
        `${API_PREFIX}/types/${selectedType}/question/moodboard/delete`,
        {
          question_id: questionId
        }
      );

      message.success('Question deleted successfully');

      // 🔁 Refresh questions list
      fetchGallery(selectedType);

    } catch (err) {
      message.error('Failed to delete question');
    }
  };


  const handleUpdateTitle = async () => {
    try {
      await apiService.put(`${API_PREFIX}/types/${selectedType}/gallery/image-title`, {
        imageId: editModal.imageId, title: editModal.title, type: editModal.type
      });
      message.success("Title updated");
      setEditModal({ ...editModal, open: false });
      fetchGallery(selectedType);
    } catch (err) { message.error("Update failed"); }
  };

  // 4. Preview Helper
  const showFullImage = (url) => {
    setPreviewImage(url.startsWith('http') ? url : `${BASE_URL}${url}`);
    setPreviewVisible(true);
  };

  return (
    <div className="p-6 bg-[#f0f2f5] min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 flex justify-between items-center border-b-4" style={{ borderBottomColor: THEME.primary }}>
          <Space size="large">
            <div className="bg-purple-600 p-3 rounded-xl shadow-lg shadow-purple-200">
              <PictureOutlined className="text-white text-2xl" />
            </div>
            <div>
              <Title level={3} className="m-0">Gallery & Assets</Title>
              <Text className="text-gray-400">Manage high-quality images for your master types</Text>
            </div>
          </Space>
        </div>

        {/* Filters */}
        <Card className="rounded-2xl shadow-sm mb-6 border-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Text strong className="text-xs text-gray-400 uppercase">Category</Text>
              <Select size="large" className="w-full" placeholder="Choose Category" onChange={handleCatChange} value={selectedCat}>
                {categories.map(c => <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Text strong className="text-xs text-gray-400 uppercase">Subcategory</Text>
              <Select size="large" className="w-full" placeholder="Choose Sub" disabled={!selectedCat} onChange={handleSubChange} value={selectedSub}>
                {subcategories.map(s => <Select.Option key={s._id} value={s._id}>{s.label}</Select.Option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Text strong className="text-xs text-gray-400 uppercase">Master Type</Text>
              <Select size="large" className="w-full" placeholder="Choose Type" disabled={!selectedSub} onChange={setSelectedType} value={selectedType}>
                {types.map(t => <Select.Option key={t._id} value={t._id}>{t.label}</Select.Option>)}
              </Select>
            </div>
          </div>
        </Card>

        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl"><Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: THEME.primary }} spin />} /></div>
        ) : selectedType ? (
          <div className="space-y-8">

            {/* --- QUESTIONS SECTION --- */}
            {/* <Divider /> */}




            <section>
              <div className="flex justify-between items-center mb-6 mt-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <AppstoreOutlined style={{ color: THEME.primary }} />
                  </div>
                  <Title level={4} className="m-0">Estimate Questions</Title>
                </div>

                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{
                    background: THEME.primary,
                    borderRadius: 12,
                    border: 'none'
                  }}
                  onClick={() => setQuestionModalOpen(true)}
                >
                  Add Question
                </Button>
              </div>

              {gallery && gallery.length > 0 ? (
                <Card
                  className="rounded-2xl shadow-sm border-none"
                >
                  {/* Question row with delete on right */}
                  {/* {gallery && gallery.length > 0 && gallery.map((obj) => {
                    console.log(`objecttttttttttt`,obj)
                    return (

                      <div className="flex justify-between items-start gap-4 mb-4">
                        <Title level={5} className="m-0 flex-1">
                          {obj.question}
                        </Title>

                        <Popconfirm title="Delete question?" okText="Yes"
                          cancelText="No"
                          onConfirm={() => deleteQuestion(obj._id)}>
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                      </div>
                    )
                  })} */}


                  {gallery && gallery.length > 0 && gallery.map((obj) => {
  return (
    <div
      key={obj._id}
      className="border rounded-lg p-3 mb-4 bg-white"
    >
      {/* Question Row */}
      <div className="flex justify-between items-start gap-4">
        <Title level={5} className="m-0 flex-1">
          {obj.question}
        </Title>

        <Popconfirm
          title="Delete question?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteQuestion(obj._id)}
        >
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </div>

      {/* Options Pills */}
      {obj.questionType === "options" && obj.options?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {obj.options.map((opt, index) => (
            <span
              key={opt._id || index}
              className="px-3 py-1 text-sm rounded-full bg-purple-600 text-white shadow-sm"
            >
              {opt.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
})}

                </Card>
              ) : (
                <Empty
                  description="No questions added for this type"
                  className="p-20 bg-white rounded-3xl"
                />
              )}
            </section>


            {/* 👇 ADD QUESTION MODAL (PASTE HERE) */}




            <Modal
              title={
                <div className="flex items-center gap-3">
                  <Avatar
                    size={40}
                    style={{ background: THEME.primary }}
                    icon={<AppstoreOutlined />}
                  />
                  <span className="text-lg font-semibold">
                    Add Estimate Question
                  </span>
                </div>
              }
              open={questionModalOpen}
              onCancel={() => {
                setQuestionModalOpen(false);
                form.resetFields();
                setQuestionType("text");
                setOptions([""]);
              }}
              footer={null}
              width={600}
              centered
              destroyOnClose
              maskClosable={false}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                  createEstimateQuestion({
                    ...values,
                    questionType,
                    options:
                      questionType === "options"
                        ? options.map((opt) => ({ title: opt }))
                        : []
                  });
                }}
              >
                {/* Question */}
                <Form.Item
                  label="Question"
                  name="question"
                  rules={[{ required: true, message: "Please enter question" }]}
                >
                  <Input.TextArea
                    rows={2}
                    placeholder="Type your question to add"
                  />
                </Form.Item>

                {/* Question Type */}
                <Form.Item label="Question Type">
                  <Select
                    value={questionType}
                    onChange={(val) => setQuestionType(val)}
                  >
                    <Select.Option value="text">Text</Select.Option>
                    <Select.Option value="options">Options</Select.Option>
                  </Select>
                </Form.Item>

                {/* Options (only if type === options) */}
                {questionType === "options" && (
                  <Form.Item label="Options" required>
                    <div className="flex flex-col gap-3">
                      {options.map((opt, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input
                            placeholder={`Option ${index + 1}`}
                            value={opt}
                            onChange={(e) => {
                              const updated = [...options];
                              updated[index] = e.target.value;
                              setOptions(updated);
                            }}
                          />

                          {options.length > 1 && (
                            <Button
                              danger
                              type="text"
                              icon={<DeleteOutlined />}
                              onClick={() => {
                                setOptions(options.filter((_, i) => i !== index));
                              }}
                            />
                          )}
                        </div>
                      ))}

                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => setOptions([...options, ""])}
                        style={{ width: "fit-content" }}
                      >
                        Add Option
                      </Button>
                    </div>
                  </Form.Item>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    onClick={() => {
                      setQuestionModalOpen(false);
                      form.resetFields();
                      setQuestionType("text");
                      setOptions([""]);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                    style={{
                      background: THEME.primary,
                      borderRadius: 10,
                      border: "none"
                    }}
                  >
                    Create Question
                  </Button>
                </div>
              </Form>
            </Modal>



          </div>
        ) : (
          <div className="bg-white rounded-3xl p-24 text-center border-2 border-dashed border-gray-100">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <PictureOutlined style={{ fontSize: 40, color: '#d9d9d9' }} />
            </div>
            <Title level={4} className="text-gray-300">Select a type above to start managing assets</Title>
          </div>
        )}
      </div>

      {/* --- LIGHTBOX PREVIEW --- */}
      <Image
        preview={{
          visible: previewVisible,
          src: previewImage,
          onVisibleChange: (value) => setPreviewVisible(value),
        }}
      />

      {/* --- EDIT TITLE MODAL --- */}
      <Modal
        title={<Text strong className="text-purple-700">Update Asset Name</Text>}
        open={editModal.open}
        onOk={handleUpdateTitle}
        onCancel={() => setEditModal({ ...editModal, open: false })}
        okButtonProps={{ style: { background: THEME.primary, borderRadius: '8px' } }}
      >
        <div className="py-4">
          <Input
            size="large"
            prefix={<EditOutlined className="text-gray-300" />}
            value={editModal.title}
            onChange={(e) => setEditModal({ ...editModal, title: e.target.value })}
            placeholder="New title name..."
          />
        </div>
      </Modal>

      {/* Global Action Loader */}
      {actionLoading && (
        <div className="fixed inset-0 z-[9999] bg-white/60 backdrop-blur-sm flex items-center justify-center">
          <Card className="shadow-2xl rounded-2xl border-none">
            <Space direction="vertical" align="center" size="large">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 32, color: THEME.primary }} spin />} />
              <Text strong className="text-purple-800">Updating your gallery...</Text>
            </Space>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TypesGallery;