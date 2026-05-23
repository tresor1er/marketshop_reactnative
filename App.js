import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importation des fournisseurs de contexte (Global State)
import { ThemeProvider, ThemeContext } from './src/store/ThemeContext';
import { CartProvider } from './src/store/CartContext';
import { OrderProvider } from './src/store/OrderContext';

// Importation des différents écrans de l'application
import CatalogScreen from './src/screens/CatalogScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Création des navigateurs
const Tab = createBottomTabNavigator(); // Navigation par onglets en bas
const Stack = createNativeStackNavigator(); // Navigation en pile (pour aller d'une page à l'autre)

// Pile de navigation pour le catalogue (Catalogue -> Détail)
function CatalogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Catalogue' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Détail Produit' }} />
    </Stack.Navigator>
  );
}

// Pile de navigation pour le panier (Panier -> Paiement)
function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Panier' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Commande' }} />
    </Stack.Navigator>
  );
}

// Configuration des onglets principaux (barre de navigation en bas)
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="CatalogueTab" component={CatalogStack} options={{ tabBarLabel: 'Catalogue' }} />
      <Tab.Screen name="CartTab" component={CartStack} options={{ tabBarLabel: 'Panier' }} />
      <Tab.Screen name="HistoryTab" component={HistoryScreen} options={{ tabBarLabel: 'Historique', headerShown: true, title: 'Historique des commandes' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profil', headerShown: true, title: 'Profil' }} />
    </Tab.Navigator>
  );
}

// Composant principal qui gère le thème (Clair/Sombre) et la navigation
function MainApp() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <MainTabs />
    </NavigationContainer>
  );
}

// Point d'entrée de l'application, on englobe tout avec les Providers
export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <OrderProvider>
          <MainApp />
        </OrderProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
