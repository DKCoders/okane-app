import generateRoutes from '../../hoc/generateRoutes';
import list from './components/DebtsList';
import view from './components/DebtView';
import form from './components/DebtForm';

export default generateRoutes({ list, view, form });
