package render

import "testing"

func TestNormalizeReportStyle(t *testing.T) {
	if got := NormalizeReportStyle("MAGAZINE"); got != StyleMagazine {
		t.Fatalf("got %q", got)
	}
	if got := NormalizeReportStyle(""); got != StyleAuto {
		t.Fatalf("got %q", got)
	}
}

func TestResolveVisualTheme(t *testing.T) {
	md := "plain text without numbers"
	if got := ResolveVisualTheme(StyleMagazine, md); got != StyleMagazine {
		t.Fatalf("magazine: %q", got)
	}
	if got := ResolveVisualTheme(StyleSwiss, md); got != StyleSwiss {
		t.Fatalf("swiss: %q", got)
	}
	if got := ResolveVisualTheme(StyleAuto, md); got != StyleMagazine {
		t.Fatalf("auto editorial: %q", got)
	}
	dataHeavy := "2024 | 2025 | 30% | 40% | 50% | 60% | 70% | 80%"
	if got := ResolveVisualTheme(StyleAuto, dataHeavy); got != StyleSwiss {
		t.Fatalf("auto data-heavy: %q", got)
	}
}
