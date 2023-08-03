import Cast  from "../models/cast";
import fs from 'fs'
import Joi from 'joi'


export const getAllCasts = async function (req, res) {
    try {
        const cast = await Cast.find()
        res.send(cast)
    } catch (err) {
        res.status(500).send({
            message: "Cố lỗi xảy ra"
        })
    }
    res.end()
}

export const getCastsById = async function (req, res) {
    const { id } = req.params;
    try {
        const cast = await Cast.findById(id)
        res.send(cast)
    } catch (err) {
        res.status(500).send({
            message: "Có lỗi xảy ra"
        })
    }
    res.end()
};
  
export const addCasts = function (req, res) {
    const html = fs.readFileSync('./src/pages/add.html', "utf-8");
    console.log(html);
    res.send(html)
    res.end()
}

    const castSchema = Joi.object({
    // id: Joi.number().required(),
    name: Joi.string().min(10).required().messages({
        'string.empty': "{{#label}} dữ liệu bắt buộc",
        "string.min": "{{#label}} tối thiểu 10 ký tự"
    })
})
// genres: Joi.array().items(Joi.string()).min(1)

export const createCasts = async (req, res) => {
    try {
      const { error } = castSchema.validate(req.body)
      if (error) {
        return res.json({
          message: error.details.map((err) => err.message),
        });
      }
      const newCast = await Cast.create(req.body);
      if (!newCast) {
        return res.json({
          message: "Không thêm được cast",
        });
      }
      return res.json({
        message: "Thêm thành công cast",
        newCast,
      });
    } catch (error) {
      return res.json({
        message: error,
      });
    }
  };
  
// PUT/update a Movie
export const updateCasts = async function (req, res) {
    try {
        const updateCast = await Cast.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!updateCast) {
          return res.json({
            message: "Không cập nhật được sản phẩm",
          });
        }
        return res.json({
          message: "Cập nhật thành công cast",
          updateCast,
        });
      } catch (error) {}
    };


  // DELETE a Movie
  export const deleteCasts = async function (req, res) {
    const { id } = req.params
    try {
        const data = await Cast.findByIdAndDelete(id)
        if (data) {
            res.send({
                message: "Xoá cast thành công",
                data: data
            })
        } else {
            res.status(400).send({
                message: "Bản ghi không tồn tại"
            })
        }

    } catch (err) {
        res.status(500).send({
            message: "Cố lỗi xảy ra"
        })
    }
}