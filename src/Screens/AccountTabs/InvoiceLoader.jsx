/* eslint-disable react-native/no-inline-styles */
// InvoiceSkeleton.js
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const InvoiceSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder>
        <View
          style={{
            width: '100%',
            height: 50,
            borderRadius: 8,
            marginTop: 0,
            marginBottom: 16,
          }}
        />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        backgroundColor="#E1E9EE"
        highlightColor="#F2F8FC"
        borderRadius={4}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 20,
            marginBottom: 12,
          }}>
          {/* Top Row: Invoice ID and Amount */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View style={{width: 80, height: 20, borderRadius: 4}} />
          </View>

          {/* Bottom Row: Date and Status Badge */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: 140, height: 16, borderRadius: 4}} />

            <View
              style={{
                width: 60,
                height: 24,
                borderRadius: 12,
              }}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </>
  );
};

export default InvoiceSkeleton;
