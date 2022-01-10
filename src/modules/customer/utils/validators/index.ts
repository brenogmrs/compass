import * as yup from 'yup';

export const createCustomerSchema = yup.object().shape({
    full_name: yup
        .string()
        .strict(true)
        .required('The property full_name is required'),
    gender: yup
        .string()
        .oneOf(['M', 'F'])
        .required('The property gender is required'),
    birth_date: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .required('The property birth_date is required'),
    city_id: yup
        .string()
        .strict(true)
        .uuid()
        .required('The property city_id is required'),
});

export const updateCustomerSchema = yup.object().shape({
    full_name: yup.string().strict(true).optional(),
});

export const findCustomerByNameSchema = yup.object().shape({
    full_name: yup
        .string()
        .strict(true)
        .required('The property full_name is required'),
});
