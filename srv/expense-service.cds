using expense as db from '../db/schema';

@path: 'expenses'
service ExpenseService {
    
    entity Expenses as projection on db.Expenses;

    @requires : 'admin'
    action approveExpense(ID : UUID);
}