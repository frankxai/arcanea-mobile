import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useTheme } from '../theme';
import { GenerationRequest, GenerationResponse } from '../types';

interface ImagineScreenProps {
  navigation: any;
}

export const ImagineScreenAdvanced: React.FC<ImagineScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedType, setSelectedType] = useState<'text' | 'image' | 'video' | 'audio'>('text');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generations, setGenerations] = useState<GenerationResponse[]>([]);

  const generationTypes = [
    { id: 'text', icon: '📝', label: 'Text', color: theme.colors.primary },
    { id: 'image', icon: '🎨', label: 'Image', color: theme.colors.fire },
    { id: 'video', icon: '🎬', label: 'Video', color: theme.colors.water },
    { id: 'audio', icon: '🎵', label: 'Audio', color: theme.colors.earth },
  ];

  const stylePresets = {
    text: ['Creative', 'Technical', 'Poetic', 'Professional', 'Casual'],
    image: ['Realistic', 'Anime', 'Abstract', '3D Render', 'Oil Painting'],
    video: ['Cinematic', 'Animation', 'Documentary', 'Music Video', 'Short Film'],
    audio: ['Speech', 'Music', 'Sound Effects', 'Ambient', 'Podcast'],
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate generation process
    const newGeneration: GenerationResponse = {
      id: Date.now().toString(),
      type: selectedType,
      status: 'generating',
    };

    setGenerations(prev => [newGeneration, ...prev]);

    // Simulate API delay
    setTimeout(() => {
      setGenerations(prev => 
        prev.map(g => 
          g.id === newGeneration.id 
            ? { 
                ...g, 
                status: 'completed',
                content: selectedType === 'text' 
                  ? `Generated ${selectedType} content for: "${prompt}"`
                  : undefined,
                url: selectedType !== 'text' 
                  ? `https://generated-${selectedType}-${Date.now()}.${selectedType === 'audio' ? 'mp3' : selectedType === 'video' ? 'mp4' : 'png'}`
                  : undefined,
                metadata: {
                  size: selectedType === 'text' ? prompt.length * 2 : Math.floor(Math.random() * 1000000) + 100000,
                  format: selectedType,
                  provider: 'Arcanea AI',
                }
              }
            : g
        )
      );
      setIsGenerating(false);
    }, 3000);
  };

  const renderGenerationCard = (generation: GenerationResponse) => {
    const isGenerating = generation.status === 'generating';
    
    return (
      <View key={generation.id} style={[styles.generationCard, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.generationHeader}>
          <Text style={[styles.generationType, { color: theme.colors.primary }]}>
            {generation.type.toUpperCase()}
          </Text>
          <Text style={[styles.generationStatus, {
            color: generation.status === 'completed' ? theme.colors.success : 
                   generation.status === 'error' ? theme.colors.error : theme.colors.warning
          }]}>
            {generation.status === 'generating' ? '⏳ Generating...' :
             generation.status === 'completed' ? '✅ Completed' : '❌ Error'}
          </Text>
        </View>

        {isGenerating ? (
          <View style={styles.generatingState}>
            <View style={styles.loadingSpinner} />
            <Text style={[styles.generatingText, { color: theme.colors.textSecondary }]}>
              Creating amazing {generation.type} content...
            </Text>
          </View>
        ) : (
          <View style={styles.generatedContent}>
            {generation.content && (
              <Text style={[styles.textContent, { color: theme.colors.text }]}>
                {generation.content}
              </Text>
            )}
            
            {generation.url && (
              <View style={styles.previewContainer}>
                <View style={[styles.previewPlaceholder, { backgroundColor: theme.colors.background }]}>
                  <Text style={styles.previewIcon}>
                    {generation.type === 'image' ? '🖼️' :
                     generation.type === 'video' ? '🎥' : '🎧'}
                  </Text>
                  <Text style={[styles.previewText, { color: theme.colors.textSecondary }]}>
                    Generated {generation.type}
                  </Text>
                </View>
              </View>
            )}
            
            {generation.metadata && (
              <View style={styles.metadata}>
                <Text style={[styles.metadataText, { color: theme.colors.textTertiary }]}>
                  Size: {generation.metadata.size ? `${(generation.metadata.size / 1024).toFixed(1)}KB` : 'N/A'}
                </Text>
                <Text style={[styles.metadataText, { color: theme.colors.textTertiary }]}>
                  Format: {generation.metadata.format || 'N/A'}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Imagine & Create</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Type Selection */}
      <View style={[styles.typeSection, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Creation Type</Text>
        <View style={styles.typeGrid}>
          {generationTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                {
                  backgroundColor: selectedType === type.id ? type.color : theme.colors.background,
                  borderColor: type.color,
                }
              ]}
              onPress={() => setSelectedType(type.id as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.typeIcon}>{type.icon}</Text>
              <Text style={[
                styles.typeLabel,
                { color: selectedType === type.id ? '#FFFFFF' : type.color }
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Prompt Input */}
      <View style={[styles.promptSection, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your Vision</Text>
        <Text style={[styles.promptPlaceholder, { color: theme.colors.textSecondary }]}>
          Describe what you want to create...
        </Text>
        
        <ScrollView style={styles.promptContainer}>
          <Text style={[styles.promptText, { color: theme.colors.text }]}>
            {prompt || 'Start typing your creative vision here...'}
          </Text>
        </ScrollView>

        {/* Style Presets */}
        <View style={styles.styleContainer}>
          <Text style={[styles.styleTitle, { color: theme.colors.textSecondary }]}>
            Style Suggestions:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.styleList}>
              {stylePresets[selectedType as keyof typeof stylePresets].map((style, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.styleChip,
                    { backgroundColor: `${theme.colors.primary}20` }
                  ]}
                  onPress={() => setPrompt(prev => `${prev} ${style}`)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.styleChipText, { color: theme.colors.primary }]}>
                    {style}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          style={[
            styles.generateButton,
            {
              backgroundColor: isGenerating ? theme.colors.textTertiary : theme.colors.primary,
              opacity: !prompt.trim() ? 0.5 : 1,
            }
          ]}
          onPress={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          activeOpacity={0.8}
        >
          <Text style={styles.generateButtonText}>
            {isGenerating ? '⏳ Creating...' : '✨ Generate'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Generations History */}
      <View style={styles.generationsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Recent Creations ({generations.length})
        </Text>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {generations.map(renderGenerationCard)}
          
          {generations.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎨</Text>
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                No creations yet
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.colors.textTertiary }]}>
                Start by describing what you want to create
              </Text>
            </View>
          )}
        </ScrollView>
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
  typeSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  promptSection: {
    flex: 1,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  promptPlaceholder: {
    fontSize: 12,
    marginBottom: 8,
  },
  promptContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    maxHeight: 120,
  },
  promptText: {
    fontSize: 16,
    color: '#212121',
    minHeight: 20,
  },
  styleContainer: {
    marginBottom: 16,
  },
  styleTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  styleList: {
    flexDirection: 'row',
  },
  styleChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  styleChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  generateButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  generationsSection: {
    flex: 2,
    padding: 16,
  },
  generationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  generationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  generationType: {
    fontSize: 12,
    fontWeight: '600',
  },
  generationStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  generatingState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingSpinner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#6B46C1',
    borderTopColor: 'transparent',
    marginBottom: 12,
  },
  generatingText: {
    fontSize: 14,
    textAlign: 'center',
  },
  generatedContent: {
    // Content styles
  },
  textContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  previewContainer: {
    marginBottom: 12,
  },
  previewPlaceholder: {
    height: 120,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metadataText: {
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
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
});