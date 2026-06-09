package http

import "testing"

func TestAichatLongPollPath(t *testing.T) {
	cases := []struct {
		path string
		want bool
	}{
		{"/api/aichat/sessions/abc/timeline", true},
		{"/api/aichat/sessions/abc/stream", true},
		{"/api/aichat/sessions/abc/summary", false},
		{"/api/aichat/sessions/abc/reports", false},
		{"/api/projects", false},
	}
	for _, tc := range cases {
		if got := aichatLongPollPath(tc.path); got != tc.want {
			t.Fatalf("aichatLongPollPath(%q) = %v, want %v", tc.path, got, tc.want)
		}
	}
}

func TestArtifactReadPath(t *testing.T) {
	cases := []struct {
		path string
		want bool
	}{
		{"/api/artifacts/res-1/preview", true},
		{"/api/artifacts/res-1/download", true},
		{"/api/artifacts/res-1", false},
		{"/api/projects/1/artifacts", false},
	}
	for _, tc := range cases {
		if got := artifactReadPath(tc.path); got != tc.want {
			t.Fatalf("artifactReadPath(%q) = %v, want %v", tc.path, got, tc.want)
		}
	}
}
