const BREAKPOINTS = {
	mobileMax: 425,
	mobileMin: 320,
	tabletMax: 768,
	tabletMin: 426,
	desktopMin: 769,
};

export const DEVICE = {
	mobile: `(max-width: ${BREAKPOINTS.mobileMax}px) and (min-width: ${BREAKPOINTS.mobileMin}px)`,
	tablet: `(max-width: ${BREAKPOINTS.tabletMax}px) and (min-width: ${BREAKPOINTS.tabletMin}px)`,
	desktop: `(min-width: ${BREAKPOINTS.desktopMin}px)`,
};
