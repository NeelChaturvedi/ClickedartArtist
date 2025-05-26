import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'src/themes/useTheme';

const Accordion = ({title, content}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const theme = useTheme();
  const styles = getStyles(theme);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Feather
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color={theme.text}
          />
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          {Array.isArray(content) ? (
            content.map((item, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.contentText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.contentText}>{content}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.card,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  header: {
    padding: 10,
    backgroundColor: theme.card,
  },
  title: {
    color: theme.text,
    fontSize: 16,
    fontFamily: 'Outfit-bold',
    width: '90%',
  },
  content: {
    padding: 10,
  },
  contentText: {
    color: theme.text,
    fontSize: 16,
    fontFamily: 'Outfit-regular',
    flexShrink: 1,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    color: theme.text,
    fontSize: 16,
    marginRight: 6,
  },
});

export default Accordion;
