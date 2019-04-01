import generateRoutes from '../../hoc/generateRoutes';
import list from './components/BudgetsList';
import view from './components/BudgetView';
import form from './components/BudgetForm';

export default generateRoutes({ list, view, form });
