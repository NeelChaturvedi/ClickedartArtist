import React, {useEffect, useRef} from 'react';
import {
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  View,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'src/themes/useTheme';

const {height} = Dimensions.get('window');

const SlideUpModal = ({visible, onClose, options = []}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const dragY = useRef(new Animated.Value(0)).current;

  const theme = useTheme();
  const styles = getStyles(theme);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          dragY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(slideAnim, {
            toValue: height,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            dragY.setValue(0);
            onClose();
          });
        } else {
          Animated.spring(dragY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : height,
      duration: 300,
      easing: visible ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim, visible]);

  const translateY = Animated.add(slideAnim, dragY);

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
            style={[styles.modalContainer, {transform: [{translateY}]}]}
            {...panResponder.panHandlers}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => {
                  option.onPress?.();
                  onClose();
                }}>
                <View style={styles.optionContainer}>
                  <View style={styles.iconWrapper}>
                    <Icon name={option.icon} size={24} color={theme.text} />
                  </View>
                  <View style={styles.labelWrapper}>
                    <Text style={styles.optionText}>{option.label}</Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={24} color={theme.text} />
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

const getStyles = theme =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.card,
      padding: 20,
      width: '100%',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
    option: {
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    optionContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    iconWrapper: {
      width: 40,
      alignItems: 'center',
    },
    labelWrapper: {
      justifyContent: 'center',
    },
    optionText: {
      color: theme.text,
      fontSize: 16,
      lineHeight: 20,
      fontFamily: 'Calibri-Medium',
    },
    cancel: {
      marginTop: 10,
      paddingVertical: 12,
    },
    cancelText: {
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Calibri-Bold',
    },
  });

export default SlideUpModal;
