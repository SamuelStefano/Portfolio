/** The overlay carries framer-motion and the whole gallery UI, so it is split out of the
 *  initial bundle. Cards call this on hover/focus to warm the chunk before the click. */
export const loadProjectOverlay = () => import('./ProjectOverlay');
