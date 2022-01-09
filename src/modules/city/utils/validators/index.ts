import * as yup from 'yup';

export const createCustomerSchema = yup.object().shape({
    name: yup.string().required('The property name is required'),
    email: yup.string().email().required('The property email is required'),
    password: yup.string().required('The property password is required'),
    passwordConfirmation: yup
        .string()
        .required('The property passwordConfirmation is required'),
});

export const updateCustomerSchema = yup.object().shape({
    name: yup.string().optional(),
    email: yup.string().email().optional(),
});
