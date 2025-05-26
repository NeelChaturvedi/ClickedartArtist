import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import { useTheme } from 'src/themes/useTheme';

const FilterDate = ({dateRange, setDateRange, fetchCustomStats}) => {
  const [openPicker, setOpenPicker] = useState(false);
  const [isStart, setIsStart] = useState(true);

  const handleDateConfirm = date => {
    if (isStart) {
      if (dateRange.endDate && date > dateRange.endDate) {
        setDateRange(prev => ({
          ...prev,
          startDate: dateRange.endDate,
        }));
      } else {
        setDateRange(prev => ({...prev, startDate: date}));
      }
    } else {
      if (!dateRange.startDate || date < dateRange.startDate) {
        setDateRange(prev => ({
          ...prev,
          endDate: dateRange.startDate,
        }));
      } else {
        setDateRange(prev => ({...prev, endDate: date}));
      }
    }
    setOpenPicker(false);
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      fetchCustomStats();
    }
  }, [dateRange.startDate, dateRange.endDate, fetchCustomStats]);

    const theme = useTheme();
  const style = getStyles(theme);

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
            {dateRange?.startDate
              ? dayjs(dateRange?.startDate).format('DD-MM-YYYY')
              : 'Start Date'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setIsStart(false);
            setOpenPicker(true);
          }}
          style={style.dateButton}>
          <Text style={style.dateText}>
            {dateRange?.endDate
              ? dayjs(dateRange?.endDate).format('DD-MM-YYYY')
              : 'End Date'}
          </Text>
        </Pressable>
      </View>

      <DatePicker
        modal
        mode="date"
        open={openPicker}
        date={
          isStart
            ? dateRange?.startDate || new Date()
            : dateRange?.endDate || new Date()
        }
        onConfirm={handleDateConfirm}
        onCancel={() => setOpenPicker(false)}
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
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
    backgroundColor: theme.card,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: theme.text,
    fontFamily: 'Outfit-medium',
    fontSize: 18,
  },
});

export default FilterDate;
