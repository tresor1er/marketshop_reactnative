import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getProduct } from '../data/api_service';
import { CartContext } from '../store/CartContext';
import { useTheme } from '@react-navigation/native';

// Dictionnaire de traduction des catégories
const categoryTranslations = {
  'electronics': 'Électronique',
  'jewelery': 'Bijouterie',
  "men's clothing": 'Vêtements Homme',
  "women's clothing": 'Vêtements Femme',
};

const translateCategory = (category) => {
  return categoryTranslations[category] || category;
};

export default function ProductDetailScreen({ route, navigation }) {
  // Récupère l'ID du produit passé en paramètre de navigation
  const { productId } = route.params;
  
  // États locaux
  const [product, setProduct] = useState(null); // Détails du produit
  const [loading, setLoading] = useState(true); // État de chargement
  const [quantity, setQuantity] = useState(1);  // Quantité à ajouter au panier
  
  // Contexte du panier pour utiliser la fonction d'ajout
  const { addToCart } = useContext(CartContext);
  const { colors } = useTheme();

  // Chargement du produit au montage de l'écran
  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Appel à l'API pour récupérer un produit spécifique
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

  // Fonction pour ajouter le produit au panier
  const handleAddToCart = () => {
    addToCart(product, quantity); // Ajoute le produit avec la quantité choisie
    alert('Produit ajouté au panier'); // Affiche une alerte de confirmation
  };

  // Affichage pendant le chargement
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  // Si aucun produit n'est trouvé
  if (!product) return <Text>Erreur lors du chargement</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
        
        {/* Ligne contenant le prix et la note */}
        <View style={styles.row}>
          <Text style={styles.price}>{(product.price * 600).toFixed(0)} FCFA</Text>
          <Text style={[styles.rating, { color: colors.text }]}>⭐ {product.rating?.rate}</Text>
        </View>
        
        <View style={styles.chip}>
          <Text style={styles.chipText}>{translateCategory(product.category)}</Text>
        </View>
        
        <Text style={[styles.descTitle, { color: colors.text }]}>Description</Text>
        <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
        
        {/* Contrôle de la quantité */}
        <View style={styles.quantityRow}>
          {/* Bouton pour diminuer la quantité (minimum 1) */}
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.btn}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.quantity, { color: colors.text }]}>{quantity}</Text>
          {/* Bouton pour augmenter la quantité */}
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.btn}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
        
        {/* Bouton d'ajout au panier */}
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Styles
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
