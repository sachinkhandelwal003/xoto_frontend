import { useState } from 'react';
import { 
  Card, 
  Collapse, 
  Slider, 
  Checkbox, 
  Button, 
  Space, 
  Tag, 
  Typography, 
  Row,
  Col,
  Drawer
} from 'antd';
import { 
  FilterOutlined,
  CloseOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Panel } = Collapse;
const { Text, Title } = Typography;

const Filters = ({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  selectedColors,
  setSelectedColors,
  selectedStyles,
  setSelectedStyles,
  selectedMaterials,
  setSelectedMaterials,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  showFilters,
  setShowFilters,
  resetFilters
}) => {
  const categories = [
    { id: 'Sofas', name: 'Sofas' },
    { id: 'Beds', name: 'Beds' },
    { id: 'Tables', name: 'Tables' },
    { id: 'Chairs', name: 'Chairs' },
    { id: 'Storage', name: 'Storage' },
    { id: 'Dining', name: 'Dining' },
    { id: 'Lighting', name: 'Lighting' },
  ];

  const interiorStyles = [
    { id: 'modern', name: 'Modern', color: 'blue' },
    { id: 'minimalist', name: 'Minimalist', color: 'cyan' },
    { id: 'industrial', name: 'Industrial', color: 'orange' },
    { id: 'scandinavian', name: 'Scandinavian', color: 'geekblue' },
    { id: 'bohemian', name: 'Bohemian', color: 'purple' },
    { id: 'traditional', name: 'Traditional', color: 'red' },
  ];

  const materials = [
    { id: 'wood', name: 'Wood' },
    { id: 'metal', name: 'Metal' },
    { id: 'fabric', name: 'Fabric' },
    { id: 'stone', name: 'Stone' },
    { id: 'glass', name: 'Glass' },
    { id: 'leather', name: 'Leather' },
  ];

  const colors = [
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'black', name: 'Black', hex: '#111827' },
    { id: 'gray', name: 'Gray', hex: '#6B7280' },
    { id: 'brown', name: 'Brown', hex: '#92400E' },
    { id: 'blue', name: 'Blue', hex: '#3B82F6' },
    { id: 'green', name: 'Green', hex: '#10B981' },
    { id: 'red', name: 'Red', hex: '#EF4444' },
  ];

  const filterContent = (
    <>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: '2px solid #f1f5f9'
      }}>
        <Title level={4} style={{ 
          margin: 0, 
          fontWeight: 700, 
          color: '#4f46e5',
          fontSize: '20px'
        }}>
          <FilterOutlined style={{ 
            marginRight: 10, 
            color: '#8b5cf6',
          }} />
          Filters
        </Title>
        <Space size={8}>
          <Button 
            size="small" 
            icon={<ReloadOutlined />} 
            onClick={resetFilters}
            style={{
              borderRadius: '6px',
              color: '#64748b',
              borderColor: '#cbd5e1',
              fontWeight: '500',
            }}
          >
            Reset
          </Button>
          <Button 
            size="small" 
            icon={<CloseOutlined />}
            onClick={() => setShowFilters(false)}
            style={{
              borderRadius: '6px',
              color: '#64748b',
              borderColor: '#cbd5e1',
              fontWeight: '500',
            }}
          >
            Hide
          </Button>
        </Space>
      </div>

      <Collapse 
        defaultActiveKey={['categories', 'price', 'colors', 'styles', 'materials']}
        ghost
        expandIconPosition="right"
        style={{ background: 'transparent' }}
      >
        <Panel 
          header={<Text strong style={{ color: '#334155', fontSize: '15px' }}>Categories</Text>} 
          key="categories"
          style={{ borderBottom: '1px solid #e2e8f0' }}
        >
          <Checkbox.Group 
            value={selectedCategories} 
            onChange={setSelectedCategories}
            style={{ width: '100%' }}
          >
            <Row gutter={[8, 10]}>
              {categories.map(category => (
                <Col span={24} key={category.id}>
                  <Checkbox 
                    value={category.id}
                    style={{ 
                      padding: '8px 0',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Text style={{ 
                      fontSize: '14px', 
                      color: '#475569',
                      transition: 'color 0.3s'
                    }}>
                      {category.name}
                    </Text>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Panel>

        <Panel 
          header={<Text strong style={{ color: '#334155', fontSize: '15px' }}>Price Range</Text>} 
          key="price"
          style={{ borderBottom: '1px solid #e2e8f0' }}
        >
          <div style={{ padding: '16px 0' }}>
            <Slider
              range
              min={0}
              max={50000}
              step={1000}
              value={priceRange}
              onChange={setPriceRange}
              trackStyle={{ background: 'linear-gradient(90deg, #8b5cf6, #6366f1)' }}
              handleStyle={{
                borderColor: '#8b5cf6',
                backgroundColor: '#fff',
                boxShadow: '0 2px 6px rgba(139, 92, 246, 0.3)'
              }}
              tooltip={{
                formatter: (value) => `₹${value.toLocaleString()}`,
                color: '#8b5cf6'
              }}
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: 16 
            }}>
              <Text style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>
                ₹{priceRange[0].toLocaleString()}
              </Text>
              <Text style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>
                ₹{priceRange[1].toLocaleString()}
              </Text>
            </div>
          </div>
        </Panel>

        <Panel 
          header={<Text strong style={{ color: '#334155', fontSize: '15px' }}>Colors</Text>} 
          key="colors"
          style={{ borderBottom: '1px solid #e2e8f0' }}
        >
          <Checkbox.Group 
            value={selectedColors} 
            onChange={setSelectedColors}
            style={{ width: '100%' }}
          >
            <Row gutter={[12, 12]}>
              {colors.map(color => (
                <Col span={8} key={color.id}>
                  <Checkbox value={color.id}>
                    <Space direction="vertical" size={6} align="center">
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: color.hex,
                          border: color.id === 'white' 
                            ? '2px solid #cbd5e1' 
                            : '2px solid transparent',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          cursor: 'pointer',
                        }}
                        className="hover:scale-110 hover:shadow-md"
                      />
                      <Text style={{ fontSize: '12px', color: '#475569', fontWeight: '500' }}>
                        {color.name}
                      </Text>
                    </Space>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Panel>

        <Panel 
          header={<Text strong style={{ color: '#334155', fontSize: '15px' }}>Styles</Text>} 
          key="styles"
          style={{ borderBottom: '1px solid #e2e8f0' }}
        >
          <Checkbox.Group 
            value={selectedStyles} 
            onChange={setSelectedStyles}
            style={{ width: '100%' }}
          >
            <Row gutter={[8, 10]}>
              {interiorStyles.map(style => (
                <Col span={24} key={style.id}>
                  <Checkbox value={style.id}>
                    <Tag 
                      color={style.color} 
                      style={{ 
                        margin: 0,
                        borderRadius: '6px',
                        padding: '4px 12px',
                        fontSize: '13px',
                        fontWeight: '500',
                        border: 'none',
                      }}
                    >
                      {style.name}
                    </Tag>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Panel>

        <Panel 
          header={<Text strong style={{ color: '#334155', fontSize: '15px' }}>Materials</Text>} 
          key="materials"
        >
          <Checkbox.Group 
            value={selectedMaterials} 
            onChange={setSelectedMaterials}
            style={{ width: '100%' }}
          >
            <Row gutter={[8, 10]}>
              {materials.map(material => (
                <Col span={24} key={material.id}>
                  <Checkbox 
                    value={material.id}
                    style={{ padding: '8px 0' }}
                  >
                    <Text style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>
                      {material.name}
                    </Text>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Panel>
      </Collapse>

      {(selectedCategories.length > 0 || selectedColors.length > 0 || 
        selectedStyles.length > 0 || selectedMaterials.length > 0 ||
        priceRange[0] > 0 || priceRange[1] < 50000) && (
        <div style={{ 
          marginTop: 24, 
          paddingTop: 16, 
          borderTop: '2px solid #f1f5f9' 
        }}>
          <Text strong style={{ 
            display: 'block', 
            marginBottom: 12, 
            fontSize: '14px',
            color: '#334155'
          }}>
            Active Filters
          </Text>
          <Space size={[6, 8]} wrap>
            {selectedCategories.map(catId => {
              const cat = categories.find(c => c.id === catId);
              return cat && (
                <Tag 
                  key={cat.id} 
                  closable
                  onClose={() => {
                    setSelectedCategories(
                      selectedCategories.filter(id => id !== catId)
                    );
                  }}
                  style={{ 
                    borderRadius: '6px', 
                    padding: '4px 10px',
                    fontSize: '12px',
                    background: 'linear-gradient(135deg, #e0e7ff, #f3e8ff)',
                    border: 'none',
                    color: '#7c3aed',
                    fontWeight: '500',
                  }}
                >
                  {cat.name}
                </Tag>
              );
            })}
            {selectedColors.map(colorId => {
              const color = colors.find(c => c.id === colorId);
              return color && (
                <Tag 
                  key={color.id} 
                  closable
                  onClose={() => {
                    setSelectedColors(
                      selectedColors.filter(id => id !== colorId)
                    );
                  }}
                  style={{ 
                    borderRadius: '6px', 
                    padding: '4px 10px',
                    fontSize: '12px',
                    background: 'linear-gradient(135deg, #e0e7ff, #f3e8ff)',
                    border: 'none',
                    color: '#7c3aed',
                    fontWeight: '500',
                  }}
                >
                  {color.name}
                </Tag>
              );
            })}
            {selectedStyles.map(styleId => {
              const style = interiorStyles.find(s => s.id === styleId);
              return style && (
                <Tag 
                  key={style.id} 
                  closable
                  color={style.color}
                  onClose={() => {
                    setSelectedStyles(
                      selectedStyles.filter(id => id !== styleId)
                    );
                  }}
                  style={{ 
                    borderRadius: '6px', 
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  {style.name}
                </Tag>
              );
            })}
            {selectedMaterials.map(materialId => {
              const material = materials.find(m => m.id === materialId);
              return material && (
                <Tag 
                  key={material.id} 
                  closable
                  onClose={() => {
                    setSelectedMaterials(
                      selectedMaterials.filter(id => id !== materialId)
                    );
                  }}
                  style={{ 
                    borderRadius: '6px', 
                    padding: '4px 10px',
                    fontSize: '12px',
                    background: 'linear-gradient(135deg, #e0e7ff, #f3e8ff)',
                    border: 'none',
                    color: '#7c3aed',
                    fontWeight: '500',
                  }}
                >
                  {material.name}
                </Tag>
              );
            })}
            {(priceRange[0] > 0 || priceRange[1] < 50000) && (
              <Tag 
                closable
                onClose={() => setPriceRange([0, 50000])}
                style={{ 
                  borderRadius: '6px', 
                  padding: '4px 10px',
                  fontSize: '12px',
                  background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                  border: 'none',
                  color: '#92400e',
                  fontWeight: '500',
                }}
              >
                Price: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
              </Tag>
            )}
          </Space>
        </div>
      )}
    </>
  );

  return (
    <>
      {showFilters && (
        <div style={{ display: 'block' }}>
          <Card
            style={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.1)',
              position: 'sticky',
              top: 80,
              background: '#ffffff',
            }}
            bodyStyle={{ padding: '24px' }}
          >
            {filterContent}
          </Card>
        </div>
      )}

      {!showFilters && (
        <div style={{ 
          position: 'fixed', 
          bottom: 32, 
          right: 24, 
          zIndex: 1000 
        }}>
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={() => setMobileFiltersOpen(true)}
            size="large"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              border: 'none',
              borderRadius: '50%',
              height: '56px',
              width: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
            }}
          />
        </div>
      )}

      <Drawer
        title={<Text strong style={{ fontSize: '18px', color: '#1e293b' }}>Filters</Text>}
        placement="right"
        onClose={() => setMobileFiltersOpen(false)}
        open={mobileFiltersOpen}
        width={320}
        bodyStyle={{ padding: '20px 24px', background: '#ffffff' }}
        headerStyle={{ borderBottom: '2px solid #f1f5f9', padding: '16px 24px' }}
        extra={
          <Button 
            type="text" 
            icon={<CloseOutlined style={{ color: '#64748b' }} />} 
            onClick={() => setMobileFiltersOpen(false)}
          />
        }
      >
        {filterContent}
      </Drawer>
    </>
  );
};

export default Filters;