import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Avatar,
  Button,
  Tabs,
  Tag,
  Progress,
  List,
  Divider,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  Select,
  message,
  Row,
  Col,
  Statistic,
  Timeline,
  Badge,
  Switch,
  Dropdown,
  Tooltip,
  Rate,
  Timeline as AntTimeline,
  Empty
} from 'antd';
import {
  EditOutlined,
  CameraOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  TrophyOutlined,
  SettingOutlined,
  BookOutlined,
  TeamOutlined,
  DollarOutlined,
  HeartOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  MoreOutlined,
  EyeOutlined,
  MessageOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
  InstagramOutlined,
  BellOutlined,
  LogoutOutlined,
  LockOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const MyProfile = () => {
  const navigate = useNavigate();
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [profileForm] = Form.useForm();

  // Sample user data
  const userData = {
    name: "Alex Johnson",
    title: "Senior UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    cover: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=300&fit=crop",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "March 2023",
    bio: "Passionate UI/UX designer with 5+ years of experience creating beautiful and functional digital experiences. Specialized in mobile app design and user research.",
    skills: [
      { name: "UI/UX Design", level: 95 },
      { name: "Figma", level: 90 },
      { name: "Prototyping", level: 88 },
      { name: "User Research", level: 85 },
      { name: "Frontend Development", level: 75 },
      { name: "Design Systems", level: 82 },
      { name: "User Testing", level: 78 },
      { name: "Motion Design", level: 70 }
    ],
    stats: {
      projects: 47,
      clients: 32,
      rating: 4.9,
      earnings: "$12.8k",
      completed: 42,
      inProgress: 5
    },
    recentProjects: [
      { 
        name: "E-commerce Mobile App", 
        status: "completed", 
        date: "2 days ago",
        client: "ShopEasy Inc.",
        budget: "$4,500",
        rating: 5
      },
      { 
        name: "Banking Dashboard", 
        status: "in progress", 
        date: "1 week ago",
        client: "Global Bank",
        budget: "$6,200",
        rating: 4.8
      },
      { 
        name: "Healthcare Portal", 
        status: "completed", 
        date: "2 weeks ago",
        client: "MediCare Solutions",
        budget: "$3,800",
        rating: 4.9
      },
      { 
        name: "Travel Booking Platform", 
        status: "pending", 
        date: "3 weeks ago",
        client: "TravelEase",
        budget: "$5,100",
        rating: 4.7
      }
    ],
    education: [
      { degree: "MSc in Human-Computer Interaction", school: "Stanford University", year: "2020", grade: "3.9/4.0" },
      { degree: "BSc in Computer Science", school: "MIT", year: "2018", grade: "3.8/4.0" },
      { degree: "High School Diploma", school: "Boston High School", year: "2014", grade: "4.0/4.0" }
    ],
    certifications: [
      { name: "Google UX Design Professional Certificate", issuer: "Google", date: "2023", badge: "premium" },
      { name: "Adobe Creative Cloud Certified", issuer: "Adobe", date: "2022", badge: "professional" },
      { name: "Interaction Design Foundation", issuer: "IDF", date: "2021", badge: "expert" },
      { name: "Figma Advanced Certification", issuer: "Figma", date: "2021", badge: "advanced" }
    ],
    socialLinks: {
      linkedin: "alexjohnson",
      twitter: "alexjdesign",
      github: "alexjohnson",
      instagram: "alexj.creative"
    },
    availability: "Available for new projects",
    hourlyRate: "$85/hour"
  };

  const handleEditProfile = (values) => {
    console.log('Profile updated:', values);
    message.success('Profile updated successfully!');
    setEditProfileModal(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: "green",
      "in progress": "blue",
      pending: "orange"
    };
    return colors[status] || "default";
  };

  const getBadgeColor = (badge) => {
    const colors = {
      premium: "gold",
      professional: "blue",
      expert: "purple",
      advanced: "green"
    };
    return colors[badge] || "default";
  };

  const moreMenuItems = [
    {
      key: '1',
      label: 'View Public Profile',
      icon: <EyeOutlined />
    },
    {
      key: '2',
      label: 'Share Profile',
      icon: <ShareAltOutlined />
    },
    {
      key: '3',
      label: 'Download Resume',
      icon: <DownloadOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: '4',
      label: 'Settings',
      icon: <SettingOutlined />
    }
  ];

  const socialIcons = [
    { platform: 'linkedin', icon: <LinkedinOutlined />, color: '#0077b5' },
    { platform: 'twitter', icon: <TwitterOutlined />, color: '#1da1f2' },
    { platform: 'github', icon: <GithubOutlined />, color: '#333' },
    { platform: 'instagram', icon: <InstagramOutlined />, color: '#e4405f' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                type="text" 
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-purple-600"
              >
                Back
              </Button>
              <Divider type="vertical" className="h-6" />
              <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Tooltip title="Notifications">
                <Button 
                  type="text" 
                  icon={<BellOutlined />}
                  className="text-gray-500 hover:text-purple-600"
                />
              </Tooltip>
              
              <Tooltip title="Settings">
                <Button 
                  type="text" 
                  icon={<SettingOutlined />}
                  className="text-gray-500 hover:text-purple-600"
                />
              </Tooltip>
              
              <Dropdown 
                menu={{ items: moreMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button 
                  type="text" 
                  icon={<MoreOutlined />}
                  className="text-gray-500 hover:text-purple-600"
                />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Photo Section */}
      <div className="relative h-80 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-b-3xl">
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-b-3xl opacity-20"
          style={{ backgroundImage: `url(${userData.cover})` }}
        />
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div className="flex items-end space-x-6">
            <div className="relative">
              <Avatar
                size={140}
                src={userData.avatar}
                className="border-4 border-white shadow-2xl"
              />
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<CameraOutlined />}
                className="absolute bottom-2 right-2 bg-purple-600 border-2 border-white shadow-lg"
              />
            </div>
            
            <div className="text-white mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <h1 className="text-4xl font-bold">{userData.name}</h1>
                <Tag 
                  color="green" 
                  icon={<CheckCircleOutlined />}
                  className="border-0 bg-green-500 text-white"
                >
                  Verified
                </Tag>
              </div>
              <p className="text-xl opacity-90 mb-3">{userData.title}</p>
              
              <div className="flex items-center space-x-6 mb-3">
                <span className="flex items-center space-x-2 text-purple-100">
                  <MailOutlined />
                  <span>{userData.email}</span>
                </span>
                <span className="flex items-center space-x-2 text-purple-100">
                  <PhoneOutlined />
                  <span>{userData.phone}</span>
                </span>
                <span className="flex items-center space-x-2 text-purple-100">
                  <EnvironmentOutlined />
                  <span>{userData.location}</span>
                </span>
                <span className="flex items-center space-x-2 text-purple-100">
                  <DollarOutlined />
                  <span>{userData.hourlyRate}</span>
                </span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {socialIcons.map((social) => (
                  <Tooltip key={social.platform} title={social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}>
                    <Button
                      type="text"
                      icon={social.icon}
                      className="text-white hover:bg-white/20 border-0"
                      style={{ color: social.color }}
                    />
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>

          <Space>
            <Button 
              icon={<MessageOutlined />}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              Contact
            </Button>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 border-0 shadow-lg"
              onClick={() => setEditProfileModal(true)}
            >
              Edit Profile
            </Button>
          </Space>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-20 relative z-10">
        <Row gutter={[24, 24]}>
          {/* Left Sidebar */}
          <Col xs={24} lg={8}>
            {/* Availability Card */}
            <Card className="mb-6 shadow-lg border-0 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <div className="text-center">
                <CheckCircleOutlined className="text-3xl mb-3" />
                <h3 className="text-lg font-semibold mb-2">{userData.availability}</h3>
                <p className="opacity-90">Ready to start new projects immediately</p>
              </div>
            </Card>

            {/* Bio Card */}
            <Card className="mb-6 shadow-lg border-0 rounded-2xl">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
                  <UserOutlined className="mr-2 text-purple-600" />
                  About Me
                </h3>
                <p className="text-gray-600 leading-relaxed text-left">{userData.bio}</p>
                
                <Divider className="my-4" />
                
                <Space direction="vertical" size="small" className="w-full text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Member since</span>
                    <span className="flex items-center text-gray-700 font-medium">
                      <CalendarOutlined className="mr-2 text-purple-600" />
                      {userData.joinDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Response Time</span>
                    <Tag color="blue" className="border-0">Within 2 hours</Tag>
                  </div>
                </Space>
              </div>
            </Card>

            {/* Skills Card */}
            <Card 
              title={
                <span className="text-purple-700 flex items-center">
                  <StarOutlined className="mr-2" />
                  Skills & Expertise
                </span>
              } 
              className="shadow-lg border-0 rounded-2xl mb-6"
              extra={<span className="text-purple-600 font-semibold">{userData.skills.length} skills</span>}
            >
              <div className="max-h-80 overflow-y-auto pr-2">
                {userData.skills.map((skill, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-purple-600 font-semibold">{skill.level}%</span>
                    </div>
                    <Progress 
                      percent={skill.level} 
                      strokeColor={{
                        '0%': '#8B5CF6',
                        '100%': '#6366F1',
                      }}
                      showInfo={false}
                      className="mb-4"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Stats Card */}
            <Card className="shadow-lg border-0 rounded-2xl">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Statistic
                    title="Projects"
                    value={userData.stats.projects}
                    prefix={<BookOutlined className="text-purple-600" />}
                    valueStyle={{ color: '#7C3AED' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Clients"
                    value={userData.stats.clients}
                    prefix={<TeamOutlined className="text-purple-600" />}
                    valueStyle={{ color: '#7C3AED' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Completed"
                    value={userData.stats.completed}
                    prefix={<CheckCircleOutlined className="text-green-500" />}
                    valueStyle={{ color: '#10B981' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="In Progress"
                    value={userData.stats.inProgress}
                    prefix={<Progress type="circle" percent={50} size={20} />}
                    valueStyle={{ color: '#3B82F6' }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Main Content Area */}
          <Col xs={24} lg={16}>
            <Card className="shadow-lg border-0 rounded-2xl">
              <Tabs 
                activeKey={activeTab}
                onChange={setActiveTab}
                className="profile-tabs"
                tabBarStyle={{ borderBottom: '1px solid #f0f0f0' }}
                items={[
                  {
                    key: 'projects',
                    label: (
                      <span className="text-purple-700 flex items-center">
                        <BookOutlined className="mr-2" />
                        Projects
                        <Badge count={userData.stats.projects} offset={[10, -5]} size="small" />
                      </span>
                    ),
                    children: (
                      <div>
                        <List
                          dataSource={userData.recentProjects}
                          renderItem={(project) => (
                            <List.Item 
                              className="border-0 py-4 hover:bg-purple-50 rounded-lg transition-all duration-300 cursor-pointer group"
                              actions={[
                                <Button type="link" className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                  View Details
                                </Button>
                              ]}
                            >
                              <List.Item.Meta
                                avatar={
                                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                                    <BookOutlined className="text-purple-600 text-xl" />
                                  </div>
                                }
                                title={
                                  <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                                      {project.name}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      <Badge 
                                        status={getStatusColor(project.status)} 
                                        text={project.status} 
                                      />
                                      <Rate 
                                        disabled 
                                        defaultValue={project.rating} 
                                        allowHalf 
                                        style={{ fontSize: 14 }} 
                                      />
                                    </div>
                                  </div>
                                }
                                description={
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-gray-500">
                                      <span>Client: {project.client}</span>
                                      <span className="font-semibold text-green-600">{project.budget}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">Last updated {project.date}</span>
                                    </div>
                                  </div>
                                }
                              />
                            </List.Item>
                          )}
                        />
                        <Button 
                          type="dashed" 
                          block 
                          icon={<PlusOutlined />}
                          className="mt-4 border-purple-300 text-purple-600 hover:bg-purple-50 h-12 text-lg"
                        >
                          Add New Project
                        </Button>
                      </div>
                    )
                  },
                  {
                    key: 'education',
                    label: (
                      <span className="text-purple-700 flex items-center">
                        <TrophyOutlined className="mr-2" />
                        Education
                      </span>
                    ),
                    children: (
                      <AntTimeline>
                        {userData.education.map((edu, index) => (
                          <AntTimeline.Item 
                            key={index}
                            dot={<TrophyOutlined className="text-purple-600 text-lg" />}
                            color="purple"
                          >
                            <Card size="small" className="border-l-4 border-l-purple-500 ml-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-1">{edu.degree}</h4>
                                  <p className="text-gray-600 mb-1">{edu.school}</p>
                                  <p className="text-gray-500 text-sm">{edu.year}</p>
                                </div>
                                <Tag color="purple" className="border-0 bg-purple-100 text-purple-700">
                                  {edu.grade}
                                </Tag>
                              </div>
                            </Card>
                          </AntTimeline.Item>
                        ))}
                      </AntTimeline>
                    )
                  },
                  {
                    key: 'certifications',
                    label: (
                      <span className="text-purple-700 flex items-center">
                        <SafetyCertificateOutlined className="mr-2" />
                        Certifications
                        <Badge count={userData.certifications.length} offset={[10, -5]} size="small" />
                      </span>
                    ),
                    children: (
                      <div className="space-y-4">
                        {userData.certifications.map((cert, index) => (
                          <Card 
                            key={index}
                            className="border-l-4 border-l-purple-500 hover:shadow-md transition-all duration-300 cursor-pointer group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                                    {cert.name}
                                  </h4>
                                  <Tag color={getBadgeColor(cert.badge)} className="border-0">
                                    {cert.badge}
                                  </Tag>
                                </div>
                                <div className="flex items-center space-x-4 text-gray-600">
                                  <span>Issued by: {cert.issuer}</span>
                                  <span>•</span>
                                  <span>Date: {cert.date}</span>
                                </div>
                              </div>
                              <Button 
                                type="link" 
                                icon={<DownloadOutlined />}
                                className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                Download
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )
                  },
                  {
                    key: 'activity',
                    label: (
                      <span className="text-purple-700 flex items-center">
                        <GlobalOutlined className="mr-2" />
                        Activity
                      </span>
                    ),
                    children: (
                      <Empty 
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No recent activity"
                      />
                    )
                  }
                ]}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        title={
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-700">Edit Profile</h2>
            <p className="text-gray-600">Update your personal information</p>
          </div>
        }
        open={editProfileModal}
        onCancel={() => setEditProfileModal(false)}
        footer={null}
        width={700}
        centered
        className="profile-edit-modal"
      >
        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleEditProfile}
          initialValues={{
            name: userData.name,
            title: userData.title,
            email: userData.email,
            phone: userData.phone,
            location: userData.location,
            bio: userData.bio,
            hourlyRate: userData.hourlyRate,
            availability: userData.availability
          }}
        >
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <Avatar
                size={120}
                src={userData.avatar}
                className="border-4 border-purple-100 shadow-lg mb-4"
              />
              <Upload>
                <Button 
                  type="primary" 
                  shape="circle" 
                  size="small"
                  icon={<CameraOutlined />}
                  className="absolute bottom-4 right-0 bg-purple-600 border-2 border-white shadow-lg"
                />
              </Upload>
            </div>
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
                <Input 
                  prefix={<UserOutlined className="text-purple-600" />}
                  size="large"
                  placeholder="Enter your full name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Job Title" name="title" rules={[{ required: true }]}>
                <Input 
                  size="large"
                  placeholder="e.g. Senior UI/UX Designer"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input 
              prefix={<MailOutlined className="text-purple-600" />}
              size="large"
              placeholder="your.email@example.com"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Phone" name="phone">
                <Input 
                  prefix={<PhoneOutlined className="text-purple-600" />}
                  size="large"
                  placeholder="+1 (555) 123-4567"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Location" name="location">
                <Input 
                  prefix={<EnvironmentOutlined className="text-purple-600" />}
                  size="large"
                  placeholder="City, Country"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Hourly Rate" name="hourlyRate">
                <Input 
                  prefix={<DollarOutlined className="text-purple-600" />}
                  size="large"
                  placeholder="$85/hour"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Availability" name="availability">
                <Select size="large" placeholder="Select availability">
                  <Option value="Available for new projects">Available</Option>
                  <Option value="Busy with current projects">Busy</Option>
                  <Option value="Not available">Not Available</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Bio" name="bio">
            <TextArea 
              rows={4} 
              placeholder="Tell us about yourself, your experience, and what you're passionate about..."
              showCount 
              maxLength={500}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex space-x-3">
              <Button 
                size="large"
                className="flex-1 border-purple-600 text-purple-600 h-12"
                onClick={() => setEditProfileModal(false)}
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 border-0 h-12 text-lg shadow-lg"
              >
                Update Profile
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyProfile;