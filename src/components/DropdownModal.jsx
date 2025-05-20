import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';

const DropdownModal = ({ options }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (item) => {
    setSelectedOption(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.selectionContainer}>
      <Pressable onPress={() => setModalVisible(true)} style={styles.selector}>
        <Text style={styles.selectionText}>
          {selectedOption?.name || 'Select option'}
        </Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.title}>Select option</Text>
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => handleSelect(item)}>
                      <Text style={styles.option}>{item.name}</Text>
                    </Pressable>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    width: '80%',
    borderRadius: 10,
    maxHeight: '60%',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontFamily:'Outfit-bold',
    textAlign: 'center',
    color: 'white',
  },
  option: {
    paddingVertical: 12,
    fontSize: 16,
    fontFamily:'Outfit-medium',
    color: 'white',
  },
  selectionContainer: {
    width: '100%',
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  selector: {
    paddingVertical: 8,
  },
  selectionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DropdownModal;
