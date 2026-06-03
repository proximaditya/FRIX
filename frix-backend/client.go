package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// 🔥 NEW: This defines the exact structure of a Debate Message
type DebateMessage struct {
	UserID string `json:"user_id"`
	Team   string `json:"team"`
	Text   string `json:"text"`
}

type Client struct {
	Room *Room
	Conn *websocket.Conn
	Send chan []byte
}

func (c *Client) ReadPump() {
	defer func() {
		c.Room.Unregister <- c
		c.Conn.Close()
	}()
	for {
		// Read the raw message from the user
		_, message, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		// 🔥 NEW: Parse (Unmarshal) the JSON to make sure it's a valid debate message
		var parsedMsg DebateMessage
		err = json.Unmarshal(message, &parsedMsg)
		if err != nil {
			log.Println("Invalid JSON received, ignoring...")
			continue // Skip this message if it's not proper JSON
		}

		// Log it on the server so you can see who sent what!
		log.Printf("[%s - Team %s]: %s\n", parsedMsg.UserID, parsedMsg.Team, parsedMsg.Text)

		// Broadcast the valid JSON message to the room
		c.Room.Broadcast <- message
		go EvaluateArgument(c.Room, parsedMsg)
	}
}

func (c *Client) WritePump() {
	defer c.Conn.Close()
	for {
		select {
		case message, ok := <-c.Send:
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			c.Conn.WriteMessage(websocket.TextMessage, message)
		}
	}
}
