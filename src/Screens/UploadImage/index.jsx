/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Accordion from '@components/Accordian';
import Button from '@components/button';

const UploadImage = () => {
  const [selectedTab, setSelectedTab] = useState('text');

  const guidelines = [
    'File size should be more than 5MB ',
    'Ensure the resolution is at least 300 DPI for print-quality images.',
    'Minimum dimensions: 2000 x 3000 pixels (or equivalent aspect ratio).',
    'File size should not exceed 150 MB.',
    'Only upload original work; plagiarism or copyright infringement will result in account penalties.',
    'Avoid images with watermarks, logos, or text overlays.',
    'Ensure the photo does not contain offensive, explicit, or illegal content.',
    "Photos must align with ClickedArt's ethical standards, particularly for wildlife, cultural, and sensitive subjects.",
    "Ensure the uploaded photo is relevant to the categories you've selected.",
    'Submit sharp, high-quality images free from excessive noise, blurriness, or pixelation.',
    'Post-process images tastefully; avoid over-saturation, extreme HDR, or unnatural effects.',
    'Composition should follow photography principles, such as the rule of thirds, framing, or leading lines.',
    'Ensure the photo has no distracting elements unless integral to the subject.',
  ];
  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            <Pressable style={styles.uploadContainer}>
              <Icon name="upload" size={24} color="white" />
              <Text style={styles.uploadText}>Upload your image here</Text>
            </Pressable>
            <Accordion title={'Upload Guidelines'} content={guidelines} />
            <View style={styles.tabContainer}>
              <Pressable onPress={() => setSelectedTab('text')}>
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === 'text' && {color: 'white'},
                  ]}>
                  Text Watermark
                </Text>
              </Pressable>
              <Pressable onPress={() => setSelectedTab('image')}>
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === 'image' && {color: 'white'},
                  ]}>
                  Image Watermark
                </Text>
              </Pressable>
            </View>
            {selectedTab === 'text' && (
              <TextInput
                style={styles.addContainer}
                placeholder="Custom Text watermark"
                placeholderTextColor={'#888'}
              />
            )}

            {selectedTab === 'image' && (
              <View style={styles.watermarkImage}>
                <TextInput
                  editable={false}
                  style={{width: '80%', color: 'white'}}
                  value="Choose a file"
                />
                <Pressable style={styles.uploadBtn}>
                  <Icon name="upload" size={20} color="white" />
                </Pressable>
              </View>
            )}
          </ScrollView>
          <View style={{paddingHorizontal: 20, paddingVertical: 40}}>
            <Button btnText={'Proceed'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UploadImage;
