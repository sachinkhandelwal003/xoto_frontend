// src/components/homepage/AiPlanner/GardenCalculator.jsx
import React, { useState, useEffect } from 'react';
import {
  Card, Button, Typography, Form, Input, Select, Space, Row, Col, 
  message, Spin, Result, Divider, Image, Badge, Empty, Tag, Checkbox,
  Modal, Radio
} from 'antd';
import {
  UserOutlined, MailOutlined, CheckCircleOutlined,
  SmileOutlined, HomeOutlined, BuildOutlined,
  EnvironmentOutlined, CalculatorOutlined, PhoneFilled, 
  ArrowRightOutlined, ArrowLeftOutlined, CheckOutlined,
  CompassOutlined, PictureOutlined, ExperimentOutlined ,
  EnvironmentFilled, StarFilled, SelectOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../../manageApi/utils/custom.apiservice';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const { Title, Text } = Typography;
const { Option } = Select;

const BASE_URL = 'http://localhost:5000';
const BRAND_PURPLE = '#5C039B';

const steps = [
  { title: 'Location', icon: <CompassOutlined /> },
  { title: 'Service', icon: <EnvironmentOutlined /> },
  { title: 'Style', icon: <HomeOutlined /> },
  { title: 'Preview', icon: <PictureOutlined /> },
  { title: 'Moodboard', icon: <ExperimentOutlined  /> },
  { title: 'Dimensions', icon: <CalculatorOutlined /> },
  { title: 'Packages', icon: <BuildOutlined /> },
  { title: 'Contact', icon: <PhoneFilled /> },
];

// Reverse geocoding function
const reverseGeocode = async (lat, lng) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
  );
  const data = await res.json();
  const a = data.address || {};

  const city =
    a.city ||
    a.town ||
    a.municipality ||
    a.county ||
    "";

  const area =
    a.suburb ||
    a.neighbourhood ||
    a.quarter ||
    "";

  return {
    country: a.country || "",
    state: a.state || a.region || "",
    city,
    area,
    fullAddress: data.display_name || ""
  };
};

