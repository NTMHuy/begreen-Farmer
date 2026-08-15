import { TrustLevel } from '../../common/enums';
export declare class ApproveBatchDto {
    adminId: number;
    trustLevel: TrustLevel;
    note?: string;
}
