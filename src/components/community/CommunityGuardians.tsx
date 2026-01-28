import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useTheme } from '../theme';
import { GuardianAI } from '../types';

interface AgentReview {
  id: string;
  agentId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  helpfulCount: number;
  timestamp: number;
  version: string;
}

interface CommunityGuardianProps {
  guardian: GuardianAI;
  onSelect: (guardian: GuardianAI) => void;
  communityRating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isCommunityCreated?: boolean;
}

export const CommunityGuardianCard: React.FC<CommunityGuardianProps> = ({
  guardian,
  onSelect,
  communityRating,
  reviewCount,
  isNew,
  isCommunityCreated,
}) => {
  const { theme } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 150,
      friction: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 4,
    }).start();
  };

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Text key={index} style={styles.star}>
        {index < Math.floor(rating) ? '⭐' : '☆'}
      </Text>
    ));
  };

  const getElementBadge = () => {
    const elementColors = {
      fire: '#FF6B35',
      water: '#4FC3F7',
      earth: '#8D6E63',
      wind: '#81C784',
      void: '#424242',
      integration: '#9C27B0',
    };

    return (
      <View style={[styles.elementBadge, { backgroundColor: elementColors[guardian.element] }]}>
        <Text style={styles.elementText}>
          {guardian.element.charAt(0).toUpperCase() + guardian.element.slice(1)}
        </Text>
      </View>
    );
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.guardianCard, { backgroundColor: theme.colors.surface }]}
        onPress={() => onSelect(guardian)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {/* Header with badges */}
        <View style={styles.cardHeader}>
          <View style={styles.avatarSection}>
            <Text style={styles.avatar}>{guardian.avatar}</Text>
            {isNew && <View style={styles.newBadge}><Text style={styles.newText}>NEW</Text></View>}
            {isCommunityCreated && <View style={styles.communityBadge}><Text style={styles.communityText}>👥</Text></View>}
          </View>
          {getElementBadge()}
        </View>

        {/* Guardian info */}
        <View style={styles.guardianInfo}>
          <Text style={[styles.guardianName, { color: theme.colors.text }]}>
            {guardian.name}
          </Text>
          <Text style={[styles.guardianTitle, { color: theme.colors.textSecondary }]}>
            {guardian.title}
          </Text>
          <Text style={[styles.guardianDescription, { color: theme.colors.text }]}>
            {guardian.description}
          </Text>
        </View>

        {/* Community ratings */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingHeader}>
            <Text style={[styles.ratingLabel, { color: theme.colors.textSecondary }]}>
              Community Rating
            </Text>
            <Text style={[styles.reviewCount, { color: theme.colors.textTertiary }]}>
              {reviewCount || 0} reviews
            </Text>
          </View>
          
          <View style={styles.starsContainer}>
            {renderRatingStars(communityRating || 0)}
            <Text style={[styles.ratingNumber, { color: theme.colors.text }]}>
              {communityRating?.toFixed(1) || 'New'}
            </Text>
          </View>
        </View>

        {/* Expertise tags */}
        <View style={styles.expertiseSection}>
          {guardian.expertise.slice(0, 3).map((skill, idx) => (
            <View key={idx} style={[styles.skillTag, { backgroundColor: `${guardian.color}20` }]}>
              <Text style={[styles.skillText, { color: guardian.color }]}>
                {skill}
              </Text>
            </View>
          ))}
        </View>

        {/* Power level and version */}
        <View style={styles.footerSection}>
          <View style={[styles.powerLevel, { backgroundColor: theme.colors.gold }]}>
            <Text style={styles.powerText}>
              Level {guardian.powerLevel}
            </Text>
          </View>
          
          <View style={styles.versionInfo}>
            <Text style={[styles.versionText, { color: theme.colors.textTertiary }]}>
              v{isCommunityCreated ? '2.1' : '1.0'}
            </Text>
            {isCommunityCreated && (
              <Text style={[styles.byText, { color: theme.colors.textTertiary }]}>
                by community
              </Text>
            )}
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: guardian.color }]}>
            <Text style={styles.actionButtonText}>Select Guardian</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Text style={[styles.secondaryButtonText, { color: guardian.color }]}>
              View Reviews
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Agent Review Component
interface ReviewListProps {
  guardianId: string;
  reviews: AgentReview[];
}

export const AgentReviewList: React.FC<ReviewListProps> = ({ guardianId, reviews }) => {
  const { theme } = useTheme();

  const renderReview = (review: AgentReview) => (
    <View key={review.id} style={[styles.reviewCard, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.reviewHeader}>
        <Text style={[styles.reviewerName, { color: theme.colors.text }]}>
          {review.reviewerName}
        </Text>
        <Text style={[styles.reviewDate, { color: theme.colors.textTertiary }]}>
          {new Date(review.timestamp).toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.reviewRating}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Text key={index} style={styles.reviewStar}>
            {index < Math.floor(review.rating) ? '⭐' : '☆'}
          </Text>
        ))}
        <Text style={[styles.reviewVersion, { color: theme.colors.textTertiary }]}>
          v{review.version}
        </Text>
      </View>
      
      <Text style={[styles.reviewComment, { color: theme.colors.text }]}>
        {review.comment}
      </Text>
      
      <View style={styles.reviewFooter}>
        <TouchableOpacity style={styles.helpfulButton}>
          <Text style={styles.helpfulText}>
            👍 Helpful ({review.helpfulCount})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.reviewList}>
      <Text style={[styles.reviewListTitle, { color: theme.colors.text }]}>
        Community Reviews
      </Text>
      {reviews.map(renderReview)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  guardianCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarSection: {
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    fontSize: 48,
    marginBottom: 8,
  },
  newBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  newText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  communityBadge: {
    position: 'absolute',
    top: -4,
    left: -8,
    backgroundColor: '#9C27B0',
    borderRadius: 8,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  communityText: {
    fontSize: 10,
  },
  elementBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  elementText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  guardianInfo: {
    marginBottom: 16,
  },
  guardianName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  guardianTitle: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  guardianDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  ratingSection: {
    marginBottom: 16,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 11,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 12,
    marginRight: 2,
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  expertiseSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  skillTag: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 10,
    fontWeight: '500',
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  powerLevel: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  powerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#212121',
  },
  versionInfo: {
    alignItems: 'flex-end',
  },
  versionText: {
    fontSize: 10,
    marginBottom: 2,
  },
  byText: {
    fontSize: 9,
    fontStyle: 'italic',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Review styles
  reviewList: {
    paddingHorizontal: 16,
  },
  reviewListTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
  },
  reviewDate: {
    fontSize: 12,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewStar: {
    fontSize: 12,
    marginRight: 2,
  },
  reviewVersion: {
    fontSize: 10,
    marginLeft: 8,
    fontStyle: 'italic',
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 12,
    color: '#6B46C1',
  },
});