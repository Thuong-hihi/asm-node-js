import fs from 'fs'
import Joi from 'joi'
import Movies from '../models/movies'
import Genres from "../models/genres"
// Controller
export const getAllMovies = async function (req, res) {
    try {
        const movies = await Movies.find().populate("genresId");

        return res.status(201).json({
            message: "get all movies",
            data: movies,
        })
        // res.send(movies)
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
    res.end()
};

export const getMovieById = async function (req, res) {
    const { id } = req.params
    try {
        const movie = await Movies.findById(id)
        res.send(movie)
    } catch (err) {
        res.status(500).send({
            message: "Có lỗi xảy ra"
        })
    }
    res.end()
};

export const addMoviePage = function (req, res) {
    const html = fs.readFileSync('./pages/add.html', "utf-8")
    res.send(html)
    res.end()
}

const schema = Joi.object({
    
    title: Joi.string().min(10).required().messages({
        'string.empty': '{{#label}} là trường bắt buộc',
        'string.min': '{{#label}} phải có ít nhất {{#limit}} ký tự'
    }),
    year: Joi.number().required().min(1900).max(new Date().getFullYear()),
    cast: Joi.array().items(Joi.string()).min(1).required(),
    genres: Joi.array().items(Joi.string()).min(1).required(),
    href: Joi.string().required(),
    extract: Joi.string().required(),
    thumbnail: Joi.string().uri().required()
  });

export const createMovie = async function (req, res) {
    try {
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (!error) {
            const movie = await Movies.create(req.body);
            // Sau khi thêm mới phim, thì sẽ thêm id của phim đó vào 
            // bảng Genres
            await Genres.findByIdAndUpdate('64c9353c13416fd2c48c7de2', {
                $addToSet: {
                    movies: movie._id,
                    nameMovie: movie.title,
                }
            })
            res.send({
                massage: "Tạo mới movie thành công",
                data: movie
            })
        } else {
            const messages = error.details.map(item => item.message)
            res.status(400).send({
                message: messages
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
    res.end()
};

export const updateMovie = async function (req, res) {
    // req => Body, params, query, files
    const { id } = req.params
    try {
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (!error) {
            const movie = await Movies.findByIdAndUpdate(id, req.body)
            res.send({
                massage: "Cập nhật movie thành công",
                data: movie
            })
        } else {
            const messages = error.details.map(item => item.message)
            res.status(400).send({
                message: messages, 
               
            })
        }
    } catch (err) {
        res.status(500).send({
            message: "Cố lỗi xảy ra"
        })
    }
    res.end()
};

export const deleteMovie = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Movies.findByIdAndDelete(id)
        if (data) {
            res.send({
                message: "Xoá movie thành công",
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
export const search = async(req,res) =>{
    try {
        const { keyword, year } = req.query;
        const normalizedKeyword = keyword.toLowerCase().replace(/[^\w\s]/gi, '');
        // console.log(normalizedKeyword);
        // Tìm kiếm các bản ghi có normalizedContent chứa từ khóa đã nhập
        const movies = await Movies.find({ title: { $regex: normalizedKeyword, $options: 'i' } });
        if(movies.length === 0) {
            return res.json({
                message: "No movie"
            });
        }
        return res.json({ 
            message: "Kết quả tìm kiêm cho " + keyword,
            data: movies
         });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};
