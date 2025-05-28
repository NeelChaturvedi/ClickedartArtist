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
  Dimensions,
  Pressable,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {imageScreenStyles} from './styles';
import DropdownModal from '@components/DropdownModal';
import Button from '@components/button';
import LinearGradient from 'react-native-linear-gradient';
import chroma from 'chroma-js';
import ColorPicker, {Panel1, HueSlider} from 'reanimated-color-picker';
import {runOnJS} from 'react-native-reanimated';
import {useRoute} from '@react-navigation/native';
import api from 'src/utils/apiClient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useCartStore from 'src/store/cart';
import {MotiView} from 'moti';
import {useTheme} from 'src/themes/useTheme';
import ImageDetailsSkeleton from './Loader';

const ImageScreen = () => {
  const {imageData} = useRoute().params;
  const image = React.useMemo(
    () => (imageData ? JSON.parse(imageData) : {}),
    [imageData],
  );
  const mode = 'print';
  const screenWidth = Dimensions.get('window').width;
  const {addItemToCart, removeItemFromCart, isItemInCart} = useCartStore();
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
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const styles = useMemo(() => imageScreenStyles(theme), [theme]);

  const paperOptions = papers.map(paper => ({
    id: paper._id,
    name: paper.name,
  }));
  const frameOptions = [
    {id: 'none', name: 'None'},
    ...frames.map(frame => ({
      id: frame._id,
      name: frame.name,
    })),
  ];
  const sizeOptions = selectedPaper?.customDimensions.map(size => ({
    id: size._id,
    name: `${size.width} x ${size.height}`,
  }));

  const handlePaperSelect = item => {
    const paper = papers.find(p => p._id === item.id);
    setSelectedPaper(paper);
    setSelectedSize(paper.customDimensions[0]);
    setSelectedFrame(null);
  };

  const handleSizeSelect = item => {
    const size = selectedPaper.customDimensions.find(s => s._id === item.id);
    setSelectedSize(size);
  };

  const handleFrameSelect = item => {
    if (item.id === 'none') {
      setSelectedFrame(null);
      return;
    }

    const frame = frames.find(f => f._id === item.id);
    setSelectedFrame(frame);
  };

  const onSelectColor = ({hex}) => {
    'worklet';
    runOnJS(setColor)(hex);
  };

  const onAddToCart = () => {
    if (!selectedPaper) {
      ToastAndroid.show(
        'Please select a Media Type!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    if (!selectedSize) {
      ToastAndroid.show(
        'Please select a Size!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }

    const productToAdd = {
      imageInfo: {
        image: image._id,
        slug: image.slug,
        title: image.title,
        photographer: image.photographer,
        resolution: selectedSize,
        price: image.price?.original.toFixed(2) || 0,
        thumbnail: image.imageLinks?.thumbnail || image.imageLinks?.original,
      },
      paperInfo: {
        paper: selectedPaper._id,
        price: selectedSize.price,
        size: selectedSize,
        name: selectedPaper.name,
      },
      frameInfo: selectedFrame
        ? {
            frame: selectedFrame._id,
            price:
              selectedSize?.width *
              selectedSize?.height *
              selectedFrame.basePricePerLinearInch,
            name: selectedFrame.name,
          }
        : null,
      subTotal: price - (price * selectedPaper.photographerDiscount) / 100,
      mode,
      delivery: selectedSize?.width * selectedSize?.height,
    };

    addItemToCart(productToAdd);
    setInCart(true);
    // toast.success('Added to cart!');
    ToastAndroid.show(
      'Added to cart!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  const onRemoveFromCart = () => {
    removeItemFromCart(image._id, mode);
    // toast.success('Removed from cart!');
    ToastAndroid.show(
      'Removed from cart!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    setInCart(isItemInCart(image._id, mode));
  };

  useEffect(() => {
    const calculateSubtotal = () => {
      if (selectedSize) {
        const width = selectedSize?.width || 0;
        const height = selectedSize?.height || 0;
        const framePrice = selectedFrame
          ? width * height * selectedFrame.basePricePerLinearInch
          : 0;

        const selectedSizePrice = selectedSize?.price || 0;
        const subTotal = selectedSizePrice + framePrice;
        return subTotal;
      } else {
        return 0;
      }
    };
    setPrice(calculateSubtotal());
  }, [selectedSize, selectedPaper, selectedFrame]);

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
    setInCart(isItemInCart(image._id, mode));
  }, [image, isItemInCart, mode]);

  useEffect(() => {
    if (papers.length > 0) {
      const defaultPaper = papers[0];
      setSelectedPaper(defaultPaper);
      setSelectedSize(defaultPaper.customDimensions[0]);
      setPrice(defaultPaper.customDimensions[0].price);
    }
  }, [papers]);

  // useEffect(() => {
  //   if (image) {
  //     setImageTitle(image.title);
  //   }
  // }, [image, setImageTitle]);

  const minHSize = 10 * 18;
  const maxHSize = 44 * 72;

  const scaleFactor =
    selectedPaper && selectedSize
      ? (selectedSize.height * selectedSize.width - minHSize) /
        (maxHSize - minHSize)
      : 0;

  const minScale = 20;
  const maxScale = 40;

  const clampedHeight =
    selectedPaper && selectedSize
      ? minScale + scaleFactor * (maxScale - minScale)
      : 100;
  const clampedWidth =
    selectedPaper && selectedSize
      ? minScale + scaleFactor * (maxScale - minScale)
      : 100;

  const height = clampedHeight + '%';
  const width = clampedWidth + '%';

  const widthPercent = clampedWidth;
  const imgWidth = (widthPercent / 100) * screenWidth;

  if (loading) {
    return (
      <SafeAreaView style={styles.background}>
        <ImageDetailsSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{flex: 1}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                }}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 20, gap: 40}}>
            <LinearGradient
              colors={[startColor, endColor]}
              useAngle={true}
              angle={90}
              style={styles.imageContainer}>
              <MotiView
                animate={{
                  width: width,
                  height: height,
                  translateX: -imgWidth / 2,
                }}
                transition={{
                  type: 'timing',
                  duration: 500,
                  delay: 100,
                }}
                style={{
                  position: 'absolute',
                  top: 12,
                  left: '50%',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}>
                  <Image
                    source={{uri: image?.imageLinks.thumbnail}}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    resizeMode="cover"
                  />
                  {/* Left Frame Border */}
                  <Image
                    source={{uri: selectedFrame?.image[0]}}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '2%',
                      inset: 0,
                      height: '102%',
                    }}
                    resizeMode="cover"
                  />
                  {/* Right Frame Border */}
                  <Image
                    source={{uri: selectedFrame?.image[0]}}
                    style={{
                      position: 'absolute',
                      transform: [{rotateY: '180deg'}],
                      top: 0,
                      left: '100%',
                      width: '2%',
                      inset: 0,
                      height: '102%',
                    }}
                    resizeMode="cover"
                  />
                  {/* Top Frame Border */}
                  <Image
                    source={{uri: selectedFrame?.image[1]}}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '102%',
                      inset: 0,
                      height: '2%',
                    }}
                    resizeMode="cover"
                  />
                  {/* Bottom Frame Border */}
                  <Image
                    source={{uri: selectedFrame?.image[1]}}
                    style={{
                      position: 'absolute',
                      transform: [{rotateY: '180deg'}],
                      top: '100%',
                      left: 0,
                      width: '102%',
                      inset: 0,
                      height: '2%',
                    }}
                    resizeMode="cover"
                  />
                </View>
              </MotiView>
              <Image
                source={mockupUri}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
              <View style={{position: 'absolute', bottom: 10, right: 10}}>
                <Pressable onPress={() => setShowModal(true)}>
                  <View
                    style={{
                      padding: 6,
                      borderRadius: 10,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      justifyContent: 'center',
                    }}>
                    <Icon name="palette" size={20} color="white" />
                  </View>
                </Pressable>
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
            </LinearGradient>
            <View style={styles.formContainer}>
              <Text style={styles.headingTitle}>{image?.title}</Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                {selectedPaper?.photographerDiscount && (
                  <View>
                    <Text style={styles.discountedText}>
                      ₹ {price?.toFixed(2) || 0}
                    </Text>
                  </View>
                )}
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Text style={styles.priceText}>
                    ₹{' '}
                    {selectedPaper?.photographerDiscount
                      ? (
                          price -
                          price * (selectedPaper?.photographerDiscount / 100)
                        )?.toFixed(2)
                      : price || 0}
                  </Text>
                  <Text style={styles.discountPercentage}>
                    ({selectedPaper?.photographerDiscount} % off)
                  </Text>
                </View>
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
                    value={
                      selectedSize
                        ? `${selectedSize?.width} x ${selectedSize?.height}`
                        : 'Select Size'
                    }
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
              <View style={styles.detailsContainer}>
                <Text style={styles.nameText}>Image Description</Text>
                <Text style={styles.aboutText}>
                  {image?.description || '...'}
                </Text>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      flexWrap: 'wrap',
                      marginTop: 10,
                    }}>
                    {image?.location && (
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Icon
                          name="location-pin"
                          size={16}
                          color={theme.text}
                        />
                        <Text style={styles.aboutText}>
                          {image?.location || 'N/A'}
                        </Text>
                      </View>
                    )}
                    {image?.cameraDetails?.camera && (
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Icon
                          name="photo-camera"
                          size={16}
                          color={theme.text}
                        />
                        <Text style={styles.aboutText}>
                          {image?.cameraDetails?.camera || 'N/A'}
                        </Text>
                      </View>
                    )}
                    {image?.cameraDetails?.lens && (
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Icon
                          name="panorama-fish-eye"
                          size={16}
                          color={theme.text}
                        />
                        <Text style={styles.aboutText}>
                          {image?.cameraDetails?.lens || 'N/A'}
                        </Text>
                      </View>
                    )}
                    {image?.cameraDetails?.settings?.shutterSpeed && (
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Icon
                          name="shutter-speed"
                          size={16}
                          color={theme.text}
                        />
                        <Text style={styles.aboutText}>
                          {image?.cameraDetails?.settings?.shutterSpeed ||
                            'N/A'}
                        </Text>
                      </View>
                    )}
                    {image?.cameraDetails?.settings?.aperture && (
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Icon name="camera" size={16} color={theme.text} />
                        <Text style={styles.aboutText}>
                          {image?.cameraDetails?.settings?.aperture || 'N/A'}
                        </Text>
                      </View>
                    )}
                    {image?.cameraDetails?.settings?.iso && (
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Icon name="iso" size={16} color={theme.text} />
                        <Text style={styles.aboutText}>
                          {image?.cameraDetails?.settings?.iso || 'N/A'}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <Button
              btnText={inCart ? 'Remove from cart' : 'Add to cart'}
              onPress={() => {
                inCart ? onRemoveFromCart(image._id) : onAddToCart();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ImageScreen;
