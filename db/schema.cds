using {managed} from '@sap/cds/common';

namespace expense;

entity Expenses : managed{
    key ID : UUID;
    title : String(100);
    amount : Decimal(10,2);
    category : String(50);
    status : String(20);
    date : Date;

    approvalHistory :
    Composition of many ApprovalHistory
    on approvalHistory.expense = $self;
}

entity ApprovalHistory : managed {
    key ID : UUID;

    action : String(30);
    remarks : String(255);

    expense : Association to Expenses;
}