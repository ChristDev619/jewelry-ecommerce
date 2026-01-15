import { useState } from 'react';
import {
  Box,
  Container,
  Button,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
  Typography,
  Divider,
  Select,
  FormControl,
} from '@mui/material';
import { FaChevronDown } from 'react-icons/fa';
import { FiTruck } from 'react-icons/fi';
import FilterChip from '../../common/FilterChip';
import { METAL_TYPES, STYLES, BIRTHSTONE_MONTHS, PRICE_RANGES, SORT_OPTIONS } from '../../../../shared/constants/jewelry.constants';
import { calculateDeliveryDate } from '../../../../shared/utils/date.utils';
import useStore from '../../../store/store';
import styles from './FilterBar.module.css';

/**
 * FilterBar Component
 * Main filtering interface with dropdowns and active filters
 */
const FilterBar = ({ resultCount, maxDeliveryDays }) => {
  const {
    filters,
    sortBy,
    showDeliveryDate,
    addMetalFilter,
    removeMetalFilter,
    addStyleFilter,
    removeStyleFilter,
    setPriceRangeFilter,
    addBirthstoneMonthFilter,
    removeBirthstoneMonthFilter,
    clearAllFilters,
    setSortBy,
    toggleDeliveryDate,
  } = useStore();

  // Menu anchors
  const [metalAnchor, setMetalAnchor] = useState(null);
  const [styleAnchor, setStyleAnchor] = useState(null);
  const [priceAnchor, setPriceAnchor] = useState(null);
  const [birthstoneAnchor, setBirthstoneAnchor] = useState(null);

  // Get active filter count
  const activeFilterCount = 
    filters.metals.length + 
    filters.styles.length + 
    (filters.priceRange ? 1 : 0) + 
    filters.birthstoneMonths.length;

  const handleMetalToggle = (metalKey) => {
    if (filters.metals.includes(metalKey)) {
      removeMetalFilter(metalKey);
    } else {
      addMetalFilter(metalKey);
    }
  };

  const handleStyleToggle = (styleKey) => {
    if (filters.styles.includes(styleKey)) {
      removeStyleFilter(styleKey);
    } else {
      addStyleFilter(styleKey);
    }
  };

  const handlePriceRangeSelect = (range) => {
    setPriceRangeFilter(range);
    setPriceAnchor(null);
  };

  const handleBirthstoneToggle = (monthKey) => {
    if (filters.birthstoneMonths.includes(monthKey)) {
      removeBirthstoneMonthFilter(monthKey);
    } else {
      addBirthstoneMonthFilter(monthKey);
    }
  };

  const getFilterLabel = (type, key) => {
    switch (type) {
      case 'metal':
        return METAL_TYPES[key];
      case 'style':
        return STYLES[key];
      case 'birthstone':
        return BIRTHSTONE_MONTHS[key];
      default:
        return key;
    }
  };

  return (
    <Box className={styles.filterBar}>
      <Container maxWidth="xl">
        {/* Main Filter Bar */}
        <Box className={styles.mainFilterRow}>
          <Typography className={styles.filterLabel}>
            Filter By:
          </Typography>

          {/* Style Filter */}
          <Button
            onClick={(e) => setStyleAnchor(e.currentTarget)}
            endIcon={<FaChevronDown size={12} />}
            className={styles.filterButton}
          >
            Style
          </Button>
          <Menu
            anchorEl={styleAnchor}
            open={Boolean(styleAnchor)}
            onClose={() => setStyleAnchor(null)}
          >
            <Box className={styles.menuContent}>
              <FormGroup>
                {Object.entries(STYLES).map(([key, label]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={filters.styles.includes(key)}
                        onChange={() => handleStyleToggle(key)}
                      />
                    }
                    label={label}
                  />
                ))}
              </FormGroup>
            </Box>
          </Menu>

          {/* Metal Filter */}
          <Button
            onClick={(e) => setMetalAnchor(e.currentTarget)}
            endIcon={<FaChevronDown size={12} />}
            className={styles.filterButton}
          >
            Metal
          </Button>
          <Menu
            anchorEl={metalAnchor}
            open={Boolean(metalAnchor)}
            onClose={() => setMetalAnchor(null)}
          >
            <Box className={styles.menuContent}>
              <FormGroup>
                {Object.entries(METAL_TYPES).map(([key, label]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={filters.metals.includes(key)}
                        onChange={() => handleMetalToggle(key)}
                      />
                    }
                    label={label}
                  />
                ))}
              </FormGroup>
            </Box>
          </Menu>

          {/* Price Filter */}
          <Button
            onClick={(e) => setPriceAnchor(e.currentTarget)}
            endIcon={<FaChevronDown size={12} />}
            className={styles.filterButton}
          >
            Price
          </Button>
          <Menu
            anchorEl={priceAnchor}
            open={Boolean(priceAnchor)}
            onClose={() => setPriceAnchor(null)}
          >
            <Box className={styles.menuContent}>
              {PRICE_RANGES.map((range) => (
                <MenuItem
                  key={range.id}
                  onClick={() => handlePriceRangeSelect(range)}
                  selected={filters.priceRange?.id === range.id}
                >
                  {range.label}
                </MenuItem>
              ))}
            </Box>
          </Menu>

          {/* Birthstone Month Filter */}
          <Button
            onClick={(e) => setBirthstoneAnchor(e.currentTarget)}
            endIcon={<FaChevronDown size={12} />}
            className={styles.filterButton}
          >
            Birthstone Month
          </Button>
          <Menu
            anchorEl={birthstoneAnchor}
            open={Boolean(birthstoneAnchor)}
            onClose={() => setBirthstoneAnchor(null)}
          >
            <Box className={styles.menuContentLarge}>
              <FormGroup>
                {Object.entries(BIRTHSTONE_MONTHS).map(([key, label]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={filters.birthstoneMonths.includes(key)}
                        onChange={() => handleBirthstoneToggle(key)}
                      />
                    }
                    label={label}
                  />
                ))}
              </FormGroup>
            </Box>
          </Menu>

          {/* More Filters Button */}
          <Button
            endIcon={<FaChevronDown size={12} />}
            className={styles.filterButton}
          >
            More Filters +
          </Button>

          {/* Spacer */}
          <Box className={styles.spacer} />

          {/* Delivery Date Toggle */}
          <Box className={styles.deliveryToggle}>
            <FiTruck className={styles.deliveryIcon} />
            <Typography className={styles.deliveryText}>
              Get delivered by: {calculateDeliveryDate(maxDeliveryDays || 7)}
            </Typography>
            <Switch checked={showDeliveryDate} onChange={toggleDeliveryDate} />
          </Box>
        </Box>

        <Divider />

        {/* Active Filters & Sort */}
        <Box className={styles.activeFiltersRow}>
          {/* Active Filter Chips */}
          <Box className={styles.chipsContainer}>
            {filters.metals.length > 0 &&
              filters.metals.map((metal) => (
                <FilterChip
                  key={metal}
                  label={getFilterLabel('metal', metal)}
                  onDelete={() => removeMetalFilter(metal)}
                />
              ))}

            {filters.styles.length > 0 &&
              filters.styles.map((style) => (
                <FilterChip
                  key={style}
                  label={getFilterLabel('style', style)}
                  onDelete={() => removeStyleFilter(style)}
                />
              ))}

            {filters.priceRange && (
              <FilterChip
                label={filters.priceRange.label}
                onDelete={() => setPriceRangeFilter(null)}
              />
            )}

            {filters.birthstoneMonths.length > 0 &&
              filters.birthstoneMonths.map((month) => (
                <FilterChip
                  key={month}
                  label={getFilterLabel('birthstone', month)}
                  onDelete={() => removeBirthstoneMonthFilter(month)}
                />
              ))}

            {activeFilterCount > 0 && (
              <Button
                onClick={clearAllFilters}
                className={styles.clearAllButton}
              >
                Clear All
              </Button>
            )}
          </Box>

          {/* Result Count */}
          <Typography className={styles.resultsCount}>
            Showing {resultCount} Rings
          </Typography>

          {/* Sort Dropdown */}
          <Box className={styles.sortSection}>
            <Typography className={styles.sortLabel}>
              Sort By:
            </Typography>
            <FormControl size="small" className={styles.sortSelect}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FilterBar;

