import {View, Text, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import {styles} from './styles';
import { ScrollView } from 'moti';
import { useUserStore } from '../../store/auth';
import { API_URL } from '@env';
const Approved = () => {
   const { user } = useUserStore();
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
      const fetchUserPhotos = async () => {
        try {
          const response = await fetch(
            `${API_URL}/api/images/get-images-by-photographer?photographer=${user?._id}`,
          );
          const data = await response.json();
          setPhotos(data.photos);
        } catch (error) {
          console.error('Error fetching user photos:', error);
        }
      };
      fetchUserPhotos();
    }, [user]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {photos?.map(item => (
          <View key={item._id} style={styles.imageBorder}>
            <Image style={styles.image} source={{uri: item.imageLinks.thumbnail}} />
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
