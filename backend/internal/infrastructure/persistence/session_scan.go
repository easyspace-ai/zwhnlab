package persistence

// ListW6MonitorCandidateIDs returns session IDs that may have an in-flight W6 round.
func (r *SessionRepository) ListW6MonitorCandidateIDs(limit int) ([]string, error) {
	if limit <= 0 {
		limit = 200
	}
	var ids []string
	err := r.db.Model(&SessionModel{}).
		Where("conversation_events IS NOT NULL AND conversation_events != '' AND conversation_events != '{}'").
		Where("(workflow_state LIKE ? OR conversation_events LIKE ?)",
			`%"sub_agent_status":"running"%`,
			`%"status":"running"%`,
		).
		Order("updated_at DESC").
		Limit(limit).
		Pluck("id", &ids).Error
	return ids, err
}

// ListLLMMonitorCandidateIDs returns session IDs that may have an unsealed LLM round.
func (r *SessionRepository) ListLLMMonitorCandidateIDs(limit int) ([]string, error) {
	if limit <= 0 {
		limit = 200
	}
	var ids []string
	err := r.db.Model(&SessionModel{}).
		Where("conversation_events IS NOT NULL AND conversation_events != '' AND conversation_events != '{}'").
		Where(`conversation_events LIKE '%"active_round_id":"%'`).
		Where(`conversation_events NOT LIKE '%"active_round_id":""%'`).
		Where("(conversation_events LIKE ? OR conversation_events LIKE ?)",
			`%"kind":"deepseek"%`,
			`%"kind":"discuss"%`,
		).
		Order("updated_at DESC").
		Limit(limit).
		Pluck("id", &ids).Error
	return ids, err
}
