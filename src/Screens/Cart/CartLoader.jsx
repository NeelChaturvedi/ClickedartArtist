/* eslint-disable react-native/no-inline-styles */
// InvoiceSkeleton.js
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CartSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          width: '50%',
          height: 30,
          alignSelf: 'center',
          paddingHorizontal: 16,
          marginVertical: 20}}
      />
      <View style={{paddingHorizontal: 16}}>
        {/* Multiple invoice card skeletons */}
        {[...Array(4)].map((_, index) => (
          <View
            key={index}
            style={{
              borderRadius: 10,
              padding: 16,
              height: 150,
              marginBottom: 12,
            }}
          />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default CartSkeleton;
