export interface Visitor{
    id: string;
    fullName: string;
    company: string;
    group: string;
    present: boolean;
}

export type VisitorFormData = Omit<Visitor, 'id'>;

export interface Filters {
    present: string;
}