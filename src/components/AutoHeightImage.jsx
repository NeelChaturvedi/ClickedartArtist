/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, View, ActivityIndicator} from 'react-native';

const AutoHeightImage = ({uri}) => {
  const [height, setHeight] = useState(200); // fallback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Image.getSize(
      uri,
      (width, height) => {
        const screenWidth = 180; // set based on your column width
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
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
    <Image
      source={{uri}}
      style={{width: '100%', height, borderRadius: 8}}
      resizeMode="cover"
    />
  );
};

export default AutoHeightImage;
