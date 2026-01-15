import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import styles from './ProductGrid.module.css';

/**
 * ProductGrid Component
 * Responsive grid layout using CSS Grid
 */
const ProductGrid = ({ children }) => {
  return (
    <Box className={styles.productGrid}>
      <Container maxWidth="xl">
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',                    // 1 column on mobile
                sm: 'repeat(2, 1fr)',         // 2 columns on tablet
                md: 'repeat(3, 1fr)',         // 3 columns on desktop
                lg: 'repeat(4, 1fr)',         // 4 columns on laptop+
              },
              gap: 3,
            }}
            className={styles.gridContainer}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductGrid;
