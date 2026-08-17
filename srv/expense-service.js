const cds = require('@sap/cds');

const { SELECT, UPDATE } = require('@sap/cds/lib/ql/cds-ql');

module.exports = class ExpenseService extends cds.ApplicationService {

    init() {

        this.before('CREATE', 'Expenses', req => {

            if (req.data.amount <= 0) {
                req.error(
                    400,
                    'Expense amount must be greater than zero'
                );
                
            }

            if (!req.data.category) {
                req.error(
                    400,
                    'Category should not be empty'
                );
            }
            req.data.status = 'PENDING';
        });

        this.on('approveExpense', async req => {

            const { ID } = req.data;
            console.log('approveExpense called with ID:', ID);
            const expense = await SELECT.one
                .from('expense.Expenses')
                .where({ ID });

            if (!expense) {
                return req.error(
                    404,
                    'Expense not found'
                );
            }

            await UPDATE('expense.Expenses')
                .set({
                    status: 'APPROVED'
                })
                .where({ ID });

            return {
                message: 'Expense approved',
                ID: ID
            };
        });
        console.log("new");

        return super.init();
    }
};