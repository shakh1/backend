import { body } from 'express-validator' 

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({min:5}), 
    body('name', 'Укажите Имя' ).isLength({min:3}), 
    body('surname', 'Укажите Фамилию').isLength({min:3}), 
]
export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),    
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({min:5}), 
]



export const postCreateValidation = [
    body('title', 'Введите загаловок').isLength({min: 5}).isString(),
    body('text', 'Введите описание').isLength({min: 3}).isString(),
    body('tags', 'Укажите тег').optional().isArray(),
    body('Img', 'Добавьте изображение').optional().isString(),
]

