import { useState } from 'react';
import { Box, Typography, Container, IconButton, Badge, InputBase } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaHeart, FaSearch, FaUser, FaShoppingBag } from 'react-icons/fa';
import useStore from '../../../store/store';
import styles from './Header.module.css';

/**
 * Header Component
 * Luxury jewelry header with video background and navigation
 */
const Header = ({ title, description }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const wishlistCount = useStore((state) => state.getWishlistCount());

  const navItems = ['Engagement', 'Wedding', 'Fashion', 'Collections', 'About'];

  return (
    <Box className={styles.headerWrapper}>
      {/* Video Background */}
      <Box className={styles.videoBackground}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.video}
          poster="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-luxury-jewelry-close-up-9803/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <Box className={styles.videoOverlay} />
      </Box>

      {/* Navigation Bar */}
      <Container maxWidth="xl" className={styles.navContainer}>
        <Box className={styles.navbar}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h6" className={styles.logo}>
              LUXE JEWELS
            </Typography>
          </motion.div>

          {/* Navigation Links */}
          <Box className={styles.navLinks}>
            {navItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Typography className={styles.navLink}>
                  {item}
                </Typography>
              </motion.div>
            ))}
          </Box>

          {/* Action Icons */}
          <Box className={styles.actionIcons}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.iconGroup}
            >
              <IconButton 
                className={styles.iconButton} 
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
              >
                <FaSearch aria-hidden="true" />
              </IconButton>
              
              <IconButton 
                className={styles.iconButton}
                aria-label="User account"
              >
                <FaUser aria-hidden="true" />
              </IconButton>

              <IconButton 
                className={styles.iconButton}
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Badge badgeContent={wishlistCount} color="error">
                  <FaHeart aria-hidden="true" />
                </Badge>
              </IconButton>

              <IconButton 
                className={styles.iconButton}
                aria-label="Shopping bag"
              >
                <FaShoppingBag aria-hidden="true" />
              </IconButton>
            </motion.div>
          </Box>
        </Box>

        {/* Search Bar */}
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.searchContainer}
            role="search"
          >
            <InputBase
              placeholder="Search for rings, necklaces, bracelets..."
              className={styles.searchInput}
              startAdornment={<FaSearch className={styles.searchIcon} aria-hidden="true" />}
              inputProps={{ 
                'aria-label': 'Search jewelry products',
                'type': 'search'
              }}
              autoFocus
            />
          </motion.div>
        )}
      </Container>

      {/* Hero Content */}
      <Container maxWidth="xl" className={styles.heroContainer}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.heroContent}
        >
          <Box className={styles.decorativeLine} />
          <Typography variant="h1" className={styles.title}>
            {title}
          </Typography>
          <Typography variant="body1" className={styles.description}>
            {description}
          </Typography>
          <Box className={styles.decorativeLine} />
        </motion.div>
      </Container>
    </Box>
  );
};

export default Header;

