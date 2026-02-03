import React from 'react';
import { AppNavigatorCommunity } from './src/navigation/AppNavigatorCommunity';
import { ErrorBoundary } from './src/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AppNavigatorCommunity />
    </ErrorBoundary>
  );
}
