import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { Error } from './Error';
import EmployeeLogin from './employee/EmployeeLogin';
import EmployeeHome from './employee/EmployeeHome';
import CustomerLogin from './customer/CustomerLogin';
import CustomerHome from './customer/CustomerHome';
import CustomerRegistration from './customer/CustomerRegistration';
import CustomerDetails from './customer/CustomerDetails';
import CustomerCart from './customer/CustomerCart';
import CustomerTransaction from './customer/CustomerTransaction';
import CustomerUpdateDetails from './customer/CustomerUpdateDetails';
import CustomerModel from './customer/CustomerModel';
import EmployeeMain from './employee/EmployeeMain';
import EmployeeDeleteModel from './employee/EmployeeDeleteModel';

export const App = () => {
  return (
    <div>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/EmployeeLogin' component={EmployeeLogin} />
        <Route path='/EmployeeMain' component={EmployeeMain} />
        <Route path='/EmployeeHome' component={EmployeeHome} />
        <Route path='/EmployeeDeleteModel' component={EmployeeDeleteModel} />
        <Route path='/CustomerLogin' component={CustomerLogin} />
        <Route path='/CustomerHome' component={CustomerHome} />
        <Route path='/CustomerRegistration' component={CustomerRegistration} />
        <Route path='/CustomerDetails' component={CustomerDetails} />
        <Route path='/CustomerCart' component={CustomerCart} />
        <Route path='/CustomerTransaction' component={CustomerTransaction} />
        <Route
          path='/CustomerUpdateDetails'
          component={CustomerUpdateDetails}
        />
        <Route path='/CustomerModel:model_id' component={CustomerModel} />
        <Route component={Error} />
      </Switch>
    </div>
  );
};
