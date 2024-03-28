
// NotificationService.js
import { HubConnectionBuilder } from '@microsoft/signalr';

const hubUrl = 'https://localhost:7217/notificationHub/negotiate'; // Update to the correct negotiation endpoint



const hubConnection = new HubConnectionBuilder()
    .withUrl(hubUrl)
    .build();

const NotificationService = {
    async startConnection() {
        try {
            await hubConnection.start();
            console.log('SignalR connection established.');
        } catch (err) {
            console.error('Error while establishing SignalR connection:', err);
        }
    },

    async stopConnection() {
        try {
            await hubConnection.stop();
            console.log('SignalR connection stopped.');
        } catch (err) {
            console.error('Error while stopping SignalR connection:', err);
        }
    },

    receiveNotification(callback) {
        hubConnection.on('ReceiveNotification', (message) => {
            callback(message);
        });
    }
};

export default NotificationService;
