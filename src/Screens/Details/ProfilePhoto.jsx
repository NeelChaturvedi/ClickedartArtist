import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfilePhoto = () => {

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Upload Photo</Text>
        <View style={styles.photoPicker} />
      </View>
      <View style={styles.uploadOptions}>
        <Pressable style={styles.optionButton}>
          <Icon name="image" size={28} />
        </Pressable>
        <Pressable style={styles.centerButton}>
          <Icon name="camera" size={36} />
        </Pressable>
        <Pressable style={styles.optionButton}>
          <Icon name="folder" size={28} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePhoto;
