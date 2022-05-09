const admin = require("firebase-admin");
const serviceAccount = require("/home/redapy/Downloads/serviceAccountKey.json");
const { getFirestore } = require('firebase-admin/firestore');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = getFirestore()
const deleteTestTransactions = async () => {

    const userRecord = await admin.auth().getUserByEmail('test@gmail.com')
    const userid = userRecord.toJSON().uid

    if (userid) {
        const transactions = await db.collection('transactions').where('uid', '==', userid).get()
        transactions.forEach(doc => {
            doc.ref.delete();
        })
    }

    return null
}

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

module.exports = { deleteTestUser, deleteTestTransactions }