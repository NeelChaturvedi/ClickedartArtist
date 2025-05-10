import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  searchRow: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 6,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 6,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
  },
  paid: {
    backgroundColor: '#C6F6D5',
  },
  pending: {
    backgroundColor: '#FDE68A',
  },
});
