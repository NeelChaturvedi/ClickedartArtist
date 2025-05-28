/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useTheme} from 'src/themes/useTheme';

const OrderCardSkeleton = () => {
  const theme = useTheme();
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <SkeletonPlaceholder
          key={index}
          backgroundColor="#E1E9EE"
          highlightColor="#F2F8FC"
          borderRadius={4}>
          <View
            style={{
              borderWidth: 2,
              borderColor: theme.border,
              borderRadius: 12,
              marginBottom: 16,
              paddingVertical: 10,
              paddingHorizontal: 14,
              rowGap: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  gap: 8,
                  paddingRight: 10,
                }}>
                <View style={{width: '80%', height: 16, borderRadius: 4}} />
                <View style={{width: '50%', height: 14, borderRadius: 4}} />
                <View style={{width: 100, height: 18, borderRadius: 12}} />
              </View>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{width: '48%'}}>
                <View style={{width: '60%', height: 14, borderRadius: 4}} />
                <View
                  style={{
                    width: '100%',
                    height: 14,
                    borderRadius: 4,
                    marginTop: 6,
                  }}
                />
                <View
                  style={{
                    width: '80%',
                    height: 14,
                    borderRadius: 4,
                    marginTop: 4,
                  }}
                />
              </View>
              <View style={{width: '48%', alignItems: 'flex-end'}}>
                <View style={{width: '50%', height: 14, borderRadius: 4}} />
                <View
                  style={{
                    width: '70%',
                    height: 14,
                    borderRadius: 4,
                    marginTop: 6,
                  }}
                />
              </View>
            </View>
          </View>
        </SkeletonPlaceholder>
      ))}
    </>
  );
};

export default OrderCardSkeleton;
