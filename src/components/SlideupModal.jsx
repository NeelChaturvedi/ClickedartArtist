import React, {useEffect, useRef} from 'react';
import {
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

const {height} = Dimensions.get('window');

const SlideUpModal = ({visible, onClose, options = []}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : height,
      duration: 300,
      easing: visible ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [visible, slideAnim]);

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}>
        <TouchableOpacity activeOpacity={1}>
          <Animated.View
            style={[
              styles.modalContainer,
              {transform: [{translateY: slideAnim}]},
            ]}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => {
                  option.onPress?.();
                  onClose();
                }}>
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};


const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Outfit-bold',
  },
  option: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Outfit-medium',
  },
  cancel: {
    marginTop: 10,
    paddingVertical: 12,
  },
  cancelText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Outfit-bold',
  },
});

export default SlideUpModal;
