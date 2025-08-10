import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, subtitle }) => {
  const navigation = useNavigation<any>();

  const openDrawer = () => {
    if (navigation.openDrawer) {
      navigation.openDrawer();
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#667eea',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
    padding: 8,
  },
  menuIcon: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 22,
  },
});

export default ScreenHeader;
