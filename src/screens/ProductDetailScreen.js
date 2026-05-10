import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getProduct } from '../data/api_service';
import { CartContext } from '../store/CartContext';
import { useTheme } from '@react-navigation/native';

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { colors } = useTheme();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const data = await getProduct(productId);
      setProduct(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Produit ajouté au panier');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (!product) return <Text>Erreur</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={[styles.rating, { color: colors.text }]}>⭐ {product.rating?.rate}</Text>
        </View>
        <View style={styles.chip}><Text style={styles.chipText}>{product.category}</Text></View>
        <Text style={[styles.descTitle, { color: colors.text }]}>Description</Text>
        <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
        
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.btn}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.quantity, { color: colors.text }]}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.btn}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center' },
  image: { width: '100%', height: 300, backgroundColor: '#fff' },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#4caf50' },
  rating: { fontSize: 18 },
  chip: { alignSelf: 'flex-start', backgroundColor: '#e0e0e0', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, marginBottom: 16 },
  chipText: { color: '#000' },
  descTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 16, lineHeight: 24 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 24 },
  btn: { width: 40, height: 40, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center', borderRadius: 20 },
  btnText: { fontSize: 24, fontWeight: 'bold' },
  quantity: { fontSize: 20, marginHorizontal: 20 },
  addBtn: { backgroundColor: '#2196f3', padding: 16, borderRadius: 8, alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
