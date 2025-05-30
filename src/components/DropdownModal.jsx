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
import { useTheme } from 'src/themes/useTheme';

const DropdownModal = ({ options, onSelect, value }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

    const theme = useTheme();
  const styles = getStyles(theme);

  const handleSelect = (item) => {
    setSelectedOption(item);
    onSelect(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.selectionContainer}>
      <Pressable onPress={() => setModalVisible(true)} >
        <Text style={styles.selectionText}>
          {value ? value : selectedOption?.name || 'Select option'}
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

const getStyles = (theme) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.card,
    padding: 20,
    width: '80%',
    borderRadius: 10,
    maxHeight: '60%',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontFamily: 'Calibri-Bold',
    color: theme.text,
  },
  option: {
    paddingVertical: 12,
    fontSize: 16,
    color: theme.text,
    fontFamily: 'Calibri-Medium',
  },
  selectionContainer: {
    width: '100%',
    height: 60,
    padding: 16,
    backgroundColor: theme.card,
    justifyContent: 'center',
    borderColor: theme.border,
    borderWidth: 0.5,
    borderRadius: 10,
  },

  selectionText: {
    color: theme.text,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DropdownModal;
