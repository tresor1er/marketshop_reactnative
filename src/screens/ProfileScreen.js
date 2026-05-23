import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { ThemeContext } from '../store/ThemeContext';
import { OrderContext } from '../store/OrderContext';
import { CartContext } from '../store/CartContext';
import { useTheme } from '@react-navigation/native';

export default function ProfileScreen() {
  // Contexte pour le thème (Clair/Sombre)
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  // Contextes pour vider les données
  const { clearOrders } = useContext(OrderContext);
  const { clearCart } = useContext(CartContext);
  const { colors } = useTheme();

  // États locaux pour les infos de l'utilisateur
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [isEditing, setIsEditing] = useState(false); // Mode édition actif/inactif

  // Fonction pour sauvegarder le profil
  const handleSave = () => {
    setIsEditing(false); // Désactive le mode édition
    Alert.alert('Succès', 'Profil mis à jour');
  };

  // Fonction pour effacer toutes les données locales
  const handleClearData = () => {
    Alert.alert(
      'Vider mes données',
      'Êtes-vous sûr de vouloir supprimer tout l\'historique des commandes et le panier ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Confirmer', 
          style: 'destructive',
          onPress: () => {
            clearOrders(); // Vide l'historique
            clearCart();   // Vide le panier
            Alert.alert('Succès', 'Données supprimées');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* En-tête avec avatar et bouton modifier/sauvegarder */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
          <Text style={styles.editBtn}>{isEditing ? 'Sauvegarder' : 'Modifier'}</Text>
        </TouchableOpacity>
      </View>

      {/* Formulaire des informations personnelles */}
      <View style={[styles.form, { backgroundColor: colors.card }]}>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          value={name}
          onChangeText={setName}
          editable={isEditing} // Modifiable uniquement si isEditing est true
          placeholder="Nom"
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
          placeholder="Email"
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          value={phone}
          onChangeText={setPhone}
          editable={isEditing}
          placeholder="Téléphone"
          placeholderTextColor="#999"
        />
      </View>

      {/* Paramètres de l'application (Mode Sombre) */}
      <View style={[styles.settings, { backgroundColor: colors.card }]}>
        <Text style={[styles.settingText, { color: colors.text }]}>Mode Sombre</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      {/* Bouton de réinitialisation des données */}
      <TouchableOpacity style={styles.clearBtn} onPress={handleClearData}>
        <Text style={styles.clearBtnText}>Vider mes données</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 40 },
  editBtn: { color: '#2196f3', fontSize: 16, fontWeight: 'bold' },
  form: { padding: 16, borderRadius: 8, elevation: 1, marginBottom: 24 },
  input: { borderWidth: 1, borderRadius: 4, padding: 12, marginBottom: 12 },
  settings: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 8, elevation: 1, marginBottom: 24 },
  settingText: { fontSize: 16 },
  clearBtn: { backgroundColor: '#f44336', padding: 16, borderRadius: 8, alignItems: 'center' },
  clearBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
