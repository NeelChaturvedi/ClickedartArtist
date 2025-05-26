/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import {useTheme} from 'src/themes/useTheme';

const MultiSelectModal = ({options, value = [], onChange, placeholder}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState(value);

  const theme = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    onChange?.(selectedIds);
  }, [selectedIds]);

  const toggleSelect = id => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const renderSelectedText = () => {
    if (selectedIds?.length === 0) {
      return `${placeholder || 'Select options'}`;
    }
    const selectedNames = options
      ?.filter(opt => selectedIds?.includes(opt.id))
      .map(opt => opt.name)
      .join(', ');
    return selectedNames;
  };

  useEffect(() => {
    setSelectedIds(value);
  }, [value]);

  return (
    <View style={styles.selectionContainer}>
      <Pressable onPress={() => setModalVisible(true)} style={styles.selector}>
        <Text style={styles.selectionText}>{renderSelectedText()}</Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.title}>Select options</Text>
                <FlatList
                  data={options}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => {
                    const selected = selectedIds?.includes(item.id);
                    return (
                      <Pressable onPress={() => toggleSelect(item.id)}>
                        <Text
                          style={[
                            styles.option,
                            selected && styles.selectedOption,
                          ]}>
                          {item.name} {selected ? '✓' : ''}
                        </Text>
                      </Pressable>
                    );
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
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
      fontSize: 20,
      marginBottom: 12,
      fontFamily: 'Outfit-bold',
      textAlign: 'center',
      color: theme.text,
    },
    option: {
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: 'Outfit-medium',
      color: theme.text,
    },
    selectedOption: {
      color: '#ED3147',
    },
    selectionContainer: {
      width: '100%',
      height: 60,
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: theme.card,
      justifyContent: 'center',
      borderColor: theme.border,
      borderWidth: 0.5,
      borderRadius: 10,
    },
    selector: {
      paddingVertical: 8,
    },
    selectionText: {
      color: theme.text,
      fontSize: 16,
    },
  });

export default MultiSelectModal;
