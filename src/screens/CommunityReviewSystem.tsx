import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme';

interface AgentReview {
  id: string;
  agentId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  helpfulCount: number;
  timestamp: number;
  approved: boolean;
}

interface AgentRating {
  agentId: string;
  averageRating: number;
  totalReviews: number;
  helpfulVotes: number;
  recentActivity: number;
}

export const CommunityReviewSystem: React.FC = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<'queue' | 'approved' | 'trending'>('queue');

  // Mock data for review queue
  const reviewQueue: AgentReview[] = [
    {
      id: '1',
      agentId: 'community-dream-weaver',
      reviewerName: 'Alex Chen',
      rating: 5,
      comment: 'Incredible personality! The dream weaving concept is unique and well-executed. Communication style feels authentic and helpful.',
      helpfulCount: 12,
      timestamp: Date.now() - 86400000,
      approved: false,
    },
    {
      id: '2', 
      agentId: 'community-code-sage',
      reviewerName: 'Sarah Miller',
      rating: 4,
      comment: 'Great technical expertise and clear explanations. The coding assistance is top-notch. Minor suggestion: improve personality consistency.',
      helpfulCount: 8,
      timestamp: Date.now() - 172800000,
      approved: false,
    },
  ];

  const approvedAgents: AgentRating[] = [
    {
      agentId: 'luma-sage',
      averageRating: 4.7,
      totalReviews: 47,
      helpfulVotes: 234,
      recentActivity: Date.now() - 3600000,
    },
    {
      agentId: 'crystal-mender',
      averageRating: 4.5,
      totalReviews: 89,
      helpfulVotes: 567,
      recentActivity: Date.now() - 7200000,
    },
  ];

  const trendingAgents: AgentRating[] = [
    {
      agentId: 'void-dreamer',
      averageRating: 4.9,
      totalReviews: 23,
      helpfulVotes: 189,
      recentActivity: Date.now() - 1800000,
    },
    {
      agentId: 'fire-creator',
      averageRating: 4.8,
      totalReviews: 34,
      helpfulVotes: 201,
      recentActivity: Date.now() - 900000,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Text key={index} style={styles.star}>
        {index < Math.floor(rating) ? '⭐' : '☆'}
      </Text>
    ));
  };

  const renderReviewCard = (review: AgentReview, showActions: boolean = true) => (
    <View key={review.id} style={[styles.reviewCard, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.reviewHeader}>
        <View>
          <Text style={[styles.reviewerName, { color: theme.colors.text }]}>
            {review.reviewerName}
          </Text>
          <Text style={[styles.reviewDate, { color: theme.colors.textTertiary }]}>
            {new Date(review.timestamp).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          {renderStars(review.rating)}
          <Text style={[styles.ratingNumber, { color: theme.colors.text }]}>
            {review.rating.toFixed(1)}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.reviewComment, { color: theme.colors.text }]}>
        {review.comment}
      </Text>
      
      <View style={styles.reviewFooter}>
        <Text style={[styles.reviewingAgent, { color: theme.colors.textSecondary }]}>
          Reviewing: {review.agentId.replace('community-', '').replace('-', ' ')}
        </Text>
        
        {showActions && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
            >
              <Text style={styles.actionButtonText}>✓ Approve</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.warning }]}
            >
              <Text style={styles.actionButtonText}>! Request</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.error }]}
            >
              <Text style={styles.actionButtonText}>✗ Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.helpfulSection}>
        <TouchableOpacity style={styles.helpfulButton}>
          <Text style={[styles.helpfulText, { color: theme.colors.primary }]}>
            👍 Helpful ({review.helpfulCount})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAgentCard = (agent: AgentRating) => (
    <View key={agent.agentId} style={[styles.agentCard, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.agentHeader}>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: theme.colors.text }]}>
            {agent.agentId.replace('community-', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Text>
          <Text style={[styles.agentStats, { color: theme.colors.textSecondary }]}>
            {agent.totalReviews} reviews • {agent.helpfulVotes} helpful votes
          </Text>
        </View>
        
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingBadgeText}>
            ⭐ {agent.averageRating.toFixed(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.activitySection}>
        <Text style={[styles.activityLabel, { color: theme.colors.textSecondary }]}>
          Last active: {new Date(agent.recentActivity).toLocaleDateString()}
        </Text>
        <View style={styles.popularityBar}>
          <View style={[
            styles.popularityFill,
            { 
              width: `${Math.min((agent.helpfulVotes / 600) * 100, 100)}%`,
              backgroundColor: theme.colors.success
            }
          ]} />
        </View>
      </View>
    </View>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'queue':
        return (
          <ScrollView style={styles.sectionContent}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Review Queue ({reviewQueue.length})
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
              Help moderate community-created Guardians
            </Text>
            {reviewQueue.map(review => renderReviewCard(review, true))}
          </ScrollView>
        );
        
      case 'approved':
        return (
          <ScrollView style={styles.sectionContent}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Approved Guardians ({approvedAgents.length})
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
              Community Guardians ready for use
            </Text>
            {approvedAgents.map(renderAgentCard)}
          </ScrollView>
        );
        
      case 'trending':
        return (
          <ScrollView style={styles.sectionContent}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Trending Guardians ({trendingAgents.length})
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
              Most popular this week
            </Text>
            {trendingAgents.map(renderAgentCard)}
          </ScrollView>
        );
        
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerTitle}>
          🛡️ Guardian Review Council
        </Text>
        <Text style={styles.headerSubtitle}>
          Community Quality Assurance
        </Text>
      </View>

      {/* Section Tabs */}
      <View style={[styles.sectionTabs, { backgroundColor: theme.colors.surface }]}>
        {[
          { id: 'queue', label: 'Review Queue', count: reviewQueue.length, icon: '📋' },
          { id: 'approved', label: 'Approved', count: approvedAgents.length, icon: '✅' },
          { id: 'trending', label: 'Trending', count: trendingAgents.length, icon: '📈' },
        ].map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.sectionTab,
              {
                backgroundColor: activeSection === section.id 
                  ? theme.colors.primary 
                  : 'transparent'
              }
            ]}
            onPress={() => setActiveSection(section.id as any)}
          >
            <Text style={styles.tabIcon}>{section.icon}</Text>
            <Text style={[
              styles.tabLabel,
              { 
                color: activeSection === section.id 
                  ? '#FFFFFF' 
                  : theme.colors.text 
              }
            ]}>
              {section.label}
            </Text>
            <View style={[
              styles.tabBadge,
              { backgroundColor: theme.colors.error }
            ]}>
              <Text style={styles.tabBadgeText}>
                {section.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Section Content */}
      {renderSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  sectionTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabBadge: {
    position: 'absolute',
    top: 8,
    right: 12,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionContent: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 14,
    marginRight: 2,
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewingAgent: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  helpfulSection: {
    alignItems: 'flex-end',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 12,
    fontWeight: '500',
  },
  agentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  agentStats: {
    fontSize: 12,
  },
  ratingBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#212121',
  },
  activitySection: {
    marginTop: 12,
  },
  activityLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  popularityBar: {
    height: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  popularityFill: {
    height: '100%',
    borderRadius: 2,
  },
});