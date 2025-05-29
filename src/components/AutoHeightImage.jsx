/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';

const AutoHeightImage = ({uri}) => {
  const [height, setHeight] = useState(200); // fallback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Image.getSize(
      uri,
      (w, h) => {
        const screenWidth = 100; // set based on your column width
        const scaleFactor = w / screenWidth;
        const imageHeight = h / scaleFactor;
        setHeight(imageHeight);
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );
  }, [uri]);

  return loading ? (
    <View style={{height, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  ) : (
    <FastImage
      source={{uri}}
      style={{width: '100%', height, borderRadius: 8}}
      resizeMode="cover"
    />
  );
};

export default AutoHeightImage;
