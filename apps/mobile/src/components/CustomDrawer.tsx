import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface CustomDrawerProps {
  state: any;
  navigation: any;
  descriptors: any;
}

const CustomDrawer: React.FC<CustomDrawerProps> = (props) => {
  const menuItems = [
    {
      name: 'Home',
      title: 'Hjem',
      icon: 'home-outline',
      route: 'Home',
    },
    {
      name: 'Profile',
      title: 'Min Profil',
      icon: 'person-outline',
      route: 'Profile',
    },
    {
      name: 'Mine Skift',
      title: 'Mine Skift',
      icon: 'time-outline',
      route: 'Mine Skift',
    },
    {
      name: 'Meldinger',
      title: 'Meldinger',
      icon: 'chatbubbles-outline',
      route: 'Meldinger',
    },
    {
      name: 'Medarbeidere',
      title: 'Medarbeidere',
      icon: 'people-outline',
      route: 'Medarbeidere',
    },
    {
      name: 'Forespørsel',
      title: 'Forespørsel',
      icon: 'time-outline',
      route: 'Forespørsel',
    },
  ];

  const handleNavigation = (routeName: string) => {
    props.navigation.navigate(routeName as never);
  };

  const getActiveRouteIndex = () => {
    return props.state.index;
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={60} color="white" />
            </View>
            <Text style={styles.welcomeText}>Velkommen!</Text>
            <Text style={styles.subtitleText}>Din arbeidsdag starter her</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const isActive = getActiveRouteIndex() === index;
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.menuItem,
                  isActive && styles.activeMenuItem,
                ]}
                onPress={() => handleNavigation(item.route)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.iconContainer,
                  isActive && styles.activeIconContainer
                ]}>
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={isActive ? '#667eea' : 'white'}
                  />
                </View>
                <Text style={[
                  styles.menuText,
                  isActive && styles.activeMenuText
                ]}>
                  {item.title}
                </Text>
                {isActive && (
                  <View style={styles.activeIndicator} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              // Handle logout logic here
              console.log('Logout pressed');
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutText}>Logg ut</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  menuContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  activeMenuItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activeIconContainer: {
    backgroundColor: '#667eea',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    flex: 1,
  },
  activeMenuText: {
    color: '#333',
  },
  activeIndicator: {
    position: 'absolute',
    right: 15,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#667eea',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
});

export default CustomDrawer;
