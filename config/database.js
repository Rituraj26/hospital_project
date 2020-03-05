if (process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI:
            "mongodb+srv://Rituraj:mongoAtlasPassword265@cluster0-8izec.mongodb.net/test?retryWrites=true&w=majority"
    };
} else {
    module.exports = { mongoURI: "mongodb://localhost/medical" };
}
