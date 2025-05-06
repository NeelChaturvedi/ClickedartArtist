import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 80,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Outfit Bold',
    marginBottom: 30,
  },
  form: {
    gap: 20,
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
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
    color: '#FFFFFF',
  },
  inputbox: {
    height: 54,
    color: 'white',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8C8C8C',
  },
  button: {
    backgroundColor: '#ea324a',
    paddingVertical: 18,
    alignSelf: 'center',
    width: '84%',
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
  },
});
