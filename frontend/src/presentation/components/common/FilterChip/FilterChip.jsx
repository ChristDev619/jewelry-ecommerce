import { Chip } from '@mui/material';
import { motion } from 'framer-motion';
import styles from './FilterChip.module.css';

/**
 * FilterChip Component
 * Reusable chip component for active filters
 */
const FilterChip = ({ label, onDelete, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <Chip
        label={label}
        onDelete={onDelete}
        className={styles.filterChip}
        {...props}
      />
    </motion.div>
  );
};

export default FilterChip;
