//create a function and add a new user to the database
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function addUser(name, email, password) {
  try {
    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    return user;
  } catch (err) {
    // Handle Prisma unique constraint error
    if (err.code === 'P2002') {
      throw new Error('Email must be unique.');
    }
    throw err;
  }
}
addUser("Tushya", "tushygupyta@mial.com", "123")
.then((data) => {
  console.log(data);
})
.catch((err) => {
  console.error(err);
});

async function addTweet(content, userId){
    await prisma.tweet.create({
        data: {
            content: content,
            userId: userId,
        }
    }); 
}


addTweet("Hello World!", 1)
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.error(err);
});

async function getUserWithTweets(userId) {
    const userWithTweets = await prisma.user.findUnique({
        where: { id: userId },
        include: { tweet: true },
    });
    return userWithTweets;
}


getUserWithTweets(1)
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.error(err);
});

async function getAllUsers() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
} 
getAllUsers()
.then((data) => {
    console.log(data);
})  
.catch((err) => {
    console.error(err);
});

async function getAllTweets() {
    const allTweets = await prisma.tweet.findMany();
    return allTweets;
}
getAllTweets()
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.error(err);
});
async function updateUserEmail(userId, newEmail) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { email: newEmail },
        });
        return updatedUser;
    } catch (err) {
        throw err;
    }
}
async function updateTweetContent(tweetId, newContent) {
    try {
        const updatedTweet = await prisma.tweet.update({
            where: { id: tweetId },
            data: { content: newContent },
        });
        return updatedTweet;
    } catch (err) {
        throw err;
    }
}
//create a function to delete a user by id
async function deleteUser(userId) {
  await prisma.user.delete({
      where: { id: userId },
  });
  return { message: 'User deleted successfully' };
}

deleteUser(1)
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.error(err);
});
//create a function to delete a tweet by id
async function deleteTweet(tweetId) {
    try {
        const deletedTweet = await prisma.tweet.delete({
            where: { id: tweetId },
        });
        return deletedTweet;
    } catch (err) {
        throw err;
    }
}

