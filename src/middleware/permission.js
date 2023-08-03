import jwt from 'jsonwebtoken'
import User from '../models/user';

export const checkPermission = async (req, res, next) => {
    try {
        // 1. Kiểm tra có token không?
        // 2. Token có hợp lệ ?
        // 3. Kiếm tra có quyền truy cập ?
        // 4. Cho phép qua hay không qua
        if(!req.headers.authorization) {
            return res.status(400).json({
                message:  "Bạn cần đăng nhập để thực hiện hành động này ^^"
            })
        }
        const token = req.headers?.authorization.split(' ')[1]
        // console.log(token);
        if (!token) {
            res.status(401).send({
                message: "Bạn cần đăng nhập để thực hiện hành động này ^^"
            })
            return;
        }
        const decoded = jwt.verify(token, "wd18101")
        // console.log(decoded);
        if (!decoded) {
            res.status(401).send({
                message: "Lỗi xác thực người dùng"
            })
            return;
        }
        const _id = decoded._id
        const user = await User.findById(_id);
        // console.log(user);
        // if (!user.isAdmin) {
        //     res.status(401).send({
        //         message: "Không có quyền truy cập tài nguyên"
        //     })
        //     return;
        // }
        if(user.isAdmin !== 'admin') {
            return res.status(403).json({
                message: "Ban khong cos quyen truy cap hanh dong nay ^^"
            })
        }
        next()
    } catch (err) {
        // console.log(err);
        res.status(500).send({
            message: err.message
        })
    }
}