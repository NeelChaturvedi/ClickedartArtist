/* eslint-disable react-native/no-inline-styles */
// src/components/Loader.js
import React from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useTheme} from 'src/themes/useTheme';

const SettingsLoader = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 60,
          flexGrow: 1,
        }}>
        <SkeletonPlaceholder
          speed={800}
          backgroundColor={theme.loaderBackground}
          highlightColor={theme.loaderColor}>
          {/* Search Bar Skeleton */}
          <View
            style={{
              width: '100%',
              height: 40,
              borderRadius: 10,
              marginBottom: 20,
            }}
          />

          {/* Settings Items Skeleton */}
          {[...Array(5)].map((_, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: theme.loaderColor,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 20,
                  }}
                />
                <View style={{width: 120, height: 30, borderRadius: 4}} />
              </View>
              <View style={{width: 24, height: 24, borderRadius: 12}} />
            </View>
          ))}
        </SkeletonPlaceholder>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsLoader;
