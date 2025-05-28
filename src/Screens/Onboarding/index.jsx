/* eslint-disable react-native/no-inline-styles */
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import React, {useState} from 'react';
import Button from '../../components/button';
import {MotiText} from 'moti';
import {useOnboardingStore} from '../../store/onboarding';
import Switch from '../../components/switch';
import CompanyIcon from '../../assets/svgs/ClickedArtLogo.svg';

const Onboarding = () => {
  const {setOnboardingCompleted} = useOnboardingStore();
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTextChange = async () => {
    if (currentIndex < screenText.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setOnboardingCompleted();
    }
  };

  const handleDotsPress = index => {
    setCurrentIndex(index);
  };

  const handleSkip = async () => {
    setOnboardingCompleted();
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding.png')}
      style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={handleSkip}>
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

            <View style={{alignItems:'center', justifyContent: 'center', gap: 20}}>
              <View style={styles.logo}>
                <CompanyIcon width={150} height={150} />
              </View>
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
          </View>
          <View style={styles.buttonContainer}>
            <Switch
              index={currentIndex}
              total={screenText.length}
              dotsPress={handleDotsPress}
            />
            <View style={{paddingHorizontal: 30}}>
              <Button
                btnText={screenText[currentIndex].btnText}
                onPress={handleTextChange}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Onboarding;
