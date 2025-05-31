/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useTheme} from 'src/themes/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Linking} from 'react-native';
const Socials = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const openLink = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn(`Can't open URL: ${url}`);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.heading}>Reach us Out</Text>
          <Text style={styles.subHeading}>
            We are always here to help you. You can reach us out through the
            following channels:
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View style={styles.sectionContainer}>
              <Text style={styles.title}>Call Us</Text>
              <Text style={styles.description}>+91 7054001056</Text>
              <Text style={styles.description}>+91 7054001058</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.title}>Email</Text>
              <Text style={styles.description}>support@clickedart.com</Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.title}>Our Address</Text>
            <Text style={styles.description}>
              Gomti Nagar, Lucknow, Uttar Pradesh 226010
            </Text>
          </View>
        </View>
        <View style={styles.topSection}>
          <Text style={styles.heading}>Our Socials</Text>
          <Text style={styles.subHeading}>
            Follow us on our social media platforms for the latest updates and
            offers.
          </Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              onPress={() => {
                openLink(
                  'https://www.instagram.com/clickedartofficial/',
                );
              }}>
              <Icon name="instagram" size={40} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openLink(
                  'https://www.facebook.com/people/ClickedArt/61572675291065/',
                );
              }}>
              <Icon name="facebook" size={40} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openLink('https://x.com/clickedart');
              }}>
              <Icon name="twitter" size={40} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openLink('https://www.youtube.com/@ClickedArtOfficial');
              }}>
              <Icon name="youtube" size={40} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: theme.background,
      gap: 60,
    },
    topSection: {
      gap: 30,
      marginBottom: 20,
    },
    heading: {
      fontSize: 20,
      fontFamily: 'CircularStd-Bold',
      color: theme.text,
      textAlign: 'center',
    },
    subHeading: {
      fontSize: 14,
      fontFamily: 'CircularStd-Regular',
      color: '#888',
      textAlign: 'justify',
      lineHeight: 20,
    },
    sectionContainer: {
      gap: 10,
    },
    title: {
      fontSize: 20,
      fontFamily: 'CircularStd-Bold',
      color: theme.text,
      marginBottom: 5,
    },
    description: {
      fontSize: 16,
      fontFamily: 'CircularStd-Regular',
      color: '#888',
      lineHeight: 24,
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
  });

export default Socials;
