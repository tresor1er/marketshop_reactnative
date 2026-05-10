import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../store/CartContext';
import { useTheme } from '@react-navigation/native';

export default function CartScreen({ navigation }) {
  const { cartItems, total, updateQuantity, removeFromCart } = useContext(CartContext);
  const { colors } = useTheme();

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.text }]}>Votre panier est vide</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={{ color: colors.text }}>Sous-total: ${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
            <Text style={[styles.btnText, { color: colors.text }]}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.quantity, { color: colors.text }]}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <Text style={[styles.btnText, { color: colors.text }]}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: colors.text }]}>Total:</Text>
          <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutText}>Passer commande</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18 },
  list: { padding: 8 },
  card: { flexDirection: 'row', padding: 8, marginVertical: 4, borderRadius: 8, elevation: 1 },
  image: { width: 60, height: 60, backgroundColor: '#fff' },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  title: { fontWeight: 'bold' },
  price: { color: '#4caf50' },
  actions: { justifyContent: 'space-between', alignItems: 'flex-end' },
  quantityRow: { flexDirection: 'row', alignItems: 'center' },
  btnText: { fontSize: 20, paddingHorizontal: 8 },
  quantity: { fontSize: 16 },
  deleteText: { fontSize: 20, color: 'red', marginTop: 8 },
  footer: { padding: 16, borderTopWidth: 1, borderColor: '#e0e0e0', elevation: 4 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  totalLabel: { fontSize: 20, fontWeight: 'bold' },
  totalPrice: { fontSize: 20, fontWeight: 'bold', color: '#4caf50' },
  checkoutBtn: { backgroundColor: '#2196f3', padding: 16, borderRadius: 8, alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
