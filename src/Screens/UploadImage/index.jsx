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
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Accordion from '@components/Accordian';
import Button from '@components/button';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import ImagePicker from 'react-native-image-crop-picker';
import AWS from 'aws-sdk';
import {
  AWS_BUCKET_NAME,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from '@env';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  signatureVersion: 'v4',
});

const UploadImage = () => {
  const [selectedTab, setSelectedTab] = useState('text');
  const [step, setStep] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const PART_SIZE = 5 * 1024 * 1024;
  const MAX_RETRIES = 3;

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: false,
        mediaType: 'photo',
        includeBase64: false,
      });
      await uploadImageToS3(image.path);
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image: ' + error.message);
    }
  };

  const uploadImageToS3 = async imgUri => {
    if (!imgUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }
    setUploadProgress(0);
    setUploading(true);
    try {
      const response = await fetch(imgUri);
      const blob = await response.blob();
      const fileSize = blob.size;
      const fileName = `images/${Date.now()}.jpg`;

      const createUploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        ContentType: 'image/jpeg',
      };
      const {UploadId} = await s3
        .createMultipartUpload(createUploadParams)
        .promise();

      const parts = [];
      let partNumber = 1;
      let start = 0;

      while (start < fileSize) {
        const end = Math.min(start + PART_SIZE, fileSize);
        const partBlob = blob.slice(start, end);
        let retries = 0;

        while (retries < MAX_RETRIES) {
          try {
            const uploadPartParams = {
              Bucket: AWS_BUCKET_NAME,
              Key: fileName,
              PartNumber: partNumber,
              UploadId,
              Body: partBlob,
            };

            const partData = await s3.uploadPart(uploadPartParams).promise();
            parts.push({
              ETag: partData.ETag,
              PartNumber: partNumber,
            });

            const progress = Math.round((end / fileSize) * 100);
            setUploadProgress(progress);
            console.log(`Uploaded part ${partNumber}: ${progress}%`);

            break;
          } catch (error) {
            retries++;
            if (retries >= MAX_RETRIES) {
              throw new Error(
                `Failed to upload part ${partNumber} after ${MAX_RETRIES} attempts: ${error.message}`,
              );
            }
            console.log(`Retrying part ${partNumber}, attempt ${retries + 1}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * retries));
          }
        }

        start += PART_SIZE;
        partNumber++;
      }

      const completeParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        UploadId,
        MultipartUpload: {Parts: parts},
      };
      const data = await s3.completeMultipartUpload(completeParams).promise();
      console.log('Image URL:', data.Location);
      setImageUri(data.Location);
    } catch (error) {
      Alert.alert('Error', `Failed to upload image: ${error.message}`);

      if (error.UploadId) {
        await s3
          .abortMultipartUpload({
            Bucket: AWS_BUCKET_NAME,
            Key: `images/${Date.now()}.jpg`,
            UploadId: error.UploadId,
          })
          .promise();
      }
    } finally {
      setUploading(false);
    }
  };

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
                <Pressable style={styles.uploadContainer} onPress={pickImage}>
                  {imageUri && !uploading ? (
                    <Image source={{uri: imageUri}} style={styles.image} />
                  ) : uploading ? (
                    <View>
                      <ActivityIndicator size={50} />
                    </View>
                  ) : (
                    <>
                      <Icon name="upload" size={24} color="white" />
                      <Text style={styles.uploadText}>
                        Upload your image here
                      </Text>
                    </>
                  )}
                </Pressable>
                {uploading && (
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: '#ccc',
                      borderRadius: 5,
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        width: `${uploadProgress}%`,
                        height: '100%',
                        backgroundColor: '#ED3174',
                        borderRadius: 5,
                      }}
                    />
                  </View>
                )}
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
                  <AutoGrowTextInput value={'ClickedArt'} />
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
                    <AutoGrowTextInput placeholder={'Enter Image Category'} />
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
                    placeholder="Enter Keywords"
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
                <View style={{width: '48%'}}>
                  <Button btnText={'Back'} onPress={() => setStep(0)} />
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
