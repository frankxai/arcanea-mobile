import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PanResponder } from 'react-native';
import { useTheme } from '../theme';

interface Studio3DProps {
  navigation: any;
}

export const Studio3DScreen: React.FC<Studio3DProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedTool, setSelectedTool] = useState('select');
  const [objects, setObjects] = useState<Array<{ id: string; type: string; position: { x: number; y: number } }>>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Touch gesture handling for mobile
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setIsDrawing(true);
        
        if (selectedTool === 'cube' || selectedTool === 'sphere') {
          const newObject = {
            id: Date.now().toString(),
            type: selectedTool,
            position: { x: locationX, y: locationY }
          };
          setObjects(prev => [...prev, newObject]);
        }
      },
      onPanResponderMove: (evt) => {
        if (isDrawing && selectedTool === 'draw') {
          const { locationX, locationY } = evt.nativeEvent;
          const newObject = {
            id: Date.now().toString(),
            type: 'line',
            position: { x: locationX, y: locationY }
          };
          setObjects(prev => [...prev, newObject]);
        }
      },
      onPanResponderRelease: () => {
        setIsDrawing(false);
      },
    })
  ).current;

  const tools = [
    { id: 'select', icon: '👆', label: 'Select', color: theme.colors.primary },
    { id: 'cube', icon: '⬜', label: 'Cube', color: theme.colors.fire },
    { id: 'sphere', icon: '⭕', label: 'Sphere', color: theme.colors.water },
    { id: 'light', icon: '💡', label: 'Light', color: theme.colors.gold },
    { id: 'draw', icon: '✏️', label: 'Draw', color: theme.colors.earth },
    { id: 'camera', icon: '📷', label: 'Camera', color: theme.colors.wind },
  ];

  const renderObject = (obj: any) => {
    switch (obj.type) {
      case 'cube':
        return (
          <View
            key={obj.id}
            style={[
              styles.cube,
              {
                left: obj.position.x - 25,
                top: obj.position.y - 25,
                backgroundColor: theme.colors.fire,
              }
            ]}
          />
        );
      case 'sphere':
        return (
          <View
            key={obj.id}
            style={[
              styles.sphere,
              {
                left: obj.position.x - 25,
                top: obj.position.y - 25,
                backgroundColor: theme.colors.water,
              }
            ]}
          />
        );
      case 'line':
        return (
          <View
            key={obj.id}
            style={[
              styles.linePoint,
              {
                left: obj.position.x - 4,
                top: obj.position.y - 4,
                backgroundColor: theme.colors.earth,
              }
            ]}
          />
        );
      default:
        return null;
    }
  };

  const handleClear = () => {
    setObjects([]);
  };

  const handleExport = () => {
    // In a real app, this would export the 3D scene
    console.log('Exporting scene:', objects);
    alert('Scene exported successfully! (Demo)');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3D Spatial Studio</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Tool Palette */}
      <View style={[styles.toolPalette, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tools</Text>
        <View style={styles.toolsGrid}>
          {tools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[
                styles.toolButton,
                {
                  backgroundColor: selectedTool === tool.id ? tool.color : theme.colors.background,
                  borderColor: tool.color,
                }
              ]}
              onPress={() => setSelectedTool(tool.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.toolIcon}>{tool.icon}</Text>
              <Text style={[
                styles.toolLabel,
                { color: selectedTool === tool.id ? '#FFFFFF' : tool.color }
              ]}>
                {tool.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 3D Canvas Area */}
      <View style={[styles.canvasArea, { backgroundColor: theme.colors.background }]}>
        <View
          style={styles.canvas}
          {...panResponder.panHandlers}
        >
          {objects.map(renderObject)}
          
          {objects.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyIcon]}>🎨</Text>
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                Tap to create 3D objects
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.colors.textTertiary }]}>
                Select a tool and touch the canvas
              </Text>
            </View>
          )}
        </View>

        {/* Scene Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.colors.error }]}
            onPress={handleClear}
            activeOpacity={0.8}
          >
            <Text style={styles.controlText}>Clear</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.colors.success }]}
            onPress={handleExport}
            activeOpacity={0.8}
          >
            <Text style={styles.controlText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Properties Panel */}
      <View style={[styles.propertiesPanel, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Scene Properties</Text>
        <View style={styles.propertyRow}>
          <Text style={[styles.propertyLabel, { color: theme.colors.textSecondary }]}>Objects:</Text>
          <Text style={[styles.propertyValue, { color: theme.colors.text }]}>{objects.length}</Text>
        </View>
        <View style={styles.propertyRow}>
          <Text style={[styles.propertyLabel, { color: theme.colors.textSecondary }]}>Current Tool:</Text>
          <Text style={[styles.propertyValue, { color: theme.colors.text }]}>
            {tools.find(t => t.id === selectedTool)?.label}
          </Text>
        </View>
        <View style={styles.propertyRow}>
          <Text style={[styles.propertyLabel, { color: theme.colors.textSecondary }]}>Mode:</Text>
          <Text style={[styles.propertyValue, { color: theme.colors.text }]}>Touch</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  toolPalette: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolButton: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  toolLabel: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  canvasArea: {
    flex: 1,
    position: 'relative',
  },
  canvas: {
    flex: 1,
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
  },
  cube: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sphere: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  linePoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  controlButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  controlText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  propertiesPanel: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  propertyLabel: {
    fontSize: 14,
  },
  propertyValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});