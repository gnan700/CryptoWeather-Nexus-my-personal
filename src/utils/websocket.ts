import { store } from "@/store/store";
import {
  updateCryptoPrice,
  updateWebSocketStatus,
} from "@/store/slices/cryptoSlice";

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 3000;

  connect() {
    try {
      this.ws = new WebSocket(
        "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano"
      );

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        store.dispatch(updateWebSocketStatus(true));
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        Object.entries(data).forEach(([id, price]) => {
          store.dispatch(updateCryptoPrice({ id, price: Number(price) }));
        });
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        store.dispatch(updateWebSocketStatus(false));
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        store.dispatch(updateWebSocketStatus(false));
      };
    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
      );
      setTimeout(() => this.connect(), this.reconnectTimeout);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      store.dispatch(updateWebSocketStatus(false));
    }
  }
}

export const websocketService = new WebSocketService();