// Map Picker Component
const MapPicker = ({ coords, onChange }) => {
  const [position, setPosition] = useState(coords.lat && coords.lng ? [coords.lat, coords.lng] : [25.2048, 55.2708]);
  
  useEffect(() => {
    if (coords.lat && coords.lng) {
      setPosition([coords.lat, coords.lng]);
    }
  }, [coords.lat, coords.lng]);

  const LocationMarker = () => {
    useMapEvents({
      async click(e) {
        const newPosition = [e.latlng.lat, e.latlng.lng];
        setPosition(newPosition);
        onChange({ lat: newPosition[0], lng: newPosition[1] });
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: 300, width: "100%", borderRadius: "1rem", zIndex: 1 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

const Calculator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [form] = Form.useForm();

  // Data Collections
  const [subcategories, setSubcategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [packages, setPackages] = useState([]);
  const [typeGallery, setTypeGallery] = useState(null);
  const [moodboardData, setMoodboardData] = useState([]);
  const [selectedMoodboardImages, setSelectedMoodboardImages] = useState([]);

  // User Selections
  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
    country: "",
    state: "",
    city: "",
    area: "",
    address: ""
  });

  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [splitName, setSplitName] = useState({ firstName: '', lastName: '' });
  
  const [loading, setLoading] = useState({
    subcat: true,
    types: false,
    gallery: false,
    moodboard: false,
    packages: true,
    submitting: false,
    geocoding: false
  });

  const areaSqFt = length && width ? Math.round(parseFloat(length) * parseFloat(width)) : 0;

  // Country codes for dropdown
  const countryCodes = [
    { value: '+971', label: 'UAE (+971)' },
    { value: '+966', label: 'KSA (+966)' },
    { value: '+974', label: 'Qatar (+974)' },
    { value: '+968', label: 'Oman (+968)' },
    { value: '+973', label: 'Bahrain (+973)' },
    { value: '+965', label: 'Kuwait (+965)' },
    { value: '+91', label: 'India (+91)' },
    { value: '+92', label: 'Pakistan (+92)' },
    { value: '+44', label: 'UK (+44)' },
    { value: '+1', label: 'USA/Canada (+1)' },
  ];

  // --- API FETCHING ---
  useEffect(() => {
    const initFetch = async () => {
      try {
        const res = await apiService.get("/estimate/master/category/name/Landscaping/subcategories");
        if (res.success) setSubcategories(res.data || []);
      } catch (err) {
        message.error("Error loading services");
      } finally {
        setLoading(prev => ({ ...prev, subcat: false }));
      }
    };
    initFetch();
  }, []);

  useEffect(() => {
    if (!selectedSubcategory) return;
    const fetchTypes = async () => {
      setLoading(prev => ({ ...prev, types: true }));
      try {
        const sub = subcategories.find(s => s._id === selectedSubcategory);
        const res = await apiService.get(`/estimate/master/category/${sub.category}/subcategories/${selectedSubcategory}/types`);
        if (res.success) setTypes(res.data || []);
      } catch (err) {
        message.error("Error loading styles");
      } finally {
        setLoading(prev => ({ ...prev, types: false }));
      }
    };
    fetchTypes();
  }, [selectedSubcategory, subcategories]);

  useEffect(() => {
    const fetchPkgs = async () => {
      try {
        const res = await apiService.get("/packages");
        if (res.success) setPackages(res.packages.filter(p => p.isActive));
      } catch (err) {
        message.error("Error loading packages");
      } finally {
        setLoading(prev => ({ ...prev, packages: false }));
      }
    };
    fetchPkgs();
  }, []);

  // --- ACTIONS ---
  const handleGetLocation = () => {
    if (!navigator.geolocation) return message.error("Geolocation not supported");
    setLoading(prev => ({ ...prev, submitting: true, geocoding: true }));
    
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        
        try {
          const geo = await reverseGeocode(lat, lng);
          
          setCoords({
            lat,
            lng,
            country: geo.country,
            state: geo.state,
            city: geo.city,
            area: geo.area,
            address: geo.fullAddress
          });
          
          message.success("Location synchronized!");
        } catch (error) {
          setCoords({
            lat,
            lng,
            country: "",
            state: "",
            city: "",
            area: "",
            address: ""
          });
          message.warning("Location detected but address details unavailable");
        } finally {
          setLoading(prev => ({ ...prev, submitting: false, geocoding: false }));
        }
      },
      () => {
        message.error("Location access denied");
        setLoading(prev => ({ ...prev, submitting: false, geocoding: false }));
      }
    );
  };

  const handleMapLocationChange = async ({ lat, lng }) => {
    setLoading(prev => ({ ...prev, geocoding: true }));
    try {
      const geo = await reverseGeocode(lat, lng);
      setCoords({
        lat,
        lng,
        country: geo.country,
        state: geo.state,
        city: geo.city,
        area: geo.area,
        address: geo.fullAddress
      });
      message.success("Location updated!");
    } catch (error) {
      message.error("Could not fetch address details");
    } finally {
      setLoading(prev => ({ ...prev, geocoding: false }));
    }
  };

  const fetchTypePreview = async (typeId) => {
    setLoading(prev => ({ ...prev, gallery: true }));
    try {
      const res = await apiService.get(`/estimate/master/category/types/${typeId}/gallery`);
      if (res.success) setTypeGallery(res.gallery);
    } catch (err) {
      setTypeGallery(null);
    } finally {
      setLoading(prev => ({ ...prev, gallery: false }));
    }
  };

  const handleGenerateMoodboard = async () => {
    setLoading(prev => ({ ...prev, moodboard: true }));
    try {
      const res = await apiService.get(`/estimate/master/category/types/${selectedType}/gallery/moodboard/generate`);
      if (res.success) {
        const moodboard = res.moodboard || [];
        setMoodboardData(moodboard);
        // Auto-select first 4 images or all if less than 4
        const autoSelected = moodboard.slice(0, Math.min(4, moodboard.length)).map(img => img._id || img.id);
        setSelectedMoodboardImages(autoSelected);
        setActiveStep(4);
        message.success("Moodboard generated! Select your favorite images.");
      }
    } catch (err) {
      message.error("Moodboard generation failed");
    } finally {
      setLoading(prev => ({ ...prev, moodboard: false }));
    }
  };

  const handleMoodboardImageToggle = (imageId) => {
    setSelectedMoodboardImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  const onFinalSubmit = async (values) => {
    setLoading(prev => ({ ...prev, submitting: true }));
    
    // Get selected moodboard images data
    const selectedMoodboardData = moodboardData.filter(img => 
      selectedMoodboardImages.includes(img._id || img.id)
    ).map(img => ({
      id: img._id || img.id,
      url: img.url || img.imageUrl
    }));

    // Split full name into first and last
    const fullName = values.customer_name || "";
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      service_type: "landscape",
      customer_name: {
        first_name: firstName,
        last_name: lastName
      },
      customer_email: values.customer_email,
      customer_mobile: {
        country_code: countryCode,
        number: values.mobileNumber
      },
      type: selectedType,
      type_gallery_snapshot: {
        moodboardImages: selectedMoodboardData
      },
      subcategory: selectedSubcategory,
      package: selectedPackage,
      area_length: parseFloat(length),
      area_width: parseFloat(width),
      area_sqft: areaSqFt,
      description: `Landscaping project for ${areaSqFt} sqft area with ${types.find(t => t._id === selectedType)?.label} style`,
      location: {
        lat: coords.lat,
        lng: coords.lng,
        country: coords.country,
        state: coords.state,
        city: coords.city,
        area: coords.area,
        address: coords.address
      }
    };

    console.log("Submitting payload:", payload); // For debugging

    try {
      await apiService.post("/estimates/submit", payload);
      setActiveStep(8);
      message.success("Estimate submitted successfully!");
    } catch (err) {
      console.error("Submission error:", err);
      message.error("Submission failed. Please try again.");
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  const handleNext = () => {
    if (activeStep === 2 && selectedType) {
      fetchTypePreview(selectedType);
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const validateStep = () => {
    switch (activeStep) {
      case 0: return !!coords.lat;
      case 1: return !!selectedSubcategory;
      case 2: return !!selectedType;
      case 4: return selectedMoodboardImages.length > 0;
      case 5: return areaSqFt >= 100;
      case 6: return !!selectedPackage;
      default: return true;
    }
  };

  // --- UI COMPONENTS ---
  const SelectionCard = ({ item, isSelected, onClick, colorClass }) => (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative h-full p-6 rounded-3xl cursor-pointer transition-all border-2 
        ${isSelected ? `bg-purple-50 shadow-xl` : 'border-gray-100 bg-white hover:border-gray-200'}`}
      style={{ borderColor: isSelected ? BRAND_PURPLE : 'transparent' }}
    >
      {isSelected && <Badge.Ribbon text="Selected" color={BRAND_PURPLE} />}
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4 ${colorClass}`}>
        {item.label ? item.label[0] : 'G'}
      </div>
      <Title level={4} className="mb-1">{item.label}</Title>
      <Text type="secondary" className="text-xs line-clamp-2">{item.description || 'Professional architectural landscaping.'}</Text>
    </motion.div>
  );

  const StepRenderer = () => {
    const variants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    switch (activeStep) {
      case 0:
        return (
          <motion.div {...variants} className="text-center py-10">
            <div className="mb-6 inline-block p-6 rounded-full bg-purple-50">
              <CompassOutlined style={{ color: BRAND_PURPLE, fontSize: '3rem' }} />
            </div>
            <Title level={2}>Locate Your Address</Title>
            <Text className="text-lg text-gray-400 block mb-10">
              We use GPS coordinates for accurate site analysis. Click on the map to adjust your exact location.
            </Text>
            
            <Button 
              size="large" 
              type="primary" 
              icon={<EnvironmentFilled />} 
              onClick={handleGetLocation} 
              loading={loading.submitting}
              className="h-16 px-12 rounded-2xl text-lg shadow-lg mb-8"
              style={{ backgroundColor: BRAND_PURPLE }}
            >
              {coords.lat ? "Update My Location" : "Auto-Detect My Location"}
            </Button>
            
            {coords.lat && (
              <div className="space-y-4">
                <div className="mt-6">
                  <Tag color="purple" className="px-4 py-1 rounded-full text-sm">
                    Coordinates: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                  </Tag>
                </div>
                
                <div className="space-y-2">
                  {coords.country && (
                    <Tag color="purple" className="px-4 py-1 rounded-full">
                      <strong>Country:</strong> {coords.country}
                    </Tag>
                  )}
                  {coords.state && (
                    <Tag color="blue" className="px-4 py-1 rounded-full">
                      <strong>State/Region:</strong> {coords.state}
                    </Tag>
                  )}
                  {coords.city && (
                    <Tag color="green" className="px-4 py-1 rounded-full">
                      <strong>City:</strong> {coords.city}
                    </Tag>
                  )}
                </div>
                
                {coords.address && (
                  <Text type="secondary" className="block mt-4 max-w-xl mx-auto">
                    <strong>Full Address:</strong> {coords.address}
                  </Text>
                )}
                
                <div className="mt-8 max-w-2xl mx-auto">
                  {loading.geocoding ? (
                    <div className="h-64 flex items-center justify-center rounded-2xl bg-gray-100">
                      <Spin size="large" />
                    </div>
                  ) : (
                    <MapPicker
                      coords={coords}
                      onChange={handleMapLocationChange}
                    />
                  )}
                  <Text className="text-xs text-gray-400 mt-2 block">
                    Click anywhere on the map to set your exact location
                  </Text>
                </div>
              </div>
            )}
          </motion.div>
        );

      case 1:
        return (
          <motion.div {...variants}>
            <Title level={2} className="text-center mb-10">What are we designing?</Title>
            <Row gutter={[24, 24]}>
              {subcategories.map(sub => (
                <Col xs={24} sm={12} md={8} key={sub._id} className='p-10'>
                  <SelectionCard 
                    item={sub} 
                    isSelected={selectedSubcategory === sub._id} 
                    onClick={() => setSelectedSubcategory(sub._id)} 
                    colorClass="bg-blue-50 text-blue-600"
                  />
                </Col>
              ))}
            </Row>
          </motion.div>
        );

      case 2:
        return (
          <motion.div {...variants}>
            <Title level={2} className="text-center mb-10">Select Your Aesthetic Style</Title>
            {loading.types ? <div className="text-center py-20"><Spin size="large" /></div> : (
              <Row gutter={[24, 24]}>
                {types.map(t => (
                  <Col xs={24} sm={12} md={8} key={t._id}>
                    <SelectionCard 
                      item={t} 
                      isSelected={selectedType === t._id} 
                      onClick={() => setSelectedType(t._id)} 
                      colorClass="bg-emerald-50 text-emerald-600"
                    />
                  </Col>
                ))}
              </Row>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div {...variants} className="flex flex-col items-center">
            <Title level={2} className="mb-2">Visual Direction</Title>
            <Text type="secondary" className="block mb-10">Base concept for your selected style</Text>
            {loading.gallery ? <Spin size="large" className="py-20" /> : typeGallery ? (
              <Card className="max-w-2xl w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-none">
                <div className="relative">
                  <Image 
                    src={`${BASE_URL}${typeGallery.previewImage?.url}`} 
                    className="w-full h-[400px] object-cover" 
                    alt="Style preview"
                  />
                </div>
                <div className="p-10 text-center">
                  <Title level={3} style={{ color: BRAND_PURPLE }}>{typeGallery.type?.label}</Title>
                  <Text className="text-gray-500 italic block mb-8">
                    "Every detail curated to harmonize with your vision"
                  </Text>
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<ExperimentOutlined />} 
                    loading={loading.moodboard} 
                    onClick={handleGenerateMoodboard}
                    className="h-16 px-12 rounded-2xl text-lg border-none shadow-xl"
                    style={{ backgroundColor: BRAND_PURPLE }}
                  >
                    Generate AI Moodboard
                  </Button>
                </div>
              </Card>
            ) : <Empty description="No preview available" />}
          </motion.div>
        );

      case 4:
        return (
          <motion.div {...variants}>
            <Title level={2} className="text-center mb-2">Select Your Favorite Moodboard Images</Title>
            <Text type="secondary" className="text-center block mb-10">
              Choose the images that best represent your vision ({selectedMoodboardImages.length} selected)
            </Text>
            
            <div className="mb-8 flex justify-center">
              <Tag color="purple" className="px-6 py-2 rounded-full text-lg">
                <SelectOutlined /> Select at least 1 image to continue
              </Tag>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {moodboardData.map((img, i) => {
                const isSelected = selectedMoodboardImages.includes(img._id || img.id);
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ delay: i * 0.1 }}
                    className="group relative"
                    onClick={() => handleMoodboardImageToggle(img._id || img.id)}
                  >
                    <Card 
                      hoverable 
                      className={`overflow-hidden rounded-3xl border-2 transition-all cursor-pointer
                        ${isSelected ? 'border-purple-500 shadow-2xl' : 'border-gray-100 hover:border-gray-300'}`}
                      cover={
                        <div className="relative">
                          <Image 
                            src={`${BASE_URL}${img.url || img.imageUrl}`} 
                            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            alt={`Moodboard item ${i + 1}`}
                          />
                          {isSelected && (
                            <div className="absolute top-4 right-4">
                              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                                <CheckOutlined className="text-white text-lg" />
                              </div>
                            </div>
                          )}
                        </div>
                      }
                    >
                      <div className="text-center">
                        <Checkbox 
                          checked={isSelected}
                          onChange={() => handleMoodboardImageToggle(img._id || img.id)}
                          className="mr-2"
                        >
                          Select
                        </Checkbox>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            
            {selectedMoodboardImages.length > 0 && (
              <div className="mt-10 text-center">
                <Text type="secondary">
                  Selected {selectedMoodboardImages.length} image(s) for your project
                </Text>
              </div>
            )}
          </motion.div>
        );

      case 5:
        return (
          <motion.div {...variants} className="max-w-lg mx-auto py-10">
            <Title level={2} className="text-center mb-10">Project Area</Title>
            <Card className="rounded-[3rem] shadow-2xl overflow-hidden border-none">
              <div className="p-12 text-center text-white" style={{ background: BRAND_PURPLE }}>
                <Text className="text-purple-200 uppercase tracking-widest text-xs font-bold">Total Footprint</Text>
                <div className="text-7xl font-bold my-4">{areaSqFt.toLocaleString()}</div>
                <Text className="text-lg opacity-80">Square Feet</Text>
              </div>
              <div className="p-12 bg-white">
                <Row gutter={24}>
                  <Col span={12}>
                    <Text strong className="text-gray-400 text-xs uppercase">Length (ft)</Text>
                    <Input 
                      size="large" 
                      type="number" 
                      value={length} 
                      onChange={e => setLength(e.target.value)} 
                      className="mt-3 h-14 rounded-2xl border-gray-100" 
                      placeholder="Enter length"
                      min="1"
                    />
                  </Col>
                  <Col span={12}>
                    <Text strong className="text-gray-400 text-xs uppercase">Width (ft)</Text>
                    <Input 
                      size="large" 
                      type="number" 
                      value={width} 
                      onChange={e => setWidth(e.target.value)} 
                      className="mt-3 h-14 rounded-2xl border-gray-100" 
                      placeholder="Enter width"
                      min="1"
                    />
                  </Col>
                </Row>
                {areaSqFt > 0 && (
                  <div className="mt-6 text-center">
                    <Text type={areaSqFt < 100 ? "danger" : "success"}>
                      Minimum area required: 100 sqft (Current: {areaSqFt} sqft)
                    </Text>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        );

      case 6:
        return (
          <motion.div {...variants}>
            <Title level={2} className="text-center mb-10">Select Execution Package</Title>
            <Row gutter={[24, 24]}>
              {packages.map(pkg => (
                <Col xs={24} md={8} key={pkg._id}>
                  <div 
                    onClick={() => setSelectedPackage(pkg._id)}
                    className={`p-10 rounded-[2.5rem] border-2 h-full transition-all cursor-pointer relative
                      ${selectedPackage === pkg._id ? 'bg-purple-50 shadow-xl' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                    style={{ borderColor: selectedPackage === pkg._id ? BRAND_PURPLE : 'transparent' }}
                  >
                    {pkg.popular && (
                      <div 
                        className="absolute top-0 right-0 text-white px-5 py-2 rounded-bl-2xl text-xs font-bold" 
                        style={{ background: BRAND_PURPLE }}
                      >
                        RECOMMENDED
                      </div>
                    )}
                    <Title level={3} style={{ color: selectedPackage === pkg._id ? BRAND_PURPLE : '#111' }}>
                      {pkg.name}
                    </Title>
                    <div className="my-8 space-y-4">
                      {pkg.features?.map((f, i) => (
                        <div key={i} className="text-sm flex items-start">
                          <CheckCircleOutlined className="text-green-500 mr-3 mt-1" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </motion.div>
        );

      case 7:
        const selectedPkg = packages.find(p => p._id === selectedPackage);
        const selectedTypeData = types.find(t => t._id === selectedType);
        const selectedSubcat = subcategories.find(s => s._id === selectedSubcategory);

        return (
          <motion.div {...variants} className="max-w-5xl mx-auto">
            <Row gutter={48}>
              <Col xs={24} lg={10}>
                <div className="rounded-[2.5rem] p-10 text-white h-full shadow-2xl" style={{ backgroundColor: BRAND_PURPLE }}>
                  <Title level={3} className="text-white mb-10">Design Summary</Title>
                  <div className="space-y-8">
                    <div>
                      <Text className="text-purple-300 block text-xs uppercase tracking-widest mb-1">Service Type</Text>
                      <Text strong className="text-white text-xl uppercase">
                        {selectedSubcat?.label || 'Landscaping'}
                      </Text>
                    </div>
                    <div>
                      <Text className="text-purple-300 block text-xs uppercase tracking-widest mb-1">Selected Style</Text>
                      <Text strong className="text-white text-xl">
                        {selectedTypeData?.label || 'Not selected'}
                      </Text>
                    </div>
                    <div>
                      <Text className="text-purple-300 block text-xs uppercase tracking-widest mb-1">Location</Text>
                      <Text strong className="text-white text-sm">
                        {coords.city ? `${coords.city}, ${coords.country}` : 'Location set'}
                      </Text>
                    </div>
                    <div>
                      <Text className="text-purple-300 block text-xs uppercase tracking-widest mb-1">Area Details</Text>
                      <Text strong className="text-white text-xl">{areaSqFt} SQ FT</Text>
                      <Text className="text-purple-300 text-xs">
                        ({length}ft × {width}ft)
                      </Text>
                    </div>
                    <div>
                      <Text className="text-purple-300 block text-xs uppercase tracking-widest mb-1">Moodboard Images</Text>
                      <Text strong className="text-white text-xl">
                        {selectedMoodboardImages.length} selected
                      </Text>
                    </div>
                    <Divider className="border-purple-400 opacity-30" />
                    <div className="p-5 bg-white/10 rounded-2xl flex items-center justify-between border border-white/10">
                      <Text className="text-white">Tier Selection</Text>
                      <Tag color="gold" className="m-0 border-none font-bold px-3">
                        {selectedPkg?.name || 'Not selected'}
                      </Tag>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={14}>
                <Card className="rounded-[2.5rem] shadow-xl border-none p-6">
                  <Form form={form} layout="vertical" onFinish={onFinalSubmit} size="large">
                    <Form.Item 
                      name="customer_name" 
                      label="Full Name" 
                      rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                      <Input 
                        prefix={<UserOutlined className="text-gray-300" />} 
                        className="rounded-xl h-14" 
                        placeholder="John Doe"
                      />
                    </Form.Item>
                    
                    <Form.Item 
                      name="customer_email" 
                      label="Email Address" 
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input 
                        prefix={<MailOutlined className="text-gray-300" />} 
                        className="rounded-xl h-14" 
                        placeholder="john@example.com"
                      />
                    </Form.Item>
                    
                    <Form.Item 
                      label="Contact Number" 
                      required
                    >
                      <Row gutter={8}>
                        <Col span={8}>
                          <Select
                            value={countryCode}
                            onChange={setCountryCode}
                            className="w-full rounded-xl h-14"
                            size="large"
                          >
                            {countryCodes.map(code => (
                              <Option key={code.value} value={code.value}>
                                {code.label}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                        <Col span={16}>
                          <Form.Item 
                            name="mobileNumber"
                            noStyle
                            rules={[
                              { required: true, message: 'Please enter your phone number' },
                              { pattern: /^[0-9]{7,15}$/, message: 'Please enter a valid phone number' }
                            ]}
                          >
                            <Input 
                              prefix={<PhoneFilled className="text-gray-300" />} 
                              className="rounded-xl h-14" 
                              placeholder="Phone number"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                    
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading.submitting} 
                      block 
                      className="h-16 rounded-2xl text-lg mt-4 border-none shadow-xl"
                      style={{ backgroundColor: BRAND_PURPLE }}
                    >
                      Generate My Quotation
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </motion.div>
        );

      case 8:
        const pkg = packages.find(p => p._id === selectedPackage);
        return (
          <motion.div {...variants} className="text-center py-20">
            <div className="bg-white p-16 rounded-[4rem] shadow-2xl inline-block border border-gray-50">
              <SmileOutlined style={{ color: BRAND_PURPLE, fontSize: '5rem' }} className="mb-8" />
              <Title level={1} style={{ color: BRAND_PURPLE }} className="m-0">Valuation Ready</Title>
              <div className="my-12">
                <Text className="text-gray-400 uppercase tracking-widest block mb-3">Estimated Investment Range</Text>
                <div className="text-8xl font-black text-gray-900">
                  {pkg?.price ? pkg.price.toLocaleString() : '25,000'} <small className="text-3xl font-light">AED</small>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 9:
        return (
          <motion.div {...variants} className="text-center py-20">
            <Result
              status="success"
              title={<Title level={1} style={{ color: BRAND_PURPLE }}>Request Processed!</Title>}
              subTitle="Our architects are reviewing your coordinates and moodboard. We will contact you shortly."
              extra={[
                <Button key="home" size="large" className="rounded-xl h-12" onClick={() => window.location.reload()}>
                  New Estimate
                </Button>,
                <Button 
                  key="site" 
                  type="primary" 
                  size="large" 
                  className="h-12 px-10 rounded-xl border-none shadow-lg" 
                  style={{ backgroundColor: BRAND_PURPLE }}
                  onClick={() => window.open('/', '_blank')}
                >
                  Go to Home
                </Button>
              ]}
            />
          </motion.div>
        );

      default: 
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-40">
      {/* Step Indicator Header */}
      <div className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="hidden lg:flex items-center space-x-8">
            {steps.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 transition-colors ${i <= activeStep ? 'text-black' : 'text-gray-300'}`}>
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                    ${i === activeStep ? 'text-white border-transparent' : 
                      i < activeStep ? 'bg-green-50 text-green-600 border-green-100' : 'border-gray-100'}`}
                  style={{ backgroundColor: i === activeStep ? BRAND_PURPLE : '' }}
                >
                  {i < activeStep ? <CheckOutlined /> : i + 1}
                </div>
                <span className={`text-xs font-bold uppercase tracking-tighter ${i === activeStep ? 'opacity-100' : 'opacity-50'}`}>
                  {s.title}
                </span>
                {i < steps.length - 1 && <div className="w-4 h-[2px] bg-gray-100" />}
              </div>
            ))}
          </div>
          <div className="lg:hidden">
            <Tag color="purple" style={{ backgroundColor: BRAND_PURPLE }}>Step {activeStep + 1} of 8</Tag>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 px-6">
        <AnimatePresence mode="wait">
          <div key={activeStep}>
            {StepRenderer()}
          </div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      {activeStep < 8 && (
        <div className="fixed bottom-0 left-0 right-0 p-8 z-50 pointer-events-none">
          <div className="max-w-4xl mx-auto flex justify-between items-center bg-white/95 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl border border-white/50 pointer-events-auto">
            <Button 
              size="large" 
              icon={<ArrowLeftOutlined />} 
              onClick={handleBack} 
              disabled={activeStep === 0}
              className="h-14 px-8 rounded-2xl border-none bg-gray-50 text-gray-400 hover:bg-gray-100"
            >
              Back
            </Button>

            <div className="flex items-center gap-8">
              {activeStep > 0 && (
                <div className="hidden sm:block text-right">
                  <Text className="text-[10px] text-gray-400 uppercase font-black block tracking-widest">Progress</Text>
                  <Text strong style={{ color: BRAND_PURPLE }}>
                    {Math.round(((activeStep + 1) / 8) * 100)}% Complete
                  </Text>
                </div>
              )}
              
              <Button 
                type="primary" 
                size="large" 
                onClick={handleNext} 
                disabled={!validateStep()}
                className="h-14 px-12 rounded-2xl border-none text-lg shadow-xl transition-all"
                style={{ 
                  backgroundColor: !validateStep() ? '#f5f5f5' : BRAND_PURPLE, 
                  color: !validateStep() ? '#ccc' : 'white' 
                }}
              >
                {activeStep === 7 ? 'Generate Quote' : 'Continue'} 
                <ArrowRightOutlined className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;