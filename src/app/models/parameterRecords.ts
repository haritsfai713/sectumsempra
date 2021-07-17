export interface parameterRecords {
    _id: string;
    children: [parameter]
}

export interface parameter {
    param_count: number;
    param_id: string;
    param_index: number;
    param_type: number;
    param_value: number;
}
