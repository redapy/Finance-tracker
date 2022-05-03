const admin = require("firebase-admin");
const serviceAccount = require("/home/redapy/Downloads/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const deleteTestUser = () => {
    let userid;
    admin.auth()
        .getUserByEmail('test@gmail.com')
        .then((userRecord) => {
            userid = userRecord.toJSON().uid;
            if (userid) {
                admin.auth().deleteUser(userid)
            }
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });
    return null
}

module.exports = { deleteTestUser }