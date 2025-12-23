import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Upload, Sun, Sprout, Loader2, Image as ImageIcon, 
  Download, RotateCcw, Trash2, CheckCircle2, Info, Check 
} from 'lucide-react';
import { 
  Button, Modal, Progress, Card, Tag, Empty, 
  notification, Typography, Divider, Tooltip 
} from 'antd';
import axios from 'axios';

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
const API_BASE_URL ='https://xoto.ae/api'

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
  const [currentResult, setCurrentResult] = useState({ url: '', desc: '' });

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

  const generateAIDesigns = async () => {
    if (!selectedImage) {
      return notification.warning({ message: 'Missing Canvas', description: 'Please upload or select a starting photo.' });
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    const formData = new FormData();
    
    // Logic to handle both uploaded files and dummy URL selection
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

    const interval = setInterval(() => {
      setGenerationProgress(prev => (prev < 95 ? prev + (95 - prev) * 0.1 : 95));
    }, 500);

    try {
      const response = await axios.post(`${API_BASE_URL}/ai/generate-garden`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000 
      });

      console.log(response.data);
      if (response.data.imageUrl && response.data.imageUrl !== "") {
        const aiUrl = response.data.imageUrl;
        const aiDesc = response.data.message || "Garden generated successfully"; // Show the message from API
        
        const newDesign = {
          id: Date.now(),
          image: aiUrl,
          title: `Vision ${designs.length + 1}`,
          styles: [...selectedStyles],
          elements: [...selectedElements],
          timestamp: new Date().toLocaleTimeString(),
          aiAnalysis: aiDesc
        };

        setDesigns(prev => [newDesign, ...prev]);
        setCurrentResult({ url: aiUrl, desc: aiDesc });
        setGenerationProgress(100);
        setTimeout(() => {
          setIsGenerating(false);
          setShowGeneratedModal(true);
        }, 500);
      }
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Generation failed', description: 'The AI service is currently busy. Please try again.' });
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FBFBFE]">
      {/* --- MOBILE HEADER (Hidden on desktop) --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Xoto AI</h1>
              <span className="text-xs text-gray-500">Landscape Architect</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- SIDEBAR (Full width on mobile, fixed width on desktop) --- */}
      <aside className="lg:w-[400px] w-full h-screen lg:h-screen lg:sticky lg:top-0 bg-white border-r lg:border-r border-gray-100 flex flex-col shadow-sm z-20 lg:z-20 overflow-hidden">
        <div className="p-4 lg:p-8 border-b shrink-0" style={{ background: BRAND_PURPLE }}>
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 lg:p-3 rounded-xl">
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 fill-white/20" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold leading-none">Xoto AI</h1>
              <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] opacity-70">Landscape Architect</span>
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
        </div>

        <div className="p-4 lg:p-6 border-t bg-gray-50/50 space-y-3 shrink-0">
          <Button 
            type="primary" 
            size="large" 
            block 
            disabled={!selectedImage || isGenerating}
            onClick={generateAIDesigns}
            style={{ background: BRAND_PURPLE, height: '52px', borderRadius: '16px' }}
            className="flex items-center justify-center gap-2 font-bold shadow-lg shadow-purple-200 text-base"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            <span className="truncate">{isGenerating ? 'Designing Space...' : 'Generate Vision'}</span>
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
              <Text className="text-gray-400 text-sm lg:text-base">Your AI-generated landscaping transformations</Text>
            </div>
          </div>

          {designs.length === 0 ? (
            <div className="bg-white rounded-[32px] lg:rounded-[40px] py-20 lg:py-32 flex flex-col items-center border border-gray-50 shadow-sm px-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ImageIcon className="text-gray-200 lg:w-10 lg:h-10" size={32} />
              </div>
              <Empty description={<span className="text-gray-400 font-medium text-center text-sm lg:text-base">Ready to see your dream garden? <br/>Configure the sidebar to begin.</span>} />
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

      {/* --- MODALS (Responsive) --- */}

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

      {/* --- GENERATION LOADING OVERLAY (Fully Responsive) --- */}
      {isGenerating && (
        <div className="fixed inset-0 z-[100] bg-white/90 lg:bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-500 p-4">
          <div className="relative mb-8 lg:mb-12 w-20 h-20 lg:w-20 lg:h-20 mx-auto">
            <div className="absolute -inset-3 lg:-inset-4 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
            <Sparkles className="w-12 h-12 lg:w-20 lg:h-20 text-purple-600 animate-bounce relative mx-auto" />
          </div>
          
          <div className="text-center mb-6 lg:mb-8 px-4">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight leading-tight">Xoto AI is Sculpting</h2>
            <p className="text-gray-500 mt-2 font-medium text-sm lg:text-base max-w-md mx-auto">Reimagining your outdoor space with premium flora...</p>
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