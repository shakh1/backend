import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserModel from '../models/user.js'


export const register = async (req, res) => {   

    try {
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        email:req.body.email,
        name:req.body.name,
        surname:req.body.surname,
        passwordHash: hash
    })

    
    const user = await doc.save()

    const token = jwt.sign(
    {  _id: user._id},
    'secret123',
    { expiresIn: '30d' }
    );


    const { passwordHash, userData } = user._doc 

    res.json({
        ...userData,
        token,   
    })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось зарегистроваться'
        })
    }
}

export const login = async (req, res) => {  
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash) 

        if (!isValidPass) {
            return res.status(404).json({
                message:'Не правельный логин или пароль'
            })
        }

        const token = jwt.sign(
        { _id: user._id },
        'secret123',
        { expiresIn: '30d' }
        )

        const { passwordHash, ...userData} = user._doc 

        res.json({
            ...userData,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось авторизаваться'
        })
    }
}

export const getMe = async (req, res) => {  

    try {
        const user = await UserModel.findById(req.userId)

          if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const {passwordHash, ...userData } = user._doc

        res.json(userData)
    } 
    
    catch (error) {
        
    }
}