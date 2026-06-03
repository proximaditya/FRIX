package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

// The AI's response format
type AIResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

// EvaluateArgument sends the user's text to Groq Llama-3
func EvaluateArgument(room *Room, msg DebateMessage) {
	apiKey := os.Getenv("GROQ_API_KEY")
	if apiKey == "" {
		log.Println("Error: GROQ_API_KEY is missing from .env")
		return
	}

	// 1. Build the AI Prompt
	prompt := fmt.Sprintf(`You are the AI Umpire of FRIX. %s (Team %s) argued: '%s'. 
	Judge their logic. Award a score from -10 to +10. 
	You MUST reply with ONLY a valid JSON object in this exact format:
	{"score": <number>, "comment": "<your short punchy comment>"}`, msg.UserID, msg.Team, msg.Text)

	requestBody, _ := json.Marshal(map[string]interface{}{
		"model":           "llama-3.1-8b-instant",
		"response_format": map[string]string{"type": "json_object"}, // 🔥 FORCES AI TO RETURN JSON
		"messages": []map[string]string{
			{"role": "system", "content": "You are a highly intelligent, sarcastic debate judge. Always output valid JSON."},
			{"role": "user", "content": prompt},
		},
	})

	// 2. Make the HTTP Request to Groq
	req, _ := http.NewRequest("POST", "https://api.groq.com/openai/v1/chat/completions", bytes.NewBuffer(requestBody))
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Failed to call Groq:", err)
		return
	}
	defer resp.Body.Close()

	// 3. Parse the AI's answer
	body, _ := io.ReadAll(resp.Body)
	log.Println("Groq Raw Response:", string(body))
	var aiResp AIResponse
	json.Unmarshal(body, &aiResp)

	if len(aiResp.Choices) > 0 {
		verdict := aiResp.Choices[0].Message.Content

		// 4. Create a new message from the "AI Umpire"
		aiMessage := DebateMessage{
			UserID: "FRIX_UMPIRE",
			Team:   "AI",
			Text:   verdict,
		}

		// 5. Broadcast the AI's verdict to the room!
		aiBytes, _ := json.Marshal(aiMessage)
		room.Broadcast <- aiBytes
		log.Println("[FRIX_UMPIRE]:", verdict)
	}
}
