import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";


import { 
  Sparkles, Upload, Sun, Sprout, Loader2, Image as ImageIcon, 
  Download, Trash2, CheckCircle2, Info, Check, RefreshCw
} from 'lucide-react';
import { 
  Button, Modal, Progress, Card, Tag, Empty, 
  notification, Typography, Divider
} from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import LeadGenerationModal from '../Signuupage';
import logoNew from "../../../assets/img/logonew2.png";

const { Paragraph, Title, Text } = Typography;

// --- Mock Data ---
const dummySpaceImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800' },
  { id: 2, url: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=800' },
  { id: 3, url: 'https://images.unsplash.com/photo-1557429287-b2e26467fc2b?w=800' },
];

const gardenStyles = [
  { value: 'modern', label: 'Modern Garden', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600' },
  { value: 'japanese', label: 'Japanese Zen', img: 'https://www.japan-experience.com/sites/default/files/styles/scale_crop_570x300/public/regiondo/big-ticket-image-5f7541324c6c4582000815-cropped600-400-dpl-65a78e47b9a57.jpg.webp?itok=-yBTm-IO' },
  { value: 'cottage', label: 'English Cottage', img: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=600' },
  { value: 'mediterranean', label: 'Urban Parks', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg8fAUL2dlGy5ThADjNfnZK6FCt-PyxLRe8JOonNb8Tlje7dIJD6pNA0M&s' },
  { value: 'tropical', label: 'Tropical Oasis', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSseHbxdOMINrtqNJ7vAph6i_ipKzK--QmDTQ&s' },
  { value: 'minimalist', label: 'Minimalist', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
];

const gardenElements = [
  { value: 'fountain', label: 'Water Fountain', img: 'https://img.freepik.com/free-photo/nice-fountain-with-leafy-trees-background_1160-297.jpg?semt=ais_hybrid&w=740&q=80' },
  { value: 'pond', label: 'Pond', img: 'https://media.istockphoto.com/id/165615108/photo/long-pond-maine-deep-blue-water-lake-lily-pads-grasses.jpg?s=612x612&w=0&k=20&c=vaW1nnSYFl-E45R3Bsna6wg9PNnwZUw0bEaWxR85BCw=' },
  { value: 'pathway', label: 'Stone Pathway', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg8fAUL2dlGy5ThADjNfnZK6FCt-PyxLRe8JOonNb8Tlje7dIJD6pNA0M&s' },
  { value: 'gazebo', label: 'Gazebo', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7VzauykJs9jY1IjtMmQMgiPHS3MZ7ghhSwQ&s' },
  { value: 'firepit', label: 'Fire Pit', img: 'https://irp.cdn-website.com/cea9e5b2/dms3rep/multi/Vakkas-paver-patio-fire-pit-5.jpg' },
  { value: 'seating', label: 'Seating Area', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN533r4zs2Vywi2quKHBlEqsrzpY4l_Mpbkg&s' },
];

const BRAND_PURPLE = "#5C039B";
const API_BASE_URL ='https://xoto.ae/api';

const AIPlanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [specificRequirement, setSpecificRequirement] = useState('');
  const [designs, setDesigns] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  // Modal states
  const [showGeneratedModal, setShowGeneratedModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [showElementModal, setShowElementModal] = useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [currentResult, setCurrentResult] = useState({ url: '', desc: '' });
  
  // User info state - Initialize from storage on mount
  const [userInfo, setUserInfo] = useState(() => {
    // Initialize from storage without causing re-renders
    try {
      // Try sessionStorage first
      const sessionData = sessionStorage.getItem('xoto_session_user');
      if (sessionData) {
        return JSON.parse(sessionData);
      }
      
      // Try cookies
      const cookieData = Cookies.get('xoto_user_data');
      if (cookieData) {
        return JSON.parse(cookieData);
      }
      
      // Try localStorage
      const lsData = localStorage.getItem('xoto_user_info');
      if (lsData) {
        return JSON.parse(lsData);
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
  });

  // User status state - Initialize from storage
  const [userStatus, setUserStatus] = useState(() => {
    // Check storage to determine initial status
    if (sessionStorage.getItem('xoto_session_signed') === 'true') {
      return 'session_signed';
    }
    if (Cookies.get('xoto_user_signed') === 'true') {
      return 'cookie_signed';
    }
    if (localStorage.getItem('xoto_user_signed_up') === 'true') {
      return 'local_signed';
    }
    return 'not_signed';
  });

  // Debug state
  const [showDebug, setShowDebug] = useState(false);

  // Check user status on component mount (only once)
  useEffect(() => {
    console.log('🔍 Component mounted, checking user status...');
    
    // Simply log the current status, don't update state in a way that causes re-renders
    console.log('Initial user status:', userStatus);
    console.log('Initial user info:', userInfo);
    
    // If we need to sync from cookies to sessionStorage
    if (userStatus === 'cookie_signed' || userStatus === 'local_signed') {
      // Ensure sessionStorage has the data too
      if (!sessionStorage.getItem('xoto_session_signed')) {
        sessionStorage.setItem('xoto_session_signed', 'true');
        sessionStorage.setItem('xoto_session_user', JSON.stringify(userInfo));
        console.log('✅ Synced persistent data to sessionStorage');
      }
    }
  }, []); // Empty dependency array - runs only once on mount

  // Memoized function to check if user has signed up (doesn't update state)
  const hasUserSignedUp = useCallback(() => {
    return userStatus !== 'not_signed';
  }, [userStatus]);

  // Get user data (doesn't update state)
  const getUserData = useCallback(() => {
    return userInfo;
  }, [userInfo]);

  const resetDesign = () => {
    setSelectedImage(null);
    setUploadedFile(null);
    setSelectedStyles([]);
    setSelectedElements([]);
    setSpecificRequirement('');
    notification.info({ message: 'Form cleared' });
  };

  const processUploadedFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFile(file);
        setSelectedImage(e.target.result);
        setShowUploadModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Generate Vision button click
  const handleGenerateClick = async () => {
    console.log('🎯 Generate Vision clicked');
    console.log('Current user status:', userStatus);
    
    if (!selectedImage) {
      notification.warning({ 
        message: 'Missing Canvas', 
        description: 'Please upload or select a starting photo.' 
      });
      return;
    }
    
    // Check if user has signed up
    if (hasUserSignedUp()) {
      console.log('✅ User already signed up, skipping modal');
      const userData = getUserData();
      if (userData && userData.firstName) {
        generateAIDesigns(userData);
      } else {
        console.log('⚠️ User signed but no valid data found, showing modal');
        setShowUserInfoModal(true);
      }
    } else {
      console.log('❌ User not signed up, showing modal');
      setShowUserInfoModal(true);
    }
  };

  // Handle form submission from LeadGenerationModal
  const handleUserInfoSubmit = (userData) => {
    console.log('📝 User info submitted:', userData);
    
    // Update state
    setUserInfo(userData);
    setUserStatus('session_signed');
    
    // Close modal and generate
    setShowUserInfoModal(false);
    // generateAIDesigns(userData);
  };

  const generateAIDesigns = async (userData = null) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const formData = new FormData();
    
    // Handle image
    if (uploadedFile) {
      formData.append('gardenImage', uploadedFile);
    } else {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const file = new File([blob], "input_image.jpg", { type: "image/jpeg" });
        formData.append('gardenImage', file);
      } catch (err) {
        console.error("Blob conversion failed", err);
      }
    }

    formData.append('styleName', selectedStyles.length > 0 ? gardenStyles.find(s => s.value === selectedStyles[0])?.label : 'Modern Garden');
    formData.append('elements', selectedElements.map(e => gardenElements.find(el => el.value === e)?.label).join(', ') || 'Natural Landscaping');
    formData.append('description', specificRequirement || 'A professional landscaping design');
    
    // Add user information
    const userToSend = userData || userInfo || {};
    Object.keys(userToSend).forEach(key => {
      if (userToSend[key]) {
        formData.append(key, userToSend[key]);
      }
    });

    // Add user status info
    formData.append('user_status', userStatus);
    formData.append('generation_time', new Date().toISOString());

    const interval = setInterval(() => {
      setGenerationProgress(prev => (prev < 95 ? prev + (95 - prev) * 0.1 : 95));
    }, 500);

    try {
      const response = await axios.post(`${API_BASE_URL}/ai/generate-garden`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000 
      });

      console.log('🎨 AI Response:', response.data);
      if (response.data.imageUrl && response.data.imageUrl !== "") {
        const aiUrl = response.data.imageUrl;
        const aiDesc = response.data.message || "Garden generated successfully";
        
        const newDesign = {
          id: Date.now(),
          image: aiUrl,
          title: `Vision ${designs.length + 1}`,
          styles: [...selectedStyles],
          elements: [...selectedElements],
          timestamp: new Date().toLocaleTimeString(),
          aiAnalysis: aiDesc,
          userInfo: userToSend,
          userStatus: userStatus
        };

        setDesigns(prev => [newDesign, ...prev]);
        setCurrentResult({ url: aiUrl, desc: aiDesc });
        setGenerationProgress(100);
        
        // Show appropriate message
        if (userStatus === 'session_signed') {
          notification.success({
            message: 'Design Generated!',
            description: 'Using your session preferences.',
            duration: 2,
          });
        } else if (userStatus === 'cookie_signed' || userStatus === 'local_signed') {
          notification.success({
            message: 'Welcome back!',
            description: 'Using your saved preferences.',
            duration: 2,
          });
        }
        
        setTimeout(() => {
          setIsGenerating(false);
          setShowGeneratedModal(true);
        }, 500);
      }
    } catch (error) {
      console.error('❌ Generation failed:', error);
      notification.error({ 
        message: 'Generation failed', 
        description: 'The AI service is currently busy. Please try again.' 
      });
      setIsGenerating(false);
    } finally {
      clearInterval(interval);
    }
  };

  const downloadImage = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Debug functions - fixed to not cause re-renders
  const checkAllStorage = () => {
    console.clear();
    console.log('=== STORAGE DEBUG ===');
    console.log('Current URL:', window.location.href);
    console.log('React State - userStatus:', userStatus);
    console.log('React State - userInfo:', userInfo);
    
    console.log('\n📱 SESSION STORAGE:');
    console.log('xoto_session_signed:', sessionStorage.getItem('xoto_session_signed'));
    console.log('xoto_session_user:', sessionStorage.getItem('xoto_session_user'));
    
    console.log('\n🍪 COOKIES:');
    console.log('All cookies:', document.cookie);
    console.log('xoto_user_signed:', Cookies.get('xoto_user_signed'));
    console.log('xoto_user_data:', Cookies.get('xoto_user_data'));
    
    console.log('\n💾 LOCALSTORAGE:');
    console.log('xoto_user_signed_up:', localStorage.getItem('xoto_user_signed_up'));
    console.log('xoto_user_info:', localStorage.getItem('xoto_user_info'));
    
    // Test cookie functionality
    Cookies.set('debug_test_cookie', 'working_' + Date.now());
    console.log('Test cookie set:', Cookies.get('debug_test_cookie'));
  };

  const clearAllStorage = () => {
    // Clear sessionStorage
    sessionStorage.removeItem('xoto_session_signed');
    sessionStorage.removeItem('xoto_session_user');
    
    // Clear cookies
    Cookies.remove('xoto_user_signed');
    Cookies.remove('xoto_user_data');
    Cookies.remove('debug_test_cookie');
    
    // Clear localStorage
    localStorage.removeItem('xoto_user_signed_up');
    localStorage.removeItem('xoto_user_info');
    
    // Clear state
    setUserInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
    setUserStatus('not_signed');
    
    notification.success({ 
      message: 'Storage Cleared',
      description: 'All user data has been removed.',
      duration: 3,
    });
    
    console.log('🧹 All storage cleared');
  };

  // Get status display text - memoized to prevent unnecessary re-renders
  const getStatusDisplay = useMemo(() => {
    switch(userStatus) {
      case 'session_signed':
        return { text: 'Session Active', color: 'bg-blue-500', label: 'Using session memory' };
      case 'cookie_signed':
        return { text: 'Signed In', color: 'bg-green-500', label: 'Using saved cookies' };
      case 'local_signed':
        return { text: 'Signed In', color: 'bg-green-500', label: 'Using saved preferences' };
      default:
        return { text: 'Not Signed', color: 'bg-gray-300', label: 'Sign up required' };
    }
  }, [userStatus]);

  const statusDisplay = getStatusDisplay;

  // Debug panel component - separate component to isolate rendering
  const DebugPanel = React.memo(() => (
    <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-gray-700">Debug Panel</h4>
          <div className={`px-2 py-0.5 text-xs rounded-full ${statusDisplay.color} text-white`}>
            {statusDisplay.text}
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={checkAllStorage}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1"
          >
            <RefreshCw size={10} />
            Check Storage
          </button>
          <button 
            onClick={clearAllStorage}
            className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Clear All
          </button>
          <button 
            onClick={() => setShowDebug(false)}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Hide
          </button>
        </div>
      </div>
      
      <div className="text-xs space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className={`p-2 rounded ${hasUserSignedUp() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="font-medium">User Status</div>
            <div>{hasUserSignedUp() ? '✅ Signed In' : '❌ Not Signed'}</div>
            <div className="text-xs opacity-75">{statusDisplay.label}</div>
          </div>
          <div className={`p-2 rounded ${selectedImage ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="font-medium">Image</div>
            <div>{selectedImage ? '✅ Selected' : '❌ Missing'}</div>
          </div>
        </div>
        
        <div className="p-2 bg-white rounded border">
          <div className="font-medium mb-1">Current User:</div>
          <div className="font-mono text-xs truncate">
            {userInfo.firstName || 'No user data'}
          </div>
        </div>
        
        <div className="text-gray-500 text-xs">
          Click "Check Storage" to see detailed info in console
        </div>
      </div>
    </div>
  ));

  // User Status Display component
  const UserStatusDisplay = React.memo(() => (
    <div className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${statusDisplay.color}`} />
          <div>
            <div className="text-xs font-medium text-gray-700">{statusDisplay.text}</div>
            <div className="text-xs text-gray-500">{statusDisplay.label}</div>
          </div>
        </div>
        {hasUserSignedUp() && userInfo.firstName && userInfo.firstName !== 'Guest' && (
          <div className="text-sm font-medium text-purple-600">
            Hi, {userInfo.firstName}!
          </div>
        )}
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FBFBFE]">
      {/* --- MOBILE HEADER --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="text-xs text-gray-500">Landscape Architect</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusDisplay.color}`} />
            <button 
              onClick={() => setShowDebug(!showDebug)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              {showDebug ? 'Hide Debug' : 'Debug'}
            </button>
          </div>
        </div>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className="lg:w-[400px] w-full h-screen lg:h-screen lg:sticky lg:top-0 bg-white border-r border-gray-100 flex flex-col shadow-sm z-20 overflow-hidden">
<div
  className="relative p-4 lg:p-8 border-b shrink-0"
  style={{ background: BRAND_PURPLE }}
>
  <Link
    to="/landscaping"
    className="absolute top-4 right-4 text-white"
  >
    <ArrowLeft className="w-7 h-8" />
  </Link>

  <div className="flex items-center gap-3 text-white">
    <div className="bg-white/20 p-2 lg:p-3 rounded-xl">
      <Sparkles className="w-5 h-5 lg:w-7 lg:h-7 fill-white/20" />
    </div>

    <div>
      <h1 className="text-lg lg:text-4xl font-bold leading-none">
        Xoto AI
      </h1>
      <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] opacity-70">
        Landscape Architect
      </span>
    </div>
  </div>
</div>



        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 lg:space-y-8 custom-scrollbar max-h-screen lg:max-h-[calc(100vh-200px)]">
          {/* Step 1: Upload */}
          <section>
            <div className="flex justify-between items-center mb-3 lg:mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">01. Site Canvas</h3>
              {selectedImage && (
                <button onClick={() => setSelectedImage(null)} className="text-red-500 hover:bg-red-50 p-1 rounded-md transition-colors">
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            {!selectedImage ? (
              <div 
                onClick={() => setShowUploadModal(true)}
                className="group h-40 lg:h-48 rounded-2xl lg:rounded-3xl border-2 border-dashed border-gray-200 hover:border-purple-400 hover:bg-purple-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 lg:gap-3 p-4"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center text-gray-400 group-hover:text-purple-600 transition-colors shadow-sm">
                  <Upload size={18} className="lg:w-5 lg:h-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600">Upload Photo</p>
                  <p className="text-xs lg:text-[11px] text-gray-400">or choose from gallery</p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border-2 border-white aspect-[4/3] lg:aspect-[16/9]">
                <img src={selectedImage} alt="Input" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            )}
          </section>

          {/* Step 2: Theme */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 lg:mb-4">02. Aesthetic Theme</h3>
            <button 
              onClick={() => setShowStyleModal(true)}
              className="w-full p-3 lg:p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2 lg:gap-3 flex-1">
                <Sun size={16} className="lg:w-4 lg:h-4 text-orange-400" />
                <span className="text-sm font-medium text-gray-700 truncate">
                  {selectedStyles.length ? gardenStyles.find(s => s.value === selectedStyles[0])?.label : "Select Style"}
                </span>
              </div>
              <div className="bg-white p-1 rounded-md border text-gray-400 shrink-0"><Check size={12} className="lg:w-3.5 lg:h-3.5" /></div>
            </button>
          </section>

          {/* Step 3: Elements */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 lg:mb-4">03. Key Features</h3>
            <button 
              onClick={() => setShowElementModal(true)}
              className="w-full p-3 lg:p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2 lg:gap-3 flex-1">
                <Sprout size={16} className="lg:w-4 lg:h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700 truncate">
                  {selectedElements.length ? `${selectedElements.length} Elements` : "Add Features"}
                </span>
              </div>
              <div className="bg-white p-1 rounded-md border text-gray-400 shrink-0"><Check size={12} className="lg:w-3.5 lg:h-3.5" /></div>
            </button>
          </section>

          {/* Step 4: Notes */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 lg:mb-4">04. Custom Instructions</h3>
            <textarea 
              className="w-full p-3 lg:p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-50 outline-none transition-all text-sm resize-none"
              placeholder="e.g. Add more lavender, make the pathway curved..."
              rows={3}
              value={specificRequirement}
              onChange={(e) => setSpecificRequirement(e.target.value)}
            />
          </section>
          
          {/* Debug Panel */}
          {showDebug && <DebugPanel />}
          
          {/* User Status Display */}
          {/* <UserStatusDisplay /> */}
        </div>

        <div className="p-4 lg:p-6 border-t bg-gray-50/50 space-y-3 shrink-0">
          {/* <div className="flex items-center justify-between mb-2">
            <button 
              onClick={() => setShowDebug(!showDebug)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              {showDebug ? 'Hide Debug' : 'Show Debug'}
            </button>
            <button 
              onClick={checkAllStorage}
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              Check Status
            </button>
          </div> */}
          
          <Button 
            type="primary" 
            size="large" 
            block 
            disabled={!selectedImage || isGenerating}
            onClick={handleGenerateClick}
            style={{ background: BRAND_PURPLE, height: '52px', borderRadius: '16px' }}
            className="flex items-center justify-center gap-2 font-bold shadow-lg shadow-purple-200 text-base hover:scale-[1.02] transition-transform"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            <span className="truncate">
              {isGenerating ? 'Designing...' : hasUserSignedUp() ? 'Generate Another' : 'Generate Vision'}
            </span>
          </Button>
          
          <Button type="text" block onClick={resetDesign} className="text-gray-400 hover:text-gray-600 text-sm">
            Reset Everything
          </Button>
        </div>
      </aside>

      {/* --- MAIN DISPLAY --- */}
      <main className="flex-1 p-4 lg:p-8 lg:p-12 overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 lg:mb-12 gap-4">
            <div>
              <Title level={1} className="!mb-1 lg:!mb-2 text-3xl lg:text-4xl">Design Gallery</Title>
              <Text className="text-gray-400 text-sm lg:text-base">
                {hasUserSignedUp() 
                  ? `Welcome back${userInfo.firstName && userInfo.firstName !== 'Guest' ? `, ${userInfo.firstName}` : ''}! Generate unlimited designs`
                  : 'Your AI-generated landscaping transformations'
                }
              </Text>
            </div>
            <div className="flex items-center gap-3">
              {/* {hasUserSignedUp() && (
                <div className="px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-medium rounded-full flex items-center gap-2 border border-green-100">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>{userStatus === 'session_signed' ? 'Session Active' : 'Signed In'}</span>
                </div>
              )} */}
              {/* <button 
                onClick={clearAllStorage}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Clear Data
              </button> */}
            </div>
          </div>

          {designs.length === 0 ? (
            <div className="bg-white rounded-[32px] lg:rounded-[40px] py-20 lg:py-32 flex flex-col items-center border border-gray-50 shadow-sm px-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ImageIcon className="text-gray-200 lg:w-10 lg:h-10" size={32} />
              </div>
              <Empty description={
                <span className="text-gray-400 font-medium text-center text-sm lg:text-base">
                  {hasUserSignedUp() 
                    ? 'Ready to create your first design?\nUpload an image and click Generate!'
                    : 'Ready to see your dream garden?\nConfigure the sidebar to begin.'
                  }
                </span>
              } />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              {designs.map(design => (
                <Card
                  key={design.id}
                  hoverable
                  className="rounded-[24px] lg:rounded-[32px] overflow-hidden border-none shadow-sm hover:shadow-xl transition-all h-full"
                  cover={
                    <div className="relative h-64 lg:h-80 group aspect-[4/3] lg:aspect-video">
                      <img src={design.image} alt="AI" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 lg:gap-3 p-2">
                        <Button 
                          shape="round" 
                          icon={<Download size={14} className="lg:w-4 lg:h-4" />} 
                          onClick={() => downloadImage(design.image, design.title)}
                          size="small"
                        />
                      </div>
                      <div className="absolute top-3 lg:top-4 left-3 lg:left-4">
                        <Tag color="purple" className="rounded-full px-2 lg:px-3 py-1 font-bold border-none backdrop-blur-md bg-white/90 text-xs lg:text-sm">
                          AI GENERATED
                        </Tag>
                      </div>
                    </div>
                  }
                  bodyStyle={{ padding: '1rem', lg: '1.5rem' }}
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2 lg:gap-0">
                    <div className="flex-1">
                      <h3 className="text-base lg:text-lg font-bold text-gray-800 mb-1">{design.title}</h3>
                      <p className="text-xs text-gray-400 mb-2 lg:mb-4">{design.timestamp}</p>
                      <div className="flex flex-wrap gap-1 lg:gap-2">
                        {design.styles.map(s => (
                          <Tag key={s} className="rounded-full bg-purple-50 text-purple-600 border-none px-2 lg:px-3 text-xs capitalize" size="small">
                            {s}
                          </Tag>
                        ))}
                        {design.elements.length > 0 && (
                          <Tag className="rounded-full bg-green-50 text-green-600 border-none px-2 lg:px-3 text-xs" size="small">
                            {design.elements.length} Elements
                          </Tag>
                        )}
                      </div>
                      {design.userInfo?.firstName && design.userInfo.firstName !== 'Guest' && (
                        <div className="mt-2 text-xs text-gray-500">
                          Created for {design.userInfo.firstName}
                        </div>
                      )}
                    </div>
                    <Button 
                      icon={<Info size={16} className="lg:w-4 lg:h-4" />} 
                      type="text" 
                      size="small"
                      onClick={() => {
                        setCurrentResult({ url: design.image, desc: design.aiAnalysis });
                        setShowGeneratedModal(true);
                      }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* Lead Generation Modal */}
      <LeadGenerationModal
        visible={showUserInfoModal}
        onCancel={() => setShowUserInfoModal(false)}
        onSubmit={handleUserInfoSubmit}
        selectedImage={selectedImage}
      />

      {/* Result Modal */}
      <Modal
        open={showGeneratedModal}
        footer={null}
        onCancel={() => setShowGeneratedModal(false)}
        width={["90vw", "90vw", "90vw", 1000]}
        centered
        bodyStyle={{ padding: 0, borderRadius: '24px', overflow: 'hidden' }}
      >
        <div className="flex flex-col h-[70vh] lg:h-[500px] lg:flex-row">
          <div className="lg:w-3/5 h-[50vh] lg:h-full flex-shrink-0">
            <img src={currentResult.url} className="w-full h-full object-cover" alt="Final Design" />
          </div>
          <div className="lg:w-2/5 p-6 lg:p-10 bg-white flex flex-col justify-between h-[50vh] lg:h-full">
            <div className="overflow-y-auto flex-1">
              <div className="flex items-center gap-2 text-purple-600 font-bold mb-4">
                <Sparkles size={18} className="lg:w-5 lg:h-5" />
                <span className="text-sm lg:text-base">AI SCENE ANALYSIS</span>
              </div>
              <Paragraph className="text-gray-600 leading-relaxed pr-2 lg:pr-4 text-sm lg:text-base">
                {currentResult.desc || "No description provided."}
              </Paragraph>
            </div>
            <div className="space-y-3 pt-4 lg:pt-6 border-t mt-4 lg:mt-0">
              <Button 
                type="primary" block size="large" className="h-12 lg:h-14 rounded-2xl font-bold"
                style={{ background: BRAND_PURPLE }}
                onClick={() => downloadImage(currentResult.url, 'Xoto-Vision')}
              >
                Download Render
              </Button>
              <Button block size="large" className="h-12 lg:h-14 rounded-2xl font-bold" onClick={() => setShowGeneratedModal(false)}>
                Back to Gallery
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Upload/Gallery Modal */}
      <Modal 
        open={showUploadModal} 
        footer={null} 
        onCancel={() => setShowUploadModal(false)} 
        centered 
        title="Select Source Canvas"
        width={["90vw", "90vw", "90vw", 600]}
        bodyStyle={{ padding: '1rem' }}
      >
        <div className="p-2">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-4 lg:mb-6">
            {dummySpaceImages.map((img) => (
              <div 
                key={img.id} 
                onClick={() => { setSelectedImage(img.url); setShowUploadModal(false); }}
                className="aspect-square rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer hover:ring-4 ring-purple-100 transition-all shadow-sm"
              >
                <img src={img.url} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <Divider>OR UPLOAD YOUR OWN</Divider>
          <input type="file" id="file-up" className="hidden" accept="image/*" onChange={(e) => processUploadedFile(e.target.files[0])} />
          <Button 
            block 
            icon={<Upload size={16} />} 
            className="h-12 rounded-xl font-semibold border-dashed text-sm"
            onClick={() => document.getElementById('file-up').click()}
          >
            Browse Local Files
          </Button>
        </div>
      </Modal>

      {/* Style Selection Modal */}
      <Modal 
        open={showStyleModal} 
        footer={null} 
        onCancel={() => setShowStyleModal(false)} 
        width={["95vw", "95vw", "95vw", 800]} 
        centered 
        title="Choose Landscape Style"
        bodyStyle={{ padding: '0.5rem' }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 p-2">
          {gardenStyles.map(s => (
            <div 
              key={s.value} 
              onClick={() => { setSelectedStyles([s.value]); setShowStyleModal(false); }}
              className={`relative cursor-pointer rounded-2xl overflow-hidden group border-4 transition-all ${selectedStyles.includes(s.value) ? 'border-purple-600 shadow-lg' : 'border-transparent hover:border-purple-100 hover:shadow-md'}`}
            >
              <img src={s.img} className="h-32 lg:h-40 w-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 lg:p-4">
                <p className="text-white font-bold text-sm lg:text-base m-0 truncate">{s.label}</p>
              </div>
              {selectedStyles.includes(s.value) && (
                <div className="absolute top-2 right-2 bg-purple-600 text-white p-1.5 rounded-full shadow-lg">
                  <CheckCircle2 size={14} className="lg:w-4 lg:h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>

      {/* Element Selection Modal */}
      <Modal 
        open={showElementModal} 
        footer={null} 
        onCancel={() => setShowElementModal(false)} 
        width={["95vw", "95vw", "95vw", 800]} 
        centered 
        title="Add Landscape Features"
        bodyStyle={{ padding: '0.5rem' }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 p-2">
          {gardenElements.map(el => (
            <div 
              key={el.value} 
              onClick={() => {
                setSelectedElements(prev => prev.includes(el.value) ? prev.filter(x => x !== el.value) : [...prev, el.value])
              }}
              className={`relative cursor-pointer rounded-2xl overflow-hidden group border-4 transition-all ${selectedElements.includes(el.value) ? 'border-green-500 bg-green-50 shadow-lg' : 'border-transparent hover:border-green-100 hover:shadow-md'}`}
            >
              <img src={el.img} className="h-28 lg:h-32 w-full object-cover transition-transform group-hover:scale-110" />
              <div className="p-2 lg:p-3 text-center bg-white/90 backdrop-blur-sm">
                <p className="font-bold text-xs lg:text-sm m-0 truncate">{el.label}</p>
              </div>
              {selectedElements.includes(el.value) && (
                <div className="absolute top-2 right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                  <Check size={14} className="lg:w-4 lg:h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end pt-4 border-t">
          <Button 
            type="primary" 
            size="large" 
            onClick={() => setShowElementModal(false)} 
            className="rounded-xl px-8 lg:px-10 h-12" 
            style={{ background: BRAND_PURPLE }}
          >
            Apply Selections
          </Button>
        </div>
      </Modal>

      {/* --- GENERATION LOADING OVERLAY --- */}
      {isGenerating && (
        <div className="fixed inset-0 z-[100] bg-white/90 lg:bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-500 p-4">
          <div className="relative mb-8 lg:mb-12 w-20 h-20 lg:w-20 lg:h-20 mx-auto">
            <div className="absolute -inset-3 lg:-inset-4 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
            <Sparkles className="w-12 h-12 lg:w-20 lg:h-20 text-purple-600 animate-bounce relative mx-auto" />
          </div>
          
          <div className="text-center mb-6 lg:mb-8 px-4">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight leading-tight">
              {hasUserSignedUp() ? 'Creating Another Masterpiece' : 'Xoto AI is Sculpting'}
            </h2>
            <p className="text-gray-500 mt-2 font-medium text-sm lg:text-base max-w-md mx-auto">
              Reimagining your outdoor space with premium flora...
            </p>
          </div>

          <div className="w-full max-w-xs lg:w-80">
            <Progress 
              percent={Math.floor(generationProgress)} 
              strokeColor={{ '0%': '#8E2DE2', '100%': BRAND_PURPLE }}
              status="active" 
              strokeWidth={10}
              showInfo={false}
            />
            <div className="flex justify-between mt-3 text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Analyzing Geometry</span>
              <span>{Math.floor(generationProgress)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPlanner;