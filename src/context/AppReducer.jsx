export default (state, action) => {
    switch(action.type) {

      case 'SET_TRANSACTIONS':
        return {
          ...state,
          transactions: action.payload.map(tx => ({
            ...tx,
            category: tx.category || 'Uncategorized'
          }))
        }
      
      case 'DELETE_TRANSACTION':
        return {
          ...state,
          transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
        }
      case 'ADD_TRANSACTION':
        return {
          ...state,
          transactions: [action.payload, ...state.transactions]
        }
      default:
        return state;
    }
  }