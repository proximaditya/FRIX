// main.go
package main

import (
	"log"
	"net/http"
	"sync"

	"github.com/joho/godotenv"
)

var (
	// Store all active rooms. Thread-safe using a Mutex.
	roomsMutex sync.Mutex
	rooms      = make(map[string]*Room)
)

func serveWs(w http.ResponseWriter, r *http.Request) {
	// 1. Get Room ID from URL query (e.g., ws://localhost:8080/ws?room=tech-debate)
	roomID := r.URL.Query().Get("room")
	if roomID == "" {
		http.Error(w, "Room ID is required", http.StatusBadRequest)
		return
	}

	// 2. Upgrade HTTP connection to WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	// 3. Find or Create the Room
	roomsMutex.Lock()
	room, exists := rooms[roomID]
	if !exists {
		room = NewRoom(roomID)
		rooms[roomID] = room
		go room.Run() // Start the room's event loop in a new Go routine
		log.Printf("Created new room: %s", roomID)
	}
	roomsMutex.Unlock()

	// 4. Create the Client and register them to the Room
	client := &Client{Room: room, Conn: conn, Send: make(chan []byte, 256)}
	client.Room.Register <- client

	// 5. Start reading and writing in separate Goroutines (Handling concurrency!)
	go client.WritePump()
	go client.ReadPump()
}

func main() {
	godotenv.Load()
	http.HandleFunc("/ws", serveWs)

	log.Println("🔥 FRIX Engine started on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
