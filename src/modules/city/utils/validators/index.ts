import * as yup from 'yup';
import { cityUfs } from '../constants';

export const createCitySchema = yup.object().shape({
    name: yup.string().required('The property name is required'),
    uf: yup.string().oneOf(cityUfs).required('The property uf is required'),
});
