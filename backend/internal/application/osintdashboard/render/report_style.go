package render

import "strings"

// Valid user-facing report visual styles (single-page vertical scroll).
const (
	StyleMagazine = "magazine"
	StyleSwiss    = "swiss"
	StyleAuto     = "auto"
)

// NormalizeReportStyle coerces client input to magazine | swiss | auto.
func NormalizeReportStyle(style string) string {
	switch strings.ToLower(strings.TrimSpace(style)) {
	case StyleMagazine, StyleSwiss:
		return strings.ToLower(strings.TrimSpace(style))
	default:
		return StyleAuto
	}
}

// ResolveVisualTheme picks the HTML data-theme value.
func ResolveVisualTheme(style, markdown string) string {
	switch NormalizeReportStyle(style) {
	case StyleMagazine:
		return StyleMagazine
	case StyleSwiss:
		return StyleSwiss
	default:
		return pickVisualTheme(markdown)
	}
}
