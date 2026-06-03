// room.go
package main

import "fmt"

type Room struct {
	ID         string
	Clients    map[*Client]bool
	Broadcast  chan []byte
	Register   chan *Client
	Unregister chan *Client
}

func NewRoom(id string) *Room {
	return &Room{
		ID:         id,
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan []byte),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
	}
}

// Run starts the room's event loop
func (r *Room) Run() {
	for {
		select {
		case client := <-r.Register:
			r.Clients[client] = true
			fmt.Printf("New user joined Room: %s. Total users: %d\n", r.ID, len(r.Clients))
		case client := <-r.Unregister:
			if _, ok := r.Clients[client]; ok {
				delete(r.Clients, client)
				close(client.Send)
				fmt.Printf("User left Room: %s. Total users: %d\n", r.ID, len(r.Clients))
			}
		case message := <-r.Broadcast:
			// Send the message to every client in this specific room
			for client := range r.Clients {
				select {
				case client.Send <- message:
				default:
					close(client.Send)
					delete(r.Clients, client)
				}
			}
		}
	}
}