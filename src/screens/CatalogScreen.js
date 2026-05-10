import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { getProducts, getCategories, getProductsByCategory } from '../data/api_service';
import { useTheme } from '@react-navigation/native';

export default function CatalogScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const cats = await getCategories();
      setCategories(['Toutes', ...cats]);
      
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
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card }]} 
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.chip, selectedCategory === cat && styles.chipSelected]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextSelected]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={renderProduct}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

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
