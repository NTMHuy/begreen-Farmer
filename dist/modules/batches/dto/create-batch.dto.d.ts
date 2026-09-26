export declare class CreateCultivationLogDto {
    activity: string;
    description?: string;
    logDate: string;
}
export declare class CreateBatchDto {
    sellerId: number;
    productId: number;
    plantingDate?: string;
    harvestDate: string;
    quantity: number;
    cultivationLogs?: CreateCultivationLogDto[];
}
