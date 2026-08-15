"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalDecisionStatus = exports.TrustLevel = exports.BatchApprovalStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["SELLER"] = "seller";
    UserRole["BUYER"] = "buyer";
})(UserRole || (exports.UserRole = UserRole = {}));
var BatchApprovalStatus;
(function (BatchApprovalStatus) {
    BatchApprovalStatus["PENDING"] = "Pending";
    BatchApprovalStatus["APPROVED"] = "Approved";
    BatchApprovalStatus["REJECTED"] = "Rejected";
})(BatchApprovalStatus || (exports.BatchApprovalStatus = BatchApprovalStatus = {}));
var TrustLevel;
(function (TrustLevel) {
    TrustLevel["LOW"] = "Low";
    TrustLevel["MEDIUM"] = "Medium";
    TrustLevel["HIGH"] = "High";
})(TrustLevel || (exports.TrustLevel = TrustLevel = {}));
var ApprovalDecisionStatus;
(function (ApprovalDecisionStatus) {
    ApprovalDecisionStatus["APPROVED"] = "Approved";
    ApprovalDecisionStatus["REJECTED"] = "Rejected";
})(ApprovalDecisionStatus || (exports.ApprovalDecisionStatus = ApprovalDecisionStatus = {}));
//# sourceMappingURL=index.js.map