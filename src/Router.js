import { createRouter } from '@expo/ex-navigation';
import Home from './containers/Home';
import AddProduct from './containers/CameraScannerExample/AddProduct';
import ScanProduct from './containers/CameraScannerExample/ScanProduct';
import AllProducts from './containers/CameraScannerExample/AllProducts';

export default createRouter(() => ({
    home: () => Home,
    addProduct: () => AddProduct,
    scanProduct: () => ScanProduct,
    allProducts: () => AllProducts
}));