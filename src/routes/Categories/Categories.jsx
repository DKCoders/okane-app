import generateRoutes from '../../hoc/generateRoutes';
import list from './components/CategoriesList';
import view from './components/CategoryView';
import form from './components/CategoryForm';

export default generateRoutes({ list, view, form });
