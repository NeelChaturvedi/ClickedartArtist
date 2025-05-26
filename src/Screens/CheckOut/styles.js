import {StyleSheet} from 'react-native';

export const placeOrderStyles = (theme) => StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.background,
  },
  containerWrapper: {
    paddingHorizontal: 20,
    marginTop:30,
  },
  header: {
    fontFamily: 'Outfit-bold',
    fontSize: 20,
    color: theme.text,
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
    color: theme.text,
  },
  inputbox: {
    height: 54,
    color: theme.text,
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    fontFamily: 'Outfit-regular',
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.border,
  },
  submitButton: {
    backgroundcolor: theme.text,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  amountDistribution:{
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  totalAmount:{
  },
  orderCard:{
    width: '100%',
    padding: 16,
    gap:20,
    backgroundColor: theme.card,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.border,
  },
  orderImage:{
    width: '34%',
    height: 110,
  },
  orderDetails:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  orderInfo:{
    gap: 10,
    flexDirection: 'column',
    width: '60%',
  },
  orderTitle:{
    fontFamily: 'Outfit-medium',
    color: theme.text,
    fontSize: 16,
  },
  orderPaper:{
    fontFamily: 'Outfit-medium',
    color: theme.text,
    fontSize: 14,
  },
  line:{
    width: '100%',
    height: 2,
    backgroundcolor: theme.text,
  },
  modalOverlay: {
  flex: 1,
  justifyContent: 'flex-end',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: '#1E1E1E',
  gap:30,
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
});
