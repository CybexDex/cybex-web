var bitsharesjs = require("../dist");
var Login = bitsharesjs.Login;
var PrivateKey = bitsharesjs.PrivateKey;

var account = "svk-firefox", role = "active", password = "aeroconseil01";

var private_key = PrivateKey.fromSeed(account + role + password);
console.log("svk-firefox pub key", private_key.toPublicKey().toString("TEST"));
