/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import CatalogueScreen from 'src/Screens/CatalogueScreen/CatalogueScreen';
import {
  Pressable,
  Share,
  View,
  Modal,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '@components/button';

enableScreens();

const Stack = createNativeStackNavigator();

function CatalogueHeaderRight({catalogueId, onOpenModal}) {
  const onShare = async () => {
    await Share.share({
      message: `Check out my catalogue: https://clickedart.com/catalogue/${catalogueId}`,
    });
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
      <Pressable onPress={onOpenModal}>
        <Icon name="add-photo-alternate" size={24} color="white" />
      </Pressable>
      <Pressable onPress={onShare}>
        <Icon name="share" size={24} color="white" />
      </Pressable>
    </View>
  );
}

export default function CatalogueNavigator() {
  const [catalogueId, setCatalogueId] = React.useState({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState([]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const toggleImageSelection = (index) => {
    setSelectedImages(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    );
  };

  const renderHeaderRight = React.useCallback(
    () => (
      <CatalogueHeaderRight
        catalogueId={catalogueId}
        onOpenModal={openModal}
      />
    ),
    [catalogueId],
  );

  return (
    <>
      <Stack.Navigator
        initialRouteName="Catalogue Screen"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'black',
            alignItems: 'center',
          },
          headerTitle: '',
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          options={{
            headerRight: renderHeaderRight,
          }}
          name="Catalogue Screen"
          children={props => (
            <CatalogueScreen {...props} setCatalogueId={setCatalogueId} />
          )}
        />
      </Stack.Navigator>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <Pressable style={styles.modalContainer} onPress={closeModal}>
          <Pressable style={styles.modalContent}>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <View style={styles.imageStore}>
                {[...Array(10)].map((_, index) => {
                  const isSelected = selectedImages.includes(index);
                  return (
                    <Pressable
                      key={index}
                      style={styles.imageBorder}
                      onPress={() => toggleImageSelection(index)}>
                      <Image
                        style={styles.image}
                        source={require('../../assets/images/onboarding.png')}
                      />
                      {isSelected && (
                        <View style={styles.checkIconContainer}>
                          <Icon name="check" size={14} color="white" />
                        </View>
                      )}
                      <View style={styles.imageDetails}>
                        <Text style={styles.imageText}>
                          title {index + 1}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
            <Button btnText="Add Images" />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    width: '90%',
    maxHeight: '90%',
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  scrollView: {
    maxHeight: 360,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Outfit-bold',
    color: 'white',
    textAlign: 'center',
  },
  imageStore: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageBorder: {
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: '47%',
    height: 170,
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    height: '80%',
    width: '100%',
    borderRadius: 8,
  },
  imageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 16,
    width: '80%',
    fontFamily: 'Outfit-bold',
    color: 'white',
  },
  checkIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ED3147',
    borderBottomLeftRadius: 20,
    padding: 8,
  },
});
