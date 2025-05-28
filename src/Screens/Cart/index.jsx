import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {createCartStyles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '@components/button';
import Icon from 'react-native-vector-icons/FontAwesome';
import useCartStore from 'src/store/cart';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'src/themes/useTheme';
import CartSkeleton from './CartLoader';

const Cart = () => {
  const {removeItemFromCart, cartItems} = useCartStore();
  const onRemoveItem = (id, mode) => {
    removeItemFromCart(id, mode);
    ToastAndroid.show(
      'Removed from cart!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const theme = useTheme();
  const styles = useMemo(() => createCartStyles(theme), [theme]);
  const navigation = useNavigation();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.background}>
        <CartSkeleton />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 2000);
            }}
            tintColor="#000"
          />
        }
        contentContainerStyle={styles.container}>
        <Text style={styles.header}>Order Summary</Text>
        <View>
          {cartItems?.map((product, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.imageInfo}>
                <Image
                  style={styles.image}
                  source={{uri: product.imageInfo?.thumbnail}}
                />
                <View style={styles.imageDetails}>
                  <View gap={6}>
                    <Text style={styles.title}>{product.imageInfo?.title}</Text>
                    <Text style={styles.owner}>
                      {product.imageInfo?.photographer?.firstName
                        ? product.imageInfo?.photographer?.firstName +
                          ' ' +
                          product.imageInfo?.photographer?.lastName
                        : product.imageInfo?.photographer?.name}
                    </Text>
                  </View>
                  <Text style={styles.price}>
                    ₹ {product.subTotal?.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() =>
                    onRemoveItem(product.imageInfo?.image, product.mode)
                  }>
                  <Icon name="close" size={20} color={'white'} />
                </TouchableOpacity>
              </View>
              <View style={styles.line} />
              <View gap={20}>
                <Text style={styles.paper}>{product.paperInfo?.name}</Text>
                <View style={styles.otherOptions}>
                  <Text style={styles.size}>
                    {product.paperInfo?.size?.width} x{' '}
                    {product.paperInfo?.size?.height} in
                  </Text>
                  <Text style={styles.size}>{product.frameInfo?.name}</Text>
                </View>
              </View>
            </View>
          ))}
          {cartItems?.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
          )}
        </View>
      </ScrollView>
      {cartItems?.length > 0 && (
        <View style={styles.btnContainer}>
          <Button
            btnText={'CheckOut'}
            onPress={() => navigation.navigate('Place Order')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
