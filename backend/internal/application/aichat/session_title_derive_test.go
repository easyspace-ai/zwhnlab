package aichat

import "testing"

func TestTopicFromFormData_chineseThemeKey(t *testing.T) {
	got := topicFromFormData(map[string]interface{}{
		"关注领域": "",
		"主题":   "当代社会，人为会越来越不幸福",
	})
	if got != "当代社会，人为会越来越不幸福" {
		t.Fatalf("unexpected title: %q", got)
	}
}

func TestTopicFromFormData_firstMeaningfulValue(t *testing.T) {
	got := topicFromFormData(map[string]interface{}{"company_name": "Acme Corp"})
	if got != "Acme Corp" {
		t.Fatalf("unexpected title: %q", got)
	}
}

func TestTitleFromFormAnchor(t *testing.T) {
	anchor := "执行：hot_topic_discovery\n主题: 当代社会，人为会越来越不幸福"
	got := titleFromFormAnchor(anchor)
	if got != "当代社会，人为会越来越不幸福" {
		t.Fatalf("unexpected anchor title: %q", got)
	}
}

func TestDeriveTitleFromConversation_formAnchor(t *testing.T) {
	events := []SessionEvent{
		{
			Type: EventFormSubmitted,
			Body: "执行：hot_topic_discovery\n主题: 当代社会，人为会越来越不幸福",
		},
		{Type: EventRoundStarted, Topic: defaultFormTopic, Kind: string(RoundKindW6Form)},
	}
	got := deriveTitleFromConversation(events, defaultFormTopic)
	if got != "当代社会，人为会越来越不幸福" {
		t.Fatalf("unexpected derived title: %q", got)
	}
}
