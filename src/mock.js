import moment from 'moment';
import { normalizatorById } from './utils/helpers';

export const categories = [
  { id: 'cat1', name: 'categoria 1', color: 'red' },
  { id: 'cat2', name: 'categoria 2', color: 'blue' },
  { id: 'cat3', name: 'categoria 3', color: 'green' },
];

export const normalizedCategories = normalizatorById(categories);

export const expenses = [
  {
    id: 1, categoryId: 'cat1', date: moment().format('YYYY-MM-DD'), description: 'Long description jajaja jajaj jajajaj ajajja aj aja aj haha ksj ttty hdh jdhfh sjsj ss', value: 10000,
  },
  {
    id: 2, categoryId: 'cat1', date: moment().subtract(1, 'day').format('YYYY-MM-DD'), description: 'description', value: 10000,
  },
  {
    id: 3, categoryId: 'cat2', date: moment().subtract(1, 'day').format('YYYY-MM-DD'), description: 'description', value: 20000,
  },
];

export const normalizedExpenses = normalizatorById(expenses);
