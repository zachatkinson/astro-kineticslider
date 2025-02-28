import { useEffect, useRef, useCallback } from 'react';
import { Container, Sprite } from 'pixi.js';
import { RGBSplitFilter } from 'pixi-filters';
import { gsap } from 'gsap';
import { type FilterConfig } from '../filters/types';
import { FilterFactory } from '../filters/FilterFactory';
import { type HookParams } from '../types';

// Define a more specific type for the target objects we're applying filters to
type FilterableObject = Sprite | Container;

// Type to represent a map of objects to their applied filters and control functions
interface FilterMap {
    [id: string]: {
        target: FilterableObject;
        filters: {
            instance: any;
            updateIntensity: (intensity: number) => void;
            reset: () => void;
        }[];
    };
}

/**
 * Hook to manage filters for slides and text containers
 */
export const useFilters = (
    { sliderRef, pixi, props }: HookParams
) => {
    // Keep track of applied filters for easy updating
    const filterMapRef = useRef<FilterMap>({});
    const filtersInitializedRef = useRef<boolean>(false);

    // Handle legacy RGB filter props for backward compatibility
    useEffect(() => {
        // Skip if app or stage not ready
        if (!pixi.app.current || !pixi.app.current.stage) {
            console.log("App or stage not available for filters, deferring initialization");
            return;
        }

        // Wait until slides and text containers are created
        if (!pixi.slides.current.length || !pixi.textContainers.current.length) {
            console.log("Waiting for slides and text containers to be available for filters");
            return;
        }

        // Avoid reinitializing filters if already done
        if (filtersInitializedRef.current) {
            console.log("Filters already initialized, skipping");
            return;
        }

        console.log("Setting up filters...");

        try {
            // Convert legacy props to filter configs
            const createLegacyImageFilters = (): FilterConfig[] => {
                const filters: FilterConfig[] = [];

                if (props.imagesRgbEffect) {
                    filters.push({
                        type: 'rgb-split',
                        enabled: true,
                        intensity: props.imagesRgbIntensity || 15
                    });
                }

                return filters;
            };

            const createLegacyTextFilters = (): FilterConfig[] => {
                const filters: FilterConfig[] = [];

                if (props.textsRgbEffect) {
                    filters.push({
                        type: 'rgb-split',
                        enabled: true,
                        intensity: props.textsRgbIntensity || 5
                    });
                }

                return filters;
            };

            // Determine which filter configurations to use
            const imageFilters = props.imageFilters
                ? (Array.isArray(props.imageFilters) ? props.imageFilters : [props.imageFilters])
                : createLegacyImageFilters();

            const textFilters = props.textFilters
                ? (Array.isArray(props.textFilters) ? props.textFilters : [props.textFilters])
                : createLegacyTextFilters();

            console.log(`Applying ${imageFilters.length} image filters and ${textFilters.length} text filters`);

            // Apply filters to slides and text containers
            applyFiltersToObjects(pixi.slides.current, imageFilters as FilterConfig[], 'slide-');
            applyFiltersToObjects(pixi.textContainers.current, textFilters as FilterConfig[], 'text-');

            // Mark as initialized
            filtersInitializedRef.current = true;

            console.log("Filters initialized successfully");
        } catch (error) {
            console.error("Error setting up filters:", error);
        }

        return () => {
            // Clean up all filters
            Object.keys(filterMapRef.current).forEach(key => {
                const entry = filterMapRef.current[key];
                if (entry.target) {
                    entry.target.filters = []; // Set to empty array instead of null
                }
            });
            filterMapRef.current = {};
            filtersInitializedRef.current = false;
            console.log("Filters cleaned up");
        };
    }, [
        pixi.app.current,
        pixi.slides.current,
        pixi.textContainers.current,
        props.imagesRgbEffect,
        props.imagesRgbIntensity,
        props.textsRgbEffect,
        props.textsRgbIntensity,
        props.imageFilters,
        props.textFilters
    ]);

    // Apply the configured filters to an array of objects
    const applyFiltersToObjects = useCallback((
        objects: FilterableObject[],
        filterConfigs: FilterConfig[],
        idPrefix: string
    ) => {
        if (!objects.length) {
            console.warn(`No ${idPrefix} objects available to apply filters`);
            return;
        }

        objects.forEach((object, index) => {
            const id = `${idPrefix}${index}`;
            console.log(`Applying filters to ${id}`);

            // Create filter entries if they don't exist
            if (!filterMapRef.current[id]) {
                filterMapRef.current[id] = {
                    target: object,
                    filters: []
                };
            }

            // Clear existing filters
            filterMapRef.current[id].filters = [];

            // Create the new filters with error handling
            const activeFilters = filterConfigs
                .filter(config => config.enabled)
                .map(config => {
                    try {
                        return FilterFactory.createFilter(config);
                    } catch (error) {
                        console.error(`Failed to create filter:`, error);
                        return null;
                    }
                })
                .filter((result): result is NonNullable<typeof result> => result !== null);

            // Store the filter data and assign to the object
            filterMapRef.current[id].filters = activeFilters.map(result => ({
                instance: result.filter,
                updateIntensity: result.updateIntensity,
                reset: result.reset
            }));

            // Apply base displacement filter if it exists
            const baseFilters = [];
            if (pixi.bgDispFilter.current) {
                baseFilters.push(pixi.bgDispFilter.current);
            }

            // Apply cursor displacement filter if enabled
            if (props.cursorImgEffect && pixi.cursorDispFilter.current && idPrefix === 'slide-') {
                baseFilters.push(pixi.cursorDispFilter.current);
            }

            // Add the custom filters
            const customFilters = activeFilters.map(result => result.filter);

            // Set the combined filters on the object
            object.filters = [...baseFilters, ...customFilters];

            console.log(`Applied ${customFilters.length} custom filters to ${id}`);
        });
    }, [pixi, props.cursorImgEffect]);

    // Update filter intensities for hover effects
    const updateFilterIntensities = useCallback((active: boolean) => {
        // Skip if filters haven't been initialized yet
        if (!filtersInitializedRef.current) {
            console.log("Filters not initialized yet, skipping intensity update");
            return;
        }

        console.log(`${active ? 'Activating' : 'Deactivating'} filter intensities`);

        const currentSlideId = `slide-${pixi.currentIndex.current}`;
        const currentTextId = `text-${pixi.currentIndex.current}`;

        // Update slide filters
        if (filterMapRef.current[currentSlideId]) {
            filterMapRef.current[currentSlideId].filters.forEach(filter => {
                try {
                    if (active) {
                        if (filter.instance instanceof RGBSplitFilter) {
                            // For legacy support, directly modify RGB filter
                            gsap.killTweensOf(filter.instance.red);
                            gsap.killTweensOf(filter.instance.blue);

                            // For RGB split filter, set x value to positive intensity for red, negative for blue
                            const intensity = props.imagesRgbIntensity || 15;
                            gsap.set(filter.instance.red, { x: intensity });
                            gsap.set(filter.instance.blue, { x: -intensity });
                        } else {
                            // For other filters use the update function
                            filter.updateIntensity(props.imagesRgbIntensity || 15);
                        }
                    } else {
                        if (filter.instance instanceof RGBSplitFilter) {
                            // Legacy RGB support
                            gsap.to(filter.instance.red, { x: 0, duration: 0.5, ease: "power2.out" });
                            gsap.to(filter.instance.blue, { x: 0, duration: 0.5, ease: "power2.out" });
                        } else {
                            filter.reset();
                        }
                    }
                } catch (error) {
                    console.error("Error updating slide filter intensity:", error);
                }
            });
        }

        // Update text filters
        if (filterMapRef.current[currentTextId]) {
            filterMapRef.current[currentTextId].filters.forEach(filter => {
                try {
                    if (active) {
                        if (filter.instance instanceof RGBSplitFilter) {
                            // Legacy RGB text support
                            gsap.killTweensOf(filter.instance.red);
                            gsap.killTweensOf(filter.instance.blue);

                            // For RGB split filter, set x value to positive intensity for red, negative for blue
                            const intensity = props.textsRgbIntensity || 5;
                            gsap.set(filter.instance.red, { x: intensity });
                            gsap.set(filter.instance.blue, { x: -intensity });
                        } else {
                            filter.updateIntensity(props.textsRgbIntensity || 5);
                        }
                    } else {
                        if (filter.instance instanceof RGBSplitFilter) {
                            gsap.to(filter.instance.red, { x: 0, duration: 0.5, ease: "power2.out" });
                            gsap.to(filter.instance.blue, { x: 0, duration: 0.5, ease: "power2.out" });
                        } else {
                            filter.reset();
                        }
                    }
                } catch (error) {
                    console.error("Error updating text filter intensity:", error);
                }
            });
        }
    }, [pixi.currentIndex, props.imagesRgbIntensity, props.textsRgbIntensity]);

    return {
        updateFilterIntensities,
        isInitialized: filtersInitializedRef.current
    };
};