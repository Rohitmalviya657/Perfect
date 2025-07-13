import Yup from 'yup'
export const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    image: Yup.mixed().required()
});