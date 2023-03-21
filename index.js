const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, Buttons, List } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

const showMenu = (chat) => {
  chat.sendMessage(`Hello Sir
Welcome to *MedMelgo*
Your One Stop Solution for Medicines

In Menu Choose Option You Want to Proceed With:

*1. Upload Prescription*
*2. Place a Custom Order*
*3. Talk to a Pharma Expert*
*4. Talk to Support*

Reply with *0* to return to the main menu.`);
};

client.on("message", async (msg) => {
  if (msg.body.toLowerCase().includes("hi")) {
    const chat = await msg.getChat();
    showMenu(chat);
  } else {
    const chat = await msg.getChat();
    switch (msg.body.trim()) {
      case "0":
        showMenu(chat);
        break;
      case "1":
        chat.sendMessage(
          "Please upload your prescription and our team will process it shortly.\n\nReply with *0* to return to the main menu."
        );
        break;
      case "2":
        chat.sendMessage(
          "Please provide details of your custom order, and our team will get back to you.\n\nReply with *0* to return to the main menu."
        );
        break;
      case "3":
        chat.sendMessage(
          "Connecting you to a Pharma Expert, please wait...\n\nReply with *0* to return to the main menu."
        );
        break;
      case "4":
        chat.sendMessage(
          "Connecting you to Support, please wait...\n\nReply with *0* to return to the main menu."
        );
        break;
      default:
        chat.sendMessage(
          "Sorry, I didn't understand your input. Please choose an option from the menu (1, 2, 3, or 4) or reply with *0* to return to the main menu."
        );
        break;
    }
  }
});

client.initialize();
