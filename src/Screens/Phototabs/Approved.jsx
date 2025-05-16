import {View, Text, Image, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './styles';
import {ScrollView} from 'moti';
import {useUserStore} from '../../store/auth';
import {API_URL} from '@env';
const Approved = () => {
  const {user} = useUserStore();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUserPhotos();
    setRefreshing(false);
  };

  const fetchUserPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/images/get-images-by-photographer?photographer=${user?._id}`,
      );
      const data = await response.json();
      setPhotos(data.photos);
    } catch (error) {
      console.error('Error fetching user photos:', error);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchUserPhotos();
  }, [fetchUserPhotos]);

  if (!loading && (!photos || photos?.length === 0)) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.notFoundContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#000"
          />
        }>
        <Text style={styles.notFoundTitle}>No Photo Found</Text>
        <Text style={styles.notFoundDesc}>
          You have not uploaded any photo yet.
        </Text>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor="#000"
        />
      }>
      <View style={styles.container}>
        {photos?.map(item => (
          <View key={item._id} style={styles.imageBorder}>
            <Image
              style={styles.image}
              source={{uri: item.imageLinks.thumbnail}}
            />
            <View style={styles.imageDetails}>
              <Text style={styles.imageText}>{item.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Approved;
