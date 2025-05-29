/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';
import {useTheme} from 'src/themes/useTheme';
import {MotiView} from 'moti';

const DashboardSkeleton = () => {
  const theme = useTheme();
  return (
    <MotiView
      from={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      exitTransition={{type: 'timing', duration: 500}}>
      <SkeletonPlaceholder
        speed={800}
        backgroundColor={theme.loaderBackground}
        highlightColor={theme.loaderColor}>
        <View style={{gap: 30, marginTop: 20, padding: 20}}>
          {/* Filter & Button */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%', height: 58, borderRadius: 8}} />
            <View style={{width: '48%', height: 58, borderRadius: 8}} />
          </View>

          <View style={{width: 110, height: 30}} />

          {/* Sales Metrics Section */}
          <View
            style={{
              width: '100%',
              borderRadius: 10,
              padding: 16,
              gap: 14,
              borderColor: theme.loaderBackground,
              borderWidth: 0.5,
            }}>
            <View style={{width: 120, height: 40, borderRadius: 4}} />
            {[...Array(3)].map((_, i) => (
              <View
                key={i}
                style={{width: '100%', height: 60, borderRadius: 6}}
              />
            ))}
          </View>

          {/* Revenue Section */}
          <View
            style={{
              width: '100%',
              borderRadius: 10,
              padding: 20,
              gap: 14,
              borderColor: theme.loaderBackground,
              borderWidth: 0.5,
            }}>
            <View style={{width: 160, height: 40, borderRadius: 4}} />
            {[...Array(2)].map((_, i) => (
              <View
                key={i}
                style={{width: '100%', height: 60, borderRadius: 6}}
              />
            ))}
          </View>

          {/* Earnings Section */}
          <View
            style={{
              width: '100%',
              borderRadius: 10,
              padding: 20,
              gap: 14,
              borderColor: theme.loaderBackground,
              borderWidth: 0.5,
            }}>
            <View style={{width: 100, height: 40, borderRadius: 4}} />
            {[...Array(4)].map((_, i) => (
              <View
                key={i}
                style={{width: '100%', height: 60, borderRadius: 6}}
              />
            ))}
          </View>
        </View>
      </SkeletonPlaceholder>
    </MotiView>
  );
};

export default DashboardSkeleton;
