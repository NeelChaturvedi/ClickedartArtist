/* eslint-disable react-native/no-inline-styles */
// loader.js
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';
import { useTheme } from 'src/themes/useTheme';

const ProfileSkeleton = () => {
  const theme = useTheme();
  return (
    <SkeletonPlaceholder speed={800} backgroundColor={theme.loaderBackground} highlightColor={theme.loaderColor}>
      <View style={{height: 200}}>
        {/* Cover image */}
        <View style={{height: '70%', width: '100%'}} />

        {/* Profile image */}
        <View
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: [{translateX: -55}],
          }}>
          <View
            style={{
              height: 110,
              width: 110,
              borderRadius: 100,
              borderWidth: 6,
            }}
          />
        </View>
      </View>

      {/* User name and address */}
      <View style={{alignItems: 'center', marginTop: 20}}>
        <View style={{width: 120, height: 20, borderRadius: 4}} />
        <View
          style={{
            width: 100,
            height: 16,
            borderRadius: 4,
            marginTop: 10,
          }}
        />
        <View
          style={{
            width: '90%',
            height: 60,
            borderRadius: 4,
            marginTop: 20,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 30,
        }}>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={{alignItems: 'center'}}>
            <View
              style={{width: 40, height: 14, borderRadius: 4, marginBottom: 10}}
            />
            <View style={{width: 40, height: 28, borderRadius: 4}} />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default ProfileSkeleton;
