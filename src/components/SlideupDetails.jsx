import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';

const SlideUpDetails = ({visible, title, onClose, data = []}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{title}</Text>
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.row}>
                    <Text style={styles.label}>{item.label}:</Text>
                    {item.isFree ? (
                      <View style={styles.freeValueContainer}>
                        <Text style={styles.crossedValue}>{item.value}</Text>
                        <Text style={styles.freeValue}>0</Text>
                      </View>
                    ) : (
                      <Text style={styles.value}>{item.value}</Text>
                    )}
                  </View>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '100%',
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    color: 'white',
  },
  value: {
    fontSize: 16,
    color: 'white',
  },
  freeValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  crossedValue: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  freeValue: {
    fontSize: 16,
    //light green
    color: 'rgba(48, 255, 71, 1)',
  },
});

export default SlideUpDetails;
