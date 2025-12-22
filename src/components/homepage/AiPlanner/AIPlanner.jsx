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
const API_BASE_URL ='http://51.112.61.219/api'

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

      console.log(response.data)
      if (response.data.imageUrl && response.data.imageUrl!="") {
        const aiUrl = response.data.imageUrl;
        const aiDesc = "";
        
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
    <div className="flex min-h-screen bg-[#FBFBFE]">
      {/* --- SIDEBAR --- */}
      <aside className="w-[400px] h-screen sticky top-0 bg-white border-r border-gray-100 flex flex-col shadow-sm z-20">
        <div className="p-8 border-b" style={{ background: BRAND_PURPLE }}>
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 rounded-xl">
              <Sparkles className="w-6 h-6 fill-white/20" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">Xoto AI</h1>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Landscape Architect</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Step 1: Upload */}
          <section>
            <div className="flex justify-between items-center mb-4">
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
                className="group h-48 rounded-3xl border-2 border-dashed border-gray-200 hover:border-purple-400 hover:bg-purple-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center text-gray-400 group-hover:text-purple-600 transition-colors shadow-sm">
                  <Upload size={20} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600">Upload Photo</p>
                  <p className="text-[11px] text-gray-400">or choose from gallery</p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-3xl overflow-hidden shadow-md border-2 border-white">
                <img src={selectedImage} alt="Input" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            )}
          </section>

          {/* Step 2: Theme */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">02. Aesthetic Theme</h3>
            <button 
              onClick={() => setShowStyleModal(true)}
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Sun size={18} className="text-orange-400" />
                <span className="text-sm font-medium text-gray-700">
                  {selectedStyles.length ? gardenStyles.find(s => s.value === selectedStyles[0])?.label : "Select Style"}
                </span>
              </div>
              <div className="bg-white p-1 rounded-md border text-gray-400"><Check size={14} /></div>
            </button>
          </section>

          {/* Step 3: Elements */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">03. Key Features</h3>
            <button 
              onClick={() => setShowElementModal(true)}
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Sprout size={18} className="text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  {selectedElements.length ? `${selectedElements.length} Elements` : "Add Features"}
                </span>
              </div>
              <div className="bg-white p-1 rounded-md border text-gray-400"><Check size={14} /></div>
            </button>
          </section>

          {/* Step 4: Notes */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">04. Custom Instructions</h3>
            <textarea 
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-50 outline-none transition-all text-sm resize-none"
              placeholder="e.g. Add more lavender, make the pathway curved..."
              rows={3}
              value={specificRequirement}
              onChange={(e) => setSpecificRequirement(e.target.value)}
            />
          </section>
        </div>

        <div className="p-6 border-t bg-gray-50/50 space-y-3">
          <Button 
            type="primary" 
            size="large" 
            block 
            disabled={!selectedImage || isGenerating}
            onClick={generateAIDesigns}
            style={{ background: BRAND_PURPLE, height: '56px', borderRadius: '16px' }}
            className="flex items-center justify-center gap-2 font-bold shadow-lg shadow-purple-200"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {isGenerating ? 'Designing Space...' : 'Generate Vision'}
          </Button>
          <Button type="text" block onClick={resetDesign} className="text-gray-400 hover:text-gray-600">
            Reset Everything
          </Button>
        </div>
      </aside>

      {/* --- MAIN DISPLAY --- */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Title level={1} className="!mb-2">Design Gallery</Title>
              <Text className="text-gray-400">Your AI-generated landscaping transformations</Text>
            </div>
          </div>

          {designs.length === 0 ? (
            <div className="bg-white rounded-[40px] py-32 flex flex-col items-center border border-gray-50 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ImageIcon className="text-gray-200" size={40} />
              </div>
              <Empty description={<span className="text-gray-400 font-medium">Ready to see your dream garden? <br/>Configure the sidebar to begin.</span>} />
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {designs.map(design => (
                <Card
                  key={design.id}
                  hoverable
                  className="rounded-[32px] overflow-hidden border-none shadow-sm hover:shadow-xl transition-all"
                  cover={
                    <div className="relative h-80 group">
                      <img src={design.image} alt="AI" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Button 
                          shape="round" 
                          icon={<Download size={16} />} 
                          onClick={() => downloadImage(design.image, design.title)}
                        >
                          Download
                        </Button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Tag color="purple" className="rounded-full px-3 py-1 font-bold border-none backdrop-blur-md bg-white/90">
                          AI GENERATED
                        </Tag>
                      </div>
                    </div>
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{design.title}</h3>
                      <p className="text-xs text-gray-400 mb-4">{design.timestamp}</p>
                      <div className="flex flex-wrap gap-2">
                        {design.styles.map(s => <Tag key={s} className="rounded-full bg-purple-50 text-purple-600 border-none px-3 capitalize">{s}</Tag>)}
                        {design.elements.length > 0 && <Tag className="rounded-full bg-green-50 text-green-600 border-none px-3">{design.elements.length} Elements</Tag>}
                      </div>
                    </div>
                    <Button 
                      icon={<Info size={18} />} 
                      type="text" 
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

      {/* Result Modal */}
      <Modal
        open={showGeneratedModal}
        footer={null}
        onCancel={() => setShowGeneratedModal(false)}
        width={1000}
        centered
        bodyStyle={{ padding: 0, borderRadius: '32px', overflow: 'hidden' }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/5 h-[500px]">
            <img src={currentResult.url} className="w-full h-full object-cover" alt="Final Design" />
          </div>
          <div className="md:w-2/5 p-10 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-600 font-bold mb-4">
                <Sparkles size={20} />
                <span>AI SCENE ANALYSIS</span>
              </div>
              <Paragraph className="text-gray-600 leading-relaxed max-h-[250px] overflow-y-auto pr-4">
                {currentResult.desc || "No description provided."}
              </Paragraph>
            </div>
            <div className="space-y-3 pt-6">
              <Button 
                type="primary" block size="large" className="h-14 rounded-2xl font-bold"
                style={{ background: BRAND_PURPLE }}
                onClick={() => downloadImage(currentResult.url, 'Xoto-Vision')}
              >
                Download Render
              </Button>
              <Button block size="large" className="h-14 rounded-2xl font-bold" onClick={() => setShowGeneratedModal(false)}>
                Back to Gallery
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Upload/Gallery Modal */}
      <Modal open={showUploadModal} footer={null} onCancel={() => setShowUploadModal(false)} centered title="Select Source Canvas">
        <div className="p-2">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {dummySpaceImages.map((img) => (
              <div 
                key={img.id} 
                onClick={() => { setSelectedImage(img.url); setShowUploadModal(false); }}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:ring-4 ring-purple-100 transition-all"
              >
                <img src={img.url} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <Divider>OR UPLOAD YOUR OWN</Divider>
          <input type="file" id="file-up" className="hidden" accept="image/*" onChange={(e) => processUploadedFile(e.target.files[0])} />
          <Button 
            block 
            icon={<Upload size={18} />} 
            className="h-14 rounded-xl font-semibold border-dashed"
            onClick={() => document.getElementById('file-up').click()}
          >
            Browse Local Files
          </Button>
        </div>
      </Modal>

      {/* Style Selection Modal */}
      <Modal open={showStyleModal} footer={null} onCancel={() => setShowStyleModal(false)} width={800} centered title="Choose Landscape Style">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
          {gardenStyles.map(s => (
            <div 
              key={s.value} 
              onClick={() => { setSelectedStyles([s.value]); setShowStyleModal(false); }}
              className={`relative cursor-pointer rounded-2xl overflow-hidden group border-4 transition-all ${selectedStyles.includes(s.value) ? 'border-purple-600' : 'border-transparent hover:border-purple-100'}`}
            >
              <img src={s.img} className="h-40 w-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                <p className="text-white font-bold m-0">{s.label}</p>
              </div>
              {selectedStyles.includes(s.value) && (
                <div className="absolute top-2 right-2 bg-purple-600 text-white p-1 rounded-full shadow-lg">
                  <CheckCircle2 size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>

      {/* Element Selection Modal */}
      <Modal open={showElementModal} footer={null} onCancel={() => setShowElementModal(false)} width={800} centered title="Add Landscape Features">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
          {gardenElements.map(el => (
            <div 
              key={el.value} 
              onClick={() => {
                setSelectedElements(prev => prev.includes(el.value) ? prev.filter(x => x !== el.value) : [...prev, el.value])
              }}
              className={`relative cursor-pointer rounded-2xl overflow-hidden group border-4 transition-all ${selectedElements.includes(el.value) ? 'border-green-500 bg-green-50' : 'border-transparent'}`}
            >
              <img src={el.img} className="h-32 w-full object-cover transition-transform group-hover:scale-110" />
              <div className="p-3 text-center">
                <p className="font-bold text-sm m-0">{el.label}</p>
              </div>
              {selectedElements.includes(el.value) && (
                <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
                  <Check size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
            <Button type="primary" size="large" onClick={() => setShowElementModal(false)} className="rounded-xl px-10" style={{ background: BRAND_PURPLE }}>
                Apply Selections
            </Button>
        </div>
      </Modal>

      {/* --- GENERATION LOADING OVERLAY --- */}
      {isGenerating && (
        <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-500">
          <div className="relative mb-12">
             <div className="absolute -inset-4 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
             <Sparkles className="w-20 h-20 text-purple-600 animate-bounce relative" />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Xoto AI is Sculpting</h2>
            <p className="text-gray-500 mt-2 font-medium">Reimagining your outdoor space with premium flora...</p>
          </div>

          <div className="w-80">
            <Progress 
              percent={Math.floor(generationProgress)} 
              strokeColor={{ '0%': '#8E2DE2', '100%': BRAND_PURPLE }}
              status="active" 
              strokeWidth={10}
            />
            <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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