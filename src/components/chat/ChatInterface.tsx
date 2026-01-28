import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../theme';
import { GuardianAI, AIMessage } from '../../types';
import { GuardianAvatar } from '../guardians';
import { AIRouter } from '../../services/ai';

interface ChatInterfaceProps {
  guardian: GuardianAI;
  messages: AIMessage[];
  onSendMessage: (message: string) => void;
  onMessageStream?: (chunk: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  guardian,
  messages,
  onSendMessage,
  onMessageStream,
}) => {
  const { theme } = useTheme();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const aiRouter = useRef(new AIRouter());

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, streamingText]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const message = inputText.trim();
    setInputText('');
    setIsTyping(true);
    setStreamingText('');

    try {
      // Prepare messages for AI
      const aiMessages: AIMessage[] = [
        {
          id: 'system',
          role: 'system',
          content: `You are ${guardian.name}, ${guardian.title}. ${guardian.description}. Your personality: ${guardian.personality.communicationStyle}. Your tone: ${guardian.personality.tone}. You specialize in: ${guardian.expertise.join(', ')}. Respond in character with your unique elemental perspective.`,
          timestamp: Date.now(),
          provider: 'system',
        },
        ...messages,
        {
          id: Date.now().toString(),
          role: 'user',
          content: message,
          timestamp: Date.now(),
          provider: 'user',
        }
      ];

      // Get response with streaming
      await aiRouter.current.generateResponse(
        aiRouter.current.selectBestProvider(aiMessages, guardian.element),
        aiMessages,
        (chunk) => {
          if (chunk.content) {
            setStreamingText(prev => prev + chunk.content);
            onMessageStream?.(chunk.content);
          }
          if (chunk.finished) {
            setIsTyping(false);
            // Send complete message to parent
            if (streamingText) {
              onSendMessage(message);
            }
          }
        }
      );
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
    }

    onSendMessage(message);
  };

  const renderMessage = (message: AIMessage, index: number) => {
    const isUser = message.role === 'user';
    const isStreaming = isTyping && index === messages.length;

    return (
      <View key={message.id} style={{
        flexDirection: 'row',
        marginBottom: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
      }}>
        {!isUser && (
          <View style={{ marginRight: theme.spacing.md }}>
            <GuardianAvatar
              guardian={guardian}
              size="small"
              animated={!isStreaming}
            />
          </View>
        )}

        <View style={{
          flex: 1,
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}>
          <View style={{
            maxWidth: '80%',
            backgroundColor: isUser ? guardian.color : theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            borderTopLeftRadius: isUser ? theme.borderRadius.lg : theme.borderRadius.sm,
            borderTopRightRadius: isUser ? theme.borderRadius.sm : theme.borderRadius.lg,
            padding: theme.spacing.md,
            ...theme.shadows.sm,
          }}>
            {!isUser && (
              <Text style={{
                fontFamily: theme.typography.primary,
                fontSize: theme.typography.sm,
                fontWeight: theme.typography.semibold,
                color: guardian.color,
                marginBottom: theme.spacing.xs,
              }}>
                {guardian.name}
              </Text>
            )}
            
            <Text style={{
              fontFamily: theme.typography.secondary,
              fontSize: theme.typography.base,
              color: isUser ? theme.colors.surface : theme.colors.text,
              lineHeight: theme.typography.relaxed,
            }}>
              {isStreaming ? streamingText : message.content}
            </Text>
            
            {isStreaming && (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: theme.spacing.sm,
              }}>
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: isUser ? theme.colors.surface : guardian.color,
                  marginRight: 4,
                }} />
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: isUser ? theme.colors.surface : guardian.color,
                  marginRight: 4,
                  opacity: 0.6,
                }} />
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: isUser ? theme.colors.surface : guardian.color,
                  opacity: 0.3,
                }} />
              </View>
            )}
          </View>
          
          <Text style={{
            fontFamily: theme.typography.secondary,
            fontSize: theme.typography.xs,
            color: theme.colors.textTertiary,
            marginTop: theme.spacing.xs,
            paddingHorizontal: theme.spacing.xs,
          }}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Chat Header */}
        <View style={{
          backgroundColor: guardian.color,
          paddingTop: 60,
          paddingBottom: theme.spacing.lg,
          paddingHorizontal: theme.spacing.lg,
          borderBottomLeftRadius: theme.borderRadius.xxl,
          borderBottomRightRadius: theme.borderRadius.xxl,
          ...theme.shadows.lg,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <GuardianAvatar
              guardian={guardian}
              size="medium"
              isSelected={true}
            />
            <View style={{ marginLeft: theme.spacing.md, flex: 1 }}>
              <Text style={{
                fontFamily: theme.typography.primary,
                fontSize: theme.typography.xl,
                fontWeight: theme.typography.bold,
                color: theme.colors.surface,
              }}>
                {guardian.name}
              </Text>
              <Text style={{
                fontFamily: theme.typography.secondary,
                fontSize: theme.typography.sm,
                color: theme.colors.surface,
                opacity: 0.9,
              }}>
                {guardian.title}
              </Text>
            </View>
            
            <View style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: theme.borderRadius.full,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
            }}>
              <Text style={{
                fontSize: theme.typography.sm,
                fontWeight: theme.typography.semibold,
                color: theme.colors.surface,
              }}>
                Level {guardian.powerLevel}
              </Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: theme.spacing.lg }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message, index) => renderMessage(message, index))}
          
          {isTyping && (
            renderMessage({
              id: 'streaming',
              role: 'assistant',
              content: '',
              timestamp: Date.now(),
              provider: 'guardian',
            }, messages.length)
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={{
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          ...theme.shadows.lg,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            backgroundColor: theme.colors.background,
            borderRadius: theme.borderRadius.xl,
            borderWidth: 2,
            borderColor: theme.colors.border,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          }}>
            <TextInput
              ref={inputRef}
              style={{
                flex: 1,
                fontSize: theme.typography.base,
                color: theme.colors.text,
                fontFamily: theme.typography.secondary,
                maxHeight: 100,
                marginRight: theme.spacing.sm,
              }}
              placeholder="Share your thoughts with your Guardian..."
              placeholderTextColor={theme.colors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              textAlignVertical="center"
              returnKeyType="send"
              onSubmitEditing={handleSendMessage}
            />
            
            <TouchableOpacity
              style={{
                backgroundColor: guardian.color,
                borderRadius: theme.borderRadius.full,
                width: 36,
                height: 36,
                justifyContent: 'center',
                alignItems: 'center',
                ...theme.shadows.md,
              }}
              onPress={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              activeOpacity={0.8}
            >
              <Text style={{
                fontSize: 18,
                color: theme.colors.surface,
              }}>
                {isTyping ? '⏸' : '➤'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};