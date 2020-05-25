import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

/**
 * disableLifecycleMethods: true -> 
 * prevents componentDidMount from running whenever we are creating an App shallow wrapper 
 * it means that lyfecicle methods will run when we explicitly call them
 */
Enzyme.configure({ 
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});
