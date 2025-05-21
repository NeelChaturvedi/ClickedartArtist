/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import DropdownModal from '@components/DropdownModal';
import Button from '@components/button';
import LinearGradient from 'react-native-linear-gradient';
import chroma from 'chroma-js';
import ColorPicker, {Panel1, Preview, HueSlider} from 'reanimated-color-picker';
import {runOnJS} from 'react-native-reanimated';
import {useRoute} from '@react-navigation/native';
import api from 'src/utils/apiClient';

const ImageScreen = () => {
  const {imageData} = useRoute().params;
  const image = imageData ? JSON.parse(imageData) : {};
  console.log('Image Data: ', image);
  const [showModal, setShowModal] = useState(false);

  const mockupUri = require('../../assets/images/mockup.webp');
  const [color, setColor] = useState('#5F91AB');

  const startColor = chroma(color).brighten(1).hex();
  const endColor = chroma(color).darken(1).hex();

  const [papers, setPapers] = useState([]);
  const [frames, setFrames] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState(0);

  const paperOptions = papers.map(paper => ({
    id: paper._id,
    name: paper.name,
  }));
  const frameOptions = frames.map(frame => ({
    id: frame._id,
    name: frame.name,
  }));
  const sizeOptions = selectedPaper?.customDimensions.map(size => ({
    id: size._id,
    name: `${size.width} x ${size.height}`,
  }));

  const handlePaperSelect = item => {
    const paper = papers.find(p => p._id === item.id);
    setSelectedPaper(paper);
    setSelectedSize(null);
    setSelectedFrame(null);
  };

  const handleSizeSelect = item => {
    const size = selectedPaper.customDimensions.find(s => s._id === item.id);
    setSelectedSize(size);
  };

  const handleFrameSelect = item => {
    const frame = frames.find(f => f._id === item.id);
    setSelectedFrame(frame);
  };

  const onSelectColor = ({hex}) => {
    'worklet';
    runOnJS(setColor)(hex);
  };

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await api.get('/paper/get-paper');
        setPapers(res.data.papers);
      } catch (error) {
        console.error('Error fetching papers:', error.response);
      }
    };

    const fetchFrames = async () => {
      try {
        const res = await api.get('/frames/get-frames');
        setFrames(res.data.frames);
      } catch (error) {
        console.error('Error fetching frames:', error.response);
      }
    };

    fetchPapers();
    fetchFrames();
  }, []);

  useEffect(() => {
    if (papers.length > 0) {
      const defaultPaper = papers[0];
      setSelectedPaper(defaultPaper);
      setSelectedSize(defaultPaper.customDimensions[0]);
      setPrice(defaultPaper.customDimensions[0].price);
    }
  }
  , [papers]);

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 20, gap: 40}}>
            <LinearGradient
              colors={[startColor, endColor]}
              useAngle={true}
              angle={90}
              style={styles.imageContainer}>
              <Image
                source={{uri: image?.imageLinks.thumbnail}}
                style={{
                  width: '40%',
                  height: '40%',
                  top: 10,
                  transform: [{translateX: '50%'}],
                  position: 'absolute',
                }}
                resizeMode="contain"
              />
              <Image
                source={mockupUri}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
            </LinearGradient>
            <View style={styles.container}>
              <Button
                btnText="Color Picker"
                onPress={() => setShowModal(true)}
              />
              <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setShowModal(!showModal);
                }}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <ColorPicker
                      style={{
                        width: '100%',
                        marginHorizontal: 'auto',
                        gap: 20,
                        marginTop: 20,
                      }}
                      value="#51ddf4"
                      onComplete={onSelectColor}>
                      <View>
                        <Preview />
                        <Panel1 />
                      </View>
                      <HueSlider />
                    </ColorPicker>
                    <Button
                      btnText="Close"
                      onPress={() => setShowModal(false)}
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.headingTitle}>{image?.title}</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.nameText}>Bhanu Sharma</Text>
                <Text style={styles.nameText}>₹ {price || 0}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.nameText}>Image Description</Text>
                <Text style={styles.aboutText}>{image?.description || '...'}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.nameText}>Media Type</Text>
                <DropdownModal
                  options={paperOptions}
                  onSelect={handlePaperSelect}
                  value={selectedPaper ? selectedPaper.name : 'Select Paper'}
                />
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.subSection}>
                  <Text style={styles.nameText}>Size</Text>
                  <DropdownModal
                    options={sizeOptions}
                    onSelect={handleSizeSelect}
                    value={selectedSize ? `${selectedSize?.width} x ${selectedSize?.height}` : 'Select Size'}
                  />
                </View>
                <View style={styles.subSection}>
                  <Text style={styles.nameText}>Frame</Text>
                  <DropdownModal
                    options={frameOptions}
                    onSelect={handleFrameSelect}
                    value={selectedFrame ? selectedFrame.name : 'Select Frame'}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <Button btnText={'Add to cart'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ImageScreen;
