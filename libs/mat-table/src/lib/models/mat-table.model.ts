export interface TableConfiguration {
    columnConfig: ColumnConfiguration[];
    headers: HeadersConfiguration;
}

export interface ColumnConfiguration {
    columnKey: string;
    columnHeader: string;
    columnClass?: string;
    cellAction?: Function;
    pipe?: PipeConfig;
    sortDirection?: string;
    stickyStart?: boolean;
    stickyEnd?: boolean;
}

interface HeadersConfiguration {
    displayedColumns: string[];
}

interface PipeConfig {
    pipe: any;
    pipeFormat: string;
}
