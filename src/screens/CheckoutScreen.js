import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { CartContext } from '../store/CartContext';
import { OrderContext } from '../store/OrderContext';
import { useTheme } from '@react-navigation/native';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, total, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const handleConfirm = () => {
    if (!name || !phone || !address || !city) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return;
    }

    if (isNaN(phone)) {
      Alert.alert('Erreur', 'Le téléphone doit être numérique.');
      return;
    }

    const order = {
      date: new Date().toLocaleString(),
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      customerCity: city,
      items: cartItems,
    };

    addOrder(order);
    clearCart();
    
    Alert.alert('Succès', 'Commande confirmée !', [
      { text: 'OK', onPress: () => navigation.navigate('History') }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Récapitulatif</Text>
      <View style={[styles.summaryBox, { backgroundColor: colors.card }]}>
        {cartItems.map(item => (
          <View key={item.id} style={styles.summaryItem}>
            <Text style={{ flex: 1, color: colors.text }} numberOfLines={1}>{item.title}</Text>
            <Text style={{ width: 40, textAlign: 'center', color: colors.text }}>x{item.quantity}</Text>
            <Text style={{ width: 60, textAlign: 'right', color: colors.text }}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={[styles.totalText, { color: colors.text }]}>Total à payer:</Text>
          <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>Informations de livraison</Text>
      <View style={[styles.form, { backgroundColor: colors.card }]}>
        <TextInput 
          style={[styles.input, { color: colors.text, borderColor: colors.border }]} 
          placeholder="Nom complet" 
          placeholderTextColor="#999"
          value={name} 
          onChangeText={setName} 
        />
        <TextInput 
          style={[styles.input, { color: colors.text, borderColor: colors.border }]} 
          placeholder="Téléphone" 
          placeholderTextColor="#999"
          keyboardType="phone-pad" 
          value={phone} 
          onChangeText={setPhone} 
        />
        <TextInput 
          style={[styles.input, { color: colors.text, borderColor: colors.border }]} 
          placeholder="Adresse" 
          placeholderTextColor="#999"
          value={address} 
          onChangeText={setAddress} 
        />
        <TextInput 
          style={[styles.input, { color: colors.text, borderColor: colors.border }]} 
          placeholder="Ville" 
          placeholderTextColor="#999"
          value={city} 
          onChangeText={setCity} 
        />
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirmer la commande</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, marginTop: 16 },
  summaryBox: { padding: 12, borderRadius: 8, elevation: 1 },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, borderTopWidth: 1, borderColor: '#ccc', paddingTop: 8 },
  totalText: { fontSize: 16, fontWeight: 'bold' },
  totalPrice: { fontSize: 16, fontWeight: 'bold', color: '#4caf50' },
  form: { padding: 12, borderRadius: 8, elevation: 1 },
  input: { borderWidth: 1, borderRadius: 4, padding: 12, marginBottom: 12 },
  confirmBtn: { backgroundColor: '#2196f3', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24, marginBottom: 40 },
  confirmText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
