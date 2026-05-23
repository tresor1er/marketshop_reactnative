import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { getProducts, getCategories, getProductsByCategory } from '../data/api_service';
import { useTheme } from '@react-navigation/native';

// Dictionnaire pour traduire les catégories de l'API (anglais) en français
const categoryTranslations = {
  'electronics': 'Électronique',
  'jewelery': 'Bijouterie',
  "men's clothing": 'Vêtements Homme',
  "women's clothing": 'Vêtements Femme',
};

// Fonction utilitaire pour traduire une catégorie
const translateCategory = (category) => {
  return categoryTranslations[category] || category;
};

export default function CatalogScreen({ navigation }) {
  // Déclaration des états locaux (données de l'écran)
  const [products, setProducts] = useState([]); // Liste des produits
  const [categories, setCategories] = useState([]); // Liste des catégories
  const [selectedCategory, setSelectedCategory] = useState('Toutes'); // Catégorie actuellement sélectionnée
  const [loading, setLoading] = useState(true); // État de chargement
  const { colors } = useTheme(); // Couleurs du thème actuel (clair/sombre)

  // useEffect est appelé à chaque fois que 'selectedCategory' change
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Fonction pour récupérer les données depuis l'API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Récupère les catégories
      const cats = await getCategories();
      setCategories(['Toutes', ...cats]); // Ajoute "Toutes" au début de la liste
      
      // Récupère les produits selon la catégorie sélectionnée
      let prods;
      if (selectedCategory === 'Toutes') {
        prods = await getProducts();
      } else {
        prods = await getProductsByCategory(selectedCategory);
      }
      setProducts(prods);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false); // Arrête l'indicateur de chargement
    }
  };

  // Fonction pour afficher un produit individuel dans la liste
  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card }]} 
      // Au clic, navigue vers l'écran de détail en passant l'ID du produit
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
        {/* Conversion du prix en FCFA (ex: x 600) */}
        <Text style={styles.price}>{(item.price * 600).toFixed(0)} FCFA</Text>
        <Text style={styles.category}>{translateCategory(item.category)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barre horizontale pour filtrer par catégorie */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.chip, selectedCategory === cat && styles.chipSelected]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextSelected]}>
                {translateCategory(cat)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Affichage du chargement ou de la liste des produits */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          numColumns={2} // Affiche 2 produits par ligne
          renderItem={renderProduct}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

// Styles CSS de l'écran
const styles = StyleSheet.create({
  container: { flex: 1 },
  categoryContainer: { padding: 8, flexDirection: 'row' },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e0e0e0', marginRight: 8 },
  chipSelected: { backgroundColor: '#2196f3' },
  chipText: { color: '#000' },
  chipTextSelected: { color: '#fff' },
  list: { padding: 8 },
  card: { flex: 1, margin: 8, borderRadius: 8, overflow: 'hidden', elevation: 2, padding: 8 },
  image: { width: '100%', height: 120 },
  info: { marginTop: 8 },
  title: { fontWeight: 'bold', fontSize: 14 },
  price: { color: '#4caf50', fontWeight: 'bold', marginTop: 4 },
  category: { color: '#757575', fontSize: 12, marginTop: 4 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
