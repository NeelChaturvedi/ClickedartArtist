import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/Backbutton';

const HelpCenter = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <Text style={styles.title}>Help Center</Text>
      {/* <Text style={styles.lastUpdated}>Effective Date: 26 January 2025</Text> */}
      <ScrollView showsVerticalScrollIndicator={false}>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 90,
    backgroundColor: 'black',
    position: 'relative',
    alignItems: 'center',
    height: '100%',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 70,
    left: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Outfit-bold',
    marginBottom: 10,
    color: 'white',
    paddingVertical: 10,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  introText: {
    fontSize: 15,
    marginBottom: 20,
    color: 'white',
    lineHeight: 22,
  },
  section: {
    gap: 4,
    paddingVertical: 16,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Outfit-bold',
    marginBottom: 10,
    color: 'white',
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10,
    marginBottom: 6,
    fontFamily: 'Outfit-medium',
    color: 'white',
  },
});

export default HelpCenter;
