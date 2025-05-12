import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

const FilterDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openPicker, setOpenPicker] = useState(false);
  const [isStart, setIsStart] = useState(true);

  const handleDateConfirm = date => {
    if (isStart) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setOpenPicker(false);
  };

  return (
    <View style={style.background}>
      <View style={style.datePickerContainer}>
        <Pressable
          onPress={() => {
            setIsStart(true);
            setOpenPicker(true);
          }}
          style={style.dateButton}>
          <Text style={style.dateText}>
            {startDate ? dayjs(startDate).format('DD-MM-YYYY') : 'Start Date'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setIsStart(false);
            setOpenPicker(true);
          }}
          style={style.dateButton}>
          <Text style={style.dateText}>
            {endDate ? dayjs(endDate).format('DD-MM-YYYY') : 'End Date'}
          </Text>
        </Pressable>
      </View>

      <DatePicker
        modal
        mode="date"
        open={openPicker}
        date={isStart ? startDate || new Date() : endDate || new Date()}
        onConfirm={handleDateConfirm}
        onCancel={() => setOpenPicker(false)}
      />
    </View>
  );
};

const style = StyleSheet.create({
  background: {
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  dateButton: {
    flex: 1,
    height: 60,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#ffffff',
    fontFamily: 'Outfit-medium',
    fontSize: 18,
  },
});

export default FilterDate;
