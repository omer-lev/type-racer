const randomWords = require('random-words');

const setupRoom = async (req, res) => {
    const text = await randomWords({ exactly: 40, maxLength: 5 });

    res.json({
        roomReady: true,
        text: text
    });
};

module.exports = { setupRoom };