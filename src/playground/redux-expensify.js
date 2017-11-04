import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const AddExpense = (
  { description = '', note = '', amount = 0, createdAt = 0 } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate,
});

const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate,
});

// EXPENSES REDUCER

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      // ANY FALSE VALUE WILL FILTER OUT
      const startDateMatch =
        // type of start date is undefined. Thats not a number...true and move on. If it is a number itll be false and the next line of code
        // Will run. Now if created at is 49 and the start date is 59. 49 is not greater than 59 so it will be filtered out because it is false
        // if the start date is 39. 49 is greater that 39 so it will not be filtered.
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        // type of end date is undefined. That is not a number...true and move on. If it is a number itll be false and move on to the
        // or statement. Now is the created at date less than the end date? If so itll be true and not filter. If it is greater than
        // itll be filtered out.
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      // Does the description include the text? If true it will not be filtered
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        //b = 1 and -1 is a goes first. so if it is false a will go firse true b will go first. the greater amount goes first
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
// STORE

const store = createStore(
  combineReducers({ expenses: expensesReducer, filters: filtersReducer })
);

// Checks for changes in the State
// Runs with the filters
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  AddExpense({ description: 'Rent', amount: 30, createdAt: -231000 })
);
const expenseTwo = store.dispatch(
  AddExpense({ description: 'Coffee', amount: 100, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());

// store.dispatch(sortByDate());

// store.dispatch(sortByAmount());
// store.dispatch(sortByAmount());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(2000));

// store.dispatch(setTextFilter('rent'));

const demoState = {
  expenses: [
    {
      id: 'kdsajkdji1',
      description: 'January Rent',
      note: 'This was the final payment for that address',
      amount: 54500,
      createAt: 0,
    },
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', //Date or Amount
    startDate: undefined,
    endDate: undefined,
  },
};
