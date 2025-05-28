/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';
import {useTheme} from 'src/themes/useTheme';

const DashboardSkeleton = () => {
  const theme = useTheme();
  return (
    <SkeletonPlaceholder speed={800} backgroundColor={theme.loaderBackground} highlightColor={theme.loaderColor}>
      <View style={{gap: 20, marginTop: 20}}>
        {/* Filter & Button */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '48%', height: 60, borderRadius: 8}} />
          <View style={{width: '48%', height: 60, borderRadius: 8}} />
        </View>

        {/* Sales Metrics Section */}
        <View
          style={{
            width: '100%',
            borderRadius: 10,
            padding: 16,
            gap: 14,
            borderColor: theme.border,
            borderWidth: 2,
          }}>
          <View style={{width: 120, height: 20, borderRadius: 4}} />
          {[...Array(3)].map((_, i) => (
            <View key={i} style={{width: '80%', height: 20, borderRadius: 6}} />
          ))}
        </View>

        {/* Revenue Section */}
        <View
          style={{
            width: '100%',
            borderRadius: 10,
            padding: 20,
            gap: 14,
            borderColor: theme.border,
            borderWidth: 2,
          }}>
          <View style={{width: 160, height: 20, borderRadius: 4}} />
          {[...Array(2)].map((_, i) => (
            <View key={i} style={{width: '94%', height: 20, borderRadius: 6}} />
          ))}
        </View>

        {/* Earnings Section */}
        <View
          style={{
            width: '100%',
            borderRadius: 10,
            padding: 20,
            gap: 14,
            borderColor: theme.border,
            borderWidth: 2,
          }}>
          <View style={{width: 100, height: 20, borderRadius: 4}} />
          {[...Array(4)].map((_, i) => (
            <View key={i} style={{width: '76%', height: 20, borderRadius: 6}} />
          ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default DashboardSkeleton;
