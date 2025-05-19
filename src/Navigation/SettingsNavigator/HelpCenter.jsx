import React from 'react';
import {ScrollView, Text, StyleSheet, View, SafeAreaView} from 'react-native';

const HelpCenter = () => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
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
