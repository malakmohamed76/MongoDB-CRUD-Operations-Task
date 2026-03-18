/*
Perform a series of MongoDB operations using Node.js
 async functions and MongoDB methods such as insertOne,
  insertMany, find, findOne, limit, countDocuments, updateOne,
 updateMany, and deleteMany. Display the results in the console.
*/
const {MongoClient, ObjectId }=require("mongodb")
const URL="mongodb://localhost:27017"
const client =new MongoClient(URL)
const dbName="task"
async function User(){
    try{
        await client.connect()
        console.log("connected TO DB SUCCESSUFLY")
        const db=client.db(dbName)
        const users=db.collection("users")
        const result=await users.insertOne({
            name:"malak",
            age:20,
            city:"assuit",

        })
        console.log("insted documents ID:", result.insertedId)
        console.log("=======================AddUsers===================")
        await AddUsers(users)
           console.log("====================add Many Users===============")
        await addManyUsers(users)
            console.log("==================find Users===================")
        await findUsers(users)
            console.log("=================limited User=================")
        await limitedUser(users)
            console.log("==================find User By ID=============")
        await findUserByID(users, "69b9a6b16e440c5d9907859a")
            console.log("==================countt users===============")
        await countUser(users)
            console.log("=================update one users=============")
         await updateOneUser(users, "69b9a6b16e440c5d99078599")
             console.log("================update Mny users=============")
         await updateManyUser(users)
             console.log("===============delete one users===============")
         await deleteOneUser(users, "69b9a9a444655e82404825c9")
            console.log("=============delete Many Users=================")
         await deletedManyusers(users)
             console.log("===============================================")
    }catch(err){
        console.log(err)
    }
}
User();

//////////////1- Use insertOne to add 2 user documents to a collection.
 ///Each document should contain name, age, and city,
 /// and display the insertedId in the console.////////

async function AddUsers(users){
    const res1=await users.insertOne({
        name:"malak",
        age:20,
        city:"assuit"
    })
    const res2=await users.insertOne({
        name:"mohamed",
        age:22,
        city:"mansoura"
    })
    console.log("inserted ID 1 :" ,res1.insertedId)
    console.log("inserted ID 2:", res2.insertedId)
}

//////2- Use insertMany to add at least 10 users to the same collection, 
///ensuring that 5 of them have an age field set to 27. Display the number of inserted documents.
//////
async function addManyUsers(users){
    const result=await users.insertMany([
        {name:"moka", age:27, city:"assuit"},
        {name:"mostafa", age:27, city:"aswan"},
        {name:"safy", age:27, city:"alex"},
        {name:"mona", age:27, city:"cairo"},
        {name:"naaomy", age:27, city:"monifya"},
        {name:"ahmmed", age:30, city:"mansoura"},
        {name:"eslam", age:31, city:"louxour"},
        {name:"ashraf", age:32, city:"aswan"},
        {name:"mohsen", age:33, city:"sohag"},
        {name:"mohamed", age:34, city:"aswan"},


    ])
    console.log("inserted documents :", result.insertedCount)
}

////3- Use find to display all documents where the age is 27.

async function findUsers(users){
    const data= await users.find({age:27}).toArray()
    console.log("users age 27: ", data)
}
//4- Use limit to display only the first 3 documents where the age is 27.
async function limitedUser(users){
    const data =await users.find({age:27}).limit(3).toArray()
    console.log("limited users:", data)
}
///5- Use findOne to search for a user using the _id and display the user data if found.
async function findUserByID(users, id){
    const user =await users.findOne({_id:new ObjectId(id)})
    if(user){
        console.log("found user :", user)
    }else{
        console.log("user not found")
    }
}
///6- Use countDocuments to count how many users have age = 27 and display the result.
async function countUser(users){
    const count =await users.countDocuments({age:27})
    console.log("users with age 27 :", count)
}
///7- Use updateOne with $set to update the name of a specific user 
// and $inc to increase the age of that user. Display the number of modified documents.
async function updateOneUser(users, id){
    const result=await users.updateOne(
        {_id: new ObjectId(id)},
        {
            $set:{name:"marwan"},
            $inc:{age:5}
        }
    )
    console.log("modifoed:", result.modifiedCount)
}
///8- Use updateMany with $inc to increase the age of all users by 5 years.
async function updateManyUser(users){
    const result=await users.updateMany(
        {},
        {$inc:{age:5}}
    )
    console.log("modified documents:", result.modifiedCount)
}
//9- Use deleteOne to delete a user using the _id and display the number of deleted documents.
async function deleteOneUser(users, id){
    const result=await users.deleteOne({
        _id:new ObjectId(id)
    })
    console.log("deleted doc :", result.deletedCount)
}
///10- Use deleteMany to delete all users that match a specific condition 
// (for example: users with a certain age) and display the number of deleted documents using deletedCount.
async function deletedManyusers(users){
    const result=await users.deleteMany({
        age:{$gt:30}
        })
        console.log("deleted docs:",result.deletedCount)
}
