/* eslint-disable react-native/no-inline-styles */
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import React, {useState} from 'react';
import Button from '../../components/button';
import Switch from '../../components/switch';
import {MotiText} from 'moti';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = () => {
  const screenText = [
    {
      text: 'Welcome to Our App!',
      btnText: 'Next',
    },
    {
      text: 'Your journey starts here.',
      btnText: 'Next',
    },
    {
      text: 'Swipe to explore more.',
      btnText: 'Get Started',
    },
  ];

  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTextChange = async () => {
    if (currentIndex < screenText.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem('isOnboardingCompleted', 'true');
      navigation.navigate('Login');
    }
  };

  const handleDotsPress = index => {
    setCurrentIndex(index);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding.png')}
      style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <TouchableOpacity>
              <Text
                style={[
                  styles.skipText,
                  {
                    opacity: currentIndex < screenText.length - 1 ? 1 : 0,
                  },
                ]}>
                SKIP
              </Text>
            </TouchableOpacity>

            <Text style={styles.title}>ClickedArt Artists</Text>
            <MotiText
              key={screenText[currentIndex].text}
              style={styles.subtitle}
              from={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{
                type: 'spring',
                duration: 500,
                easing: 'ease-in-out',
              }}>
              {screenText[currentIndex].text}
            </MotiText>
          </View>
          <View style={styles.buttonContainer}>
            <Switch
              index={currentIndex}
              total={screenText.length}
              dotsPress={handleDotsPress}
            />
            <Button
              btnText={screenText[currentIndex].btnText}
              onPress={handleTextChange}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Onboarding;
