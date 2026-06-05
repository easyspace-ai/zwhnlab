package xstream

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestFetchStreamGroups(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			t.Errorf("method = %s, want GET", r.Method)
		}
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"errcode":0,"errmsg":null,"data":[{"id":13,"type":"重点国家"},{"id":15,"type":"自然灾害"}]}`))
	}))
	defer srv.Close()

	t.Setenv("XSTREAM_GROUP_API_URL", srv.URL)

	groups, err := FetchStreamGroups(context.Background(), srv.Client())
	if err != nil {
		t.Fatalf("FetchStreamGroups() error = %v", err)
	}
	if len(groups) != 2 {
		t.Fatalf("len(groups) = %d, want 2", len(groups))
	}
	if groups[0].Type != "重点国家" || groups[1].Type != "自然灾害" {
		t.Fatalf("unexpected groups: %+v", groups)
	}
}

func TestFetchStreamGroupsAPIError(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"errcode":1,"errmsg":"upstream failed","data":null}`))
	}))
	defer srv.Close()

	t.Setenv("XSTREAM_GROUP_API_URL", srv.URL)

	_, err := FetchStreamGroups(context.Background(), srv.Client())
	if err == nil {
		t.Fatal("expected error for non-zero errcode")
	}
}
