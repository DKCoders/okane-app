import generateRoutes from '../../hoc/generateRoutes';
import list from './components/ExpensesList';
import view from './components/ExpenseView';
import form from './components/ExpenseForm';

export default generateRoutes({ list, view, form });
