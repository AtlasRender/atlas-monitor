export default class RenderJob {
    public id: number;
    public department: string;
    public submitter: string;
    public submitDate: Date;

    public constructor(data: any) {
        this.id = +data?.id;
        this.department = data?.department;
        this.submitter = data?.submitter;
        this.submitDate = data?.submitDate;
    }
}