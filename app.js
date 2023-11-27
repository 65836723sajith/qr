const { create, Client } = require('@open-wa/wa-automate');

create().then(client => start(client));

function start(client) {
  client.onStateChanged(state => {
    console.log('State Changed:', state);
    if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus();
  });

  client.onMessage(message => {
    console.log('New Message:', message.body);
  });

  client.onAddedToGroup(chatEvent => {
    console.log('Added to group:', chatEvent.chat);
  });

  client.onIncomingCall(call => {
    client.sendText(call.peerJid, 'Sorry, I cannot receive calls.');
  });

  client.onQrCode(qrCode => {
    // Handle QR code data, for instance, display it in an HTML div
    console.log('QR Code:', qrCode);
    // Use this QR code data to generate an image or display it in an HTML element
    // For example:
    // document.getElementById('qrCodeDiv').src = qrCode;
  });

  client.initialize();
}
