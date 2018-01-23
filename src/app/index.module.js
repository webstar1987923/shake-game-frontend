/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { ViewProductController } from './components/viewproduct/viewproduct.controller';
import { ProductDataService } from './components/viewproduct/viewproduct.service';
import { SpinController } from './components/spinner/spinner.controller';
import { NumbersOnlyDirective } from './shared/numbersOnly.directive';

angular.module('shake2winComplete', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'mm.foundation', 'hmTouchEvents', 'timer'])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  
  .controller('MainController', MainController)
  .controller('ViewProductController', ViewProductController)
  .controller('SpinController', SpinController)

  .factory('ProductDataService', ProductDataService)

  .directive('numbersOnly', NumbersOnlyDirective);