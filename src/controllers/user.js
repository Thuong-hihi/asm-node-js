import User from "../models/user";
import Joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signupSchema = Joi.object({
    lastname: Joi.string().required().min(8).messages({
        "string.empty": "Dữ liệu bắt buộc",
        "string.min": "Trường lastnam phải có tối thiểu {#limit} kí tự"
    }),
    firstname: Joi.string().required().messages({
        "string.empty": "Dữ liệu bắt buộc"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Dữ liệu bắt buộc",
        "string.email": "Email không đúng định dạng",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Dữ liệu bắt buộc",
        "string.min": "Password tối thiểu 8 ký tự",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
        "any.only": "Mật khẩu không khớp"
    })
})

// Cac buoc xay dung API
// B1: Tao model
// B2: Controller
// B3: Router

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false })
        if (!error) {
            const { lastname, firstname, email, password } = req.body
            const hash = bcrypt.hashSync(password, 10);
            const user = await User.create({ lastname, firstname, email, password: hash })
            res.send({
                message: "Đăng ký thành công",
                data: user
            })
        } else {
            const messages = error.details.map(item => item.message)
            res.status(400).send({
                message: messages
            })
        }
    } catch (err) {
        res.status(500).send({
            message: "Có lỗi xảy ra"
        })
    }
    res.end()
}

const signinSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "{#label} dữ liệu bắt buộc",
        "string.email": "{#label} không đúng định dạng"
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "{#label} dữ liệu bắt buộc",
        "string.min": "{#label} mật khẩu không đúng định dạng",
    })
})

export const signin = async (req, res) => {
    // req.body = {email, password}
    try {
        // Bước 1:
        const { error } = signinSchema.validate(req.body, { abortEarly: false })
        // Refactor
        if (error) {
            const message = error.details.map(item => item.message)
            res.status(400).send({
                message: message
            })
            return;
        }
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(401).send({
                message: "Email hoặc password không hợp lệ"
            })
            res.end()
        }
        const check = bcrypt.compareSync(password, user.password)
        if (!check) {
            res.status(401).send({
                message: "Email hoặc password không hợp lệ"
            })
            res.end()
        }
        const token = jwt.sign({ _id: user._id }, "wd18101", { expiresIn: "1d" })
        res.json({
            message: "Đăng nhập thành công",
            accessToken: token, 
            user,
        })
        res.end()
    } catch (err) {
        res.status(500).send({
            message: "Có lỗi xảy ra"
        })
    }
}