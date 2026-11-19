import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RestroFlowProvider } from './context/RestroFlowContext';
import { ScreenRoleDock } from './components/ScreenRoleDock';
import { PosNewOrderScreen } from './screens/PosNewOrderScreen';
import { KitchenDisplayScreen } from './screens/KitchenDisplayScreen';
import { RestaurantDashboardScreen } from './screens/RestaurantDashboardScreen';
import { TableManagementScreen } from './screens/TableManagementScreen';
import { CustomerQrScreen } from './screens/CustomerQrScreen';
import { LoginPageScreen } from './screens/LoginPageScreen';
import { OrderManagementScreen } from './screens/OrderManagementScreen';
import { MenuManagementScreen } from './screens/MenuManagementScreen';
import { InventoryManagementScreen } from './screens/InventoryManagementScreen';
import { StaffRbacScreen } from './screens/StaffRbacScreen';

export const App: React.FC = () => {
  return (
    <RestroFlowProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/pos" replace />} />
          <Route path="/pos" element={<PosNewOrderScreen />} />
          <Route path="/kds" element={<KitchenDisplayScreen />} />
          <Route path="/dashboard" element={<RestaurantDashboardScreen />} />
          <Route path="/tables" element={<TableManagementScreen />} />
          <Route path="/qr-order" element={<CustomerQrScreen />} />
          <Route path="/login" element={<LoginPageScreen />} />
          <Route path="/orders" element={<OrderManagementScreen />} />
          <Route path="/menu" element={<MenuManagementScreen />} />
          <Route path="/inventory" element={<InventoryManagementScreen />} />
          <Route path="/staff" element={<StaffRbacScreen />} />
          <Route path="*" element={<Navigate to="/pos" replace />} />
        </Routes>
        <ScreenRoleDock />
      </BrowserRouter>
    </RestroFlowProvider>
  );
};

export default App;
