import {combineReducers} from 'redux';
import multireducer from 'multireducer';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import {reducer as form} from 'redux-form';
import auth from './auth';
import info from './info';
import partners from './public/partners';
import help from './public/help';
import careers from './public/careers';
import testimonials from './public/testimonials';
import appraisalHistory from './public/appraisalHistory';
import appraisalHistories from './public/appraisalHistories';
import summary from './public/summary';
import simulationData from './product/pawn/simulate';
import pawnSimulate from './product/pawn/simulate';
import pawnFiling from './product/pawn/filing';
import pawnConfirmation from './product/pawn/confirmation';
import pawnPayment from './product/pawn/payment';
import loanFiling from './product/loan/filing';
import register from './register';
import inbox from './membership/inbox/inbox';
import inboxDetail from './membership/inbox/inboxDetail';
import referral from './membership/referral/referral';
import profile from './membership/profile/profile';
import transactions from './membership/transactions/transactions';
import transactionDetail from './membership/transactions/transactionDetail';
import branchs from './public/repository';
import validateEmail from './membership/profile/validateEmail';
import cities from './public/cities';
import city from './public/city';
import provinces from './public/provinces';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  info,
  partners,
  help,
  careers,
  testimonials,
  simulationData,
  appraisalHistory,
  appraisalHistories,
  summary,
  pawnSimulate,
  pawnFiling,
  pawnConfirmation,
  pawnPayment,
  loanFiling,

  branchs,
  cities,
  city,
  provinces,

  validateEmail,

  register,

  inbox,
  inboxDetail,
  referral,
  profile,
  transactions,
  transactionDetail
});
