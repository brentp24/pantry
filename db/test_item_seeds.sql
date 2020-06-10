-- TEST_SEEDS.SQL
USE pantry_db;

INSERT INTO items (itemName, category, shelfLife, clipartURL, createdAt, updatedAt) VALUES ("Asparagus", "Fresh Vegetables", 5, "https://lh3.googleusercontent.com/proxy/7WKKyuhtJEC9qVg0V0IQNKNpA1nfY-jia7Fw9OOD8nsyO5SepfHi_MqsJjFcrBosWpU73JwZe6MbGKevbty6Oo9ZC_w-o9drChj8", "2020-06-03 18:19:12", "2020-06-03 18:19:12");
INSERT INTO items (itemName, category, shelfLife, clipartURL, createdAt, updatedAt) VALUES ("Broccoli", "Fresh Vegetables", 7, "http://clipart-library.com/data_images/335377.png", "2020-06-03 18:19:12", "2020-06-03 18:19:12");
INSERT INTO items (itemName, category, shelfLife, clipartURL, createdAt, updatedAt) VALUES ("Carrots", "Fresh Vegetables", 30, "https://lh3.googleusercontent.com/proxy/TlnYYmt7MXeCsyOLQ3PIDZMZ8bNLKhs2QSt2C_k_NBfUQLiDuiz7bzT0oOumH515D3hkzJh7vxm1PICiiOlOjBUDH50YxfmYOYuyjKoC", "2020-06-03 18:19:12", "2020-06-03 18:19:12");
INSERT INTO items (itemName, category, shelfLife, clipartURL, createdAt, updatedAt) VALUES ("Cauliflower", "Fresh Vegetables", 14, "https://us.123rf.com/450wm/seamartini/seamartini1710/seamartini171000291/88065681-stock-vector-cauliflower-cabbage-vegetable-isolated-sketch.jpg?ver=6", "2020-06-03 18:19:12", "2020-06-03 18:19:12");


INSERT INTO shoppinglists (itemName, itemID, category, clipartURL, userID, createdAt, updatedAt) VALUES ("Carrots", 3, "Fresh Vegetables", "https://lh3.googleusercontent.com/proxy/TlnYYmt7MXeCsyOLQ3PIDZMZ8bNLKhs2QSt2C_k_NBfUQLiDuiz7bzT0oOumH515D3hkzJh7vxm1PICiiOlOjBUDH50YxfmYOYuyjKoC", 1, "2020-06-03 18:19:12", "2020-06-03 18:19:12");
INSERT INTO shoppinglists (itemName, itemID, category, clipartURL, userID, createdAt, updatedAt) VALUES ("Asparagus", 1, "Fresh Vegetables", "https://lh3.googleusercontent.com/proxy/7WKKyuhtJEC9qVg0V0IQNKNpA1nfY-jia7Fw9OOD8nsyO5SepfHi_MqsJjFcrBosWpU73JwZe6MbGKevbty6Oo9ZC_w-o9drChj8", 1, "2020-06-03 18:19:12", "2020-06-03 18:19:12");
INSERT INTO shoppinglists (itemName, itemID, category, clipartURL, userID, createdAt, updatedAt) VALUES ("Asparagus", 1, "Fresh Vegetables", "https://lh3.googleusercontent.com/proxy/7WKKyuhtJEC9qVg0V0IQNKNpA1nfY-jia7Fw9OOD8nsyO5SepfHi_MqsJjFcrBosWpU73JwZe6MbGKevbty6Oo9ZC_w-o9drChj8", 2, "2020-06-03 18:19:12", "2020-06-03 18:19:12");

INSERT INTO pantries (itemName, itemID, category, expirationDate, clipartURL, userID, createdAt, updatedAt) VALUES ("Carrots", 3, "Fresh Vegetables", "2020-06-03 18:19:12", "https://lh3.googleusercontent.com/proxy/TlnYYmt7MXeCsyOLQ3PIDZMZ8bNLKhs2QSt2C_k_NBfUQLiDuiz7bzT0oOumH515D3hkzJh7vxm1PICiiOlOjBUDH50YxfmYOYuyjKoC", 1, "2020-06-03 18:19:12", "2020-06-03 18:19:12");
INSERT INTO pantries (itemName, itemID, category, expirationDate, clipartURL, userID, createdAt, updatedAt) VALUES ("Asparagus", 1, "Fresh Vegetables", "2020-06-03 18:19:12", "https://lh3.googleusercontent.com/proxy/7WKKyuhtJEC9qVg0V0IQNKNpA1nfY-jia7Fw9OOD8nsyO5SepfHi_MqsJjFcrBosWpU73JwZe6MbGKevbty6Oo9ZC_w-o9drChj8", 1, "2020-06-03 18:19:12", "2020-06-03 18:19:12");
