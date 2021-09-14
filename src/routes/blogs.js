const { Router } = require("express")
const { guest, auth } = require("../middleware/auth")
const { catchAsync } = require("../middleware/errors")
const { Blog } = require("../models/blog")
const { User } = require("../models/user")
const { Unauthorized, BadRequest } = require("../errors/index")
const { RESPONSE_STATUS_OK, RESPONSE_STATUS_ERROR } = require("../config/constants")

const router = Router()

router.post('/blogs', auth, catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id)

    //await validate(loginSchema, req.body)
    const { category, title, headline, content, image } = req.body

    // TODO how to add the image and the comment list.

    // create new user and save it inside the DB
    const blog = await Blog.create({
        userId: user._id,
        category,
        title,
        headline,
        content,
        image,
        likes: 0
    })

    console.log("NEW BLOG: ", blog);

    // respond with the two tokens
    res.json({ message: RESPONSE_STATUS_OK })

    res.end()

    return true
}))

module.exports = {
    router
}