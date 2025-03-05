const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server berjalan!');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
