import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import {
  Button, Modal, Form, Input, Popconfirm, Card, Table,
  Typography, Row, Col, Statistic, Space, Divider, message, notification, Tooltip,
  InputNumber, Select, Switch, Tag, Upload, Avatar
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined, 
  ShoppingOutlined, AppstoreOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const THEME = {
  primary: "#7c3aed", 
  success: "#10b981",
  error: "#ef4444",
};

// ✅ STATIC IMAGE URL
const STATIC_IMG = "https://placehold.co/400x400?text=No+Image";

const ProductManagement = () => {
  const BASE_URL = "https://xoto.ae"; 

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  
  const [brandSearchLoading, setBrandSearchLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [editingData, setEditingData] = useState(null);
  const [form] = Form.useForm();

  // --- HELPER: Handle Upload Files in Form ---
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // --- 1. FETCH BRANDS ---
  const fetchBrands = async (search = '') => {
    setBrandSearchLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/products/get-all-brand`, {
        params: { page: 1, limit: 50, search: search }
      });
      const brandData = response.data?.data || response.data?.brands || [];
      setBrands(brandData);
    } catch (err) {
      console.error("Failed to fetch brands", err);
    } finally {
        setBrandSearchLoading(false);
    }
  };

  // --- 2. FETCH CATEGORIES ---
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products/get-all-category`, {
        params: { page: 1, limit: 100, search: '' } 
      });
      const catData = response.data?.data || response.data?.categories || [];
      setCategories(catData);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  // --- 3. FETCH PRODUCTS ---
  const fetchProducts = async (page = 1, limit = 10, search = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/products/get-all-products`, {
        params: { page, limit, search: search || undefined }
      });
      
      const resData = response.data;
      let rawList = [];

      if (Array.isArray(resData)) {
          rawList = resData;
      } else if (resData?.data && Array.isArray(resData.data)) {
          rawList = resData.data;
      } else if (resData?.products && Array.isArray(resData.products)) {
          rawList = resData.products;
      } else if (resData?.data?.products && Array.isArray(resData.data.products)) {
          rawList = resData.data.products;
      } else if (resData?.data?.data && Array.isArray(resData.data.data)) {
          rawList = resData.data.data;
      }

      setProducts(rawList);
      setTotal(resData?.pagination?.total || resData?.total || rawList.length || 0);
      
    } catch (err) {
      message.error("Failed to load products list.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands(''); 
    fetchCategories();
    const delayDebounce = setTimeout(() => {
        fetchProducts(currentPage, pageSize, searchText);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [currentPage, pageSize, searchText]);

  // --- 4. IMAGE UPLOAD ---
  const customUploadRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file); 

    try {
      const response = await axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      console.log("📤 Upload API Response:", response.data);
      
      let imageUrl = '';
      if (typeof response.data === 'string') {
        imageUrl = response.data;
      } else if (response.data?.url) {
        imageUrl = response.data.url;
      } else if (response.data?.secure_url) {
        imageUrl = response.data.secure_url;
      } else if (response.data?.data?.url) {
        imageUrl = response.data.data.url;
      }
      
      if (imageUrl) {
          onSuccess(imageUrl);
          message.success("Image uploaded");
      } else {
          onError(new Error("No URL returned"));
      }
    } catch (err) {
      console.error("📤 Upload Error:", err);
      onError(err);
      message.error("Upload failed");
    }
  };

  // --- 5. SAVE PRODUCT ---
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const keyFeaturesArray = values.keyFeatures 
        ? values.keyFeatures.split(',').map(item => item.trim()).filter(item => item)
        : [];
      
      const materialArray = values.material 
        ? values.material.split(',').map(item => item.trim()).filter(item => item)
        : [];

      // 1. Process Main Photos (Top Level)
      let processedMainPhotos = [];
      if (values.mainPhotos && Array.isArray(values.mainPhotos)) {
        processedMainPhotos = values.mainPhotos.map(file => {
             if (file.response) {
                  if (typeof file.response === 'string') return file.response;
                  return file.response.url || file.response.secure_url || file.response;
             }
             if (file.url) return file.url;
             return null; 
        }).filter(item => item !== null && item !== STATIC_IMG);
      }

      // 2. Process Colours 
      const formattedColours = values.colours?.map(col => {
           let extractedUrls = [];
           if (col.photos && Array.isArray(col.photos)) {
               extractedUrls = col.photos.map(file => {
                   if (file.response) {
                        if (typeof file.response === 'string') return file.response;
                        return file.response.url || file.response.secure_url || file.response;
                   }
                   if (file.url) {
                       return file.url; 
                   }
                   return null; 
               }).filter(item => item !== null && item !== STATIC_IMG);
           }

           const validId = (col._id && typeof col._id === 'string' && col._id.trim().length > 0) ? col._id : undefined;

            return {
                ...(validId && { _id: validId }),
                colourName: col.colourName,
                photos: extractedUrls, 
                isActive: col.isActive !== undefined ? col.isActive : true
            };
      }) || [];

      // Payload Construction
      const payload = {
        product: {
          name: values.name,
          category: values.category, 
          brandName: values.brandName, 
          description: values.description,
          price: values.price,
          discountedPrice: values.discountedPrice,
          currency: values.currency,
          quantity: values.quantity,
          warrantyYears: values.warrantyYears,
          returnPolicyDays: values.returnPolicyDays,
          noCostEmiAvailable: values.noCostEmiAvailable,
          keyFeatures: keyFeaturesArray,
          material: materialArray,
          finish: values.finish,
          assemblyRequired: values.assemblyRequired,
          assemblyToolsProvided: values.assemblyToolsProvided,
          careInstructions: values.careInstructions,
          originCountry: values.originCountry,
          isActive: values.isActive,
          isFeatured: values.isFeatured,
          
          // ✅ Using the new Main Photos field
          photos: processedMainPhotos
        },
        colours: formattedColours
      };

      console.log("🚀 Payload being sent:", JSON.stringify(payload, null, 2));

      let response;
      if (editingId) {
        response = await axios.post(`${BASE_URL}/api/products/edit-product-by-id?id=${editingId}`, payload);
      } else {
        response = await axios.post(`${BASE_URL}/api/products/create-products`, payload);
      }
      
      if (response.data?.success === true || response.status === 200 || response.status === 201) {
        notification.success({
          message: editingId ? 'Product Updated' : 'Product Created',
          description: `Product ${values.name} saved successfully.`,
          placement: 'topRight'
        });
        closeModal();
        fetchProducts(currentPage, pageSize);
      }
    } catch (err) {
      console.error("Save Error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Something went wrong";
      message.error(`Failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // --- 6. DELETE PRODUCT ---
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/products/delete-product-by-id?id=${id}`); 
      message.success("Product deleted successfully.");
      fetchProducts(currentPage, pageSize, searchText);
    } catch (err) {
      console.error("Delete Error:", err);
      message.error(err.response?.data?.message || "Deletion failed.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
    setEditingData(null);
    form.resetFields();
  };

  // --- 7. HANDLE EDIT ---
  const handleEdit = (record) => {
    console.log("📝 Editing Record:", record);
    
    setEditingData(record);
    const productId = record._id || record.id || record.product?._id;
    setEditingId(productId);
    
    form.resetFields();
    setModalVisible(true);
    
    setTimeout(() => {
      try {
        const productData = record.product || record;
        
        const brandId = typeof productData.brandName === 'object' 
          ? productData.brandName?._id || productData.brandName 
          : productData.brandName;

        const categoryId = typeof productData.category === 'object'
          ? productData.category?._id || productData.category
          : productData.category;

        const keyFeaturesString = Array.isArray(productData.keyFeatures) 
          ? productData.keyFeatures.join(', ') 
          : '';
        
        const materialString = Array.isArray(productData.material) 
          ? productData.material.join(', ') 
          : '';

        // Prepare Main Photos for Edit Mode
        const mainPhotosFileList = (productData.photos || []).map((url, index) => {
            let safeUrl = typeof url === 'string' ? url : (url.url || STATIC_IMG);
            return {
                uid: `main-photo-${index}`,
                name: `image-${index}.png`,
                status: 'done',
                url: safeUrl,
                response: safeUrl
            };
        });

        const coloursData = (record.colours || []).map((color, index) => {
          const photosData = (color.photos || []).map((photo, photoIndex) => {
            let imageUrl = '';
            if (typeof photo === 'string' && photo.length > 5) imageUrl = photo;
            else if (photo?.url) imageUrl = photo.url;
            else if (photo?.secure_url) imageUrl = photo.secure_url;
            
            if (!imageUrl) imageUrl = STATIC_IMG;
            
            return {
              uid: `color-${index}-photo-${photoIndex}-${Date.now()}`,
              name: `image-${photoIndex}.jpg`,
              status: 'done',
              url: imageUrl,
              response: imageUrl
            };
          });

          return {
            _id: color._id || '',
            colourName: color.colourName || `Color ${index + 1}`,
            photos: photosData,
            isActive: color.isActive !== undefined ? color.isActive : true
          };
        });

        const formValues = {
          name: productData.name || '',
          brandName: brandId || '',
          category: categoryId || '',
          description: productData.description || '',
          price: productData.price || 0,
          discountedPrice: productData.discountedPrice || 0,
          currency: productData.currency || 'AED',
          quantity: productData.quantity || 0,
          warrantyYears: productData.warrantyYears || 0,
          returnPolicyDays: productData.returnPolicyDays || 0,
          noCostEmiAvailable: productData.noCostEmiAvailable || false,
          keyFeatures: keyFeaturesString,
          material: materialString,
          finish: productData.finish || '',
          assemblyRequired: productData.assemblyRequired || false,
          assemblyToolsProvided: productData.assemblyToolsProvided || false,
          careInstructions: productData.careInstructions || '',
          originCountry: productData.originCountry || '',
          isActive: productData.isActive !== undefined ? productData.isActive : true,
          isFeatured: productData.isFeatured !== undefined ? productData.isFeatured : false,
          colours: coloursData.length > 0 ? coloursData : undefined,
          mainPhotos: mainPhotosFileList // ✅ Set Main Photos
        };

        form.setFieldsValue(formValues);
      } catch (error) {
        console.error("📝 Error setting form values:", error);
        message.error("Failed to load product data");
      }
    }, 100);
  };

  const columns = [
    {
      title: 'Product Name',
      key: 'name',
      render: (text, record) => {
        const p = record.product || record;
        const name = p.name || "No Name";
        
        let displayImage = STATIC_IMG;
        
        // Priority 1: Main Product Photo
        if (p.photos && p.photos.length > 0 && typeof p.photos[0] === 'string' && p.photos[0].length > 5) {
            displayImage = p.photos[0];
        } 
        // Priority 2: First Colour Variant Photo
        else if (record.colours && record.colours.length > 0 && record.colours[0].photos && record.colours[0].photos.length > 0) {
             const firstPhoto = record.colours[0].photos[0];
             if (typeof firstPhoto === 'string' && firstPhoto.length > 5) displayImage = firstPhoto;
        }

        return (
            <Space>
            <Avatar 
                shape="square" 
                size={48} 
                src={displayImage} 
                icon={<AppstoreOutlined />} 
                style={{ backgroundColor: '#f0f0f0' }}
            />
            <Text strong>{name}</Text>
            </Space>
        );
      },
    },
    {
      title: 'Brand & Category',
      key: 'brand_cat',
      render: (_, r) => {
         const p = r.product || r;
         const brandName = typeof p.brandName === 'object' ? p.brandName?.name : "Brand ID"; 
         const catName = typeof p.category === 'object' ? p.category?.name : "Cat ID";

         const brandObj = brands.find(b => b._id === (p.brandName?._id || p.brandName));
         const catObj = categories.find(c => c._id === (p.category?._id || p.category));

         return (
             <Space direction="vertical" size={0}>
                 <Tag color="blue">{brandObj ? (brandObj.name || brandObj.brandName) : brandName}</Tag>
                 <Text type="secondary" style={{ fontSize: 12 }}>{catObj ? (catObj.name || catObj.categoryName) : catName}</Text>
             </Space>
         );
      },
    },
    {
      title: 'Price & Stock',
      key: 'price',
      render: (_, record) => {
        const p = record.product || record || {};
        return (
            <div className="flex flex-col">
                <Text>{p.currency} {p.discountedPrice} <Text type="secondary" delete>{p.price}</Text></Text>
                <Tag color={p.quantity > 0 ? "success" : "error"} style={{ width: 'fit-content', marginTop: 4 }}>
                    {p.quantity > 0 ? `${p.quantity} in Stock` : "Out of Stock"}
                </Tag>
            </div>
        )
      },
    },
    {
      title: 'Action',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined style={{ color: THEME.primary }} />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Popconfirm 
            title="Delete product?" 
            onConfirm={() => deleteProduct(record._id || record.id || record.product?._id)} 
            okButtonProps={{ danger: true, loading: loading }}
          >
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3} style={{ margin: 0 }}>Product Management</Title>
        </div>
        <Button 
          type="primary" 
          size="large" 
          icon={<PlusOutlined />} 
          onClick={() => {
              setEditingId(null);
              setEditingData(null);
              form.resetFields();
              setModalVisible(true);
          }}
          style={{ backgroundColor: THEME.primary, borderColor: THEME.primary }}
        >
          Add Product
        </Button>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card variant="borderless" className="shadow-sm border-t-4" style={{ borderColor: THEME.primary }}>
            <Statistic title="Total Products" value={total} prefix={<ShoppingOutlined style={{ color: THEME.primary }} />} />
          </Card>
        </Col>
      </Row>

      <Card variant="borderless" className="shadow-md" styles={{ body: { padding: 0 } }}>
        <div className="p-4 border-b bg-white rounded-t-lg">
          <Input 
            prefix={<SearchOutlined className="text-gray-400" />} 
            placeholder="Search products..." 
            style={{ maxWidth: 400 }}
            onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
            allowClear
            size="large"
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={products} 
          loading={loading}
          rowKey={(record) => record._id || record.id || record.product?._id || Math.random()}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            onChange: (page, size) => { setCurrentPage(page); setPageSize(size); },
          }}
        />
      </Card>

      <Modal
        title={<div className="font-bold text-lg">{editingId ? 'Edit Product' : 'Add New Product'}</div>}
        open={modalVisible}
        onCancel={closeModal}
        width={950}
        centered
        forceRender={true}
        footer={[
           <Button key="back" onClick={closeModal} size="large">Cancel</Button>,
           <Button key="submit" type="primary" size="large" onClick={handleSave} loading={loading} style={{ backgroundColor: THEME.primary, borderColor: THEME.primary }}>
             {editingId ? 'Update' : 'Save'}
           </Button>
        ]}
      >
        <Divider style={{ margin: '10px 0 25px 0' }} />
        <Form 
          form={form} 
          layout="vertical" 
          initialValues={{ 
            currency: 'AED', 
            isActive: true, 
            isFeatured: false,
            noCostEmiAvailable: false,
            assemblyRequired: false,
            assemblyToolsProvided: false
          }}
          preserve={false}
        >
          
          <div className="mb-6">
             <Text strong className="text-gray-500 uppercase text-xs mb-3 block">Basic Information</Text>
             <Row gutter={16}>
                <Col span={24}>
                    <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Product name is required' }]}>
                        <Input size="large" placeholder="Enter product name" />
                    </Form.Item>
                </Col>

                {/* ✅✅✅ NEW MAIN IMAGE UPLOAD FIELD ✅✅✅ */}
                <Col span={24}>
                    <Form.Item 
                       name="mainPhotos" 
                       label="Product Main Images"
                       valuePropName="fileList"
                       getValueFromEvent={normFile}
                       extra="Upload main images for the product (visible on cards)"
                    >
                       <Upload 
                            customRequest={customUploadRequest}
                            listType="picture-card"
                            multiple={true}
                            accept="image/*"
                            maxCount={5}
                       >
                           <div>
                               <PlusOutlined />
                               <div style={{ marginTop: 8 }}>Upload</div>
                           </div>
                       </Upload>
                    </Form.Item>
                </Col>
                {/* ----------------------------------------------- */}
                
                <Col span={12}>
                    <Form.Item name="brandName" label="Brand" rules={[{ required: true, message: 'Brand is required' }]}>
                        <Select 
                            placeholder="Select Brand" 
                            loading={brandSearchLoading} 
                            showSearch
                            filterOption={false} 
                            onSearch={(val) => fetchBrands(val)} 
                            notFoundContent={brandSearchLoading ? <div style={{padding:8}}>Searching...</div> : null}
                            size="large"
                        >
                            {brands.map(brand => (
                                <Option key={brand._id} value={brand._id}>
                                    {brand.name || brand.brandName || "Unnamed"}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Category is required' }]}>
                        <Select placeholder="Select Category" loading={categories.length === 0} showSearch optionFilterProp="children" size="large">
                            {categories.map(cat => (
                                <Option key={cat._id} value={cat._id}>{cat.name || cat.categoryName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={3} placeholder="Enter detailed description..." />
                    </Form.Item>
                </Col>
             </Row>
          </div>

          <Divider />

          <div className="mb-6">
             <Text strong className="text-gray-500 uppercase text-xs mb-3 block">Pricing & Inventory</Text>
             <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="price" label="Original Price (AED)" rules={[{ required: true, message: 'Price is required' }]}>
                        <InputNumber 
                          style={{ width: '100%' }} 
                          size="large" 
                          min={0}
                          formatter={value => `AED ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/AED\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="discountedPrice" label="Discounted Price (AED)">
                        <InputNumber 
                          style={{ width: '100%' }} 
                          size="large" 
                          min={0}
                          formatter={value => `AED ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/AED\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="currency" label="Currency">
                        <Select size="large">
                            <Option value="AED">AED</Option>
                            <Option value="USD">USD</Option>
                            <Option value="INR">INR</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="quantity" label="Stock Quantity" rules={[{ required: true, message: 'Quantity is required' }]}>
                        <InputNumber style={{ width: '100%' }} size="large" min={0} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="noCostEmiAvailable" valuePropName="checked" label="No Cost EMI Available">
                        <Switch />
                    </Form.Item>
                </Col>
             </Row>
          </div>

          <Divider />

          <div className="mb-6">
             <Text strong className="text-gray-500 uppercase text-xs mb-3 block">Specifications</Text>
             <Row gutter={16}>
                <Col span={24}>
                    <Form.Item name="keyFeatures" label="Key Features (comma separated)">
                        <TextArea 
                          rows={2} 
                          placeholder="Enter key features separated by commas, e.g., Scratch Resistant, Water Proof, Easy to Clean" 
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="material" label="Materials (comma separated)">
                        <TextArea 
                          rows={2} 
                          placeholder="Enter materials separated by commas, e.g., Solid Wood, Metal, Glass" 
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="finish" label="Finish">
                        <Input placeholder="e.g. Matte, Glossy, Wooden" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="warrantyYears" label="Warranty (Years)">
                        <InputNumber style={{ width: '100%' }} min={0} max={10} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="returnPolicyDays" label="Return Policy (Days)">
                        <InputNumber style={{ width: '100%' }} min={0} max={365} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="careInstructions" label="Care Instructions">
                        <TextArea rows={2} placeholder="Enter care instructions..." />
                    </Form.Item>
                </Col>
                <Col span={8}>
                   <Form.Item name="originCountry" label="Origin Country">
                       <Input placeholder="e.g. India, China, UAE" />
                   </Form.Item>
                </Col>
                <Col span={4}>
                   <Form.Item name="isActive" valuePropName="checked" label="Active">
                       <Switch />
                   </Form.Item>
                </Col>
                <Col span={4}>
                   <Form.Item name="isFeatured" valuePropName="checked" label="Featured">
                       <Switch />
                   </Form.Item>
                </Col>
                <Col span={4}>
                   <Form.Item name="assemblyRequired" valuePropName="checked" label="Assembly Required">
                       <Switch />
                   </Form.Item>
                </Col>
                <Col span={4}>
                   <Form.Item name="assemblyToolsProvided" valuePropName="checked" label="Tools Provided">
                       <Switch />
                   </Form.Item>
                </Col>
             </Row>
          </div>

          <Divider />

          <div className="mb-4">
             <Text strong className="text-gray-500 uppercase text-xs mb-3 block">Colour Variants & Images</Text>
             
             <Form.List 
                name="colours"
                initialValue={[]}
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(new Error('At least one color variant is required'));
                      }
                    },
                  },
                ]}
             >
               {(fields, { add, remove }, { errors }) => {
                 return (
                   <div className="flex flex-col gap-4">
                     {fields.map(({ key, name, ...restField }) => {
                       const colourName = form.getFieldValue(['colours', name, 'colourName']);
                       const photos = form.getFieldValue(['colours', name, 'photos']);
                       
                       return (
                         <Card
                           variant="outlined"
                           size="small"
                           key={key}
                           title={colourName ? `Color: ${colourName}` : `Variant #${name + 1}`}
                           extra={<Button danger type="text" icon={<DeleteOutlined />} onClick={() => remove(name)}>Remove</Button>}
                           style={{ background: '#fafafa', borderColor: '#e5e7eb' }}
                         >
                            <Form.Item {...restField} name={[name, '_id']} noStyle>
                                <Input type="hidden" />
                            </Form.Item>

                           <Row gutter={16}>
                              <Col span={12}>
                                 <Form.Item 
                                   {...restField} 
                                   name={[name, 'colourName']} 
                                   label="Colour Name" 
                                   rules={[{ required: true, message: 'Color name is required' }]}
                                 >
                                    <Input placeholder="e.g. Walnut Brown, Black, White" />
                                 </Form.Item>
                              </Col>
                              <Col span={12}>
                                 <Form.Item 
                                   {...restField} 
                                   name={[name, 'isActive']} 
                                   valuePropName="checked" 
                                   label="Active Variant"
                                 >
                                    <Switch defaultChecked />
                                 </Form.Item>
                              </Col>
                              <Col span={24}>
                                 <Form.Item 
                                   {...restField} 
                                   name={[name, 'photos']} 
                                   label="Product Images"
                                   valuePropName="fileList"
                                   getValueFromEvent={normFile}
                                   rules={[
                                     { required: true, message: 'At least one image is required' },
                                     {
                                        validator: (_, value) => {
                                          if (value && value.length > 0) return Promise.resolve();
                                          return Promise.reject(new Error('At least one image is required'));
                                        }
                                     }
                                   ]}
                                   extra="Upload product images for this color variant"
                                 >
                                    <Upload 
                                           customRequest={customUploadRequest}
                                           listType="picture-card"
                                           multiple={true}
                                           accept="image/*"
                                           maxCount={8}
                                    >
                                           {photos?.length >= 8 ? null : (
                                             <div>
                                               <PlusOutlined />
                                               <div style={{ marginTop: 8 }}>Upload</div>
                                             </div>
                                           )}
                                    </Upload>
                                 </Form.Item>
                              </Col>
                           </Row>
                         </Card>
                       );
                     })}
                   
                     <Button 
                       type="dashed" 
                       onClick={() => add({ colourName: '', photos: [], isActive: true })} 
                       block 
                       icon={<PlusOutlined />} 
                       size="large"
                     >
                       Add Colour Variant
                     </Button>
                     <Form.ErrorList errors={errors} />
                   </div>
                 );
               }}
             </Form.List>
          </div>

        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;