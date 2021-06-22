export interface DbFileReader {
    read(): any;
    readById(id: number): any;
    post(data: any): any;
    deleteById(id: number): any;
    updateById(id: number): any;
}