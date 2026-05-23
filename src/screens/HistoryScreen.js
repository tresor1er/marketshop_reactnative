import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { OrderContext } from '../store/OrderContext';
import { useTheme } from '@react-navigation/native';

export default function HistoryScreen() {
  const { orders } = useContext(OrderContext);
  const { colors } = useTheme();

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.text }]}>Aucune commande pour le moment</Text>
      </View>
    );
  }

  const renderOrder = ({ item }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.orderId, { color: colors.text }]}>Commande #{item.id}</Text>
        <Text style={styles.total}>{(item.total * 600).toFixed(0)} FCFA</Text>
      </View>
      <Text style={[styles.date, { color: colors.text }]}>{item.date} - {item.itemCount} articles</Text>
      <View style={styles.divider} />
      <Text style={[styles.info, { color: colors.text }]}>Client: {item.customerName}</Text>
      <Text style={[styles.info, { color: colors.text }]}>Téléphone: {item.customerPhone}</Text>
      <Text style={[styles.info, { color: colors.text }]}>Adresse: {item.customerAddress}, {item.customerCity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18 },
  list: { padding: 8 },
  card: { padding: 16, margin: 8, borderRadius: 8, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  orderId: { fontSize: 16, fontWeight: 'bold' },
  total: { fontSize: 18, fontWeight: 'bold', color: '#4caf50' },
  date: { fontSize: 14, marginBottom: 8 },
  divider: { height: 1, backgroundColor: '#ccc', marginVertical: 8 },
  info: { fontSize: 14, marginVertical: 2 },
});
