import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  containerWrapper: {
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: 'Outfit-bold',
    fontSize: 20,
    color: 'white',
  },
  form: {
    justifyContent: 'flex-start',
    paddingBottom: 10,
    gap: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  twoField: {
    flex: 1,
    gap: 10,
  },
  formField: {
    gap: 10,
  },
  inputTitle: {
    fontSize: 16,
    fontFamily: 'Outfit-medium',
    color: 'white',
  },
  inputbox: {
    height: 54,
    color: 'white',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    fontFamily: 'Outfit-regular',
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  submitButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  totalAmount:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  orderContainer:{
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  orderImage:{
    width: 80,
    height: 80,
  },
});
