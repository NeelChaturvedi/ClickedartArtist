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
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Accordion from '@components/Accordian';
import Button from '@components/button';
import AutoGrowTextInput from '@components/AutoGrowTextInput';

const UploadImage = () => {
  const [selectedTab, setSelectedTab] = useState('text');
  const [step, setStep] = useState(0);

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

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={{flex: 1}}>
          {step === 0 && (
            <>
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
                  <AutoGrowTextInput placeholder={'Custom Text Watermark'} />
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
              <View paddingHorizontal={20} paddingVertical={30}>
                <Button btnText={'Proceed'} onPress={() => setStep(1)} />
              </View>
            </>
          )}
          {step === 1 && (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <View style={styles.toggleContainer}>
                  <Text style={styles.switchText}>Not For Sale</Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#ED3174'}}
                    thumbColor="white"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Title</Text>
                  <AutoGrowTextInput placeholder={'Enter Image Title'} />
                </View>
                <View style={styles.twoFields}>
                  <View gap={16} style={{width: '48%'}}>
                    <Text style={styles.headingText}>Price</Text>
                    <AutoGrowTextInput placeholder={'Enter Image Price'} />
                  </View>
                  <View gap={16} style={{width: '48%'}}>
                    <Text style={styles.headingText}>Category</Text>
                    <AutoGrowTextInput placeholder={'Enter Image Price'} />
                  </View>
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Description</Text>
                  <AutoGrowTextInput placeholder={'Maximum 1000 words'} />
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Keywords</Text>
                  <TextInput
                    style={styles.addContainer}
                    placeholder="Enter Image Title"
                    placeholderTextColor={'#888'}
                  />
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Story</Text>
                  <AutoGrowTextInput />
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Camera</Text>
                  <AutoGrowTextInput />
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Lens</Text>
                  <AutoGrowTextInput />
                </View>
                <View style={styles.twoFields}>
                  <View gap={16} style={{width: '48%'}}>
                    <Text style={styles.headingText}>Focal Length</Text>
                    <AutoGrowTextInput />
                  </View>
                  <View gap={16} style={{width: '48%'}}>
                    <Text style={styles.headingText}>Aperture</Text>
                    <AutoGrowTextInput />
                  </View>
                </View>
                <View style={styles.twoFields}>
                  <View gap={16} style={{width: '48%'}}>
                    <Text style={styles.headingText}>Shutter Speed</Text>
                    <AutoGrowTextInput />
                  </View>
                  <View gap={16} style={{width: '48%'}}>
                    <Text style={styles.headingText}>ISO</Text>
                    <AutoGrowTextInput />
                  </View>
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Location</Text>
                  <AutoGrowTextInput />
                </View>
              </ScrollView>
              <View style={styles.buttonsContainer}>
                {/* <Pressable
                  style={styles.nextBtn}
                  onPress={() => {
                    if (step === 0) {
                    } else {
                      setStep(0);
                    }
                  }}>
                  <Text style={styles.proceedBtn}>Back</Text>
                </Pressable>
                <Pressable
                  style={styles.nextBtn}
                  onPress={() => {
                    if (step === 0) {
                    } else {
                      setStep(0);
                    }
                  }}>
                  <Text style={styles.proceedBtn}>Next</Text>
                </Pressable> */}
                <View style={{width: '48%'}}>
                  <Button btnText={'Back'} onPress={() => setStep(0)}/>
                </View>
                <View style={{width: '48%'}}>
                  <Button btnText={'Upload'} />
                </View>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UploadImage;
