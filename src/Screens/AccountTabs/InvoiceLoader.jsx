/* eslint-disable react-native/no-inline-styles */
// InvoiceSkeleton.js
import {MotiView} from 'moti';
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useTheme} from 'src/themes/useTheme';

const InvoiceSkeleton = () => {
  const theme = useTheme();
  return (
    <MotiView
      from={{opacity: 1}}
      animate={{opacity: 0}}
      transition={{type: 'timing', duration: 350}}>
      <SkeletonPlaceholder
        speed={800}
        backgroundColor={theme.loaderBackground}
        highlightColor={theme.loaderColor}>
        <View
          style={{
            width: '100%',
            height: 40,
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        speed={800}
        backgroundColor={theme.loaderBackground}
        highlightColor={theme.loaderColor}
        borderRadius={4}>
        <View
          style={{
            borderWidth: 1,
            borderColor: theme.loaderBackground,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginBottom: 12,
          }}>
          {/* Top Row: Invoice ID and Amount */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View style={{width: 140, height: 20, borderRadius: 4}} />
            <View style={{width: 80, height: 20, borderRadius: 4}} />
          </View>

          {/* Bottom Row: Date and Status Badge */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: 90, height: 12, borderRadius: 4}} />

            <View
              style={{
                width: 80,
                height: 20,
                borderRadius: 12,
              }}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </MotiView>
  );
};

export default InvoiceSkeleton;
