/* eslint-disable react-native/no-inline-styles */
// InvoiceSkeleton.js
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useTheme} from 'src/themes/useTheme';

const CartSkeleton = () => {
  const theme = useTheme();
  return (
    <>
      <SkeletonPlaceholder>
        <View
          style={{
            width: '50%',
            height: 30,
            alignSelf: 'center',
            paddingHorizontal: 16,
            marginVertical: 20,
          }}
        />
      </SkeletonPlaceholder>

      <View paddingHorizontal={10}>
        {[...Array(4)].map((_, index) => (
          <SkeletonPlaceholder
            key={index}
            backgroundColor="#E1E9EE"
            highlightColor="#F2F8FC"
            borderRadius={4}>
            {/* Card with border only */}
            <View
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: theme.border,
                marginBottom: 20,
                gap: 20,
              }}>
              {/* imageInfo Row */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                  height: 100,
                }}>
                {/* Image */}
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 4,
                  }}
                />

                {/* Image Details */}
                <View
                  style={{
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  {/* Title and Owner */}
                  <View style={{gap: 6}}>
                    <View style={{width: 180, height: 24, borderRadius: 4}} />
                    <View style={{width: 140, height: 20, borderRadius: 4}} />
                  </View>

                  {/* Price */}
                  <View
                    style={{
                      width: 80,
                      height: 24,
                      borderRadius: 4,
                      alignSelf: 'flex-end',
                    }}
                  />
                </View>
              </View>

              {/* Separator line */}
              <View
                style={{
                  width: '100%',
                  height: 2,
                  backgroundColor: theme.text,
                  opacity: 0.2,
                }}
              />

              {/* Paper and other options */}
              <View style={{gap: 20}}>
                <View style={{width: 100, height: 16, borderRadius: 4}} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{width: 80, height: 20, borderRadius: 4}} />
                  <View style={{width: 80, height: 20, borderRadius: 4}} />
                </View>
              </View>
            </View>
          </SkeletonPlaceholder>
        ))}
      </View>
    </>
  );
};

export default CartSkeleton;
