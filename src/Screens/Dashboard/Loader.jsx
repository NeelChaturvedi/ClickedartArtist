/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View, Dimensions} from 'react-native';

const DashboardSkeleton = () => {
  const width = Dimensions.get('window').width - 40;

  return (
    <SkeletonPlaceholder>
      <View style={{paddingHorizontal: 10, gap: 20, paddingTop: 20}}>
        {/* Filter & Button */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: width * 0.45, height: 60, borderRadius: 8}} />
          <View style={{width: width * 0.45, height: 60, borderRadius: 8}} />
        </View>

        {/* Sales Metrics Section */}
        <View style={{width: width, borderRadius: 10, padding: 20, gap: 14}}>
          <View style={{width: 120, height: 20, borderRadius: 4}} />
          {[...Array(3)].map((_, i) => (
            <View
              key={i}
              style={{width: width * 0.8, height: 20, borderRadius: 6}}
            />
          ))}
        </View>

        {/* Revenue Section */}
        <View style={{width: width, borderRadius: 10, padding: 20, gap: 14}}>
          <View style={{width: 160, height: 20, borderRadius: 4}} />
          {[...Array(2)].map((_, i) => (
            <View
              key={i}
              style={{width: width * 0.6, height: 20, borderRadius: 6}}
            />
          ))}
        </View>

        {/* Earnings Section */}
        <View style={{width: width, borderRadius: 10, padding: 20, gap: 14}}>
          <View style={{width: 100, height: 20, borderRadius: 4}} />
          {[...Array(4)].map((_, i) => (
            <View
              key={i}
              style={{width: width * 0.7, height: 20, borderRadius: 6}}
            />
          ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default DashboardSkeleton;
