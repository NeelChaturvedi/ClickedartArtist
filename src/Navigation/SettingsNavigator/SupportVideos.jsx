/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useTheme} from 'src/themes/useTheme';
import api from 'src/utils/apiClient';

const SupportVideos = () => {
  const [playing, setPlaying] = useState(false);
  const [supportVideos, setSupportVideos] = useState([]);

  const theme = useTheme();
  const styles = getStyles(theme);

  const getVideoId = url => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const getSupportVideos = async () => {
    try {
      const res = await api.get('/layout/get-layout-content');
      if (res.data?.support) {
        setSupportVideos(res.data?.support);
      }
    } catch (error) {
      console.error('Error in getLayoutContent:', error.response);
    }
  };

  useEffect(() => {
    getSupportVideos();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%', paddingVertical: 10}}>
        <Text style={styles.introText}>
          Here are some videos that can help you with common issues and
          questions.
        </Text>
        {supportVideos.map((video, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{video.title}</Text>
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={getVideoId(video.url)}
              onChangeState={onStateChange}
            />
            <Text style={styles.bullet}>{video.description}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: theme.background,
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: 32,
      fontFamily: 'Calibri-Bold',
      marginBottom: 10,
      color: theme.text,
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
      color: '#888',
      lineHeight: 22,
    },
    section: {
      gap: 4,
      paddingVertical: 16,
      borderBottomcolor: theme.text,
      borderBottomWidth: 1,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: 'Calibri-Medium',
      marginBottom: 10,
      color: theme.text,
    },
    bullet: {
      fontSize: 16,
      lineHeight: 24,
      marginLeft: 10,
      marginBottom: 6,
      fontFamily: 'Calibri-Medium',
      color: theme.text,
    },
  });

export default SupportVideos;
