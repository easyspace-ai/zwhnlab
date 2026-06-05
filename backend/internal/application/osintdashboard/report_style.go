package osintdashboard

import "github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/render"

// NormalizeReportStyle coerces client report_style to magazine | swiss | auto.
func NormalizeReportStyle(style string) string {
	return render.NormalizeReportStyle(style)
}
