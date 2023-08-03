import Genres from '../models/genres'
import fs from 'fs'
import Joi from 'joi'


export const getAllGenres = async  function (req, res) {
    try {
        const genres = await Genres.find()
        res.send(genres)
    } catch (err) {
        res.status(500).send({
            message: "Cố lỗi xảy ra"
        })
    }
    res.end()
};
export const getGenresById = async function (req, res) {
  const { id } = req.params
  try {
      const genres  = await Genres.findById(id)
      res.send(genres)
  } catch (err) {
      res.status(500).send({
          message: "Có lỗi xảy ra"
      })
  }
  res.end()
};

  

export const addGenres = function (req, res) {
    const html = fs.readFileSync('./src/pages/add.html', "utf-8");
    console.log(html);
    res.send(html)
    res.end()
}

    const genresSchema = Joi.object({
    // id: Joi.number().required(),
    name: Joi.string().min(10).required().messages({
        'string.empty': "{{#label}} dữ liệu bắt buộc",
        "string.min": "{{#label}} tối thiểu 10 ký tự"
    })
})
// genres: Joi.array().items(Joi.string()).min(1)

 export const creatGenres = async (req, res) => {
    try {
      const { error } = genresSchema.validate(req.body)
      if (error) {
        return res.json({
          message: error.details.map((err) => err.message),
        });
      }
      const newGenres = await Genres.create(req.body);
      if (!newGenres) {
        return res.json({
          message: "Không thêm được danh mục",
        });
      }
      return res.json({
        message: "Thêm thành công genres",
        newGenres,
      });
    } catch (error) {
      return res.json({
        message: error,
      });
    }
  };
// PUT/update a Movie
export const updateGenres = async function (req, res) {
  try {
    const updateGenres = await Genres.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateGenres) {
      return res.json({
        message: "Không cập nhật được sản phẩm",
      });
    }
    return res.json({
      message: "Cập nhật thành công genres",
      updateGenres,
    });
  } catch (error) {}
};
  // DELETE a Movie
  export const deleteGenres = async function (req, res) {
    try {
      if (req.params.id) {
        const genres = await Genres.findOneAndDelete(req.params.id);
        return res.json({ message: "Xóa thành công", genres });
      } else {
        return res.json({ message: "Không tồn tại id" });
      }
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  };
  
